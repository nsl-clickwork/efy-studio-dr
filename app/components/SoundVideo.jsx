'use client';

import { useEffect, useRef } from 'react';

// Events that count as a user activation on desktop and mobile
// (iOS Safari / Android Chrome only unlock audio on a tap, not a scroll).
const UNLOCK_EVENTS = ['pointerup', 'touchend', 'click', 'keydown'];

// Autoplay video with sound on by default. Browsers block unmuted autoplay
// until the user interacts with the page, so we start muted (which every
// browser, including mobile, allows) and unmute as soon as we're permitted.
export default function SoundVideo(props) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const removeListeners = () =>
      UNLOCK_EVENTS.forEach((e) => window.removeEventListener(e, unmute));

    const playMuted = () => {
      video.muted = true;
      video.play().catch(() => {});
    };

    // Keep listening until unmuted playback actually succeeds, since some
    // touches (e.g. the end of a scroll) don't grant permission.
    function unmute() {
      video.muted = false;
      video.play().then(removeListeners).catch(playMuted);
    }

    video.muted = false;
    video.play().catch(() => {
      playMuted();
      UNLOCK_EVENTS.forEach((e) => window.addEventListener(e, unmute, { passive: true }));
    });

    return removeListeners;
  }, []);

  return <video ref={ref} autoPlay loop muted playsInline preload="auto" {...props} />;
}
