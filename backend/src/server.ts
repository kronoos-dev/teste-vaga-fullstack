import express from "express";
const cors = require('cors');
import { getContracts } from "./controller/contractsController";

const app = express();

app.use(cors());

app.get('/', getContracts);

app.listen(3000, () => {
    console.log('Servidor ON!');
});
