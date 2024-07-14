const express = require("express");
const router = express.Router();

const { readFile } = require('../services/processing.service');

router.get("/", async function (req, res, next) {
  try {
    const result = await readFile();
    res.status(200).send(result);
  } catch (error) {
    res.status(503).send({
      message: `Error ao processar dados`,
    });
  }
});

module.exports = router;
