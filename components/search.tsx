"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, SearchIcon } from "lucide-react";
import SeacrhInput from "./search-input";
import { useRouter } from "next/navigation";
import { FaNewspaper } from "react-icons/fa";
import { ScrollArea } from "./ui/scroll-area";

export default function Search({ posts, users }: { posts: any; users: any }) {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 border rounded-lg px-2 text-sm">
        <span className="hidden sm:block">Pesquisar</span> <SearchIcon size={20} />
      </DialogTrigger>
      <DialogContent className="max-w-[330px] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <SearchIcon size={15} />
            <SeacrhInput />
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>
          {posts.length === 0 && users.length === 0 && (
            <div className="flex items-center gap-2 text-sm text-white mt-2">
              <h1>Nenhum resultado encontrado</h1>
            </div>
          )}

          {users.length !== 0 && (
          <ScrollArea className="h-[180px] w-full rounded-t-md border p-4">
              <h2 className="text-start">Pessoas</h2>
              {users?.map((user: any) => (
                <button
                  className="flex gap-2 w-full text-sm text-white mt-2 hover:bg-stone-700 hover:cursor-pointer py-2 rounded-lg"
                  key={user.id}
                >
                  <User size={20} />
                  <div>
                    <h1 className="truncate max-w-md">{user.name}</h1>
                  </div>
                </button>
              ))}
            </ScrollArea>
          )}


          {posts.length !== 0 && (
              <ScrollArea className="h-[180px] w-full rounded-b-md border p-4">
              <h2 className="text-start">Posts</h2>
              {posts?.map((post: any) => (
                <button
                  onClick={() => router.push(`/posts/${post.id}`)}
                  className="flex gap-2 w-full text-sm text-white mt-2 hover:bg-stone-700 hover:cursor-pointer py-2 rounded-lg"
                  key={post.id}
                >
                  <FaNewspaper size={20} />
                  <div>
                    <h1 className="truncate max-w-md">{post.content}</h1>
                  </div>
                </button>
              ))}
            </ScrollArea>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
