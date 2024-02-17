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
        onError: (error: AxiosError<any>, key) => {
          if(error.response) {
            if(error.response.status === 401) {
              openPopup({
                title: '오류 발생',
                description: <>로그인이 필요한 서비스입니다</>,
                buttons: [{ label: '확인', onClick: () => { closePopup(); router.push('/login'); } }],
              });
            } else {
              if(error.response.data.errorCode) {
                const errorCode = error.response.data.errorCode;
                openPopup({
                  title: '오류',
                  description: <>{errorCode} - 확인되지 않은 오류입니다<br />문의하기를 통해 문의해주세요</>,
                  buttons: [{ label: '확인', onClick: closePopup }],
                });
              } else {
                openPopup({
                  title: '오류',
                  description: <>{error.response.status} - 확인되지 않은 오류입니다<br />문의하기를 통해 문의해주세요</>,
                  buttons: [{ label: '확인', onClick: closePopup }],
                });
              }
            }
          } else {
            openPopup({
              title: '오류',
              description: <>unknown - 확인되지 않은 오류입니다<br />문의하기를 통해 문의해주세요</>,
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