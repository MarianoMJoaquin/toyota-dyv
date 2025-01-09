export const prerender = false; // Deshabilitar pre-renderizado para endpoints dinámicos

export async function POST({ request }) { // Astro pasa un objeto con la propiedad request
  try {
    // Extraer el body de la request
    const bodyData = await request.json();
    
    // Hacer el POST a la API de Toyota
    const response = await fetch('https://api.toyota.com.ar:9201/dcx/api/leads', {
      method: 'POST',
      headers: {
        'dealer': 'DYV',
        'username': 'fGvova1i0J1nYiwXKgIY',
        'password': 'o0dz2qd2nDnyI05TGS28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    });

    // Si la respuesta no es ok, lanzar un error
    if (!response.ok) {
      throw new Error(`Toyota API responded with status: ${response.status}`);
    }

    // Procesar la respuesta
    const data = await response.json();

    // Retornar respuesta exitosa
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Error:', error);
    
    // Retornar error con detalles
    return new Response(JSON.stringify({
      error: 'Error processing request',
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}