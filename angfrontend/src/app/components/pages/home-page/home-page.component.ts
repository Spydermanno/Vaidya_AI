import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../section/hero-section/hero-section.component';
import { ServicesComponent } from '../../section/services/services.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ HeroSectionComponent, ServicesComponent ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
