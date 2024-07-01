import * as crypto from 'crypto';
import * as http from 'http';
import { v1 as uuidV1 } from 'uuid';

export const greenNodejs = (bizCfg: any, callback: (chunk: any) => void) => {
  const path = bizCfg['path'];
  const clientInfo = bizCfg['clientInfo'];
  const requestBody = bizCfg['requestBody'];
  const greenVersion = bizCfg['greenVersion'];
  const hostname = bizCfg['hostname'];
  const gmtCreate = new Date().toUTCString();
  const md5 = crypto.createHash('md5');

  const requestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Content-MD5': md5.update(requestBody).digest().toString('base64'),
    Date: gmtCreate,
    'x-acs-version': greenVersion,
    'x-acs-signature-nonce': uuidV1(),
    'x-acs-signature-version': '1.0',
    'x-acs-signature-method': 'HMAC-SHA1',
  };

  signature(requestHeaders, bizCfg);

  const options = {
    hostname: hostname,
    port: 80,
    path: encodeURI(`${path}?clientInfo=${JSON.stringify(clientInfo)}`),
    method: 'POST',
    headers: requestHeaders,
  };

  const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      callback(chunk);
    });
  });

  req.write(requestBody);
  req.end();
};

const signature = (requestHeaders: any, bizCfg: any) => {
  const accessKeySecret = bizCfg['accessKeySecret'];
  const path = bizCfg['path'];
  const clientInfo = bizCfg['clientInfo'];

  const signature = [
    'POST\n',
    'application/json\n',
    `${requestHeaders['Content-MD5']}\n`,
    'application/json\n',
    `${requestHeaders['Date']}\n`,
    'x-acs-signature-method:HMAC-SHA1\n',
    `x-acs-signature-nonce:${requestHeaders['x-acs-signature-nonce']}\n`,
    'x-acs-signature-version:1.0\n',
    `x-acs-version:2017-01-12\n`,
    `${path}?clientInfo=${JSON.stringify(clientInfo)}`,
  ].join('');

  const authorization = crypto
    .createHmac('sha1', accessKeySecret)
    .update(signature)
    .digest('base64');

  requestHeaders.Authorization = `acs ${bizCfg['accessKeyId']}:${authorization}`;
};
