import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Modal as AntdModal } from 'antd'

const modalRoot = document.getElementById('modal-root')
// TODO: Revisit portal and see why it causes causes modal to close and open onSubmit
export const Portal = ({ children }) => {
  const el = document.createElement('div')

  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    modalRoot.appendChild(el)
    // @ts-ignore
    return () => modalRoot.removeChild(el)
  }, []) // eslint-disable-line

  return createPortal(children, el)
}

interface ModalProps {
  title: string
  open: boolean
  isValid?: boolean
  onSubmit: Function
  async?: boolean
  body?: any
  okText?: string
}

const Modal = ({ onSubmit, async, body: Body, okText, title, isValid, open }: ModalProps) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => handleCancel()
  }, [])

  useEffect(() => {
    mounted && setVisible(true)
  }, [open]) // eslint-disable-line

  const handleSubmit = () => {
    if (!isValid) {
      return onSubmit()
    }
    if (async) {
      setLoading(true)
      return onSubmit()
        .then(() => {
          setVisible(false)
        })
        .finally(() => setLoading(false))
    }
    onSubmit()
    return setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
    setLoading(false)
  }

  return (
    <AntdModal
      title={title}
      visible={visible}
      okText={okText}
      confirmLoading={loading}
      onOk={handleSubmit}
      onCancel={handleCancel}
      destroyOnClose
      centered
    >
      <Body />
    </AntdModal>
  )
}

const defaultProps: ModalProps = {
  title: 'Modal Title',
  open: false,
  isValid: true,
  onSubmit: async () => {},
  async: true,
  body: () => <div>Mock Form</div>,
  okText: 'Submit',
}

Modal.defaultProps = defaultProps

export default Modal
