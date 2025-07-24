const express = require("express");
const app = express();

import { Request, Response } from "express";

app.get('/', (req: Request, res: Response) => {
	res.send('hola mundo desde Express')
});


app.listen(3000, () => {
    console.log("listenin in the port 3000")
})