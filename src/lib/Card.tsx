import React from 'react'
import { Card as AntdCard } from 'antd'
import colors from '../colors'
import config from '../config'
import { useMediaQuery } from 'react-responsive'

const Card = props => {
  const isMobile = useMediaQuery({ query: config.media.mobile })
  const { cardType, style, headStyle, children } = props
  let cardStyle = { marginBottom: '20px', borderRadius: '5px', width: isMobile ? '90%' : '350px' }

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
