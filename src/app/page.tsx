"use client";

import { useState } from "react";

type Question = { question: string; options: string[]; answer: number; note: string };

// Agrega, quita o edita preguntas aquí. El avance y el resultado se calculan desde este arreglo.
const questions: Question[] = [
  {
    question: "¿Qué santo es conocido como el patrono de los poetas españoles?",
    options: ["San Francisco de Asís", "San Juan de la Cruz", "San Ignacio de Loyola", "San Martín de Porres"],
    answer: 1,
    note: "San Juan de la Cruz fue un gran poeta místico y reformador del Carmelo.",
  },
  {
    question: "¿Qué santo recibió los estigmas y llamó ‘hermano’ a toda la creación?",
    options: ["San Francisco de Asís", "San Agustín", "San Benito", "San Felipe Neri"],
    answer: 0,
    note: "San Francisco de Asís es recordado por su amor a la creación y su vida sencilla.",
  },
];

const letters = ["A", "B", "C", "D", "E", "F"];
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function Home() {
  const [name, setName] = useState("");
  const [step, setStep] = useState<"welcome" | "quiz" | "result">("welcome");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [busy, setBusy] = useState(false);

  const score = answers.reduce((sum, answer, index) => sum + (answer === questions[index]?.answer ? 1 : 0), 0);

  function startGame(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || questions.length === 0) return;
    setAnswers([]);
    setCurrent(0);
    setSaved(false);
    setSaveError(false);
    setStep("quiz");
  }

  async function chooseOption(optionIndex: number) {
    if (busy) return;
    const nextAnswers = [...answers.slice(0, current), optionIndex];
    setAnswers(nextAnswers);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      return;
    }

    const finalScore = nextAnswers.reduce((sum, answer, index) => sum + (answer === questions[index].answer ? 1 : 0), 0);
    setStep("result");
    if (!supabaseUrl || !supabaseKey) return;
    setBusy(true);
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/quiz_results`, {
        method: "POST",
        headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({ name: name.trim(), score: finalScore, answers: nextAnswers }),
      });
      setSaved(response.ok);
      setSaveError(!response.ok);
    } catch {
      setSaveError(true);
    }
    setBusy(false);
  }

  const percent = questions.length ? Math.round((score / questions.length) * 100) : 0;

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar"><a className="brand" href="#inicio"><span className="brand-mark">✳</span><span>CAMINO<span className="brand-light"> CARMELITA</span></span></a><span className="top-note">Una aventura entre santos</span></header>
      <section className="game-card" id="inicio">
        <div className="card-decoration decoration-left">✦</div><div className="card-decoration decoration-right">✦</div>
        <div className="eyebrow"><span className="eyebrow-line" /> RETO DE LA COMUNIDAD <span className="eyebrow-line" /></div>

        {step === "welcome" && <div className="welcome-view">
          <div className="hero-icon">☼</div>
          <p className="kicker">¿CUÁNTO SABES DE ELLOS?</p>
          <h1>Un camino<br />lleno de <em>santos.</em></h1>
          <p className="intro">Pon a prueba lo que sabes, descubre algo nuevo y celebra la alegría de caminar juntos.</p>
          <form className="name-form" onSubmit={startGame}>
            <label htmlFor="player-name">¿Cómo te llamas?</label>
            <div className="input-row"><input id="player-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Escribe tu nombre" maxLength={60} required /><button className="primary-button" type="submit" disabled={!questions.length}>¡Vamos! <span>→</span></button></div>
          </form>
          <div className="game-meta"><span>◷ &nbsp;{questions.length} preguntas</span><span className="meta-dot">·</span><span>✧ &nbsp;A tu propio ritmo</span></div>
        </div>}

        {step === "quiz" && <div className="quiz-view">
          <div className="quiz-topline"><span className="player-greeting">VAMOS, {name.trim().toLocaleUpperCase()}</span><span className="question-count">{String(current + 1).padStart(2, "0")} <i>/ {String(questions.length).padStart(2, "0")}</i></span></div>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
          <p className="question-label">PREGUNTA {current + 1}</p>
          <h2 className="question-title">{questions[current].question}</h2>
          <div className="options-list">{questions[current].options.map((option, index) => <button className="option-button" key={`${current}-${index}`} onClick={() => chooseOption(index)} disabled={busy}><span className="option-letter">{letters[index] ?? index + 1}</span><span>{option}</span><span className="option-arrow">↗</span></button>)}</div>
          <p className="gentle-note">Elige la respuesta que te parezca correcta</p>
        </div>}

        {step === "result" && <div className="result-view">
          <div className="result-sun">{percent === 100 ? "✺" : "✦"}</div><p className="kicker">¡RETO COMPLETADO!</p>
          <h1 className="result-title">Buen camino,<br /><em>{name.trim()}.</em></h1>
          <div className="score-seal"><strong>{score}<span>/{questions.length}</span></strong><small>RESPUESTAS<br />ACERTADAS</small></div>
          <p className="result-copy">{percent === 100 ? "¡Qué gran conocimiento de los santos!" : percent >= 50 ? "Cada respuesta es un paso más en el camino." : "Todo camino comienza con curiosidad. ¡Sigue aprendiendo!"}</p>
          <div className="answer-review">{questions.map((question, index) => <div className="review-row" key={index}><span className={answers[index] === question.answer ? "review-mark correct" : "review-mark incorrect"}>{answers[index] === question.answer ? "✓" : "·"}</span><span>{question.note}</span></div>)}</div>
          {saved && <p className="save-status">✦ Tu resultado quedó guardado. ¡Gracias por participar!</p>}
          {saveError && <p className="save-status save-error">No se pudo guardar el resultado. Revisa la configuración de Supabase.</p>}
          {(!supabaseUrl || !supabaseKey) && <p className="save-status">Configura Supabase para guardar tu resultado.</p>}
          <button className="primary-button replay-button" onClick={() => { setStep("welcome"); setAnswers([]); setCurrent(0); }}>Jugar otra vez <span>↻</span></button>
        </div>}
        <div className="card-footer"><span>✳</span> CON CORAZÓN CARMELITA <span>✳</span></div>
      </section>
      <footer className="page-footer">INSPIRADOS POR SAN JUAN DE LA CRUZ <span>·</span> HECHO PARA CAMINAR JUNTOS</footer>
    </main>
  );
}
