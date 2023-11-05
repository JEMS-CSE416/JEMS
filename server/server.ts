import express, {Request, Response} from "express"
import swaggerUi from "swagger-ui-express"
import * as swaggerDocument from './swagger.json'

const app = express()
const port = 3000


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!!!!')
})

app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
