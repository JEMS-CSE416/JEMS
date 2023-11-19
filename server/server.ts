import express, {Request, Response} from "express"
import app from './app'


const port = 80

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
