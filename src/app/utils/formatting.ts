import { format } from 'date-fns'

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
  }).format(price)
}

export function formatDate(date: string) {
  return format(new Date(date), 'dd MMM yyyy')
}
