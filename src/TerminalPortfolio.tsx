import { ArrowUp, ArrowUpRight, CornerDownLeft, FileText } from 'lucide-react';
import {
  type KeyboardEvent,
  type ReactNode,
  type SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { profiles, projects, skillGroups } from './portfolio-data';

const commands = [
  'home',
  'about',
  'projects',
  'skills',
  'education',
  'resume',
  'socials',
  'contact',
  'ask',
  'help',
  'clear',
] as const;

type Command = (typeof commands)[number];

const greetings = [
  'Hello',
  'नमस्ते',
  'Hola',
  'Bonjour',
  'Ciao',
  'こんにちは',
] as const;

const maxAskQuestionLength = 500;

const aliases: Record<string, Command> = {
  whoami: 'about',
  work: 'projects',
  stack: 'skills',
  edu: 'education',
  cv: 'resume',
  links: 'socials',
  email: 'contact',
  cls: 'clear',
  ls: 'help',
};

const sectionCommands = [
  'about',
  'projects',
  'skills',
  'education',
  'resume',
  'socials',
  'contact',
] as const;

type SectionCommand = (typeof sectionCommands)[number];

const sectionMetadata: Record<
  SectionCommand,
  { path: string; prompt: string }
> = {
  about: { path: 'about.md', prompt: 'cat about.md' },
  projects: { path: 'projects/', prompt: 'ls -la projects/' },
  skills: { path: 'skills.env', prompt: 'cat skills.env' },
  education: { path: 'education.md', prompt: 'cat education.md' },
  resume: { path: 'resume.pdf', prompt: 'open resume.pdf' },
  socials: { path: 'socials.json', prompt: 'cat socials.json' },
  contact: { path: 'contact.info', prompt: 'cat contact.info' },
};

function resolveCommand(value: string): string {
  const normalized = value.trim().toLowerCase();
  return aliases[normalized] ?? normalized;
}

function getAskQuestion(value: string): string | null {
  const match = /^ask(?:\s+(.+))?$/i.exec(value.trim());
  if (!match) return null;
  return match[1]?.trim() ?? '';
}

function readAskAnswer(value: unknown): string | null {
  if (!value || typeof value !== 'object' || !('answer' in value)) return null;
  const answer = value.answer;
  return typeof answer === 'string' ? answer : null;
}

function readAskError(value: unknown): string | null {
  if (!value || typeof value !== 'object' || !('error' in value)) return null;
  const error = value.error;
  return typeof error === 'string' ? error : null;
}

async function fetchAskAnswer(question: string): Promise<string> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
      signal: controller.signal,
    });
    const payload: unknown = await response.json().catch(() => null);
    const answer = readAskAnswer(payload);

    if (!response.ok || !answer) {
      throw new Error(
        readAskError(payload) ??
          'Unable to answer right now. Please try again.',
      );
    }

    return answer;
  } finally {
    window.clearTimeout(timeout);
  }
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children} <ArrowUpRight size={13} aria-hidden="true" />
    </a>
  );
}

function Prompt({ command }: { command: string }) {
  return (
    <div className="terminal-echo">
      <div className="terminal-echo__line">
        <span className="prompt-tree">╭─(</span>
        <span className="prompt-user">hitendra</span>
        <span className="prompt-at">@</span>
        <span className="prompt-host">portfolio</span>
        <span className="prompt-tree">)-[~]</span>
      </div>
      <div className="terminal-echo__line">
        <span className="prompt-path">╰─$</span>
        <strong>{command}</strong>
      </div>
    </div>
  );
}

function WelcomeOutput() {
  return (
    <section className="terminal-output welcome-output">
      <Prompt command="cat profile.md" />
      <div className="identity-status">
        <span>Backend Engineer / Distributed Systems</span>
        <span>
          <i /> available for opportunities
        </span>
      </div>
      <h1>
        <span>Hitendra Singh</span>
        <span>Shaktawat</span>
      </h1>
      <p className="welcome-role">
        Java-first backend engineer based in Udaipur, India.
      </p>
      <p className="welcome-copy">
        I build transaction-safe APIs, event-driven services, and production
        systems that hold up beyond the demo.
      </p>
    </section>
  );
}

