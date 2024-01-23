import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyurvedicSolutionsPageComponent } from './ayurvedic-solutions-page.component';

describe('AyurvedicSolutionsPageComponent', () => {
  let component: AyurvedicSolutionsPageComponent;
  let fixture: ComponentFixture<AyurvedicSolutionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AyurvedicSolutionsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AyurvedicSolutionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
