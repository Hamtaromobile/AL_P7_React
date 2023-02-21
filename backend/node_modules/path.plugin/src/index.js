const path = require('path')
const fs = require('fs')

const find = (str) => {
  let arr = str.split('/')
  let r = ''
  const find = (cwd) => {
    if(fs.readdirSync(cwd).includes(arr[0])) {
      r = `${cwd}${str}`
    } else {
      find(`${cwd}../`)
    }
  }
  find(`${process.cwd()}/../`)
  return r
}

module.exports = find