import express from 'express'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware'
import quejas from './routes/quejas.routes.js'
import apiDocumentationRoutes from './routes/documentation.routes.js'
import deleterouter from './routes/deleteQueja.routes.js'
import sepomexRoutes from './routes/sepomex.routes.js'
import catalogosRoutes from './routes/catalogos.routes.js'
import consultarouter from './routes/consultaQueja.routes.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import * as url from 'url';
import * as path from 'path';

const __dirname = url.fileURLToPath(new URL('.././src', import.meta.url));

console.log(__dirname)

dotenv.config(); // Carga las variables de entorno

const app = express()
app.use(cors())
app.use(bodyParser.json({limit: "500000mb"}));
app.use(bodyParser.urlencoded({limit: "500000mb", extended: true, parameterLimit:500000}))
app.use(express.json())

// Configuración de la ruta estática para servir los archivos de imágenes
app.use('/static', express.static(path.join(__dirname, '/public')));
app.use(quejas, apiDocumentationRoutes, deleterouter, sepomexRoutes, catalogosRoutes, consultarouter)

app.use('/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVER_HOST,
    pathRewrite: {
        '^/auth': ''
    },
    onProxyReq: (proxyReq, req, res) => {
        if (req.body) {
            try {
                req.body.system = 'REDECO'
                // Copia el body de la solicitud original al proxy
                const bodyData = JSON.stringify(req.body);
                proxyReq.setHeader('Content-Type', 'application/json');
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
            } catch (error) {
                console.error(error)
            }
        }
    }
}))

export default app