"use client";

import { Suspense } from "react";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import { authClient, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";

 export default function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = searchParams.get("callback") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData.entries());

    const { data, error } = await signIn.email({
      ...loginData,
      callbackURL: callbackUrl,
    });

    if (error) {
      toast.error(error.message || "Login failed");
      return;
    }

    if (data) {
      toast.success("Login successful");
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col bg-slate-50">
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

            <div className="text-center space-y-2 relative">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Welcome <span className="text-blue-600">Back</span>
              </h2>

              <p className="text-slate-500 font-medium">
                Continue your learning journey today
              </p>
            </div>

            <Button
              onClick={handleGoogleLogin}
              variant="bordered"
              className="w-full h-12 font-bold rounded-2xl border-slate-200 hover:bg-slate-50 gap-3"
            >
              <Image
                width={20}
                height={20}
                src="https://www.google.com/favicon.ico"
                alt="Google"
              />
              Sign in with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100"></span>
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
                  Or with email
                </span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2 ">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-700 ml-1 mr-4"
                >
                  Email Address
                </label>

                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  startContent={<Mail className="w-5 h-5 text-slate-400" />}
                  className="h-14"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-700 ml-1 mr-4"
                >
                  Password
                </label>

                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  startContent={<Lock className="w-5 h-5 text-slate-400" />}
                  className="h-14"
                />
              </div>

              <div className="flex justify-end">
                <Link
                  href="/forgotpassword"
                  className="text-xs font-bold text-gray-400 hover:text-teal-500"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                color="primary"
                type="submit"
                className="w-full h-14 text-lg font-black rounded-2xl"
              >
                Sign In
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 font-medium">
                New to CourseHub?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 font-black hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
