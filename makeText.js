/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function generate(text) {
  let mMachine = new markov.MarkovMachine(text);
  console.log(mMachine.makeText());
}

function makeText(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error('File could not be read');
      process.exit(1);
    } 
    else {
      generate(data);
    }
  });

}

async function makeURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } 
  catch (err) {
    console.error('URL could not be read');
    process.exit(1);
  }
  generate(resp.data)
}


let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}

else if (method === "url") {
  makeURLText(path);
}

else {
  console.log('unknown method');
  process.exit(1);
}