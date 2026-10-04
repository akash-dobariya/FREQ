import { BACKEND_BASE_URL } from '../services/api';

export const getImageUrl = (url) => {
  if (!url) return '';
  // If it is a server media URL (local or deployed backend), return as-is
  const backendHost = window.location.hostname;
  if (
    url.startsWith(BACKEND_BASE_URL) ||
    url.startsWith(`http://${backendHost}`) ||
    url.startsWith(`https://${backendHost}`) ||
    url.startsWith('http://localhost') ||
    url.startsWith('http://127.0.0.1') ||
    url.startsWith('/') ||
    url.includes('/media/artists/')
  ) {
    return url;
  }
  // If it is a remote external URL (Spotify, Apple, iTunes, etc.), wrap it in weserv.nl CORS bypass proxy
  const cleanUrl = url.replace(/^https?:\/\//, '');
  return `https://images.weserv.nl/?url=${cleanUrl}&we=1`;
};
