import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'] 
})
export class PasswordComponent implements OnInit {
  generatedPassword: string = ''; 

  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Password - Password Manager');
  }

  generateText(long: number, options: {
    includeNumbers?: boolean;
    includeUppercase?: boolean;
    includeLowercase?: boolean;
    includeCharacter?: boolean;
  }): string {
    let characters = "";
    let result = "";
    
    if (options.includeUppercase) {
      characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (options.includeLowercase) {
      characters += "abcdefghijklmnopqrstuvwxyz";
    }
    if (options.includeNumbers) {
      characters += "0123456789";
    }
    if (options.includeCharacter) {
      characters += ".,;:!?()[]{}-_¨`´~/\\*&%#$+-=><@^|…";
    }
    
    if (characters.length === 0) {
      throw new Error (
        "You must include at least one type of character: uppercase, lowercase or numbers."
      );
    }

    for (let i = 0; i < long; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  generatePassword(): void {
    this.generatedPassword = this.generateText(12, {
      includeNumbers: true,
      includeUppercase: true,
      includeLowercase: true,
      includeCharacter: true
    });
  }

}