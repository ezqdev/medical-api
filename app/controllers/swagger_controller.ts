import type { HttpContext } from '@adonisjs/core/http'
import swaggerDocument from '../../swagger.json' assert { type: 'json' }

export default class SwaggerController {
  async serve({ response }: HttpContext) {
    const swaggerHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Medical API - Swagger UI</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.8/swagger-ui.min.css">
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.8/swagger-ui-bundle.min.js"></script>
        <script>
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              url: '/docs-json',
              dom_id: '#swagger-ui',
            });
          };
        </script>
      </body>
      </html>
    `
    return response.send(swaggerHtml)
  }

  async setup({ response }: HttpContext) {
    return response.send(swaggerDocument)
  }
}