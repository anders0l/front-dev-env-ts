export default (values: any) =>
  Object.keys(values).reduce((acc, value) => {
    acc[value] = values[value] !== '' ? values[value] : null
    return acc
  }, {})
