import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-encrypt',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgIf, RouterLink],
  templateUrl: './encrypt.component.html',
  styleUrls: ['./encrypt.component.css']
})
export class EncryptComponent implements OnInit {
  public originalText: string = '';
  public secretKey: string = '';
  public encryptedText: string = '';
  public decryptedText: string = '';
  showToast: boolean = false;
  selectLenght: number = 10;
  shwoCopiedMessage: boolean = false;
  isFadingOut: boolean = false;

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Encrypt - Password Manager')
  }

  generateText(lenght: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < lenght; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  randomSecretKey() {
    const length = this.selectLenght;
    try {
      const key = this.generateText(length);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  }

  encrypt() {
    if (this.secretKey && this.originalText) {
      this.encryptedText = CryptoJS.AES.encrypt(this.originalText, this.secretKey).toString();
    } else {
      alert('Please, enter the secret key and original text');
    }
  }

  async copyToClipboard() {
    if (this.generateText !== null) {
      try {
        await navigator.clipboard.writeText(this.encryptedText);
        console.log('Text copied to clipboard');
        this.shwoCopiedMessage = true;
        this.isFadingOut = false;

        setTimeout(() => {
          this.isFadingOut = true;
          setTimeout(() => {
            this.shwoCopiedMessage = false;
          }, 500);
        }, 3000);
      } catch (err) {
        console.error('Error when copying to clipboard', err);
      }
    } else {
      console.error("No text generated copy");
    }
  }

  displayToast(message: string) {
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

}