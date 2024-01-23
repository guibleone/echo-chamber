import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <Dialog >
      <DialogTrigger className="flex items-center gap-2 border rounded-lg px-2 text-sm">Pesquisar <SearchIcon size={20} /></DialogTrigger>
      <DialogContent className="max-w-[330px] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <SearchIcon size={15} />
            <input type="text" 
            placeholder="Pesquise por pessoas, tags ou posts" 
            className="w-full p-2 placeholder:truncate placeholder:text-sm sm:text-md text-sm truncate bg-transparent text-muted-foreground sm:placeholder:text-md placeholder:text-muted-foreground focus:outline-none"
            
            />
          </DialogTitle>
          <DialogDescription>
            {/* TODO: conteúdo dinamico */}
            <h2 className="text-start">
              Pessoa
            </h2>
            <div className="flex text-white mt-2 hover:bg-stone-700 hover:cursor-pointer py-4 rounded-lg">
                <User size={20} />
                <h1>
                  Guilher Leone
                </h1>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
