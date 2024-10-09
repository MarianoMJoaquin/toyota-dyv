// src/pages/api/vehicles.js

export async function GET() {
  try {
    const response = await fetch('https://dyv.e.toyota.com.ar/api/backend/vehicles');
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching data' }), {
      status: 500,
    });
  }
}
