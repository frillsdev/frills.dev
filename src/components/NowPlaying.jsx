import { useEffect, useState } from "react";

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

function formatTimeAgo(iso) {
  if (!iso) return null;
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);

  if (s < 10) return "right now";
  if (s < 60) return `${s} second${s !== 1 ? "s" : ""} ago`;
  if (m < 60) return `${m} minute${m !== 1 ? "s" : ""} ago`;
  if (h < 24) return `${h} hour${h !== 1 ? "s" : ""} ago`;
  if (d < 7) return `${d} day${d !== 1 ? "s" : ""} ago`;
  return "ages ago";

}

export default function LastPlayed() {
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(null);

  const fetchTrack = async () => {
    const res = await fetch("https://spotify-api-worker.frills-dev.workers.dev/");
    const json = await res.json();
    json.timeAgo = formatTimeAgo(json.playedAt); // store timeAgo once
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
          setTimeout(fetchTrack, 1500); // refresh when track is "done"
          return data.durationMs;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [progress, data]);

  if (!data) return null;

  const { albumImageUrl, title, artist, trackUrl, durationMs, timeAgo } = data;

  const percentage = progress && durationMs
    ? Math.min(100, (progress / durationMs) * 100)
    : null;

  return (
    <div className="callout callout--player" data-player={progress ? "playing" : "not-playing"}>
      <div className="callout-emoji">
        {albumImageUrl && <img src={albumImageUrl} alt="" width="64" height="64" />}
        {percentage !== null && (
          <>
            <div className="progress">
              <div className="progress-bar" style={{ width: `${percentage}%` }} />
            </div>
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
        <p className="subtext small">{timeAgo}</p>
      </div>

      <style>{`
      .callout[data-player="playing"] {
        background-color: var(--accent);
        color: var(--accentcontrast)
      }
        .callout-emoji {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .callout-emoji img {
          border-radius: 0.5rem;
        }

        .callout-content a:hover,
        .callout-content a:focus,
        .callout-content a:active {
          color: inherit;
        }

        .subtext {
          font-size: 80%;
          opacity: 0.7;
        }

        .progress {
          margin-top: 0.5rem;
          background: rgba(255,255,255,0.15);
          border-radius: 1rem;
          height: 6px;
          width: 100%;
        }

        .progress-bar {
          height: 6px;
          border-radius: 1rem;
          background: rgba(255,255,255,0.75);
          transition: width 0.3s ease;
        }

        .progress-time {
          font-size: 0.5rem;
          margin-top: 0.25rem;
          text-align: right;
          display: block;
        }
      `}</style>
    </div>
  );
}
