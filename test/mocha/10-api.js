/*!
 * Copyright (c) 2020-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from '@bedrock/core';
import {createRequire} from 'module';
import https from 'https';
const require = createRequire(import.meta.url);
const {httpClient} = require('@digitalbazaar/http-client');

const agent = new https.Agent({rejectUnauthorized: false});
const url = config.server.baseUri + '/test';

describe('SameSite Tests', () => {
  it('Successfully updates SameSite for Safari 14.0.0', async () => {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) ' +
        'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 ' +
        'Safari/605.1.15'
    };
    let result;
    let err;
    try {
      result = await httpClient.get(url, {agent, headers});
    } catch(e) {
      err = e;
    }
    should.exist(result);
    should.not.exist(err);
    const cookie = result.headers.get('set-cookie').split(',')
      .map(c => c.trimStart());
    cookie.should.eql([
      '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
      'sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrbxbp' +
        'rjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure;'
    ]);
  });

  it('Successfully updates SameSite for Safari 13.0.0', async () => {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) ' +
        'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.0 ' +
        'Safari/605.1.15'
    };
    let result;
    let err;
    try {
      result = await httpClient.get(url, {agent, headers});
    } catch(e) {
      err = e;
    }
    should.exist(result);
    should.not.exist(err);
    const cookie = result.headers.get('set-cookie').split(',')
      .map(c => c.trimStart());
    cookie.should.eql([
      '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
      'sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrbxbp' +
        'rjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure;'
    ]);
  });
  it('Successfully updates SameSite for Mobile Safari 13.0.0', async () => {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac ' +
        'OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 ' +
        'Mobile/15E148 Safari/604.1'
    };
    let result;
    let err;
    try {
      result = await httpClient.get(url, {agent, headers});
    } catch(e) {
      err = e;
    }
    should.exist(result);
    should.not.exist(err);
    const cookie = result.headers.get('set-cookie').split(',')
      .map(c => c.trimStart());
    cookie.should.eql([
      '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
      'sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrbxbp' +
        'rjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure;'
    ]);
  });
  it('Does not update SameSite for Safari 14.1.0', async () => {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) ' +
        'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.0 ' +
        'Safari/605.1.15'
    };
    let result;
    let err;
    try {
      result = await httpClient.get(url, {agent, headers});
    } catch(e) {
      err = e;
    }
    should.exist(result);
    should.not.exist(err);
    const cookie = result.headers.get('set-cookie').split(',')
      .map(c => c.trimStart());
    cookie.should.eql([
      '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
      'sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrbxbp' +
        'rjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure; ' +
        'SameSite=None'
    ]);
  });
  it('Does not update SameSite for Chrome', async () => {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
    };
    let result;
    let err;
    try {
      result = await httpClient.get(url, {agent, headers});
    } catch(e) {
      err = e;
    }
    should.exist(result);
    should.not.exist(err);
    const cookie = result.headers.get('set-cookie').split(',')
      .map(c => c.trimStart());
    cookie.should.eql([
      '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
      'sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrbxbp' +
        'rjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure; ' +
        'SameSite=None'
    ]);
  });
  it('Does not update SameSite for Firefox', async () => {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; ' +
        'rv:42.0) Gecko/20100101 Firefox/42.0'
    };
    let result;
    let err;
    try {
      result = await httpClient.get(url, {agent, headers});
    } catch(e) {
      err = e;
    }
    should.exist(result);
    should.not.exist(err);
    const cookie = result.headers.get('set-cookie').split(',')
      .map(c => c.trimStart());
    cookie.should.eql([
      '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
      'sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrbxbp' +
        'rjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure; ' +
        'SameSite=None'
    ]);
  });
});
