function formatCpf(value: string): string {
    const cpf = value.replace(/\D/g, "");
  
    if (cpf.length !== 11) {
      return "CPF Invalido";
    }
  
    const [a, b, c, d, e, f, g, h, i, j] = cpf.split("").map((v) => parseInt(v, 10));
  
    return `${a}${b}${c}.${d}${e}${f}.${g}${h}${i}-${j}`;
}


function formatCnpj(value: string): string {
    const cnpj = value.replace(/\D/g, "");
  
    if (cnpj.length !== 14) {
      return "CNPJ Invalido";
    }
  
    const [a, b, c, d, e, f, g, h, i, j, k, l] = cnpj.split("").map((v) => parseInt(v, 10));
  
    return `${a}${b}.${c}${d}.${e}${f}/${g}${h}${i}-${j}${k}`;
}

export {formatCpf, formatCnpj}