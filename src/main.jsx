import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorFallback from './ui/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary onReset={() => window.location.replace('/')} FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
