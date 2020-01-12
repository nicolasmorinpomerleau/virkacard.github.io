// exports.handler = (event, context, callback) => {
//     // TODO implement
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify('Hello from Lambda!')
//     };
//     callback(null, response);
// };

const http = require('http');

exports.handler = async (event, context) => {

    return new Promise((resolve, reject) => {
        const options = {
            host: 'ec2-18-191-89-162.us-east-2.compute.amazonaws.com',
            path: '/api/repos/r1639420d605/index?delta=true&clear=false',
            port: 8000,
            method: 'POST'
        };

        const req = http.request(options, (res) => {
          resolve('Success');
        //   body: JSON.stringify('Hello from Abou!');
        });

        req.on('error', (e) => {
          reject(e.message);
        });

        // send the request
        req.write('');
        req.end();
    });
};

In the integration request
{
    "email":"$input.params('email')",
    "code" :"$input.params('code')",
}
    
   In the POST methode 
   Access-Control-Allow-Headers 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'