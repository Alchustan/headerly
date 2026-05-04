import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Headerly',
    short_name: 'Headerly',
    description: 'Instantly view and inspect your HTTP request headers.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDFCFB',
    theme_color: '#FF6B6B',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
