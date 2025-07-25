import { Request, Response } from "express";
import configs from "./configuration/config";
const morgan = require('morgan');
const config = require('config');
const express = require("express");
const Joi = require("joi");
const app = express();
const log = require("./logger");

//POST
app.use(express.json());
app.use(express.urlencoded({ extends: true })); /// para mandarlo como en react
app.use(express.static("/public"));

//enviroment config

console.log('App' + config.get('name'))
console.log('DB server from config' + config.get('configDB.host'))

// Thrid party moddleware

app.use(morgan('tiny'));

console.log('morgan habiliktado')
//app.use(log);

// app.use((req: Request, res: Response, next: import("express").NextFunction) => {
//   console.log("authenticado");
//   next();
// });

const users = [
  { id: 1, name: "david" },
  { id: 2, name: "pancha" },
  { id: 3, name: "teo" },
];

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
  let user = userExist(req);
  if (!user) {
    return res.status(404).send("Not user found");
  }
  res.send(user);
});

// POST

app.post("/users", (req: Request, res: Response) => {
  const { error, value } = validateUser(req.body.name);
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

  let user = userExist(req);
  if (!user) {
    return res.status(404).send("Not user found");
  }

  const { error, value } = validateUser(req.body.name);
  if (error) {
    const msj = error.details[0].message;
    res.status(400).send(msj);
    return;
  }

  user.name = value.name;
  res.send(user);
});

// DELETE

app.delete("/users/:id", (req: Request, res: Response) => {
  let user = userExist(req);
  if (!user) {
    return res.status(404).send("Not user found");
  }

  const index = users.indexOf(user);
  users.splice(index, 1);
  res.send(users);
});

const port = process.env.PORT || 3000;

app.listen(configs.port, () => {
  console.log(`listenin in the ports ${port}..`);
});

const userExist = (req: Request) => {
  return users.find((x) => x.id === Number(req.params.id));
};

const validateUser = (name: string) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });

  return schema.validate({ name });
};
