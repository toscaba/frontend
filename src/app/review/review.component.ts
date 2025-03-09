import { Component, inject, Input, OnInit } from '@angular/core';
import { EateryViewModel } from '../model/eatery';
import { CustomerViewModel } from '../model/customer';
import { ReviewViewModel } from '../model/review';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CreateReviewRequest, ReviewService } from '../services/review.service';
import { EateryService } from '../services/eatery.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-review',
  imports: [
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})

export class ReviewComponent implements OnInit {
  eateryViewModel: EateryViewModel | undefined;
  customerViewModel: CustomerViewModel | undefined;
  dialog = inject(MatDialog);
  private reviewViewModel: ReviewViewModel = {
    id: 0,
    eateryId: 0,
    customerId: 0,
    message: "",
    rating: 0
  };
  @Input() message: string | undefined;
  @Input() rating: number | undefined;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private eateryService: EateryService,
    private reviewService: ReviewService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const eateryIdFromRoute = Number(routeParams.get('eateryId'));
  
    this.eateryService?.getEatery(eateryIdFromRoute).subscribe(eatery => {
      this.eateryViewModel = eatery;
    });

    this.authService.currentCustomer.subscribe(customer => this.customerViewModel = customer);
  }

  onSubmit() {
    if(!this.rating) {
      alert('Fill in required fields marked with *')
      return;
    }

    let reviewRequest: CreateReviewRequest = {
      customerId: this.customerViewModel?.id ?? 0,
      eateryId: this.eateryViewModel?.id ?? 0,
      message: this.message ?? "",
      rating: this.rating
    }

    this.reviewService.createReview(reviewRequest).subscribe({
      next: (review) => this.success(review),
      error: (e) => this.fail(e)
    })
  }

  success(review: ReviewViewModel) {
    this.reviewViewModel = review;
    this.reviewViewModel.eateryName = this.eateryViewModel?.name
    this.dialog.open(Dialog, { data: { isSuccess: true, review: this.reviewViewModel } })
    this.router.navigateByUrl('');
  }

  fail(e: any) {
    this.reviewViewModel.eateryName = this.eateryViewModel?.name
    this.dialog.open(Dialog, { data: { isSuccess: false, review: this.reviewViewModel } })
  }
}

@Component({
  selector: 'app-review',
  templateUrl: './review_dialog.component.html',
  imports: [MatDialogTitle, MatDialogContent, CommonModule]
})
export class Dialog {
  data = inject(MAT_DIALOG_DATA);
}