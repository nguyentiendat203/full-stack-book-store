export const capitalizeWords = (text) => {
  return text
    .toLowerCase()
    .split(' ')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ')
}
