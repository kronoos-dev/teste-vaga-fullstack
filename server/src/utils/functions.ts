import { Request, Response } from "express";
import { UploadedFile } from "./../interface/interface";
import fs from "fs";
import csv from "csv-parser";

export function formatValue(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function verifyCPF(value: string) {
  const cpf = value.replace(/[^\d]+/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }
  let soma = 0;

  for (let i = 1; i <= 9; i++) {
    soma += Number(cpf.substring(i - 1, i)) * (11 - i);
  }

  let resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== Number(cpf.substring(9, 10))) {
    return false;
  }

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += Number(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  return resto === Number(cpf.substring(10, 11));
}

export function verifyCNPJ(value: string): boolean {
  const cnpj = value.replace(/[^\d]+/g, "");

  if (cnpj.length !== 14) {
    return false;
  }

  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  const validateDigits = (cnpj: string, length: number) => {
    const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += parseInt(cnpj.charAt(i)) * weights[i + (weights.length - length)];
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = validateDigits(cnpj, 12);
  const secondDigit = validateDigits(cnpj, 13);

  return (
    firstDigit === parseInt(cnpj.charAt(12)) &&
    secondDigit === parseInt(cnpj.charAt(13))
  );
}

export async function processCsvFile(
  req: Request,
  res: Response,
  processData: (data: any) => any
) {
  if (!req.file) {
    return res.status(400).send("Nenhum arquivo foi enviado.");
  }

  const fileBuffer = (req.file as UploadedFile).buffer;
  const tempFilePath = `./temp-${Date.now()}.csv`;

  return fs.writeFile(tempFilePath, fileBuffer, (error: any) => {
    if (error) {
      return res.status(500).send("Erro ao salvar o arquivo temporário.");
    }

    const page = Number(req.query.page as string) || 1;
    const limit = Number(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let currentIndex = 0;
    const paginatedResults: Record<string, any>[] = [];

    const readStream = fs.createReadStream(tempFilePath);
    const parser = csv();

    return readStream
      .pipe(parser)
      .on("data", (data: any) => {
        if (currentIndex >= startIndex && currentIndex < endIndex) {
          paginatedResults.push(processData(data));
        }
        currentIndex++;
        if (currentIndex >= endIndex) {
          readStream.destroy();
          parser.end();
        }
      })
      .on("end", () => {
        fs.unlink(tempFilePath, (unlinkError: any) => {
          if (unlinkError) {
            console.error("Erro ao excluir o arquivo temporário:", unlinkError);
          }
        });

        return res.json({
          currentPage: page,
          totalPages: Math.ceil(currentIndex / limit),
          totalResults: currentIndex,
          results: paginatedResults,
        });
      })
      .on("error", (error: any) => {
        console.error("Erro ao processar o arquivo CSV:", error);
        return res
          .status(500)
          .json({ error: "Erro ao processar o arquivo CSV" });
      });
  });
}
