import { isDevMode } from '@angular/core';

// En desarrollo (ng serve) se usa la API local; en producción, la de Vercel.
export const API_BASE_URL = isDevMode()
  ? 'http://localhost:3000'
  : 'https://batucan-ecopuntos-api.vercel.app';
