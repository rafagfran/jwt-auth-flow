import { AuthContext } from '@/context/auth';
import React, { useContext } from 'react'
import { useRouter } from "next/navigation"

export default function PrivateRoutes() {
  const router = useRouter();

  const { signed } = useContext(AuthContext);


  return signed ? router.push("/home") : router.push("/");

}
