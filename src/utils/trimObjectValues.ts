export default obj => {
  try {
    const trimmedObject = {}
    for (const key in obj) {
      trimmedObject[key] = obj[key].trim()
    }
    return trimmedObject
  } catch {
    return obj
  }
}
