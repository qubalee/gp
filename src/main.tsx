import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './ErrorBoundary';

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <BrowserRouter basename="/gp">
      <App />
    </BrowserRouter>
  </ErrorBoundary>
);
