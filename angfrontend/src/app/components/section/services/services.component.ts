import { Component } from '@angular/core';
import { ContainerComponent } from '../../layouts/container/container.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ ContainerComponent, CommonModule, RouterLink ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  serviceDetails = [
    {
      title: "Medicianl Leaf Identification",
      description: "This service allows the user to post images of medicinal leaves .The CNN model is trained so as to give the basic drugs and their details  pertaining to that particular leaf.Moreover,it also gives the formulations related to those particular drugs so that the user can gain an indepth knowledge of that particular leaf.In that section there is also a listing of the various diseases that can be cured from that particular leaf.",
      img: "assets/leaves.jpg",
      link: "/medicinal-leaf-identification"
    },
    {
      title: "Ayurvedic solutions for diseases",
      description: "Ayurved is one of the most potent forms of treatment therapies to have ever existed.This was discovered by the ancient Rishis and Munis a long time ago .But with the advent of time people have forgot this great therapy.Poor documentation and lack of concise and clear information lead to people forgetting this great science.We  at Ayursol aim to provide the best form of knowledge available in the Ayurvedic scriptures in the most efficient way possible and we aim to take it to every strata of society.",
      link: "/ayurvedic-solutions",
      img: "assets/ayurved.jpg"
    }
  ];
}
