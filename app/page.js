"use client"

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const token = Cookies.get('token');

  if(!token) {
    router.push('/login');
  }

  return (
    <h1>This is Home</h1>
  )
}
