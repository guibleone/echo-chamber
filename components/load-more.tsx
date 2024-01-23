"use client";
import { fetchComments } from "@/actions/data";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export type CommentCard = JSX.Element;

export default function LoadMore({ postId }: { postId: string }) {
  const [page, setPage] = useState(2);
  const { ref, inView } = useInView();
  const [data, setData] = useState<CommentCard[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (inView) {
      fetchComments(postId, page).then((res) => {
        if (res.length === 0) {
          setIsEmpty(true);
          return;
        }
        setData([...data, ...res]);
        setPage(page + 1);
      });
    }
  }, [inView, data, postId, page]);

  return (
    <>
      <section>{data}</section>
      <section className="flex justify-center items-center w-full mt-6">
        {!isEmpty && (
          <div ref={ref}>
            <Image
              src="/spinner.svg"
              alt="spinner"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        )}
        {isEmpty && <p className="text-muted-foreground">Não há mais comentários</p>}
      </section>
    </>
  );
}
