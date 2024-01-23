"use client";
import { GithubIcon } from "lucide-react";
import { Button } from "../ui/button";
import { signIn, signOut } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export const GitHubButton = () => {
  return (
    <Button onClick={() => signIn("github")}>
      <div className="flex items-center gap-4">
        <GithubIcon size={24} />
        Entrar com GitHub
      </div>
    </Button>
  );
};

export const GoogleButton = () => {
  return (
    <Button variant={'secondary'} onClick={() => signIn("google")}>
      <div className="flex items-center gap-4">
        <FaGoogle size={24} />
        Entrar com Google
      </div>
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button onClick={() => signOut()}>
      <div className="flex items-center gap-4">Sair</div>
    </Button>
  );
};
