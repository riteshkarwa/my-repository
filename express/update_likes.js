const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
  secret: 'fnADnAs2ygACCgKqaUyLxaAMPWfR8O8KWEy3DPmB'
})

exports.handler = (event, context, callback) => {
    const data = JSON.parse(event.body);
    console.log(data);
    const id = event.id
    console.log(id);
    console.log(`Function 'like-update' invoked. update id: ${id}`)
    return client.query(q.Update(q.Ref(`classes/num_of_likes/${id}`), {data}))
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