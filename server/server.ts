import express, {Request, Response} from "express"
import app from './app'


const port = 443

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
