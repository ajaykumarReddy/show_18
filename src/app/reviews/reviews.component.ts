import { Component, input, OnInit } from '@angular/core';
import { ProductReview } from '../shared/interfaces';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  standalone: true,
  imports: [],
})
export class ReviewsComponent implements OnInit {
  reviews = input.required<ProductReview[]>();

  constructor() {}

  ngOnInit() {}
}
