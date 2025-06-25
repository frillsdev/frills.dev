import { useMemo } from "react";

export default function TimeAgo({ dateTime }) {
  if (!dateTime) return null;

  // Memoise to freeze the time of render
  const content = useMemo(() => {
    const date = new Date(dateTime);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const s = Math.floor(diff / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    const w = Math.floor(d / 7);
    const mo = Math.floor(d / 30);

    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const formattedTitle = `${getOrdinal(date.getDate())} ${date.toLocaleString("en-GB", {
      month: "long",
      year: "numeric"
    })} at ${date.toLocaleString("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }).toLowerCase()}`;

    let relDateTime = "";
    if (s < 10) relDateTime = "right now";
    else if (s < 60) relDateTime = `${s} second${s !== 1 ? "s" : ""} ago`;
    else if (m < 60) relDateTime = `${m} minute${m !== 1 ? "s" : ""} ago`;
    else if (h < 24) relDateTime = `${h} hour${h !== 1 ? "s" : ""} ago`;
    else if (d === 1) relDateTime = "yesterday";
    else if (d < 7) relDateTime = `${d} day${d !== 1 ? "s" : ""} ago`;
    else if (d < 14) relDateTime = "last week";
    else if (w < 5) relDateTime = `${w} week${w !== 1 ? "s" : ""} ago`;
    else if (d < 60) relDateTime = "last month";
    else if (mo < 12) relDateTime = `${mo} month${mo !== 1 ? "s" : ""} ago`;
    else relDateTime = "ages ago";

    return { relDateTime, formattedTitle };
  }, [dateTime]);

  return <span title={content.formattedTitle}>{content.relDateTime}</span>;
}
