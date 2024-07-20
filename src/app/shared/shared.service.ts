import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommunicationService {
  totalCartItems = signal(1);

  updateCartItems(totalCartItems: number) {
    this.totalCartItems.set(totalCartItems);
  }

  constructor() {}
}
