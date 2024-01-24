"use client";
import { fetchPosts } from "@/actions/data";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export type PostCard = JSX.Element;

export default function LoadMorePosts() {
  const [page, setPage] = useState(2);
  const { ref, inView } = useInView();
  const [data, setData] = useState<PostCard[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (inView) {
      fetchPosts(page).then((res) => {
        if (res.length === 0) {
          setIsEmpty(true);
          return;
        }
        setData([...data, ...res]);
        setPage(page + 1);
      });
    }
  }, [inView, data, page]);

  return (
    <>
      <section>{data}</section>
      <section className="flex justify-center items-center w-full mt-6">
        {!isEmpty && (
          <div ref={ref}>
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="dark:fill-white"
            >
              <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  dur="0.75s"
                  values="0 12 12;360 12 12"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        )}
        {isEmpty && (
          <p className="text-muted-foreground">Não há mais posts. Crie um!</p>
        )}
      </section>
    </>
  );
}
