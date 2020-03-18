const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
var faunadb = require('faunadb'),
  q = faunadb.query;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*Enable CORS*/
app.use(cors())
app.enable('trust proxy');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var client = new faunadb.Client({ secret: process.env.FAUNADB_KEY });


//Query Database to get all likes
app.get('/api/all_likes', function(req, res) {
  var results=[];
  client.query(q.Paginate(q.Match(q.Ref("indexes/all_num_of_likes")))).then((ret) => {
    const likesRefs = ret.data
    const getAllTodoDataQuery = likesRefs.map((ref) => {
      return q.Get(ref)
    })
    client.query(getAllTodoDataQuery).then((ret) => {
      for (var r in ret){
        results.push(ret[r]['data']);
      }
      return res.json(results)
    })
  })
})

app.use(express.static('./public'))

app.all('*', function(request, response, next) {
  //response.sendFile('index.html', {root: './public'});
  response.sendFile(path.resolve(__dirname, '../public')+'/index.html');
});

app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);

/*
Secret Key
fnADnAs2ygACCgKqaUyLxaAMPWfR8O8KWEy3DPmB
*/