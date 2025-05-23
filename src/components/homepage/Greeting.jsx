
import { useEffect, useState } from 'react';

export default function Greeting({forceMessage}) {
  const [greetingText, setGreetingText] = useState();

  useEffect(() => {
    const hours = new Date().getHours();
    if (forceMessage) {
      setGreetingText(forceMessage)
    }
    else if (hours < 12) {  
      setGreetingText('Good morning');
    } else if (hours < 17) {
      setGreetingText('Good afternoon');
    } else {
      setGreetingText('Good evening');
    }
  }, []);

  return <span key="greetingText">{greetingText}</span>;
}
