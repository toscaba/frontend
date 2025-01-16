import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EateryManagerComponent } from './eatery-manager.component';

describe('EateryManagerComponent', () => {
  let component: EateryManagerComponent;
  let fixture: ComponentFixture<EateryManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EateryManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EateryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
