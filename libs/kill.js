import Promise from 'bluebird'
import exeq from 'exeq'

export default function kill(port = 3000) {
  exeq(`lsof -i tcp:${ port } | grep LISTEN | awk '{print $2}' | xargs kill -9 `)
    .then(() => {
      if (!module.parent)
        return goodbye(port)

      return Promise.resolve(true)
    }).catch(err => {
      if (!module.parent)
        throw err

      return Promise.reject(err)
    })
}

function goodbye(p) {
  console.log(
    '\n  Process running on port %s have been killed, \n  Have a nice day :D\n', 
    p
  )
}
