
exports.helloHttp = (req, res) => {
  console.log(req.originalUrl)
  res.header('Access-Control-Allow-Origin','*')
  res.send(`Hello caViz 2 at ${Date()}`);
};