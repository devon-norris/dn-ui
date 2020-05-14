import React from 'react'
import { Card as AntdCard } from 'antd'
import colors from '../colors'
import getComponentWidth from '../utils/getComponentWidth'
import './overrides.css'

const borderRadius = '4px'

const Card = ({ cardType, isMobile, ...props }: any) => {
  const { style, headStyle, children } = props
  let cardStyle = {
    margin: '3% auto auto auto',
    borderRadius,
    width: getComponentWidth(isMobile),
  }

  return (
    <AntdCard
      {...props}
      headStyle={{
        backgroundColor: colors.primary,
        color: '#fff',
        fontSize: '24px',
        textAlign: 'center',
        borderRadius: `${borderRadius} ${borderRadius} 0 0`,
        ...headStyle,
      }}
      style={{ ...cardStyle, ...style }}
    >
      {children}
    </AntdCard>
  )
}

export default Card
