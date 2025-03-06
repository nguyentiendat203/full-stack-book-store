export const formatPriceVND = (price) => {
  return price.toLocaleString('vi', { style: 'currency', currency: 'VND' })
}
