const { REACT_APP_API_URL = 'http://localhost:5000' } = process.env

interface Config {
  apiUrl: string
  media: {
    mobile: string
  }
  nav: {
    headerHeight: number
    appMarginTop: number
    siderOffset: number
    siderHeight: number
    menuIconPadding: number
  }
}

const config: Config = {
  apiUrl: REACT_APP_API_URL,
  media: {
    mobile: '(max-width: 720px)',
  },
  nav: {
    headerHeight: 69,
    appMarginTop: 30,
    siderOffset: 4,
    siderHeight: 105,
    menuIconPadding: 24,
  },
}

export default config
