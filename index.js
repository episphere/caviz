
exports.helloHttp = (req, res) => {
  console.log(req.originalUrl)
  res.header('Access-Control-Allow-Origin','*')
  res.send(`Hello caViz 1 at ${Date()}`);
};