import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-decrypt',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './decrypt.component.html',
  styleUrl: './decrypt.component.css'
})
export class DecryptComponent implements OnInit {
  constructor(private title: Title) {}
  
  ngOnInit(): void {
    this.title.setTitle('Decrypt - Password Manager')
  }
}
