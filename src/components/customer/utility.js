function compareChanges(orig, current) {
  for (let key in orig) {
    if (orig[key] == current[key]) {
      continue
    }
    if (typeof orig[key] === 'object' && this.compareChanges(orig[key], current[key])) {
      continue
    }
    return false
  }
  return true
}

function copyObject(orig, newObj = {}) {
  for (let key in orig) {
    if (typeof orig[key] == 'object') {
      newObj[key] = this.copyObject(orig[key])
    }
    newObj[key] = orig[key]
  }
  return newObj
}

export default {
  compareChanges,
  copyObject
}