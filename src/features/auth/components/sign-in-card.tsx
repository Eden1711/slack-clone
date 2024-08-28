import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignInFlow } from "../types";
import React, { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [pendding, setPendding] = useState(false);

  const handlePasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPendding(true);

    signIn("password", { ...form, flow: "signIn" })
      .catch(() => setError("Invalid email or password"))
      .finally(() => setPendding(false));
  };

  const handleProviderSignIn = (value: "google" | "github") => {
    setPendding(true);
    signIn(value).finally(() => setPendding(false));
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>Use your email</CardDescription>
      </CardHeader>

      {!!error && (
        <div className="text-red-500 bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm mb-6 text-destructive">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={handlePasswordSignIn} className="space-y-2.5">
          <Input
            disabled={pendding}
            placeholder="Email"
            type="email"
            onChange={(e) => {
              setForm({
                ...form,
                email: e.target.value,
              });
            }}
            value={form.email}
            autoComplete="off"
            required
          />
          <Input
            disabled={pendding}
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setForm({
                ...form,
                password: e.target.value,
              });
            }}
            value={form.password}
            required
          />
          <Button type="submit" className="w-full" size={"lg"}>
            Submit
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pendding}
            variant={"outline"}
            className="w-full relative"
            size={"lg"}
            onClick={() => handleProviderSignIn("google")}
          >
            <FcGoogle className="size-5 absolute left-2.5" />
            Continue with Google
          </Button>
          <Button
            disabled={pendding}
            variant={"outline"}
            className="w-full relative"
            size={"lg"}
            onClick={() => handleProviderSignIn("github")}
          >
            <FaGithub className="size-5 absolute left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            className=" text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signUp")}
          >
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
