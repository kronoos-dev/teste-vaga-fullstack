import { Request, Response } from "express";
import upload from "../middleware/upload";
import path from "path";
import favicon from "serve-favicon";
import {
  convertToJson,
  verifyDocumet,
  verifyInstallments,
} from "../controllers/convert";

const openRoute = require("express").Router();

openRoute.get(["/", ""], (_: Request, res: Response) => {
  res.json({ init: true });
});

openRoute.use(favicon(path.join(__dirname, "..", "..", "favicon.ico")));

openRoute.post("/convert", upload.single("csvfile"), convertToJson);
openRoute.post("/verifydocument", upload.single("csvfile"), verifyDocumet);
openRoute.post(
  "/verifyTnstallments",
  upload.single("csvfile"),
  verifyInstallments
);

module.exports = openRoute;
