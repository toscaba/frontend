import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Review {
    id: number,
    eateryId: number,
    customerId: number,
    message: string,
    rating: number
}

export interface CreateReviewRequest {
    eateryId: number,
    customerId: number,
    message: string,
    rating: number
}

export interface UpdateReviewRequest {
    message: string,
    rating: number
}

const reviewUrl: string = 'http://localhost:8080/api/reviews';

  @Injectable({
    providedIn: 'root'
  })
  export class ReviewService {
    constructor(private http: HttpClient) { }
        
    // Get review by id
    getReview(id: number) {
        return this.http.get<Review>(`${reviewUrl}/${id}`);
    }

    // Get all reviews
    getReviews() {
      return this.http.get<Review>(`${reviewUrl}`);
    }

    // Get all reviews by eatery id
    getReviewsByEateryId(id: number) {
        return this.http.get<Review>(`${reviewUrl}/eatery/${id}`);
    }

    // Get all reviews by customer id
    getReviewsByCustomerId(id: number) {
        return this.http.get<Review>(`${reviewUrl}/customer/${id}`);
    }

    // Create new review
    createReview(reviewRequest: CreateReviewRequest): Observable<Review> {
      return this.http.post<Review>(`${reviewUrl}`, reviewRequest);
    }

    // Update existing review
    updateReservation(id: number, reviewRequest: UpdateReviewRequest): Observable<Review> {
        return this.http.put<Review>(`${reviewUrl}/${id}`, reviewRequest);
    }
  }