import { portfolioContext } from './portfolio-context.js';

const GEMINI_MODEL = 'gemini-3.1-flash-lite';
const MAX_QUESTION_LENGTH = 500;
const MAX_ANSWER_LENGTH = 3_000;
const REQUEST_TIMEOUT_MS = 12_000;

const systemInstruction = `
You are the AI assistant for Hitendra Singh Shaktawat's developer portfolio.

Answer questions about Hitendra using ONLY the portfolio information provided.
You may answer questions about his skills, projects, education, experience, technologies, development interests, achievements, and publicly listed contact or professional information.

Never invent facts. If requested information is not available in the portfolio context, clearly say that it is not available in the portfolio.
Keep answers concise and useful. Prefer answers under 100 words unless additional explanation is genuinely required.
When discussing projects, mention relevant technologies when useful.
Do not behave as a general-purpose chatbot. If asked an unrelated question, politely explain that you are Hitendra's portfolio assistant and can answer questions about Hitendra, his projects, skills, experience, and work.
`.trim();

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  setHeader: (key: string, value: string) => void;
  status: (statusCode: number) => ApiResponse;
  json: (body: { answer?: string; error?: string }) => void;
};

type GeminiCandidate = {
  content?: {
    parts?: Array<{
      text?: string;
    }>;
  };
};

type GeminiResponse = {
  candidates?: GeminiCandidate[];
};

function isQuestionPayload(value: unknown): value is { question: string } {
  if (!value || typeof value !== 'object' || !('question' in value)) {
    return false;
  }

  return typeof value.question === 'string';
}

function readGeminiAnswer(value: unknown): string | null {
  if (!value || typeof value !== 'object' || !('candidates' in value)) {
    return null;
  }

  const response = value as GeminiResponse;
  const text = response.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? '')
    .join('')
    .trim();

  return text || null;
}

function readRequestBody(body: unknown): unknown {
  if (typeof body !== 'string') return body;

  try {
    return JSON.parse(body) as unknown;
  } catch {
    return null;
  }
}

function sendError(response: ApiResponse, statusCode: number, error: string) {
  response.status(statusCode).json({ error });
}

export default async function handler(
  request: ApiRequest,
  response: ApiResponse,
) {
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    sendError(response, 405, 'Method not allowed');
    return;
  }

  const requestBody = readRequestBody(request.body);

  if (!isQuestionPayload(requestBody)) {
    sendError(response, 400, 'Question is required');
    return;
  }

  const question = requestBody.question.trim();

  if (!question) {
    sendError(response, 400, 'Question is required');
    return;
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    sendError(response, 413, 'Question is too long');
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    sendError(response, 503, 'AI assistant is not configured');
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Portfolio context:\n${portfolioContext}\n\nVisitor question:\n${question}`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 700,
            temperature: 0.2,
            topP: 0.8,
          },
        }),
      },
    );

    if (!geminiResponse.ok) {
      throw new Error('Gemini request failed');
    }

    const payload: unknown = await geminiResponse.json();
    const answer = readGeminiAnswer(payload);

    if (!answer) {
      throw new Error('Gemini returned no answer');
    }

    response.status(200).json({
      answer: answer.slice(0, MAX_ANSWER_LENGTH),
    });
  } catch {
    sendError(response, 502, 'Unable to answer right now. Please try again.');
  } finally {
    clearTimeout(timeout);
  }
}
