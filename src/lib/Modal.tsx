import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Modal as AntdModal } from 'antd'
import trimObjectValues from '../utils/trimObjectValues'

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
  form?: any
}

const Modal = ({ onSubmit, async, body: Body, okText, title, isValid, open, form }: ModalProps) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const resetModal = () => {
    setVisible(false)
    setLoading(false)
    if (form) {
      form.resetFields()
    }
  }

  useEffect(() => {
    setMounted(true)
    return () => resetModal()
  }, []) // eslint-disable-line

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

  const handleFormSubmit = async () => {
    if (async) {
      try {
        setLoading(true)
        const values = await form.validateFields()
        await onSubmit(trimObjectValues(values))
        console.log('Successfully submitted:', values)
        return resetModal()
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    } else {
      try {
        const values = await form.validateFields()
        onSubmit(trimObjectValues(values))
        return resetModal()
      } catch (err) {
        console.error(err.message)
      }
    }
  }

  return (
    <AntdModal
      title={title}
      visible={visible}
      okText={okText}
      confirmLoading={loading}
      onOk={form ? handleFormSubmit : handleSubmit}
      onCancel={resetModal}
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
