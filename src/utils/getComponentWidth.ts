import config from '../config'
const {
  component: { width, widthMobile },
} = config

export default (isMobile: boolean): string => (isMobile ? widthMobile : width)
