const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
  secret: 'fnADnAs2ygACCgKqaUyLxaAMPWfR8O8KWEy3DPmB'
})

function getId(urlPath) {
    return urlPath.match(/([^\/]*)\/*$/)[0]
}
exports.handler = (event, context, callback) => {
    var dataRef;
    const data = JSON.parse(event.body);
    console.log(data);
    const id = getId(event.path)
    console.log(id);
    console.log(`Function 'like-update' invoked. update id: ${id}`)
    client.query(q.Get(q.Match(q.Index('search_by_id'), `${id}`)))
      .then((ret) => {
        const searchRefs = response.data
        console.log("Likes refs", searchRefs)
        alert(searchRefs)
        dataRef = searchRefs.map((ref) => {
            return q.Get(ref)
        })
      })
    return client.query(q.Update(q.Ref(q.Collection("num_of_likes"),`${dataRef}`), {data}))
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