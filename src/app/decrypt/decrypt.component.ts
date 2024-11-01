import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-decrypt',
  standalone: true,
  imports: [NavbarComponent, FormsModule, RouterLink, NgClass, NgIf],
  templateUrl: './decrypt.component.html',
  styleUrls: ['./decrypt.component.css']
})
export class DecryptComponent implements OnInit {
  public originalText: string = '';
  public secretKey: string = '';
  public encryptedText: string = '';
  public decryptedText: string = '';
  showToast: boolean = false;
  showCopiedMessage: boolean = false;
  showWarningMessage: boolean = false;
  showErrorMessage: boolean = false;
  isFadingOut: boolean = false;

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Decrypt - Password Manager');
  }

  async decrypt() {
    if (this.secretKey && this.encryptedText) {
      try {
        const bytes = CryptoJS.AES.decrypt(this.encryptedText, this.secretKey);
        this.decryptedText = bytes.toString(CryptoJS.enc.Utf8);

        if (!this.decryptedText) {
          this.showErrorMessage = true;
          this.displayToast("The secret key is incorrect or the text cannot be decrypted.");
        } else {
          this.showErrorMessage = false;
        }
      } catch (err) {
        console.error("Error decrypting text:", err);
        this.showErrorMessage = true;
        this.displayToast("An error occurred during decryption.");
      }
    } else {
      this.showWarningMessage = true;
      this.displayToast("Please enter both the encrypted text and the secret key.");
    }

    setTimeout(() => {
      this.isFadingOut = true;
      setTimeout(() => {
        this.showWarningMessage = false;
        this.showErrorMessage = false;
        this.isFadingOut = false;
      }, 500);
    }, 3000);
  }

  async copyToClipboard() {
    if (this.decryptedText) {
      try {
        await navigator.clipboard.writeText(this.decryptedText);
        console.log('Text copied to clipboard');
        this.showCopiedMessage = true;
        this.displayToast("Text copied to clipboard.");

        setTimeout(() => {
          this.isFadingOut = true;
          setTimeout(() => {
            this.showCopiedMessage = false;
            this.isFadingOut = false;
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

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
