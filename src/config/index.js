
let myEnv = process.env.NODE_ENV !== 'production' ? './dev.env' : './prod.env'

module.exports = {
  env: require(`${myEnv}`)
}
