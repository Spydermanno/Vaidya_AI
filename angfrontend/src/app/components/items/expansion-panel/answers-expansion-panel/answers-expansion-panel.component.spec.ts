import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersExpansionPanelComponent } from './answers-expansion-panel.component';

describe('AnswersExpansionPanelComponent', () => {
  let component: AnswersExpansionPanelComponent;
  let fixture: ComponentFixture<AnswersExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswersExpansionPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswersExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
