import { useEffect, useState } from 'react';

export const useTwitchOnline = () => {
  const [online, setOnline] = useState(false);

  useEffect(() => {
    fetch('https://midudev-apis.midudev.workers.dev/uptime/midudev')
      .then((res) => res.json())
      .then(({ online }) => {
        setOnline(online);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return online;
};