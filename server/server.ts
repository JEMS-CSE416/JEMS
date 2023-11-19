import express, {Request, Response} from "express"
import app from './app'
import * as fs from 'fs';


const port = 443
var privateKey = fs.readFileSync( '/etc/letsencrypt/live/dev-jems-api.miguelmaramara.com/privkey.pem' );
var certificate = fs.readFileSync( '/etc/letsencrypt/live/dev-jems-api.miguelmaramara.com/fullchain.pem' );

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(port);
