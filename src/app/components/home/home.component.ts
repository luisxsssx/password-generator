import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

type Options = {
  includeNumbers?: boolean;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeCharacter?: boolean;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  generatedPassword: string | null = null;
  selectedValue: number = 15;
  showCopiedMessage: boolean = false;
  isFadingOut: boolean = false;

  options: Options = {
    includeNumbers: true,
    includeUppercase: true,
    includeLowercase: true,
    includeCharacter: true,
  };

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Password Manager');
    this.generateRandomText();
  }

  updateValue(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedValue = +inputElement.value;
    this.generateRandomText();
  }

  increaseValue() {
    if (this.selectedValue < 32) {
      this.selectedValue++;
      this.generateRandomText();
    }
  }

  decreaseValue() {
    if (this.selectedValue > 1) {
      this.selectedValue--;
      this.generateRandomText();
    }
  }

  toggleCheckbox(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const checkboxName = inputElement.nextElementSibling?.textContent?.trim(); // Obtiene el texto del label

    if (checkboxName === 'Include Uppercase Letters') {
      this.options.includeUppercase = inputElement.checked;
    }
    // Agrega más condiciones aquí si tienes más checkboxes
    this.generateRandomText(); // Regenera la contraseña después de cambiar la opción
  }

  generateText(length: number, options: Options): string {
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
      throw new Error("You must include at least one type of character: uppercase, lowercase, numbers, or special characters.");
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = this.getRandomInt(0, characters.length - 1);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateRandomText() {
    const length = this.selectedValue;
    try {
      const password = this.generateText(length, this.options);
      this.animatePasswordDisplay(password);
    } catch (error) {
      console.error("Error generating password:", error instanceof Error ? error.message : error);
      this.generatedPassword = null;
    }
  }

  animatePasswordDisplay(password: string) {
    this.generatedPassword = "";
    let index = 0;

    const interval = setInterval(() => {
      if (index < password.length) {
        this.generatedPassword += password[index];
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  }

  async copyToTheHolder() {
    if (this.generatedPassword) {
      try {
        await navigator.clipboard.writeText(this.generatedPassword);
        console.log("Text copied to clipboard");
        this.showCopiedMessage = true;
        this.isFadingOut = false;

        setTimeout(() => {
          this.isFadingOut = true;
          setTimeout(() => {
            this.showCopiedMessage = false;
          }, 500);
        }, 3000);
      } catch (err) {
        console.error("Error when copying to clipboard", err);
      }
    } else {
      console.error("No password generated to copy");
    }
  }
}
