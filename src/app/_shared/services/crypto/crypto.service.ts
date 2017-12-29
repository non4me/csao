import {Injectable} from '@angular/core';
import 'webcrypto-shim';

@Injectable()
export class CryptoService {

  importKey() {
    const jwk = {
      alg: 'RSA-OAEP',
      key_ops: ['encrypt'],
      ext: true,
      e: 'AQAB',
      kty: 'RSA',
      n: 'voFDcAgBSoGnffppOk_ESoQnPg6JOYXJZRv4SD6USJgsSzmFuyqw-En7LS-WvW6twN1wwJjJAyXbzohEZQEvsaR7uTXdcFqNERXef_b' +
      '-MZv7NdTm9BG2euG9zaHe5NZad89U5b9hGOS9RB_rBgIsg5VZXAuDF6HnltepsQFPWFc'
    };

    return crypto.subtle
      .importKey('jwk', jwk,
        {
          name: 'RSA-OAEP',
          hash: {name: 'SHA-1'}
        }, false, ['encrypt']) as Promise<CryptoKey>;
  }

  generateKey() {
    return crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {name: 'SHA-1'}
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  encrypt(value: string, key) {
    const params = {
      name: 'RSA-OAEP',
      hash: {name: 'SHA-1'}
    } as RsaOaepParams;

    return crypto.subtle.encrypt(
      params,
      key,
      this.stringToArrayBuffer(value) as BufferSource
    );
  }

  decrypt(data, key) {
    const params = {
      name: 'RSA-OAEP',
      hash: {name: 'SHA-1'}
    } as RsaOaepParams;

    return crypto.subtle.decrypt(
      params,
      key,
      data
    );
  }


  stringToArrayBuffer(string: string, base64 = false) {
    string = base64 ? atob(string) : string;
    const uint8Array = new Uint8Array(string.length);

    for (let i = 0; i < string.length; i++) {
      uint8Array[i] = string.charCodeAt(i);
    }

    return uint8Array.buffer;
  }

  arrayBufferToString(buffer, base64 = false) {
    let string = '';
    const bytes = new Uint8Array(buffer);

    for (let i = 0; i < bytes.length; i++) {
      string += String.fromCharCode(bytes[i]);
    }

    return base64 ? btoa(string) : string;
  }
}
