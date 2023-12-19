import type { Metadata } from 'next'
import { Roboto } from 'next/font/google';
import StyleProvider from '@/style/StyleProvider';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  variable: '--font-roboto',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'W Calendar',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={roboto.className}>
      <body>
        <StyleProvider>
          {children}
        </StyleProvider>
      </body>
    </html>
  );
}
