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
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const handlePasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Password do not match");
      return;
    }

    setPending(true);

    const { confirmPassword, ...signupData } = form;

    signIn("password", { ...signupData, flow: "signUp" })
      .catch(() => setError("Something went wrong"))
      .finally(() => setPending(false));
  };

  const handleProviderSignUp = (value: "google" | "github") => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>Use your email</CardDescription>
      </CardHeader>

      {!!error && (
        <div className="text-red-500 bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm mb-6 text-destructive">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={handlePasswordSignUp} className="space-y-2.5">
          <Input
            disabled={pending}
            placeholder="Full name"
            type="text"
            onChange={(e) => {
              setForm({
                ...form,
                name: e.target.value,
              });
            }}
            value={form.name}
            required
          />
          <Input
            disabled={pending}
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
            disabled={pending}
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
            disabled={pending}
            placeholder="Confirm password"
            type="password"
            onChange={(e) => {
              setForm({
                ...form,
                confirmPassword: e.target.value,
              });
            }}
            value={form.confirmPassword}
            required
          />
          <Button
            type="submit"
            className="w-full"
            size={"lg"}
            disabled={pending}
          >
            Submit
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            variant={"outline"}
            className="w-full relative"
            size={"lg"}
            onClick={() => handleProviderSignUp("google")}
          >
            <FcGoogle className="size-5 absolute left-2.5" />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            variant={"outline"}
            className="w-full relative"
            size={"lg"}
            onClick={() => handleProviderSignUp("github")}
          >
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
