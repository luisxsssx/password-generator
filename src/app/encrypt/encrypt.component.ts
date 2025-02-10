import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-encrypt',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgIf, NgClass],
  templateUrl: './encrypt.component.html',
  styleUrls: ['./encrypt.component.css']
})
export class EncryptComponent implements OnInit {
  public originalText: string = '';
  public secretKey: string = '';
  public encryptedText: string = '';
  public decryptedText: string = '';
  showToast: boolean = false;
  selectLength: number = 10;
  showCopiedMessage: boolean = false;
  showWarningMessage: boolean = false;
  isFadingOut: boolean = false;

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Encrypt - Password Manager');
  }

  generateText(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  randomSecretKey() {
    const length = this.selectLength;
    this.secretKey = this.generateText(length);
    console.log('Generated Secret Key:', this.secretKey);
  }

  async encrypt() {
    if (this.secretKey && this.originalText) {
      try {
        this.encryptedText = CryptoJS.AES.encrypt(this.originalText, this.secretKey).toString();
        this.showWarningMessage = false;
      } catch (err) {
        console.error("Error encrypting text:", err);
      }
    } else {
      this.showWarningMessage = true;
      console.error("Please enter both a secret key and original text.");

      setTimeout(() => {
        this.isFadingOut = true;
        setTimeout(() => {
          this.showWarningMessage = false;
          this.isFadingOut = false;
        }, 500);
      }, 3000);
    }
  }

  async copyToClipboard() {
    if (this.encryptedText) {
      try {
        await navigator.clipboard.writeText(this.encryptedText);
        console.log('Text copied to clipboard');
        this.showCopiedMessage = true;
        this.isFadingOut = false;

        setTimeout(() => {
          this.isFadingOut = true;
          setTimeout(() => {
            this.showCopiedMessage = false;
          }, 500);
        }, 3000);
      } catch (err) {
        console.error('Error when copying to clipboard', err);
      }
    } else {
      console.error("No text generated to copy");
    }
  }

  displayToast(message: string) {
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}
