import express, {Request, Response} from "express"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import * as swaggerDocument from './swagger.json'
import mapRouter from "./routes/map/map"
var cors = require('cors')

const app = express()

// setup cors
app.use(cors())

// Setup Map router
app.use(express.json())

// Setup Map router
app.use('/api/maps', mapRouter)

// Setup Swagger routes
const swaggerSpec = swaggerJSDoc({
    definition: swaggerDocument,
    apis: ['**/routes/**/*.ts']
});
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
