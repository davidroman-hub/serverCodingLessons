const express = require("express");
const app = express();

//POST
app.use(express.json());

const users = [
  { id: 1, name: "david" },
  { id: 2, name: "pancha" },
  { id: 3, name: "teo" },
];

import { Request, Response } from "express";

app.get("/", (req: Request, res: Response) => {
  res.send("hola mundo desde Expres with david");
});

app.get("/users", (req: Request, res: Response) => {
  res.send(users);
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


app.post("/users", (req: Request, res: Response) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
  };

  users.push(user);
  res.send(user)
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listenin in the ports ${port}..`);
});
