"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SeacrhInput() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 100);

  return (
    <input
      type="text"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get('query')?.toString()}
      placeholder="Pesquise por pessoas ou posts"
      className="w-full p-2 placeholder:truncate placeholder:text-sm sm:text-md text-sm truncate bg-transparent text-muted-foreground sm:placeholder:text-md placeholder:text-muted-foreground focus:outline-none"
    />
  );
}
