import type { Metadata } from 'next'
import { Roboto } from 'next/font/google';
import StyleProvider from '@/style/StyleProvider';
import AppModal from '@/components/common/app-modal/AppModal';
import { ModalProvider } from '@/providers/ModalProvider/ModalProvider';
import PopupProvider from '@/providers/PopupProvider/PopupProvider';
import AppPopup from '@/components/common/app-popup/AppPopup';
import Header from '@/components/common/header/Header';
import { CurrentDateProvider } from '@/providers/CurrentDateProvider/CurrentDateProvider';

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
          <CurrentDateProvider>
            <PopupProvider>
              <ModalProvider>
                <Header />
                {children}
                <AppModal />
                <AppPopup />
              </ModalProvider>
            </PopupProvider>
          </CurrentDateProvider>
        </StyleProvider>
      </body>
    </html>
  );
}
