import _sortBy from 'lodash/sortBy'

export default (obj: any): object => {
  try {
    const sortedObject: any = {}
    const objKeys: string[] = Object.keys(obj)
    const sortedKeys: string[] = _sortBy(objKeys)
    sortedKeys.forEach(key => (sortedObject[key] = obj[key]))
    return sortedObject
  } catch (err) {
    console.error('Error with sorting the object:', err)
    return obj
  }
}
