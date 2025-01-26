import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationHistoryDialog } from './reservation-history-dialog.component';

describe('ReservationHistoryDialogComponent', () => {
  let component: ReservationHistoryDialog;
  let fixture: ComponentFixture<ReservationHistoryDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationHistoryDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationHistoryDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
