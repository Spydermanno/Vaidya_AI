import { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "about",
    loadComponent: () => import('./components/pages/about-page/about-page.component').then(m => m.AboutPageComponent),

  },
  {
    path: "faqs",
    loadComponent: () => import('./components/pages/faq-page/faq-page.component').then(m => m.FaqPageComponent),

  },
  {
    path: "sources",
    loadComponent: () => import('./components/pages/our-sources-page/our-sources-page.component').then(m => m.OurSourcesPageComponent),

  },
  {
    path: "medicinal-leaf-identification",
    loadComponent: () => import('./components/pages/medicinal-leaf-identification-page/medicinal-leaf-identification-page.component').then(m => m.MedicinalLeafIdentificationPageComponent),

  },
  {
    path: "ayurvedic-solutions",
    loadComponent: () => import('./components/pages/ayurvedic-solutions-page/ayurvedic-solutions-page.component').then(m => m.AyurvedicSolutionsPageComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./components/pages/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent),
  },
];
