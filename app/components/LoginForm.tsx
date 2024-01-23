import { GitHubButton, GoogleButton } from "@/components/buttons/login";
import React from "react";

export default function LoginForm() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Login</h1>
        Entre com sua conta de escolha para continuar.
      </div>
      <div className="flex flex-col gap-5">
        <GitHubButton />
        <p className="text-center">ou</p>
        <GoogleButton />
      </div>
    </div>
  );
}
