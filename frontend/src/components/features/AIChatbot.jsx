import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import { HiMinus, HiX } from 'react-icons/hi';
import Tooltip from '../ui/Tooltip';
import useAI from '../../hooks/useAI';
import AIChatMessage from './AIChatMessage';

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const { messages, isLoading, sendMessage } = useAI();
  const endRef = useRef(null);
  const prompts = ['What service fits my project?', 'Can you modernize my website?', 'How does AI automation help?'];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, open]);

  const submit = () => {
    if (text.trim()) {
      sendMessage(text);
      setText('');
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.96, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(8px)' }}
            className="premium-card mb-4 flex h-[620px] max-h-[calc(100vh-7rem)] w-[390px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden"
          >
            <header className="flex items-center justify-between border-b border-white/10 p-4">
              <div className="flex items-center gap-3">
                <span className="relative grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-cyan-200 to-emerald-200 text-slate-950">
                  <FaRobot />
                  <span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-emerald-300" />
                </span>
                <div>
                  <h3 className="font-black text-white">STONE AI Assistant</h3>
                  <p className="text-xs font-bold text-emerald-200">Online support concierge</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setOpen(false)} className="focus-ring rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Minimize">
                  <HiMinus />
                </button>
                <button onClick={() => setOpen(false)} className="focus-ring rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Close">
                  <HiX />
                </button>
              </div>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <AIChatMessage key={`${message.role}-${index}-${message.createdAt}`} message={message} />
              ))}
              {isLoading && (
                <div className="flex gap-1 rounded-lg bg-white/[0.06] p-4">
                  <span className="typing-dot h-2 w-2 rounded-full bg-cyan-200" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-cyan-200" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-cyan-200" />
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {prompts.map((prompt) => (
                  <button key={prompt} onClick={() => setText(prompt)} className="rounded-lg border border-cyan-200/20 bg-cyan-200/10 px-3 py-1.5 text-xs font-bold text-cyan-100">
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="flex items-end gap-2">
                <textarea
                  value={text}
                  maxLength={500}
                  onChange={(event) => setText(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      submit();
                    }
                  }}
                  placeholder="Ask about services, support, or project scope..."
                  className="input-premium max-h-28 min-h-12 flex-1 resize-none py-3 text-sm"
                />
                <button
                  disabled={isLoading || !text.trim()}
                  onClick={submit}
                  className="focus-ring grid h-12 w-12 place-items-center rounded-lg bg-cyan-200 text-slate-950 transition hover:bg-emerald-200 disabled:opacity-50"
                  aria-label="Send"
                >
                  <FaPaperPlane />
                </button>
              </div>
              <p className="mt-2 text-right text-[11px] text-slate-500">{text.length}/500</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <Tooltip label="Chat with AI Assistant">
        <motion.button
          whileTap={{ scale: 0.94 }}
          whileHover={{ y: -3 }}
          onClick={() => setOpen((value) => !value)}
          className="grid h-16 w-16 place-items-center rounded-xl border border-cyan-200/30 bg-gradient-to-br from-cyan-200 to-emerald-200 text-2xl text-slate-950 shadow-[0_20px_60px_rgba(34,211,238,.35)]"
          aria-label="Chat with AI Assistant"
        >
          <FaRobot />
        </motion.button>
      </Tooltip>
    </div>
  );
}
