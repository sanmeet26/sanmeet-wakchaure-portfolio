import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/*
 * Self-hosted fonts: only the weights the design uses, and only the latin
 * subset. The unsuffixed imports ship cyrillic, greek and vietnamese too, which
 * roughly tripled the @font-face payload for glyphs this site never renders.
 */
import '@fontsource/space-grotesk/latin-400.css';
import '@fontsource/space-grotesk/latin-500.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/jetbrains-mono/latin-400.css';

import '@/styles/globals.css';
import App from '@/App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element #root is missing from index.html');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
