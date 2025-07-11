import "../styles/components/_speak.css";

export default function Speak({speak}) {

let buttonSpeak = () => {
      const utterThis = new SpeechSynthesisUtterance(speak['speakText']);
      utterThis.lang = "en-GB";
      utterThis.pitch = 1.2;
      window.speechSynthesis.speak(utterThis);
}

  return <>(<button data-speak="Frills" type="button" className="button" aria-label="Say 'Frills'" onClick={buttonSpeak}>{speak['speakPhonetics']}</button>)</>;
}
