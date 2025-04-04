"use client"

import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";

function LoadMore() {

  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeProp[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (inView) {
      async function callFetchAnime() {
        const response = await fetchAnime(page);
        setData([...data, ...response]);
        setPage((prevPage) => prevPage + 1);
      }
      callFetchAnime();
    }
  }, [inView]);

  console.log(data);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item: AnimeProp) => {
          return <AnimeCard key={item.id} anime={item} />
        })}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;