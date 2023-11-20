import express, { Request, Response } from "express";
import app from "./app";
import * as fs from "fs";
import * as https from "https";

const port = 443;
try {
  var privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/dev-jems-api.miguelmaramara.com/privkey.pem"
  );
  var certificate = fs.readFileSync(
    "/etc/letsencrypt/live/dev-jems-api.miguelmaramara.com/fullchain.pem"
  );

  https
    .createServer(
      {
        key: privateKey,
        cert: certificate,
      },
      app
    )
    .listen(port);
  console.log(`HTTPS Server listening on port ${port}`);
} catch {
  app.listen(port, () => {
    console.log(`HTTP Server listening on port ${port}`);
  });
}
