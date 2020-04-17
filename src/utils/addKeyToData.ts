export default (data: any[]) => data.map(obj => ({ ...obj, key: obj._id }))
