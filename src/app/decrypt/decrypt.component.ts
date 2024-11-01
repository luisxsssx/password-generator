import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-decrypt',
  standalone: true,
  imports: [NavbarComponent, FormsModule],
  templateUrl: './decrypt.component.html',
  styleUrl: './decrypt.component.css'
})
export class DecryptComponent implements OnInit {
  public originalText: string = '';
  public secretKey: string = '';
  public encryptedText: string = '';
  public decryptedText: string = '';

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Decrypt - Password Manager')
  }

  decrypt() {
    if (this.secretKey) {
      const bytes = CryptoJS.AES.decrypt(this.encryptedText, this.secretKey);
      this.decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    } else {
      alert('Please, enter the secret key');
    }
  }


}