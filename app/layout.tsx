import './globals.css';
import type { Metadata } from 'next';
import { Inter, Manrope, Open_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/layout/header';
import { AIAssistantProvider } from '@/components/ai-assistant/ai-assistant-context';
import AIAssistantButton from '@/components/ai-assistant/ai-assistant-button';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope'
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans'
});

export const metadata: Metadata = {
  title: 'BetPro | Modern Betting Platform',
  description: 'A sleek, mobile-responsive betting platform with AI assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${manrope.variable} ${openSans.variable} font-sans bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AIAssistantProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <AIAssistantButton />
              <Toaster />
            </div>
          </AIAssistantProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}