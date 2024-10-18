import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Title } from '@angular/platform-browser';
import { PasswordComponent } from "../../password/password.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, PasswordComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  constructor(private title: Title){}

  ngOnInit(): void {
    this.title.setTitle('Password Manager')
  }

}
