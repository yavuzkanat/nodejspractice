const http = require("http");
const {indexPage} = require('./pages');
const {getMessage} = require('./msg');

const server = http.createServer((req,res) => {
  if (req.url === "/" || req.url === "/home"){
      indexPage(req,res);
  }

  if(req.url === "/msg" && req.method === "POST"){
    getMessage(req,res);
    
  }
})

server.listen(3000, () => {
 
});