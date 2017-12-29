import {Component} from '@angular/core';
import {CryptoService} from './_shared/services/crypto/crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  log = 'plainText: test \n';

  constructor(private crypto: CryptoService) {
  }

  next() {
    const plainString = 'test';

    // test publicKey
    const publicKey = this.crypto.importKey() as Promise<CryptoKey>;
    publicKey
      .then((key) => {

        this.crypto.encrypt(plainString, key)
          .then((encryptedData) => {
            this.log += 'encrypted with importKey: ' + this.crypto.arrayBufferToString(encryptedData, true) + '\n';
          });
      })
      .catch((err) => {
        this.log += 'error: ' + err  + '\n';
      });

    // test generateKey
    const keys = this.crypto.generateKey() as Promise<CryptoKeyPair>;
    keys
      .then((key) => {

        this.crypto.encrypt(plainString, key.publicKey)
          .then((encryptedData) => {
            this.log += 'encrypted with generateKey: ' + this.crypto.arrayBufferToString(encryptedData, true) + '\n';

            this.crypto.decrypt(encryptedData, key.privateKey)
              .then((decryptedData) => {
                this.log += 'decrypted with generateKey: ' + this.crypto.arrayBufferToString(decryptedData)  + '\n';
              });
          });
      })
      .catch((err) => {
        this.log += 'error: ' + err  + '\n';
      });
  }


}
