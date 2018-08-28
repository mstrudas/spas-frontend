export function compareChanges(orig, current) {
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

export function copyObject(orig, newObj = null) {
  if (!newObj) {
    if (Array.isArray(orig)) {
      newObj = []
    } else {
      newObj = {}
    }
  }
  for (let key in orig) {
    if (typeof orig[key] == 'object') {
      newObj[key] = this.copyObject(orig[key])
    }
    newObj[key] = orig[key]
  }
  return newObj
}

export function sortedNotes(notes, dateField = "date") {
  return notes.concat().sort(function(a, b) {
    return Date.parse(b[dateField]) - Date.parse(a[dateField])
  })
}

export default {
  compareChanges,
  copyObject,
  sortedNotes
}