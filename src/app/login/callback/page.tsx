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
    callback();
  }, []);

  return <div></div>
}