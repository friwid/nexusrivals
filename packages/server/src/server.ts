const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

const headers = new Headers(CORS_HEADERS)
headers.set('Content-Type', 'application/json')

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const path = new URL(req.url).pathname

    if (req.method === 'OPTIONS') {
      // Handle preflight request
      return new Response(null, { headers, status: 204 })
    }

    if (req.method === 'POST' && path === '/api/login') {
      const data = await req.json()
      console.log('Received Login JSON:', data)

      return Response.json({ success: true, data }, { headers })
    }
    if (req.method === 'POST' && path === '/api/register') {
      const data = await req.json()
      console.log('Received Register JSON:', data)

      return Response.json({ success: true, data }, { headers })
    }
    // respond with text/html
    if (path === '/') return new Response('Welcome to Bun!')

    // redirect
    if (path === '/abc') return Response.redirect('/source', 301)

    // send back a file (in this case, *this* file)
    // if (path === '/source') return new Response(Bun.file(import.meta.file))

    // respond with JSON
    if (path === '/api') return Response.json({ some: 'buns', for: 'you' })

    // receive JSON data to a POST request
    if (req.method === 'POST' && path === '/api/post') {
      const data = await req.json()
      console.log('Received JSON:', data)
      return Response.json({ success: true, data })
    }

    // receive POST data from a form
    if (req.method === 'POST' && path === '/form') {
      const data = await req.formData()
      console.log(data.get('someField'))
      return new Response('Success')
    }

    // 404s
    return new Response('Page not found', { status: 404 })
  }
})

console.log(`Listening on ${server.url}`)