function IntroOutput({
  activeIndex,
  isLeaving,
}: {
  activeIndex: number;
  isLeaving: boolean;
}) {
  return (
    <section
      className={`terminal-intro${isLeaving ? ' terminal-intro--leaving' : ''}`}
      aria-label="Greeting intro"
    >
      <div className="terminal-intro__stack" aria-live="polite">
        {greetings.map((greeting, index) => (
          <span
            className={index === activeIndex ? 'is-active' : ''}
            key={greeting}
            aria-hidden={index !== activeIndex}
          >
            {greeting}
          </span>
        ))}
      </div>
    </section>
  );
}

function CommandOutput({
  command,
  onCommand,
  askAnswer,
  askStatus,
  prompt = command,
}: {
  command: string;
  onCommand: (command: string) => void | Promise<void>;
  askAnswer?: string;
  askStatus?: AskStatus;
  prompt?: string;
}) {
  let content: ReactNode;

  switch (command) {
    case 'about':
      content = (
        <>
          <h2>about.md</h2>
          <p>
            I am a Computer Science student at VIT Vellore focused on backend
            engineering and distributed systems.
          </p>
          <p>
            My work spans a live sports-booking application and an event-driven
            video platform built around durable data, asynchronous processing,
            and cloud delivery.
          </p>
          <dl className="terminal-kv">
            <div>
              <dt>location</dt>
              <dd>Udaipur, India</dd>
            </div>
            <div>
              <dt>focus</dt>
              <dd>Backend engineering / distributed systems</dd>
            </div>
            <div>
              <dt>status</dt>
              <dd className="status-online">Open to opportunities</dd>
            </div>
          </dl>
        </>
      );
      break;
    case 'projects':
      content = (
        <>
          <h2>projects/</h2>
          {projects.map((project, index) => (
            <article className="terminal-project" key={project.name}>
              <div className="project-heading">
                <b>0{index + 1}</b>
                <strong>{project.name}</strong>
                <span>{project.year}</span>
              </div>
              <p className="project-role">{project.role}</p>
              <p>{project.description}</p>
              <p className="stack-line">
                <span>stack:</span> {project.stack}
              </p>
              <div className="terminal-links">
                {project.links.map(([label, href]) => (
                  <ExternalLink href={href} key={label}>
                    {label}
                  </ExternalLink>
                ))}
              </div>
            </article>
          ))}
        </>
      );
      break;
    case 'skills':
      content = (
        <>
          <h2>skills.env</h2>
          <dl className="terminal-kv skills-kv">
            {skillGroups.map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </>
      );
      break;
    case 'education':
      content = (
        <>
          <h2>education.md</h2>
          <article className="education-entry">
            <strong>Vellore Institute of Technology</strong>
            <span>Vellore, India / 2023 - 2027</span>
            <p>B.Tech in Computer Science and Engineering</p>
            <p className="stack-line">
              <span>cgpa:</span> 8.43 / 10 (July 2026)
            </p>
          </article>
        </>
      );
      break;
    case 'resume':
      content = (
        <>
          <h2>resume.pdf</h2>
          <p>
            Education, projects, technical depth, and contact details in one
            document.
          </p>
          <a
            className="file-link"
            href="/hitendra-singh-shaktawat-resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <FileText size={16} aria-hidden="true" /> open resume.pdf{' '}
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </>
      );
      break;
    case 'socials':
      content = (
        <>
          <h2>socials.json</h2>
          <div className="social-list">
            {profiles.map(([label, detail, href]) => (
              <div key={label}>
                <span>{label}</span>
                <small>{detail}</small>
                <ExternalLink href={href}>open</ExternalLink>
              </div>
            ))}
          </div>
        </>
      );
      break;
    case 'contact':
      content = (
        <>
          <h2>contact.info</h2>
          <dl className="terminal-kv">
            <div>
              <dt>email</dt>
              <dd>
                <a href="mailto:hitendras940@gmail.com">
                  hitendras940@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt>phone</dt>
              <dd>
                <a href="tel:+919460629707">+91 94606 29707</a>
              </dd>
            </div>
            <div>
              <dt>location</dt>
              <dd>Udaipur, India</dd>
            </div>
          </dl>
        </>
      );
      break;
    case 'ask':
      content = (
        <>
          <h2>ask.ai</h2>
          <p
            className={
              askStatus === 'thinking' ? 'ask-answer is-thinking' : 'ask-answer'
            }
          >
            {askAnswer ?? 'Usage: ask <question>'}
          </p>
        </>
      );
      break;
    case 'help':
      content = (
        <>
          <h2>commands</h2>
          <div className="help-list">
            {commands
              .filter((item) => item !== 'help')
              .map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => void onCommand(item)}
                >
                  <span>{item === 'ask' ? 'ask <question>' : item}</span>
                  <small>{commandDescriptions[item]}</small>
                </button>
              ))}
          </div>
        </>
      );
      break;
    default:
      content = (
        <div className="command-error">
          <strong>command not found: {command || '(empty)'}</strong>
          <span>
            Run{' '}
            <button type="button" onClick={() => void onCommand('help')}>
              help
            </button>{' '}
            to list available commands.
          </span>
        </div>
      );
  }

  return (
    <section className="terminal-output command-output">
      <Prompt command={prompt} />
      {content}
    </section>
  );
}

