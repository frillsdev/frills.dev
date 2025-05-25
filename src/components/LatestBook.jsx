import { useState } from "react";
import TimeAgo from "./TimeAgo";

export default function CurrentBooks() {
  const [currentBookList, setCurrentBookList] = useState([]);

  useState(() => {
    const fetchBook = async () => {
      const response = await fetch("https://literal-club-worker.frills-dev.workers.dev/reading");
      const json = await response.json();
      setCurrentBookList(json)
    };
    fetchBook();
  });
  return (
    <div>
      {currentBookList.map((book) => (
        <div className="callout callout--book" key={book.id}>
          <div className="callout-image">
            <img src={book.image} alt="" className="square"/>
          </div>
          <div className="callout-content">
            <header><h2>Currently reading</h2></header>
            <a href={book.link} className="hidden">{book.title} – {book.author}</a>
            <p className="small subtext">
              <TimeAgo dateTime={book.startedAt}/>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}