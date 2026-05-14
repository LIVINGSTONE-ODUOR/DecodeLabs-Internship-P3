import { createContext, useCallback, useMemo, useState } from 'react';
import { v4 as uuidFallback } from '../utils/uuid';
import aiService from '../services/aiService';
export const AIContext = createContext(null);
export function AIProvider({ children }) {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi, I am STONE AI Assistant. Ask me about web development, IT support, software installation, consulting, or AI automation.', createdAt: new Date().toISOString() }]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() => localStorage.getItem('stone_ai_session') || uuidFallback());
  const sendMessage = useCallback(async (content) => { const trimmed = content.trim(); if (!trimmed || isLoading) return; const userMessage = { role: 'user', content: trimmed, createdAt: new Date().toISOString() }; setMessages((m) => [...m, userMessage]); setIsLoading(true); try { const data = await aiService.send({ message: trimmed, sessionId }); const nextSession = data.sessionId || sessionId; localStorage.setItem('stone_ai_session', nextSession); setSessionId(nextSession); setMessages((m) => [...m, { role: 'assistant', content: data.reply, createdAt: new Date().toISOString() }]); } catch { setMessages((m) => [...m, { role: 'assistant', content: 'I am having trouble reaching the AI service right now. Please try again in a moment or send a project request.', error: true, createdAt: new Date().toISOString() }]); } finally { setIsLoading(false); } }, [isLoading, sessionId]);
  const value = useMemo(() => ({ messages, isLoading, sessionId, sendMessage }), [messages, isLoading, sessionId, sendMessage]);
  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}
