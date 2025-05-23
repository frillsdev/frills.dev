import { useState } from 'react';
import AvatarImage from "./AvatarImage.jsx";

export default function AvatarSwapper() {
  const [key, setKey] = useState(Date.now());
  const avatarSwap = () => {
    setKey(Date.now())
  }
  return (
    <div className="avatar">
      <div className="avatar__script swapAvatar">
        <AvatarImage key={`avatar-${key}`} />
      </div>
      <div className="avatar__extra">
        <button id="refreshAvatar" onClick={avatarSwap} className="button hidden noscriptHide">
          🔃 Refresh<span className="avatar__hide"> avatar</span>
        </button>
        <span>🖼️ <a href="/curios/avatars" className="hidden">More<span className="avatar__hide"> avatars</span></a></span>
      </div>
    </div>
  )
}

