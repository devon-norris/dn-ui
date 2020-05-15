import React, { useState, useEffect, Fragment } from 'react'
import { Button } from './'
import { Popconfirm } from 'antd'
import { EditActions } from './Table'
import { useSelector, RootStateOrAny } from 'react-redux'

interface TableActionProps {
  data: any
  modifiedData: any
  setResetId: Function
  selected: string
  editActions: EditActions
}

const TableAction = ({
  data,
  modifiedData,
  setResetId,
  selected,
  editActions: { onSave, onDelete, saveViewKey, deleteViewKey },
}: TableActionProps) => {
  const { _id, canEdit = true } = data
  const isSelected = selected === _id
  const [canSave, setCanSave] = useState(false)
  const [canReset, setCanReset] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { saveLoading, deleteLoading } = useSelector(({ viewState }: RootStateOrAny) => ({
    saveLoading: viewState[saveViewKey]?.loading ?? false,
    deleteLoading: viewState[deleteViewKey]?.loading ?? false,
  }))

  useEffect(() => {
    const modified = modifiedData[_id]
    if (modified) {
      const modifiedKeys = Object.keys(modified)
      const allEqual = modifiedKeys.every(key => modified[key].isEqual)
      const allValid = modifiedKeys.every(key => modified[key].isValid)
      setCanSave(allValid && !allEqual)
      setCanReset(!allEqual)
    } else {
      setCanSave(false)
      setCanReset(false)
    }
  }, [modifiedData]) // eslint-disable-line

  useEffect(() => {
    if (!saveLoading && isSaving) {
      setIsSaving(false)
      setCanSave(false)
      setCanReset(false)
    }
  }, [saveLoading]) // eslint-disable-line

  useEffect(() => {
    if (!deleteLoading) {
      setIsDeleting(false)
    }
  }, [deleteLoading])

  return canEdit ? (
    <div style={{ textAlign: 'center' }}>
      {isSelected ? (
        <Popconfirm
          title='Are you sure?'
          onConfirm={() => {
            setIsDeleting(true)
            return onDelete(_id)
          }}
        >
          <Button type='primary' danger loading={isDeleting && deleteLoading}>
            Delete
          </Button>
        </Popconfirm>
      ) : (
        <Fragment>
          <Button
            type='primary'
            style={{ marginRight: '10px' }}
            disabled={!canSave}
            loading={isSaving && saveLoading}
            onClick={() => {
              setIsSaving(true)
              setResetId(_id)
              const modified = modifiedData[_id]
              const dataToModify = {}
              for (const key in modified) {
                dataToModify[key] = modified[key].value
              }
              return onSave(_id, dataToModify)
            }}
          >
            Save
          </Button>
          <Button disabled={!canReset} onClick={() => canSave && setResetId(data._id)}>
            Reset
          </Button>
        </Fragment>
      )}
    </div>
  ) : null
}

const defaultProps: TableActionProps = {
  data: {},
  modifiedData: {},
  setResetId: id => id,
  selected: '',
  editActions: {
    onSave: () => {},
    onDelete: () => {},
    saveViewKey: '',
    deleteViewKey: '',
  },
}
TableAction.defaultProps = defaultProps

export default TableAction
