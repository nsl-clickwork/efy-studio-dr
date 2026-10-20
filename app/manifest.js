export default function manifest() {
  return {
    name: 'EFY STUDIOS — Boutique Pilates',
    short_name: 'EFY STUDIOS',
    description: 'Premium Pilates Studio in Berlin Lichterfelde West.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#1e1812',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
