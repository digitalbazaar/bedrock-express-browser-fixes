/*!
 * Copyright (c) 2020-2021 Digital Bazaar, Inc. All rights reserved.
 */
import bedrock from 'bedrock';
import 'bedrock-express';
import onHeaders from 'on-headers';

bedrock.events.on('bedrock-express.init', app => {
  app.use((req, res, next) => {
    onHeaders(res, function() {
      /* Note: This fix is for Safari browsers before version 14.1.x. Those
      browsers did not handle the cookie attribute and value `SameSite=None`.
      They either treated it as `SameSite=Strict` or broke in other ways. The
      fix is to not setthat attribute for those browsers. That fix is
      implemented here. */
      const setCookie = res.getHeader('set-cookie');
      if(!setCookie) {
        return;
      }
      const userAgent = req.headers['user-agent'];
      if(!(_hasSafari(userAgent) && _isOldSafariVersion(userAgent))) {
        return;
      }
      let hasSameSiteNone = false;
      if(!Array.isArray(setCookie)) {
        hasSameSiteNone = _hasSameSiteNone(setCookie);
        if(hasSameSiteNone) {
          const newVal = setCookie.replace(' SameSite=None', '');
          res.setHeader('set-cookie', newVal);
        } else {
          res.setHeader('set-cookie', setCookie);
        }
      } else {
        const cookies = [];
        for(const value of setCookie) {
          hasSameSiteNone = _hasSameSiteNone(value);
          if(hasSameSiteNone) {
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
  if(!match) {
    return false;
  }
  if(match[1] < 14) {
    return true;
  }
  if(match[1] == 14) {
    if(match[2] < 1) {
      return true;
    }
    return false;
  }
  return false;
}
