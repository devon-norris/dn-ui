export interface PasswordValidator {
  isValid: boolean
  length: boolean
  spaces: boolean
  upper: boolean
  lower: boolean
  special: boolean
  number: boolean
}

export const defaultPasswordValidationState: PasswordValidator = {
  isValid: false,
  length: false,
  spaces: false,
  upper: false,
  lower: false,
  special: false,
  number: false,
}

const validateLength = (passwordArray: string[]): boolean => passwordArray.length > 7
const hasNoSpaces = (passwordArray: string[]): boolean => passwordArray.every(char => char !== ' ')
const hasUpperCase = (passwordArray: string[]): boolean => passwordArray.some(char => new RegExp(/^[A-Z]*$/).test(char))
const hasLowerCase = (passwordArray: string[]): boolean => passwordArray.some(char => new RegExp(/^[a-z]*$/).test(char))
const hasNumber = (passwordArray: string[]): boolean => passwordArray.some(char => new RegExp(/^[0-9]*$/).test(char))
const hasSpecialChar = (passwordArray: string[]): boolean =>
  passwordArray.some(char => new RegExp(/^[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/).test(char))

export default (password: string = ''): PasswordValidator => {
  const passwordArray = password.split('')

  const length = validateLength(passwordArray)
  const spaces = hasNoSpaces(passwordArray)
  const upper = hasUpperCase(passwordArray)
  const lower = hasLowerCase(passwordArray)
  const special = hasSpecialChar(passwordArray)
  const number = hasNumber(passwordArray)

  const isValid = length && spaces && upper && lower && special && number
  return { isValid, length, spaces, upper, lower, special, number }
}
