import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../layouts/container/container.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ CommonModule, RouterLink, ContainerComponent ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currDate: number = new Date().getFullYear();
  footerNav = [
    { title: "Quick Links", links: [ { url: "/", name: "Home" }, { url: "/about", name: "About" }, { url: "/medicinal-leaf-identification", name: "Leaf Detection" }, { url: "/ayurvedic-solutions", name: "Ayurvedic Solution" }, { url: "/faqs", name: "Faqs" }, { url: "/sources", name: "Our Sources" } ] },
    { title: "Contacts", contacts: [ "+91 620348XXXX", "sihcode4bucks@gmail.com" ] }
  ];
}
