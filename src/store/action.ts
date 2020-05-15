import axios from '../utils/axios'
import { setViewState } from './viewState'

interface ActionParams {
  viewKey: string
  request: any
  type?: string
  dispatch: Function
  errMsg?: string
  shouldLoad?: boolean
}

export default async ({
  viewKey,
  request,
  type,
  dispatch,
  errMsg = 'Error with request',
  shouldLoad = true,
}: ActionParams) => {
  try {
    shouldLoad && dispatch(setViewState(viewKey, { loading: true }))
    const data = await axios(request)
    type && dispatch({ type, data })
  } catch (err) {
    console.error(errMsg, err)
  } finally {
    shouldLoad && dispatch(setViewState(viewKey, { loading: false }))
  }
}
