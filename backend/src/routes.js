import express from "express";
import uploadFileMiddleware from "./middleware/upload-file.js";
import fileController from "./controllers/finance-controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Olá, mundo!");
});

router.post("/upload", uploadFileMiddleware, fileController.store);
router.get("/finances", fileController.index);

export default router;
