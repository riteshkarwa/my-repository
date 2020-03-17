const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
  secret: 'fnADnAs2ygACCgKqaUyLxaAMPWfR8O8KWEy3DPmB'
})
console.log(process.env.FAUNADB_KEY);
exports.handler = (event, context, callback) => {
  console.log("Function `num_of_likes-read-all` invoked")
  return client.query(q.Paginate(q.Match(q.Ref("indexes/all_num_of_likes"))))
  .then((response) => {
    const likeRefs = response.data
    console.log("Likes refs", likeRefs)
    console.log(`${likeRefs.length} likes found`)
    
    const getAllTodoDataQuery = likeRefs.map((ref) => {
      return q.Get(ref)
    })
    // then query the refs
    return client.query(getAllTodoDataQuery).then((ret) => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(ret)
      })
    })
  }).catch((error) => {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}