function PortfolioSection({
  command,
  index,
  onCommand,
}: {
  command: SectionCommand;
  index: number;
  onCommand: (command: string) => void | Promise<void>;
}) {
  const metadata = sectionMetadata[command];

  return (
    <section
      className="portfolio-section"
      id={command}
      aria-label={`${command} section`}
    >
      <header className="portfolio-section__header">
        <span className="portfolio-section__index">0{index + 1}</span>
        <span className="portfolio-section__path">
          hitendra@portfolio: ~/{metadata.path}
        </span>
        <a
          className="portfolio-section__top"
          href="#home"
          aria-label="Back to home"
          title="Back to home"
        >
          <ArrowUp size={15} aria-hidden="true" />
        </a>
      </header>
      <div className="portfolio-section__body">
        <CommandOutput
          command={command}
          prompt={metadata.prompt}
          onCommand={onCommand}
        />
      </div>
    </section>
  );
}

const commandDescriptions: Record<Command, string> = {
  home: 'restore the identity screen',
  about: 'profile and engineering focus',
  projects: 'selected production work',
  skills: 'languages, systems, and tools',
  education: 'degree and current academic record',
  resume: 'open the complete resume',
  socials: 'coding and professional profiles',
  contact: 'email, phone, and location',
  ask: 'Ask AI about Hitendra',
  help: 'list available commands',
  clear: 'clear terminal output',
};

type AskStatus = 'usage' | 'thinking' | 'answered' | 'error';

type HistoryEntry = {
  id: number;
  command: string;
  prompt?: string;
  askAnswer?: string;
  askStatus?: AskStatus;
};

