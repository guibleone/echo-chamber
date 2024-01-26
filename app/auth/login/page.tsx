import LoginForm from "@/app/components/LoginForm";
import Navbar from "@/app/components/Navbar";
import React from "react";

export default function Login({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams.query?.toString() || "";

  return (
    <div>
      <Navbar query={query} />
      <div className="flex justify-center items-center min-h-screen pb-[180px]">
        <LoginForm />
      </div>
    </div>
  );
}
