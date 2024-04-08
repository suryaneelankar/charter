const fs = require('fs')

const requestHandler = (req,res) => {
    const method = req.method;

    if(req.url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('Listening to port 3000');
        res.write('<html>');
        res.write('<body><h1>TEST WITH html</h1><form action="/message" method="POST"><input type="text" name="message"> </input> <button>Send</button </form></body>');
        res.write('</html>');
        return res.end();
    }

    if(req.url === '/test'){
        res.write('IN TO THE TEST SCREEN');
        res.end();
    }

    if(req.url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
          body.push(chunk);
          console.log(chunk);
        });
        return req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          console.log(parsedBody);
          const message = parsedBody.split('=')[1];
          fs.writeFileSync('message.txt',message);
          res.statusCode = '302';
        //   res.setHeader('Location','/');
          return res.end();
        });
    }
    res.setHeader('Content-Type','text/html');
    res.write('Listening to port 3000');
    res.write('<html>');
    res.write('<body><h1>TEST WITH html other routessssssss</h1></body>');
    res.write('</html>');
    res.end();
}



module.exports.Handler = requestHandler;
module.exports.someText = 'Some hard coded text';

// module.exports = {
//     Handler: requestHandler,
//     someText: 'Some Hard corded text'
// }