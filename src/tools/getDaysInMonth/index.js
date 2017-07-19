export function splitValue(value) {
  let split = value.split('-')
  let year = parseInt(split[0], 10)
  let month = parseInt(split[1], 10)
  return {
    year,
    month,
    days: new Date(year, month, 0).getDate()
  }
}
