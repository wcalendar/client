import type { Metadata } from 'next'
import { Roboto } from 'next/font/google';
import StyleProvider from '@/style/StyleProvider';
import AppModal from '@/components/common/app-modal/AppModal';
import { ModalProvider } from '@/providers/ModalProvider/ModalProvider';

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
          <ModalProvider>
            {children}
            <AppModal />
          </ModalProvider>
        </StyleProvider>
      </body>
    </html>
  );
}
