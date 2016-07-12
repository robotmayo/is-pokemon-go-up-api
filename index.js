'use strict';
const http = require('http');
const PORT = process.env.POKEMON_PORT || 8080;
const isPokemonGoUp = require('is-pokemon-go-up');
const url = require('url');
const querystring = require('querystring');
const parse = URL => querystring.parse(url.parse(URL).query)
let cachedMessage = '';
let lastTime = Date.now();
const CLI = require.main === module;

function getMessage(){
  if(cachedMessage === '') return isPokemonGoUp().then(cache).catch(handleError);
  if( ( Date.now() - lastTime) > 1000 * 60) return isPokemonGoUp().then(cache).catch(handleError);
  return Promise.resolve(cachedMessage);
}

function cache(value){
  lastTime = Date.now();
  cachedMessage = value;
  return cachedMessage;
}

function handleError(err){
  if(CLI) {
    console.error(err.stack);
    return 'Unknown error occured';
  }
  return Promise.reject(err);
}

function handle(request, response){
  return getMessage()
    .then(result => {
      const parsed = parse(request.url);
      if(parsed && parsed.json === 'true') {
        response.writeHead(200, { 'Content-Type': 'application/json'});
        return response.end(JSON.stringify({status : result}));
      }
      response.end(result);
    });
}
function run(){
  const server = http.createServer(handle);
  server.listen(PORT, function(){
    console.log(`Listening at port : ${PORT}`);
  });
}
if(CLI){
  run();
}
module.exports = {
  run : run,
  handler : handle
};

