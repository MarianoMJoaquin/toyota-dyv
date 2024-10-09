//Proxy a la API de Toyota para obtener los vehículos disponibles en Argentina y devolverlos en formato JSON con un status 200.
//Si hay un error al obtener los datos, devolver un JSON con un mensaje de error y un status 500.
//Para probar el endpoint, se puede hacer un fetch desde el frontend o desde Postman a la URL http://localhost:4321/api/vehicles

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
