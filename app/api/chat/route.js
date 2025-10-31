// app/api/chat/route.js

// app/api/chat/route.js

const LYZR_CHAT_URL = 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/';

export async function POST(request) {
  try {
    const { message, userId, sessionId } = await request.json();

    const apiKey = process.env.LYZR_API_KEY;
    const agentId = process.env.NEXT_PUBLIC_AGENT_ID;
    if (!apiKey || !agentId) {
      return new Response(JSON.stringify({ error: 'Missing configuration' }), { status: 500 });
    }

    const response = await fetch(LYZR_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        agent_id: agentId,
        user_id: userId,
        session_id: sessionId,
        message: message
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return new Response(JSON.stringify({ error: data }), { status: response.status });
    }

    return new Response(JSON.stringify({ reply: data.agent_response || data.response }), { status: 200 });

  } catch (error) {
    console.error('Error during Lyzr chat call', error);
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
}

