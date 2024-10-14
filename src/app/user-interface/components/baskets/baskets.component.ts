import { Component, OnInit } from '@angular/core';
import { BasesComponent, SpinnerType } from '../../../bases/bases.component';
import { BasketItemService } from '../../../services/core/models/basket-item.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListBasketItem } from '../../../contracts/basketItems/list-basket-item';
import { UpdateBasketItem } from '../../../contracts/basketItems/update-basket-item';
import { DeleteBasketItem } from '../../../contracts/basketItems/delete-basket-item';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.scss',
  animations: [
    trigger('fadeOut', [
      state('in', style({ opacity: 1 })),
      transition('* => void', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class BasketsComponent extends BasesComponent implements OnInit {

  constructor(private basketItemService: BasketItemService, spinnerService: NgxSpinnerService) { super(spinnerService) }

  ngOnInit(): void {
    this.getBasketItemList();
  }

  basketItems: ListBasketItem[] = []

  async getBasketItemList(): Promise<void> {
    this.showSpinner(SpinnerType.BallScaleMultiple);
    this.basketItems = await this.basketItemService.getBasketItems();
    this.hideSpinner(SpinnerType.BallScaleMultiple);
  };

  async decreaseOrIncreaseQuantity(basketItemId: string, quantity: number): Promise<void> {

    const basketItemProperties: UpdateBasketItem = {
      basketItemId: basketItemId,
      quantity: quantity
    };
    const basketItem = this.basketItems.find(item => item.basketItemId === basketItemId);
    if (basketItem) {
      basketItem.isUpdating = true;
      await new Promise(resolve => setTimeout(resolve, 300));
      await this.basketItemService.updateBasketItemQuantity(basketItemProperties);
      basketItem.quantity = quantity;
      basketItem.isUpdating = false;
    };
  };

  async deleteBasketItem(basketItemId: string) {

    const itemIndex = this.basketItems.findIndex(item => item.basketItemId === basketItemId);
    this.showSpinner(SpinnerType.BallScaleMultiple);
    this.basketItems.splice(itemIndex, 1);
    await new Promise(resolve => setTimeout(resolve, 100));

    await this.basketItemService.deleteBasketItem({ basketItemId });
    this.hideSpinner(SpinnerType.BallScaleMultiple);
  };

}
