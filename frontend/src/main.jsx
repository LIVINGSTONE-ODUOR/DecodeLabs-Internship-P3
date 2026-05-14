import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import './styles/themes.css';
import './styles/animations.css';
import App from './App';
window.addEventListener('pointermove', (event) => { document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`); document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`); }, { passive: true });
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
