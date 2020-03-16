const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
  secret: 'fnADnAs2ygACCgKqaUyLxaAMPWfR8O8KWEy3DPmB'
})

function getId(urlPath) {
    return urlPath.match(/([^\/]*)\/*$/)[0]
}

exports.handler = (event, context, callback) => {
    const data = JSON.parse(event.body)
    const id = getId(event.path)
    console.log("Function 'like-update' invoked. update id: ${id}")
    return client.query(q.Update(q.Ref("num_of_likes/${id}"), {data}))
    .then((response) => {
      console.log("success", response)
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    }).catch((error) => {
      console.log("error", error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
  }