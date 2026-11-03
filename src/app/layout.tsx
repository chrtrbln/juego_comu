import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Camino Carmelita | Reto de santos",
  description: "Un divertido cuestionario para aprender sobre los santos en comunidad.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
