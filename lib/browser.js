/*!
 * Copyright (c) 2020-2021 Digital Bazaar, Inc. All rights reserved.
 */
import bedrock from 'bedrock';
import 'bedrock-express';
import onHeaders from 'on-headers';

bedrock.events.on('bedrock-express.init', app => {
  app.use((req, res, next) => {
    onHeaders(res, function() {
      const setCookie = res.getHeader('set-cookie');
      const userAgent = req.headers['user-agent'];
      if(!setCookie) {
        return;
      }
      const hasSafari = _hasSafari(userAgent);
      let isOldSafariVersion = false;
      if(hasSafari) {
        isOldSafariVersion = _isOldSafariVersion(userAgent);
      }
      let hasSameSiteNone = false;
      if(!Array.isArray(setCookie)) {
        hasSameSiteNone = _hasSameSiteNone(setCookie);
        if(hasSameSiteNone && isOldSafariVersion) {
          const newVal = setCookie.replace(' SameSite=None', '');
          res.setHeader('set-cookie', newVal);
        } else {
          res.setHeader('set-cookie', setCookie);
        }
      } else {
        const cookies = [];
        for(const value of setCookie) {
          hasSameSiteNone = _hasSameSiteNone(value);
          if(hasSameSiteNone && isOldSafariVersion) {
            const newVal = value.replace(' SameSite=None', '');
            cookies.push(newVal);
          } else {
            cookies.push(value);
          }
        }
        res.setHeader('set-cookie', cookies);
      }
    });
    next();
  });
});

function _hasSameSiteNone(value) {
  return value.includes('SameSite=None');
}

function _hasSafari(value) {
  return value.includes('Safari');
}

function _isOldSafariVersion(value) {
  const regex = /Version\/([0-9]{1,2})\.([0-9]{1,2})/g;
  const match = regex.exec(value);
  if(match && match[1] < 14) {
    return true;
  }
  if(match && match[1] == 14) {
    if(match[2] < 1) {
      return true;
    }
    return false;
  }
  return false;
}
