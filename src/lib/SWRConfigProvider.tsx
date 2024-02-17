'use client';

import { usePopup } from "@/providers/PopupProvider/usePopup";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

interface SWRConfigProviderProps {
  children: ReactNode;
}

export default function SWRConfigProvider({
  children,
}: SWRConfigProviderProps) {
  const { openPopup, closePopup, } = usePopup();
  const router = useRouter();

  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        onError: (error: AxiosError, key) => {
          if(error.response) {
            openPopup({
              title: '오류',
              description: <>로그인이 필요한 서비스입니다</>,
              buttons: [{ label: '확인', onClick: () => { closePopup(); router.push('/login'); } }],
            });
          } else {
            openPopup({
              title: '오류',
              description: <>심각한 오류가 발생했습니다</>,
              buttons: [{ label: '확인', onClick: closePopup }],
            });
          }
        }
      }}
    >
      {children}
    </SWRConfig>
  );
}