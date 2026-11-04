"use client";

import { useState } from "react";

type Question = { question: string; options: string[]; answer: number; note: string };

// Agrega, quita o edita preguntas aquí. El avance y el resultado se calculan desde este arreglo.
const questions: Question[] = [
  {
    question: "¿Quién construyó el arca por mandato de Dios?",
    options: ["Abraham", "Noé", "Moisés", "Noé (personaje bíblico)"],
    answer: 1,
    note: "Noé es un patriarca bíblico que construyó el arca por mandato divino, no un santo canonizado.",
  },
  {
    question: "¿Quién fue el primer papa de la Iglesia católica?",
    options: ["San Pablo", "San Juan", "San Pedro", "San Andrés"],
    answer: 2,
    note: "San Pedro es considerado por la tradición católica como el primer Papa y líder de los apóstoles.",
  },
  {
    question: "¿Qué santo es conocido como el patrono de los animales y de la naturaleza?",
    options: ["San Antonio de Padua", "San Francisco de Asís", "San Benito de Nursia", "San Bruno"],
    answer: 1,
    note: "San Francisco de Asís es mundialmente recordado por su amor profundo hacia la creación y los animales.",
  },
  {
    question: "¿Quién fue la madre de Jesús?",
    options: ["Santa Ana", "Santa Isabel", "La Virgen María", "Santa Marta"],
    answer: 2,
    note: "La Virgen María es la madre de Jesús de Nazaret, concebida sin mancha de pecado original.",
  },
  {
    question: "¿Qué santo fue conocido por ser el padre adoptivo de Jesús y esposo de María?",
    options: ["San José", "San Joaquín", "San Zacarías", "San Simeón"],
    answer: 0,
    note: "San José fue el custodio de la Sagrada Familia, patrono de los trabajadores y padre adoptivo de Jesús.",
  },
  {
    question: "¿Qué santo fue el apóstol que negó a Jesús tres veces antes de que cantara el gallo?",
    options: ["San Judas Tadeo", "San Mateo", "San Pedro", "San Felipe"],
    answer: 2,
    note: "San Pedro negó a Jesús por miedo la noche de su arresto, pero luego protagonizó un profundo arrepentimiento.",
  },
  {
    question: "¿Qué apóstol persiguió a los cristianos antes de convertirse en uno de los grandes evangelizadores?",
    options: ["San Bartolomé", "San Pablo", "San Bernabé", "San Matías"],
    answer: 1,
    note: "San Pablo, originalmente Saulo de Tarso, experimentó una conversión en el camino a Damasco.",
  },
  {
    question: "¿Qué santo es conocido por haber recibido los estigmas de Cristo y por su devoción al rosario?",
    options: ["San Juan de la Cruz", "San Antonio Abad", "San Pío de Pietrelcina (Padre Pío)", "San Camilo de Lellis"],
    answer: 2,
    note: "El Padre Pío fue un fraile capuchino estigmatizado, célebre por su vida de oración y confesionario.",
  },
  {
    question: "¿Qué santa es conocida como la patrona de las misiones y escribió sobre el caminito espiritual?",
    options: ["Santa Teresita del Niño Jesús", "Santa Clara de Asís", "Santa Catalina de Siena", "Santa Rosa de Lima"],
    answer: 0,
    note: "Santa Teresita de Lisieux propuso la «infancia espiritual» o caminito para alcanzar la santidad en lo cotidiano.",
  },
  {
    question: "¿Qué santo italiano fundó la orden de los franciscanos?",
    options: ["San Francisco de Asís", "San Ignacio de Loyola", "San Domigo de Guzmán", "San Francisco de Sales"],
    answer: 0,
    note: "San Francisco de Asís fundó la Orden de los Frailes Menores inspirándose en el Evangelio de la pobreza.",
  },
  {
    question: "¿Qué santa dedicó su vida a los más pobres en Calcuta y recibió el Premio Nobel de la Paz?",
    options: ["Santa Gema Galgani", "Santa Teresa de Calcuta", "Santa Brígida de Suecia", "Santa Rita de Cascia"],
    answer: 1,
    note: "Madre Teresa fundó las Misioneras de la Caridad, sirviendo incansablemente a los más necesitados.",
  },
  {
    question: "¿Qué santo es conocido como el patrono de los jóvenes y fundador de los salesianos?",
    options: ["San Felipe Neri", "San Juan Bosco", "San Luis Gonzaga", "San Estanislao de Kostka"],
    answer: 1,
    note: "Don Bosco dedicó su vida a la educación y formación integral de los jóvenes desfavorecidos en Turín.",
  },
  {
    question: "¿Qué apóstol era conocido como el discípulo amado de Jesús?",
    options: ["San Santiago el Mayor", "San Andrés", "San Juan Evangelista", "San Judas Tadeo"],
    answer: 2,
    note: "San Juan Evangelista es tradicionalmente identificado como el discípulo amado que recostó su pecho en la Última Cena.",
  },
  {
    question: "¿Qué santo fue entregado a las fieras según la tradición de su martirio en el Coliseo romano?",
    options: ["San Lorenzo", "San Ignacio de Antioquía", "San Policarpo", "San Sebastián"],
    answer: 1,
    note: "San Ignacio de Antioquía escribió célebres cartas a las iglesias antes de ser martirizado por las fieras en Roma.",
  },
  {
    question: "¿Qué santa es conocida por haber escuchado el llamado de Dios y liderado al ejército francés?",
    options: ["Santa Juana de Arco", "Santa Genoveva", "Santa Clotilde", "Santa Bernadette"],
    answer: 0,
    note: "Santa Juana de Arco guió a las tropas francesas inspirada por visiones divinas durante la Guerra de los Cien Años.",
  },
  {
    question: "¿Qué santo es conocido por su frase «Para Dios nada es imposible»?",
    options: ["San Gabriel Arcángel", "San Jerónimo", "San Agustín de Hipona", "San Ambrosio"],
    answer: 0,
    note: "Esta famosa frase corresponde al relato bíblico de la Anunciación, expresada por el ángel San Gabriel a María.",
  },
  {
    question: "¿Qué santo fue el primer mártir de la Iglesia católica?",
    options: ["San Esteban", "San Lorenzo", "San Pancracio", "San Vital"],
    answer: 0,
    note: "San Esteban fue diácono y el primer mártir del cristianismo, muriendo apedreado por defender su fe.",
  },
  {
    question: "¿Qué santo es conocido por su gran devoción al Sagrado Corazón de Jesús?",
    options: ["San Juan Eudes", "San Alfonso María de Ligorio", "San Vicente de Paúl", "San Bernardo de Claraval"],
    answer: 0,
    note: "San Juan Eudes promovió fuertemente la devoción litúrgica a los Sagrados Corazones de Jesús y de María.",
  },
  {
    question: "¿Qué santa es conocida por ser la patrona de los músicos?",
    options: ["Santa Inés", "Santa Cecilia", "Santa Lucía", "Santa Águeda"],
    answer: 1,
    note: "Santa Cecilia es venerada como patrona de la música debido a su martirio y su amor por los cantos a Dios.",
  },
  {
    question: "¿Qué santo italiano es conocido como el patrono de internet y fue canonizado en 2025?",
    options: ["San Tarsicio", "San Carlo Acutis", "San Luis Gonzaga", "San Domund"],
    answer: 1,
    note: "San Carlo Acutis utilizó la tecnología y la informática para evangelizar, siendo un referente para la juventud actual.",
  },
  {
    question: "¿Qué santo es conocido por haber escrito las famosas Confesiones?",
    options: ["San Jerónimo", "San Agustín de Hipona", "San Gregorio Magno", "San Juan Crisóstomo"],
    answer: 1,
    note: "San Agustín de Hipona escribió Las Confesiones, una de las obras cumbres de la autobiografía y la filosofía occidental.",
  },
  {
    question: "¿Qué santo fue el esposo de Santa Mónica y padre de San Agustín?",
    options: ["Patricio", "Terencio", "Flavio", "Valerio"],
    answer: 0,
    note: "Patricio fue el esposo de Santa Mónica y padre de San Agustín, aunque no forma parte del calendario universal de santos.",
  },
  {
    question: "¿Qué santa española es conocida por sus escritos místicos y por reformar la Orden del Carmelo?",
    options: ["Santa Teresa de Jesús (de Ávila)", "Santa María de la Cabeza", "Santa Beatriz de Silva", "Santa Eulalia"],
    answer: 0,
    note: "Santa Teresa de Jesús fue doctora de la Iglesia y renovó la vida contemplativa de las carmelitas junto a San Juan de la Cruz.",
  },
  {
    question: "¿Qué santo es conocido por ser el patrono de las causas difíciles y desesperadas?",
    options: ["San Judas Tadeo", "San Expedito", "San Pancracio", "San Cayetano"],
    answer: 0,
    note: "San Judas Tadeo, apóstol de Jesús, es ampliamente invocado por los fieles en situaciones extremas o imposibles.",
  },
  {
    question: "¿Qué figura bíblica es célebre por su valentía al enfrentar al gigante Goliat?",
    options: ["Sansón", "Gedeón", "David", "Saúl"],
    answer: 2,
    note: "David fue un rey y salmista israelita, recordado en la Biblia por su victoria sobre el gigante Goliat.",
  },
  {
    question: "¿Qué santo fue hermano de San Pedro y también apóstol de Jesús?",
    options: ["San Andrés", "San Felipe", "San Bartolomé", "San Santiago el Menor"],
    answer: 0,
    note: "San Andrés fue pescador, hermano de Simón Pedro y uno de los primeros discípulos en seguir a Jesús.",
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
