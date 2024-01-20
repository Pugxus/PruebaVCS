import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FipeComponent } from './fipe.component';

describe('FipeComponent', () => {
  let component: FipeComponent;
  let fixture: ComponentFixture<FipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
