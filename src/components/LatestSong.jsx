import { useEffect, useState } from "react";
import TimeAgo from "./TimeAgo";

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export default function LatestSong() {
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(null);

  const fetchTrack = async () => {
    const res = await fetch("https://spotify-api-worker.frills-dev.workers.dev/");
    const json = await res.json();
    setData(json);
    if (json.progressMs) {
      setProgress(json.progressMs);
    } else {
      setProgress(null);
    }
  };

  useEffect(() => {
    fetchTrack();
  }, []);

  useEffect(() => {
    if (!progress || !data?.durationMs) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1000;
        if (next >= data.durationMs) {
          clearInterval(interval);
          setTimeout(fetchTrack, 1000);
          return data.durationMs;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [progress, data]);

  if (!data) return (
    <div className="callout callout--player" data-player="loading">
      <div className="callout-image">
        <span style={{ width: "64px", height: "64px" }}></span>
      </div>
      <div className="callout-content">
        <header><span>Last played</span></header>
        <span className="hidden" style={{ width: "75%" }}>
          Loading track
        </span>
        <span className="subtext small">Loading time</span>
      </div>
    </div>
  );

  const { albumImageUrl, title, artist, trackUrl, durationMs, playedAt } = data;

  const percentage = progress && durationMs
    ? Math.min(100, (progress / durationMs) * 100)
    : null;

  return (
    <div className="callout callout--player" data-player={progress ? "playing" : "not-playing"}>
      <div className="callout-image">
        {albumImageUrl && <img src={albumImageUrl} alt="" width="64" height="64" />}
        {percentage !== null && (
          <>
            <label className="visually-hidden" aria-hidden="true" htmlFor="trackProgress">
              Track progress
            </label>
            <progress id="trackProgress" value={percentage} max="100">{percentage}%</progress>
            <p className="subtext progress-time">
              {formatTime(progress)} / {formatTime(durationMs)}
            </p>
          </>
        )}
      </div>
      <div className="callout-content">
        <header><h2>{progress ? "Currently Playing" : "Last Played"}</h2></header>
        <a className="hidden d-b" href={trackUrl}>
          {title} – {artist}
        </a>
        <p className="subtext small">
          <TimeAgo dateTime={playedAt} />
        </p>
      </div>
    </div>
  );
}
