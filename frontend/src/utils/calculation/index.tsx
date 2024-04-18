import { Contract } from "@/types";
import { addDays, isWeekend } from 'date-fns';

export const checkConsistency = (contract: Contract) => {
    const valueTotalInteger = Math.floor(contract.vlTotal);
    const valueInstalment = valueTotalInteger / contract.qtPrestacoes;

    if (valueInstalment !== contract.vlPresta) {
        console.warn('Valor da prestação inconsistente:', contract);
    }

    const datePayment = calculatePaymentDate(new Date(contract.dtContrato), contract.nrPresta);

    if (contract.vlMovimento > contract.vlPag) {
        console.warn('Pagamento inconsistente:', contract);
    }
}

const calculatePaymentDate = (dateContract: Date, numberInstallment: number) => {
    let datePayment = addDays(dateContract, numberInstallment * 30);

    if (isWeekend(datePayment)) {
        datePayment = addDays(datePayment, 1);
    }

    return datePayment;
}