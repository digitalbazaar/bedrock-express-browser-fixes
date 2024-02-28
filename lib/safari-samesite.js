/*!
 * Copyright 2020 - 2024 Digital Bazaar, Inc.
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
import onHeaders from 'on-headers';

bedrock.events.on('bedrock-express.init', app => {
  app.use((req, res, next) => {
    onHeaders(res, function() {
      /* Note: This fix is for Safari browsers before version 14.1.x. Those
      browsers did not handle the cookie attribute and value `SameSite=None`.
      They either treated it as `SameSite=Strict` or broke in other ways. The
      fix is to not set that attribute for those browsers. That fix is
      implemented here. */
      const setCookie = res.getHeader('set-cookie');
      if(!setCookie) {
        return;
      }
      const userAgent = req.get('user-agent');
      if(!(_hasSafari(userAgent) && _isOldSafariVersion(userAgent))) {
        return;
      }
      if(!Array.isArray(setCookie)) {
        if(!_hasSameSiteNone(setCookie)) {
          return;
        }
        const newVal = setCookie.replace('SameSite=None', '');
        res.setHeader('set-cookie', newVal);
      } else {
        let updated = false;
        for(const [i, value] of setCookie.entries()) {
          if(!_hasSameSiteNone(value)) {
            continue;
          }
          setCookie[i] = value.replace('SameSite=None', '');
          updated = true;
        }
        if(updated) {
          res.setHeader('set-cookie', setCookie);
        }
      }
    });
    next();
  });
});

function _hasSameSiteNone(value) {
  return value && value.includes('SameSite=None');
}

function _hasSafari(value) {
  return value && value.includes('Safari');
}

function _isOldSafariVersion(value) {
  // eslint-disable-next-line max-len
  const regex = /Version\/([0-9]{1,2})\.([0-9]{1,2}).([0-9]{1,2}.*)(?:Mobile\/\w{6})?Safari/g;
  const match = regex.exec(value);
  if(!match) {
    return false;
  }
  if(match[1] < 14) {
    return true;
  }
  return match[1] === '14' && match[2] === '0';
}
