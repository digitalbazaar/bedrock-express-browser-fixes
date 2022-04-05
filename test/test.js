/*!
 * Copyright (c) 2021-2022 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import '@bedrock/express';
import '@bedrock/express-browser-fixes';

bedrock.events.on('bedrock-express.configure.routes', app => {
  app.get('/test', (req, res) => {
    res.setHeader('Set-Cookie', [
      '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
      'sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrbxbp' +
      'rjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure; ' +
      'SameSite=None'
    ]);
    res.send('GET test');
  });
});

import '@bedrock/test';
bedrock.start();
