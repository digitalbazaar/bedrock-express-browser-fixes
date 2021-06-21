/*
 * Copyright (c) 2015-2018 Digital Bazaar, Inc. All rights reserved.
 */
import bedrock from 'bedrock';
// const config = bedrock.config;
import 'bedrock-express';
import 'bedrock-express-browser-fixes';

// config.server.port = 47080;
// config.server.httpPort = 47443;
// config.server.host = 'localhost:47443';
// config.server.baseUri = 'https://' + config.server.host;

bedrock.events.on('bedrock-express.configure.routes', app => {
  console.log('ROUTE EVENT CALLED');
  app.get('/test', (req, res) => {
    console.log('TEST GET');
    console.log({req, res});
  });
});

import 'bedrock-test';
bedrock.start();
