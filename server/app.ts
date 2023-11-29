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
    'https://orca-app-tcqol.ondigitalocean.app/'
  ],
  credentials: true
}))

// Setup Map router
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// Use the session middleware
app.use(session({
  secret: process.env["SESSION_SECRET"],
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: "lax",
  }
}))

// Setup Map router
app.use('/api/maps', mapRouter)
app.use('/api/auth', authRouter)

app.use(swagAuthMiddleware)


// Setup Swagger routes
const swaggerSpec = swaggerJSDoc({
    definition: swaggerDocument,
    apis: ['**/routes/**/*.ts']
});
app.use('/swag/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
