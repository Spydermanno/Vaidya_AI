import { Component, ViewChild } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavRoutes {
  link?: string,
  name: string,
  icon: string,
  isMenu?: boolean,
  subroutes?: NavRoutes[];
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ MatButtonModule, MatMenuModule, MatIconModule, RouterLink, RouterLinkActive ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  navRoutes: NavRoutes[] = [
    { link: '/', name: "Home", icon: 'home' },
    { link: '/about', name: "About", icon: 'info' },
    { isMenu: true, name: "Our Services", subroutes: [ { link: "/medicinal-leaf-identification", name: "Medicinal Leaf Identification", icon: "🍃" }, { link: "/ayurvedic-solutions", name: "Ayurvedic Solutions", icon: "🌿" } ], icon: 'miscellaneous_services' },
    { link: '/faqs', name: "FAQs", icon: 'question_answer' },
    { link: '/sources', name: "Our Sources", icon: 'sources' },
  ];

  @ViewChild('servicesToggle') trigger!: MatMenuTrigger;
  isServiceMenuOpen: boolean = false;
  menuToggle() {
    if (this.isServiceMenuOpen) {
      this.trigger.closeMenu();
      this.isServiceMenuOpen = false;
    } else {
      this.trigger.openMenu();
      this.isServiceMenuOpen = true;
    }
  }

}
