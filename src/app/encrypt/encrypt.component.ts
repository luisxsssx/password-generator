import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-encrypt',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './encrypt.component.html',
  styleUrl: './encrypt.component.css'
})
export class EncryptComponent implements OnInit{
  
  constructor(private title: Title) {}
  
  ngOnInit(): void {
    this.title.setTitle('Encrypt - Password Manager')
  }

}
