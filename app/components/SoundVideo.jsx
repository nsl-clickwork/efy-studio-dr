'use client';

import { useEffect, useRef } from 'react';

// Autoplay video with sound on by default. Browsers block unmuted autoplay
// until the user interacts with the page, so we fall back to muted playback
// and unmute on the first interaction.
export default function SoundVideo(props) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const events = ['pointerdown', 'keydown', 'touchend'];
    const unmute = () => {
      video.muted = false;
      video.play().catch(() => {});
      events.forEach((e) => window.removeEventListener(e, unmute));
    };

    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
      events.forEach((e) => window.addEventListener(e, unmute, { once: true }));
    });

    return () => events.forEach((e) => window.removeEventListener(e, unmute));
  }, []);

  return <video ref={ref} autoPlay loop playsInline {...props} />;
}
