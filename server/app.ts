import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import * as swaggerDocument from './swagger.json'
import authRouter from "./routes/auth/auth"
import mapRouter from "./routes/map/map"
import * as dotenv from "dotenv"
import session from "express-session"
import { swagAuthMiddleware } from "./routes/auth/controller/AuthController"
var cors = require('cors')

dotenv.config();
const app = express()

// setup cors
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://orca-app-tcqol.ondigitalocean.app'
  ],
  credentials: true
}))

// Setup Map router
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const sess = {
  secret: process.env["SESSION_SECRET"],
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: "lax" as any,
  } as any
} as any

if (process.env['STAGE'] !== 'dev') {
  app.set('trust proxy', true) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
  sess.proxy = true 
  sess.name = "beta"
  sess.cookie.sameSite = "none"
}

// Use the session middleware
app.use(session(sess))

// basic Auth swag
app.use(swagAuthMiddleware)

// Setup Map router
app.use('/api/maps', mapRouter)
app.use('/api/auth', authRouter)


// Setup Swagger routes
const swaggerSpec = swaggerJSDoc({
    definition: swaggerDocument,
    apis: ['**/routes/**/*.ts']
});
app.use('/swag/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
