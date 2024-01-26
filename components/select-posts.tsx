"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SelectPosts() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("orderBy", value);
    } else {
      params.delete("orderBy");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-[180px]  ">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="h-10" value="likes">
          <h1>Mais relevantes</h1>
        </SelectItem>
        <SelectItem  className="h-10" value="views">
        <h1> Mais recentes</h1>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
