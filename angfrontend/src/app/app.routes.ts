import { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { OurSourcesPageComponent } from './components/pages/our-sources-page/our-sources-page.component';
import { MedicinalLeafIdentificationPageComponent } from './components/pages/medicinal-leaf-identification-page/medicinal-leaf-identification-page.component';
import { AyurvedicSolutionsPageComponent } from './components/pages/ayurvedic-solutions-page/ayurvedic-solutions-page.component';

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "about",
    component: AboutPageComponent
  },
  {
    path: "faqs",
    component: FaqPageComponent
  },
  {
    path: "sources",
    component: OurSourcesPageComponent
  },
  {
    path: "medicinal-leaf-identification",
    component: MedicinalLeafIdentificationPageComponent
  },
  {
    path: "ayurvedic-solutions",
    component: AyurvedicSolutionsPageComponent
  }
];
