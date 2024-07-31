/* eslint-disable no-unused-vars */
import Make, { currency, currencyFn } from 'make-currency'
import mask from 'make-mask'

const BRL = Make.TYPES.BRL
Make.CONFIGURE({ money: BRL })

function toFixed(price) {
  const slots = price.split('.')
  let decimalValue = slots[0]

  if (slots[1]) {
    decimalValue += '.' + slots[1].substring(0, 2)
  } else {
    decimalValue += '.00'
  }

  return parseFloat(decimalValue)
}

export function convertCurrency(price) {
  // return currencyFn(price, { symbol: true }).floatValue

  return toFixed(price)
}

export function formatCurrency(value) {
  // return currency(value)

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function cnpjMask(value) {
  // return mask(value, '00.000.000/0000-00')

  return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

export function cpfMask(value) {
  // return mask(value, '000.000.000-00')

  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}
