import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInFlow } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>Use your email</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            disabled={false}
            placeholder="Email"
            type="email"
            onChange={(e) => {
              setForm({
                ...form,
                email: e.target.value,
              });
            }}
            value={form.email}
            required
          />
          <Input
            disabled={false}
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

          <Input
            disabled={false}
            placeholder="Confirm password"
            type="confirm"
            onChange={(e) => {
              setForm({
                ...form,
                confirmPassword: e.target.value,
              });
            }}
            value={form.confirmPassword}
            required
          />
          <Button type="submit" className="w-full" size={"lg"}>
            Submit
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button variant={"outline"} className="w-full relative" size={"lg"}>
            <FcGoogle className="size-5 absolute left-2.5" />
            Continue with Google
          </Button>
          <Button variant={"outline"} className="w-full relative" size={"lg"}>
            <FaGithub className="size-5 absolute left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            className=" text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signIn")}
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
