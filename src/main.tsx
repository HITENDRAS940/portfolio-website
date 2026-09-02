import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TerminalPortfolio from './TerminalPortfolio';
import './terminal-minimal.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TerminalPortfolio />
  </StrictMode>,
);
