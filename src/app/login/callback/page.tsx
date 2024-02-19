'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { noAuthAPI } from "@/lib/apis";

export default function Callback() {
  const router = useRouter();
  const state = useSearchParams().get('state');

  const callback = async () => {
    const response = await noAuthAPI.get(`/token/access/${state}`, {
      withCredentials: true,
    });

    if(response.status < 300) {
      const authorization: string | undefined = response.headers['authorization']
      if(authorization) {
        const token = authorization.split(' ')[1];
        localStorage.setItem('at', token);
      } else {
        alert('로그인 실패');
        router.push('/login');
      }
    }

    router.push('/');
  }

  useEffect(() => {
    if(!state) {
      alert('로그인 실패');
      router.push('/login');
    }

    callback();
  }, []);

  return <div></div>
}