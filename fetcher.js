const fs = require('fs');
const request = require('request');
const path = require('path')
const validUrl = require('valid-url');
const url = process.argv[2]
const savePath = process.argv[3]
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


request(url, (error, response, body) => {

  if(!validUrl.isHttpsUri(url)) {
    console.log("Invalid Url! Please type valid Url again. ")
    return
  }

  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  if(fs.existsSync(savePath)) {

    rl.question('You are overwriting exsisting file! Would you like to overwrite? (y / n) ', (answer) => {

      if(answer === 'n') {
      console.log("Exiting fetcher")
      rl.close();
      }

      if(answer === 'y') {
        fs.writeFile(savePath, body, (err) => {
          if(err){
             throw Error("Error has been caused!")
          }
          console.log(`Downloaded ${body.length} bytes to ${savePath}`)
          rl.close()
        })
      }
    });

  } else {

      fs.writeFile(savePath, body, (err) => {
        if(err) {
          throw Error("Invalid Path! Please type in a valid path")
        }

        // fs.stat(body) can also fetch bytes
        console.log(`Downloaded ${body.length}bytes to ${savePath}`)
        rl.close()
      })
    }
});


