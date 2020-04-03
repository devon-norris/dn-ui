const { REACT_APP_API_URL = 'http://localhost:5000' } = process.env

interface Config {
  apiUrl: string
}

const config: Config = {
  apiUrl: REACT_APP_API_URL,
}

export default config
