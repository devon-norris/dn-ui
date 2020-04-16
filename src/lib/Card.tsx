import React from 'react'
import { Card as AntdCard } from 'antd'
import colors from '../colors'
import getComponentWidth from '../utils/getComponentWidth'

const Card = ({ cardType, isMobile, ...props }: any) => {
  const { style, headStyle, children } = props
  let cardStyle = {
    margin: 'auto',
    marginTop: '10%',
    borderRadius: '5px',
    width: getComponentWidth(isMobile),
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
