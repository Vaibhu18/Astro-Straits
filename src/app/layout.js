import { Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";
import { ChatProvider } from "@/context/ChatContext";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://astrostraits.vercel.app"),
  title: "Astro Straits – Your AI Astrologer & Spiritual Guide",
  description:
    "Astro Straits is your AI-powered Vedic astrology and life guidance platform. Discover insights about your birth chart, zodiac, and destiny with Mira — your compassionate AI astrologer.",
  keywords: [
    "Astro Straits",
    "AI astrologer",
    "Vedic astrology",
    "Kundli generator",
    "AI horoscope",
    "birth chart analysis",
    "spiritual guide",
    "AI astrology chat",
    "daily horoscope",
  ],
  authors: [{ name: "Astro Straits Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Astro Straits – Your AI Astrologer & Spiritual Guide",
    description:
      "Chat with Mira, your compassionate AI astrologer, and explore personalized insights from your birth chart, zodiac signs, and Vedic wisdom. Discover balance, mindfulness, and growth with Astro Straits.",
    url: "https://astrostraits.vercel.app",
    siteName: "Astro Straits",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Astro Straits – AI Astrologer & Spiritual Guide",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Astro Straits – AI Astrologer & Spiritual Guide",
    description:
      "Explore your destiny with Mira, your personal AI astrologer. Understand your Sun, Moon, and Ascendant signs with deep spiritual clarity.",
    images: ["/og-image.png"],
    creator: "@Astro Straits_ai",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <SessionProvider>
          <AuthProvider>
            <ChatProvider>
              <Navbar />
              <main className="">{children}</main>
              <Toaster position="top-right" />
            </ChatProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
