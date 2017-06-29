const express = require("express");
const bodyParser = require("body-parser");

let port = process.env.PORT || 8080;

let app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//app.use(express.static('public'));

let services = []

app.put('/update/:registration', (req, res) => {
  let service = services.find(service => service.registration == req.params.registration)
  let index = services.indexOf(service)
  services[index] = req.body
  console.log("Services updated", services[index])
  res.end()
})

app.delete('/remove/:registration', (req, res) => {
  let service = services.find(service => service.registration == req.params.registration)
  services.splice(services.indexOf(service), 1)
  res.end()
})

app.get('/records', (req, res) => {
  res.send(services);
})

app.post('/register', (req, res) => {
  let serviceInformations = req.body
  services.push(serviceInformations)
  console.log("🐼 New service added", serviceInformations)
  res.end()
})

app.listen(port)
console.log("🌍 Discovery Server is started - listening on ", port)