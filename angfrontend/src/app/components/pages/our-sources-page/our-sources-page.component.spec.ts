import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurSourcesPageComponent } from './our-sources-page.component';

describe('OurSourcesPageComponent', () => {
  let component: OurSourcesPageComponent;
  let fixture: ComponentFixture<OurSourcesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurSourcesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurSourcesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
