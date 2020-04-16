const errorLogger = console.error.bind(console)

const suppressMessages = [
  'Warning: Function components cannot be given refs. Attempts to access this ref will fail.',
  'Check the render method of `Routes`.',
]

export default (...args) => {
  try {
    const argsStr = args.toString()
    const shouldSuppress = suppressMessages.some(msg => argsStr.includes(msg))
    if (!shouldSuppress) errorLogger(...args)
  } catch {
    return errorLogger(...args)
  }
}
