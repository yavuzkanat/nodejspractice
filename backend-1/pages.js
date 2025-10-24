const fs = require("fs");
const path = require("path");

function servePage(req, res, htmlFileName) {
  const reqUrl = req.url;

  const filePath = path.join(__dirname, "html", htmlFileName);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>404 - Page Not Found</h1>");
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    }
  });

}


function indexPage(req, res) {
  servePage(req, res, "index.html");
}

module.exports = { indexPage };