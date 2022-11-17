const Hapi = require ('@hapi/hapi');
const routes = require('./api/notes/routes');

const init = async() =>{
  try{
    const server = Hapi.server({
        port : 6000,
        host : 'localhost',
        routes: {
            cors: {
              origin: ['*'],
            },
          },
    });
    server.route(routes);
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  } catch(error){
    console.log(error);
  }
}

init();