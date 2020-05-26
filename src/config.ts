const { REACT_APP_API_URL = 'http://localhost:5000', NODE_ENV } = process.env

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
  component: {
    width: string
    widthMobile: string
  }
  isDev: boolean
  testPW: string
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
  component: {
    width: '375px',
    widthMobile: '90%',
  },
  isDev: NODE_ENV === 'development',
  testPW: 'TestUser12!',
}

export default config
