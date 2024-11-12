
class Utils{

    public formatarBRL(valor:string | number) : string {
        const valorNumerico = typeof valor === 'string' ? parseFloat(valor) : valor

        return Intl.NumberFormat('pt-BR', {
            style: "currency",
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(valorNumerico)

    }

    public validarDocumento(documento:string | number) : boolean {
        const tamanhoDocumento = documento.toString().length;

        return tamanhoDocumento == 14 ?  validarCnpj(documento) : 
        tamanhoDocumento == 11 ? validarCpf(documento) : false;
    }

    public validarValorPrestacao(vlTotal: number, qtPrestacoes: number, vlPresta: number ) : boolean{
       const valor = vlTotal / qtPrestacoes;
       return Math.abs(valor - vlPresta) < 0.01; 
    }


    
}
function validarCnpj(documento:string | number) :boolean {
    documento = documento.toString();

    let regex = /^(\d)\1{13}$/;
    if (regex.test(documento)) {
        return false;
    }

    const multiplicadoresCnpj = [5,4,3,2,9,8,7,6,5,4,3,2]

      const primeiroDigitoValido = calcularDigitoCnpj(documento.slice(0, 12), multiplicadoresCnpj);
  
      const multiplicadoresSegundoDigito = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
      const segundoDigitoValido = calcularDigitoCnpj(documento.slice(0, 12) + primeiroDigitoValido, multiplicadoresSegundoDigito);
  
      return primeiroDigitoValido == parseInt(documento.charAt(12)) &&
      segundoDigitoValido == parseInt(documento.charAt(13));

}

function validarCpf(documento:string | number) : boolean {
    documento= documento.toString();
    let regex = /^(\d)\1{10}$/;

    if(regex.test(documento)){
        return false;
    }


    const primeiroDigitoValido = calcularDigitoCpf(documento.slice(0, 9), 10);

    const segundoDigitoValido = calcularDigitoCpf(documento.slice(0, 9) + primeiroDigitoValido, 11);

    return primeiroDigitoValido == parseInt(documento.charAt(9)) &&
    segundoDigitoValido == parseInt(documento.charAt(10));

}

function calcularDigitoCpf(documento: string, multiplicador: number) :number {
    let soma = 0;

    for (let i = 0; i < multiplicador - 1; i++) {
        soma += parseInt(documento.charAt(i)) * (multiplicador - i);
    }

    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}


function calcularDigitoCnpj(documento: string, multiplicadores: number[]) : number {
    let soma = 0;

    for (let i = 0; i < multiplicadores.length; i++) {
        soma += parseInt(documento.charAt(i)) * multiplicadores[i];
    }

    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

export { Utils }

