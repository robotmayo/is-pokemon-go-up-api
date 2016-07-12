is-pokemon-go-up-api
====================

A simple api server for checking the status of pokemon go.

`npm install --save is-pokemon-go-up-api`

## Usage
```javascript
// To run as a standalone server
isPokemonGoUpApi = require('is-pokemon-go-up-api');
isPokemonGoUpApiServer = isPokemonGoUpApiServer.run();
```

```javascript
/* You can also just get the handler it uses internally. It expects the standard
node http library request, response format
*/

isPokemonGoUpApi = require('is-pokemon-go-up-api');
isPokemonGoUpApiHandler = isPokemonGoUp.handler;

```

You can also run it standalone by running its `index.js`. Port defaults to 8080, you can change it by
setting the environment variable `POKEMON_PORT`

By default it responds with a simple text payload. The payload depends on the server status. You can
see all the possible responses at [is-pokemon-go-up](https://github.com/sotojuan/is-pokemon-go-up) ,
the module that powers the api.

It also supports json.

```
GET /PATH/TO/API?json=true
response
{"status" : "string"}
```

MIT (c) [@robotmayo](https://twitter.com/robotmayo)

