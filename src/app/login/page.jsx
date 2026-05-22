"use client";

import LoginContent from "@/component/LoginContent";
import { Suspense } from "react";


export default function Login() {
  useEffect(() => {
    document.title = "Login | Ideavalid";
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}