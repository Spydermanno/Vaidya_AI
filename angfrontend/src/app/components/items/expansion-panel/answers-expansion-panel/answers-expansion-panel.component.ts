import { Component, Input } from '@angular/core';
import { ContainerComponent } from '../../../layouts/container/container.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AnswerType } from '../../../../modals';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-answers-expansion-panel',
  standalone: true,
  imports: [ ContainerComponent, MatProgressSpinnerModule, MatExpansionModule, CommonModule ],
  templateUrl: './answers-expansion-panel.component.html',
  styleUrl: './answers-expansion-panel.component.css',
})
export class AnswersExpansionPanelComponent {
  @Input() answersData!: AnswerType[];
  @Input() isLoading!: boolean;
}
