import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import colors from '../colors'

const Link = props => (
  <ReactRouterLink {...props} style={{ color: colors.linkBlue, ...props.style }}>
    {props.children}
  </ReactRouterLink>
)

export default Link
