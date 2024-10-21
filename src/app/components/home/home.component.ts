import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


type Options = {
  includeNumbers?: boolean;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeCharacter?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  generatedPassword: string | null = null;
  selectedValue: number = 15;

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Password Manager');
    this.generateRandomText();
  }

  updateValue(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedValue = +inputElement.value;
  }

  generateText(long: number, options: Options): string {
    let characters = "";
    let result = "";

    const characterSets: { [key: string]: string } = {
      includeUppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      includeLowercase: "abcdefghijklmnopqrstuvwxyz",
      includeNumbers: "0123456789",
      includeCharacter: ".,;:!?()[]{}-_¨`´~/\\*&%#$+-=><@^|…",
    };

    for (const [key, chars] of Object.entries(characterSets)) {
      if (options[key as keyof Options]) {
        characters += chars;
      }
    }

    if (characters.length === 0) {
      throw new Error(
        "You must include at least one type of character: uppercase, lowercase, numbers, or special characters."
      );
    }

    for (let i = 0; i < long; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  generateRandomText() {
    const options: Options = {
      includeNumbers: false,
      includeUppercase: false,
      includeLowercase: false,
      includeCharacter: true,
    };

    const length = this.selectedValue;
    try {
      this.generatedPassword = this.generateText(length, options);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      this.generatedPassword = null;
    }
  }
}