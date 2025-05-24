import { useEffect, useState } from "react";

export default function currentBook() {

  const fetchBook = async () => {
    const res = await fetch("https://literal-club-worker.frills-dev.workers.dev/");
    const json = await res.json();
    console.table(json);
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return <span>Book</span>;
}
