'use client';

import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Callback() {
  const router = useRouter();

  const callback = async () => {
    // const response = await axios.get('https://wplanner.co.kr/api/token/access', {
    //   withCredentials: true,
    // });

    // if(response.status < 300) {
    //   console.log(response);
    // }

    // router.push('/');
  }

  useEffect(() => {
    callback();
  }, []);

  return <div></div>
}