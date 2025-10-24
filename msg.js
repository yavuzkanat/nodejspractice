const fs = require('fs');
const qs = require('querystring');


let data;
function getMessage(req, res) {
    const body = [];
    req.on('data', (chunck) => {
        body.push(chunck);
        const bodyParserd = Buffer.concat(body).toString();
        data = bodyParserd;



    });
    req.on('end', () => {
        userData = qs.parse(data);
        const name = userData.name;
        const msg = userData.message;
        text = `Name : ${name}|Message :${msg}\n`;
        fs.appendFile('./log.txt', text, (err) => {
            if (err) {
                console.log(err);
            }
        });

        res.statusCode = 302; // Geçici yönlendirme (301 kalıcı olur)
        res.setHeader("Location", "/");
        res.end();

    });

}


module.exports = { getMessage }