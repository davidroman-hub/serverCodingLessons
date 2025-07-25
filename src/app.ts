const express = require("express");
const app = express();

const users = [
  { id: 1, name: "david" },
  { id: 2, name: "pancha" },
  { id: 3, name: "teo" },
];

import { Request, Response } from "express";

app.get("/", (req: Request, res: Response) => {
  res.send("hola mundo desde Expres with david");
});

app.get("/api/usuarios", (req: Request, res: Response) => {
  res.send(["david", "gama"]);
});

app.get("/api/usuarios/:id", (req: Request, res: Response) => {
  res.send(req.params.id);
});

app.get("/users/:id", (req: Request, res: Response) => {
  let user = users.find((x) => x.id === Number(req.params.id));
  if (!user) {
    return res.status(404).send("Not user found");
  }
  res.send(user);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`listenin in the ports ${port}..`);
});
