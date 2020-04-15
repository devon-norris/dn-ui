import React, { Fragment } from 'react'
import colors from '../colors'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { PasswordValidator, defaultPasswordValidationState } from '../utils/passwordValidator'

interface IconProps {
  text: string
}

interface RenderIconProps {
  valid: boolean
  text: string
}

interface PasswordPopoverProps {
  pwInfo: PasswordValidator
}

const ValidIcon = ({ text = '' }: IconProps) => (
  <Fragment>
    <CheckCircleFilled style={{ color: colors.validationGreen, marginRight: '5px' }} /> {text}
  </Fragment>
)

const InvalidIcon = ({ text = '' }: IconProps) => (
  <Fragment>
    <CloseCircleFilled style={{ color: colors.validationRed, marginRight: '5px' }} /> {text}
  </Fragment>
)

const RenderIcon = ({ valid = false, text = '' }: RenderIconProps) =>
  valid ? <ValidIcon text={text} /> : <InvalidIcon text={text} />

const PasswordPopover = ({ pwInfo: { length, upper, lower, number, special, spaces } }: PasswordPopoverProps) => (
  <Fragment>
    <RenderIcon valid={length} text='At least 8 characters' />
    <br />
    <RenderIcon valid={upper} text='Upper case letter' />
    <br />
    <RenderIcon valid={lower} text='Lower case letter' />
    <br />
    <RenderIcon valid={number} text='Number' />
    <br />
    <RenderIcon valid={special} text='Special character' />
    <br />
    <RenderIcon valid={spaces} text='No spaces' />
    <br />
  </Fragment>
)

const defaultProps: PasswordPopoverProps = {
  pwInfo: defaultPasswordValidationState,
}

PasswordPopover.defaultProps = defaultProps

export default PasswordPopover
