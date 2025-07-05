import "./globals.css";
import Providers from "./components/Providers";

export const metadata = {
  title: "Gemini Chat",
  description: "Login to chat with Gemini",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
