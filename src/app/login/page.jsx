"use client";

import LoginContent from "@/component/LoginContent";
import { Suspense } from "react";


export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}