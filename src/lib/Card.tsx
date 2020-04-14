import React from 'react'
import { Card as AntdCard } from 'antd'
import colors from '../colors'
import config from '../config'
import { useMediaQuery } from 'react-responsive'
import getComponentWidth from '../utils/getComponentWidth'

const Card = props => {
  const isMobile = useMediaQuery({ query: config.media.mobile })
  const { cardType, style, headStyle, children } = props
  let cardStyle = {
    margin: 'auto',
    marginTop: '10%',
    borderRadius: '5px',
    width: getComponentWidth(isMobile),
  }

  if (cardType === 'table') {
    cardStyle = { ...style, borderRadius: '10px', boxShadow: '0 0 5px 0' }
  }

  return (
    <AntdCard
      {...props}
      headStyle={{ backgroundColor: colors.primary, color: '#fff', textAlign: 'center', ...headStyle }}
      style={{ ...cardStyle, ...style }}
    >
      {children}
    </AntdCard>
  )
}

export default Card
