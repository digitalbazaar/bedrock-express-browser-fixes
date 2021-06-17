/*
 * Copyright (c) 2020-2021 Digital Bazaar, Inc. All rights reserved.
 */
import {safariSameSiteFix} from 'bedrock-express-browser-fixes';
import request from 'supertest';
import http from 'http';

const mockNext = function() {};

describe('SameSite Tests', () => {
  it('Successfully updates SameSite for Safari 14.0.0', done => {

    const server = createServer(handler);

    function handler(req, res) {
      res.setHeader('Set-Cookie', [
        '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
        'veres-wallet.sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrbxbp' +
        'rjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure; ' +
        'SameSite=None'
      ]);
      safariSameSiteFix(req, res, mockNext);
    }

    request(server)
      .get('/')
      .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) ' +
        'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 ' +
        'Safari/605.1.15')
      .expect(res => {
        res.headers['set-cookie'] = [
          '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
          'veres-wallet.sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrb' +
          'xbprjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure;'
        ];
      })
      .expect(200, done);
  });
  it('Successfully updates SameSite for Safari 13.0.0', done => {

    const server = createServer(handler);

    function handler(req, res) {
      res.setHeader('Set-Cookie', [
        '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
        'veres-wallet.sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrbxbp' +
        'rjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure; ' +
        'SameSite=None'
      ]);
      safariSameSiteFix(req, res, mockNext);
    }

    request(server)
      .get('/')
      .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) ' +
        'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.0 ' +
        'Safari/605.1.15')
      .expect(res => {
        res.headers['set-cookie'] = [
          '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
          'veres-wallet.sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrb' +
          'xbprjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure;'
        ];
      })
      .expect(200, done);
  });
  it('Successfully updates SameSite for Mobile Safari 13.0.0', done => {

    const server = createServer(handler);

    function handler(req, res) {
      res.setHeader('Set-Cookie', [
        '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
        'veres-wallet.sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrbxbp' +
        'rjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure; ' +
        'SameSite=None'
      ]);
      safariSameSiteFix(req, res, mockNext);
    }

    request(server)
      .get('/')
      .set('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac ' +
        'OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 ' +
        'Mobile/15E148 Safari/604.1')
      .expect(res => {
        res.headers['set-cookie'] = [
          '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
          'veres-wallet.sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrb' +
          'xbprjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure;'
        ];
      })
      .expect(200, done);
  });
  it('Does not update SameSite for Safari 14.1.0', done => {
    const server = createServer(handler);

    function handler(req, res) {
      res.setHeader('Set-Cookie', [
        '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
        'veres-wallet.sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrbxbp' +
        'rjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure; ' +
        'SameSite=None'
      ]);
      safariSameSiteFix(req, res, mockNext);
    }

    request(server)
      .get('/')
      .set('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac ' +
        'OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 ' +
        'Mobile/15E148 Safari/604.1')
      .expect(res => {
        res.headers['set-cookie'] = [
          '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
          'veres-wallet.sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrb' +
          'xbprjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure; ' +
          'SameSite=None'
        ];
      })
      .expect(200, done);
  });
  it('Does not update SameSite for Chrome', done => {
    const server = createServer(handler);

    function handler(req, res) {
      res.setHeader('Set-Cookie', [
        '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
        'veres-wallet.sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrbxbp' +
        'rjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure; ' +
        'SameSite=None'
      ]);
      safariSameSiteFix(req, res, mockNext);
    }

    request(server)
      .get('/')
      .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36')
      .expect(res => {
        res.headers['set-cookie'] = [
          '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
          'veres-wallet.sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrb' +
          'xbprjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure; ' +
          'SameSite=None'
        ];
      })
      .expect(200, done);
  });
  it('Does not update SameSite for Firefox', done => {
    const server = createServer(handler);

    function handler(req, res) {
      res.setHeader('Set-Cookie', [
        '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
        'veres-wallet.sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrbxbp' +
        'rjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure; ' +
        'SameSite=None'
      ]);
      safariSameSiteFix(req, res, mockNext);
    }

    request(server)
      .get('/')
      .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; ' +
        'rv:42.0) Gecko/20100101 Firefox/42.0')
      .expect(res => {
        res.headers['set-cookie'] = [
          '_csrf=S2deWMA5zpIdea2yQljsHCdh; Path=/; Secure; SameSite=Strict',
          'veres-wallet.sid=s%3AjqFd8RlkzPVvjBAbY6U4k9P6_FW31NLP.JW6Zpp7Rnrb' +
          'xbprjS%2FvvIp%2BLshX4UbXHvIMaCRv1IJA; Path=/; HttpOnly; Secure; ' +
          'SameSite=None'
        ];
      })
      .expect(200, done);
  });
});

function createServer(handler) {
  return http.createServer((req, res) => {
    try {
      handler(req, res);
      res.statusCode = 200;
    } catch(err) {
      res.statusCode = 500;
      res.write(err.message);
    } finally {
      res.end();
    }
  });
}
