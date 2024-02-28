/*!
 * Copyright 2021 - 2024 Digital Bazaar, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
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
