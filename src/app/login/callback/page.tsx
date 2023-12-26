'use client';

import { useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

export default function Callback() {
  const callback = async () => {
    axios.get('http://localhost:8080/api/token/access', {
      withCredentials: true,
    })
  }

  useEffect(() => {
    const jsessionId = Cookies.get('jsession-id');
    if(jsessionId) callback();
    else alert('no jsession-id');
  }, []);

  return <div></div>
}