export default function TerminalPortfolio() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [introComplete, setIntroComplete] = useState(false);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [activeGreetingIndex, setActiveGreetingIndex] = useState(0);
  const [askPending, setAskPending] = useState(false);
  const historyIndex = useRef(-1);
  const id = useRef(2);
  const inputRef = useRef<HTMLInputElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.history.replaceState(null, '', window.location.pathname);

    try {
      window.localStorage.clear();
      window.sessionStorage.clear();
    } catch {
      // Storage may be unavailable in strict private browsing modes.
    }

    if ('caches' in window) {
      void window.caches
        .keys()
        .then((keys) =>
          Promise.all(keys.map((key) => window.caches.delete(key))),
        )
        .catch(() => undefined);
    }

    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker
        .getRegistrations()
        .then((registrations) =>
          Promise.all(
            registrations.map((registration) => registration.unregister()),
          ),
        )
        .catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      const complete = window.setTimeout(() => setIntroComplete(true), 120);
      return () => window.clearTimeout(complete);
    }

    const greetingStep = 240;
    const timers = greetings.map((_, index) =>
      window.setTimeout(
        () => setActiveGreetingIndex(index),
        index * greetingStep,
      ),
    );
    const leave = window.setTimeout(
      () => setIntroLeaving(true),
      greetings.length * greetingStep,
    );
    const complete = window.setTimeout(
      () => setIntroComplete(true),
      greetings.length * greetingStep + 420,
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(leave);
      window.clearTimeout(complete);
    };
  }, []);

  useEffect(() => {
    const transcript = transcriptRef.current;
    if (!transcript) return;

    transcript.scrollTo({
      top: showWelcome && entries.length === 0 ? 0 : transcript.scrollHeight,
      behavior: entries.length === 0 ? 'instant' : 'smooth',
    });
  }, [entries, showWelcome]);

  useEffect(() => {
    const syncFromHash = () => {
      const command = resolveCommand(window.location.hash.slice(1));
      if (!commands.includes(command as Command)) return;

      if (command === 'home') {
        setEntries([]);
        setShowWelcome(true);
      } else if (command === 'clear') {
        setEntries([]);
        setShowWelcome(false);
      } else {
        setEntries([{ id: id.current++, command }]);
        setShowWelcome(false);
      }
    };

    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const updateEntry = (entryId: number, patch: Partial<HistoryEntry>) => {
    setEntries((current) =>
      current.map((entry) =>
        entry.id === entryId ? { ...entry, ...patch } : entry,
      ),
    );
  };

  const runCommand = async (
    rawCommand: string,
    options?: { focusInput?: boolean },
  ) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    const askQuestion = getAskQuestion(trimmed);
    const command = resolveCommand(trimmed);
    setHistory((current) => [...current, trimmed]);
    historyIndex.current = -1;
    setValue('');

    if (askQuestion !== null) {
      setShowWelcome(false);
      window.history.replaceState(null, '', '#ask');

      if (!askQuestion) {
        setEntries((current) => [
          ...current,
          {
            id: id.current++,
            command: 'ask',
            prompt: trimmed,
            askAnswer: 'Usage: ask <question>',
            askStatus: 'usage',
          },
        ]);
      } else if (askQuestion.length > maxAskQuestionLength) {
        setEntries((current) => [
          ...current,
          {
            id: id.current++,
            command: 'ask',
            prompt: trimmed,
            askAnswer: `Question is too long. Keep it under ${maxAskQuestionLength} characters.`,
            askStatus: 'usage',
          },
        ]);
      } else if (askPending) {
        setEntries((current) => [
          ...current,
          {
            id: id.current++,
            command: 'ask',
            prompt: trimmed,
            askAnswer: 'Thinking already. Please wait for the current answer.',
            askStatus: 'usage',
          },
        ]);
      } else {
        const entryId = id.current++;
        setAskPending(true);
        setEntries((current) => [
          ...current,
          {
            id: entryId,
            command: 'ask',
            prompt: trimmed,
            askAnswer: 'Thinking...',
            askStatus: 'thinking',
          },
        ]);

        try {
          const answer = await fetchAskAnswer(askQuestion);
          updateEntry(entryId, {
            askAnswer: answer,
            askStatus: 'answered',
          });
        } catch (error) {
          updateEntry(entryId, {
            askAnswer:
              error instanceof Error
                ? error.message
                : 'Unable to answer right now. Please try again.',
            askStatus: 'error',
          });
        } finally {
          setAskPending(false);
        }
      }
    } else if (command === 'clear') {
      setEntries([]);
      setShowWelcome(false);
      window.history.replaceState(null, '', '#clear');
    } else if (command === 'home') {
      setEntries([]);
      setShowWelcome(true);
      window.history.replaceState(null, '', '#home');
    } else {
      setEntries((current) => [...current, { id: id.current++, command }]);
      window.history.replaceState(null, '', `#${command}`);
    }

    if (options?.focusInput) {
      window.requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const submit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    void runCommand(value, { focusInput: true });
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    if (!history.length) return;

    if (event.key === 'ArrowUp') {
      historyIndex.current = Math.min(
        historyIndex.current + 1,
        history.length - 1,
      );
    } else {
      historyIndex.current = Math.max(historyIndex.current - 1, -1);
    }

    setValue(
      historyIndex.current === -1
        ? ''
        : history[history.length - 1 - historyIndex.current],
    );
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void document.documentElement.requestFullscreen();
    }
  };

  const runQuickCommand = (command: Command) => {
    void runCommand(command);
  };

  return (
    <main className="portfolio-page">
      <section className="hero-stage" id="home" aria-label="Portfolio home">
        <div className="terminal-site">
          <header className="terminal-header">
            <div className="window-controls" aria-label="Terminal controls">
              <button
                className="window-control window-control--close"
                type="button"
                onClick={() => void runCommand('clear')}
                title="Clear terminal"
                aria-label="Clear terminal"
              />
              <button
                className="window-control window-control--minimize"
                type="button"
                onClick={() => void runCommand('home')}
                title="Restore profile"
                aria-label="Restore profile"
              />
              <button
                className="window-control window-control--fullscreen"
                type="button"
                onClick={toggleFullscreen}
                title="Toggle fullscreen"
                aria-label="Toggle fullscreen"
              />
            </div>
            <a
              className="terminal-title"
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                runQuickCommand('home');
              }}
              aria-label="Return to portfolio home"
            >
              hitendra@portfolio: zsh
            </a>
          </header>

          <div className="terminal-workspace">
            {!introComplete ? (
              <IntroOutput
                activeIndex={activeGreetingIndex}
                isLeaving={introLeaving}
              />
            ) : (
              <section
                className="console console--ready"
                aria-label="Interactive portfolio terminal"
              >
                <div
                  className="terminal-transcript"
                  ref={transcriptRef}
                  aria-live="polite"
                >
                  {showWelcome ? <WelcomeOutput /> : null}
                  {entries.map((entry) => (
                    <CommandOutput
                      key={entry.id}
                      command={entry.command}
                      askAnswer={entry.askAnswer}
                      askStatus={entry.askStatus}
                      onCommand={runCommand}
                    />
                  ))}
                </div>

                <form className="terminal-prompt" onSubmit={submit}>
                  <div className="prompt-location">
                    <span className="prompt-tree">╭─(</span>
                    <span className="prompt-user">hitendra</span>
                    <span className="prompt-at">@</span>
                    <span className="prompt-host">portfolio</span>
                    <span className="prompt-tree">)-[~]</span>
                  </div>
                  <div className="prompt-input-row">
                    <span aria-hidden="true">╰─$</span>
                    <label className="sr-only" htmlFor="terminal-command">
                      Enter a portfolio command
                    </label>
                    <input
                      id="terminal-command"
                      ref={inputRef}
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                      onKeyDown={handleInputKeyDown}
                      placeholder="enter command..."
                      autoComplete="off"
                      autoCapitalize="none"
                      spellCheck={false}
                    />
                    <button
                      type="submit"
                      disabled={askPending}
                      title="Run command"
                      aria-label="Run command"
                    >
                      <CornerDownLeft size={17} />
                    </button>
                  </div>
                  <nav className="quick-commands" aria-label="Quick commands">
                    {commands.map((command) => (
                      <button
                        type="button"
                        key={command}
                        onClick={() => runQuickCommand(command)}
                      >
                        {command}
                      </button>
                    ))}
                  </nav>
                </form>
              </section>
            )}
          </div>
        </div>
      </section>

      <div className="portfolio-sections" aria-label="Portfolio sections">
        {sectionCommands.map((command, index) => (
          <PortfolioSection
            command={command}
            index={index}
            key={command}
            onCommand={runCommand}
          />
        ))}
      </div>
    </main>
  );
}
