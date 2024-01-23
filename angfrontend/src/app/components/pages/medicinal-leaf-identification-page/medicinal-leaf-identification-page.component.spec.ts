import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinalLeafIdentificationPageComponent } from './medicinal-leaf-identification-page.component';

describe('MedicinalLeafIdentificationPageComponent', () => {
  let component: MedicinalLeafIdentificationPageComponent;
  let fixture: ComponentFixture<MedicinalLeafIdentificationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicinalLeafIdentificationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicinalLeafIdentificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
