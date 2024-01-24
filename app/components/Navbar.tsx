import { auth } from "@/auth";
import DarkModeButton from "@/components/buttons/dark-mode-button";
import { LogoutButton } from "@/components/buttons/login";
import MaxWidthWrapper from "@/components/max-width-warpper";
import Search from "@/components/search-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";

const links = [
  {
    label: "Feed",
    href: "/",
  },
];

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="py-5 border-b">
      <MaxWidthWrapper className="max-w-screen-xl">
        <div className="flex justify-between items-center">
          <Link className="flex gap-2 items-center" href="/">
            <svg
              width="50px"
              height="50px"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-black dark:fill-white"
                d="M442.906 52.156c-.806.02-1.617.076-2.437.188-13.124 1.79-22.993 13.47-30.47 32.875-5.993 15.552-10.81 37.088-13.938 66.5-32.023-22.095-63.766-29.543-95.28-25.845l-26.97-60.063-24.968 71.282L198.5 107.28l-.813 63.064-46.562 1.75 12.53 30.562c-17.504 16.246-34.963 34.403-52.405 53.844l-92.813-45.375 44.876 75.906-36.47 39.095 36.282 2.78-40.47 59.876 108.064-64.905 87.56 42.53-49.75 17.376 35.564 13.814-32.563 22.22 52.157.967-4.593 46.845 59.312-72.03L365 437.654 496.063 270.47c-3.87-6.63-7.735-12.974-11.594-19.095l-119.376 150.97-4.72 5.967-6.78-3.406-44.344-22.22 8.375-16.717 37.53 18.81L473.69 234.907c-20.158-29.63-40.187-52.59-60.094-69.656 2.96-34.52 8.11-58.353 13.875-73.313 6.36-16.51 12.884-20.706 15.5-21.062 1.306-.178 2.63.047 4.75 1.53 2.118 1.485 4.693 4.293 7 8.19 4.582 7.743 8.005 19.562 8.217 31.686-7.95 3.715-13.437 11.804-13.437 21.157 0 12.878 10.436 23.313 23.313 23.313 12.876 0 23.312-10.435 23.312-23.313 0-9.752-6.002-18.114-14.5-21.593-.284-15.23-4.225-29.62-10.813-40.75-3.322-5.615-7.346-10.478-12.375-14-3.77-2.642-8.322-4.49-13.125-4.875-.8-.065-1.6-.083-2.406-.064zm-52.344 158.156c3.147-.125 6.36.236 9.563 1.094 3.054.82 5.872 2.054 8.438 3.625-.14 0-.268-.03-.407-.03-9.922 0-17.97 6.636-17.97 14.813.002 8.176 8.048 14.812 17.97 14.812 6.503 0 12.16-2.86 15.313-7.125.645 4.24.462 8.684-.72 13.094-4.575 17.074-22.11 27.2-39.188 22.625-17.074-4.576-27.23-22.115-22.656-39.19 3.717-13.872 16.022-23.176 29.656-23.718zm-95.375 11.157l17.907 5.31-12.75 43.064 47.437 38.844-11.842 14.468-52.25-42.78-4.782-3.938 1.75-5.938 14.53-49.03zm-44.937 25.686l17.938 5.313-8.875 29.936 33.437 27.375-11.844 14.47-38.25-31.313-4.812-3.937 1.78-5.97 10.626-35.874z"
              />
            </svg>
            <h2 className="font-semibold text-pretty hidden sm:block">
              echo chamber
            </h2>
          </Link>

          <div className="flex gap-3">
            <Search />
            {!user ? (
              <Button size={"sm"} asChild>
                <Link href="/login">Entrar</Link>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user.image!} />
                    <AvatarFallback>NM</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                
                  <DropdownMenuItem className="w-full">
                    <Link href={`/user/${user.id}`}>
                      <div className="flex gap-2 items-center">
                      <FaUser /> 
                      <p className="text-sm font-medium">
                        Perfil
                      </p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
              
                    <LogoutButton />
             
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <DarkModeButton />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
