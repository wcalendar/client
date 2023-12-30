'use client';

import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Callback() {
  const router = useRouter();

  const callback = async () => {
    // TODO
    // const response = await axios.get('http://localhost:8080/api/token/access', {
    //   withCredentials: true,
    // });

    // if(response.status < 300) {
    // }

    router.push('/');
  }

  useEffect(() => {
    callback();
  }, []);

  return <div></div>
}