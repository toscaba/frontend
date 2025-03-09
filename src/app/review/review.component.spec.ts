import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewComponent } from './review.component'

describe('ReviewComponent', () => {
  it('should mount', () => {
    cy.mount(ReviewComponent)
  })
})

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});