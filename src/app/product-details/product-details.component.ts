import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { ReviewsComponent } from '../reviews/reviews.component';
import { CurrencyPipe } from '@angular/common';
import { CommunicationService } from '../shared/shared.service';
import { ProductReview } from '../shared/interfaces';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ReviewsComponent, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailsComponent {
  communicationService = inject(CommunicationService);
  cartSize = signal(1);

  product = signal({
    id: 1,
    name: 'Sleepytime Delta-9 THC Gummies',
    namePath: 'sleepytime-delta-9-thc-gummies',
    description: '1g',
    price: 29,
    stockQuantity: 13,
    stockUnit: 1,
    isSplit: false,
    numREF: 186909,
    imgURL:
      'https://images.ctfassets.net/9k15kskmpr22/7m4TlRQuuLzFMMUPcE0RQ6/792e9f1124a3c94d2caaf1de42dfd8e2/15mg_D9_sleepy_3.jpg',
    categories: ['Sleepy'],
    username: 'admin',
    city: 'New York',
  });

  reviews = signal<ProductReview[]>([
    {
      id: 1,
      productId: 1,
      username: 'admin',
      rating: 4,
      comment: 'Great product, highly recommended!',
      reviewDate: '2024-06-11T22:12:33.597Z',
    },
    {
      id: 2,
      productId: 1,
      username: 'admin',
      rating: 3,
      comment: 'Good product, but could be better.',
      reviewDate: '2024-06-11T22:12:33.597Z',
    },
    {
      id: 3,
      productId: 1,
      username: 'admin',
      rating: 5,
      comment: 'Excellent product, highly recommended!',
      reviewDate: '2024-06-11T22:12:33.597Z',
    },
  ]);

  totalReviews = computed(() => this.reviews().length);

  reviewAverage = computed(() => {
    const total = this.reviews().reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return total / this.totalReviews();
  });

  totalCartPrice = computed(() => this.product().price * this.cartSize());

  addToCart() {
    this.cartSize.update((size) => size + 1);
    this.communicationService.updateCartItems(this.cartSize());
  }

  deleteToCart() {
    if (this.cartSize() > 0) {
      this.cartSize.update((size) => size - 1);
    }
    this.communicationService.updateCartItems(this.cartSize());
  }
}
