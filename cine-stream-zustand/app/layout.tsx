// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "CINE STREAM",
  description: "Next.js 15 Movie Explorer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}