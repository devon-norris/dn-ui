const { REACT_APP_API_URL = 'http://localhost:5000' } = process.env

interface Config {
  apiUrl: string
  media: {
    mobile: string
  }
}

const config: Config = {
  apiUrl: REACT_APP_API_URL,
  media: {
    mobile: '(max-width: 900px)',
  },
}

export default config
