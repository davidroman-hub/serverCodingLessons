const express = require("express");
const Joi = require("joi");
const app = express();

//POST
app.use(express.json());

const users = [
  { id: 1, name: "david" },
  { id: 2, name: "pancha" },
  { id: 3, name: "teo" },
];

import { Request, Response } from "express";

// GET

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

// POST

app.post("/users", (req: Request, res: Response) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });

  const { error, value } = schema.validate({ name: req.body.name });
  if (!error) {
    const user = {
      id: users.length + 1,
      name: value.name,
    };

    users.push(user);
    res.send(user);
  } else {
    const msj = error.details[0].message;
    res.status(400).send(msj);
  }
});

// PUT

app.put("/users/:id", (req: Request, res: Response) => {
  // Find if the user exist
  let user = users.find((x) => x.id === Number(req.params.id));
  if (!user) {
    return res.status(404).send("Not user found");
  }
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });

  const { error, value } = schema.validate({ name: req.body.name });
  if (error) {
    const msj = error.details[0].message;
    res.status(400).send(msj);
    return;
  }

  user.name = value.name;
  res.send(user);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listenin in the ports ${port}..`);
});
