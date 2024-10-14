import { Component, OnInit } from '@angular/core';
import { BasesComponent, SpinnerType } from '../../../bases/bases.component';
import { BasketItemService } from '../../../services/core/models/basket-item.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListBasketItem } from '../../../contracts/basketItems/list-basket-item';
import { UpdateBasketItem } from '../../../contracts/basketItems/update-basket-item';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.scss'
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

    this.showSpinner(SpinnerType.BallScaleMultiple);
    const basketItem: UpdateBasketItem = {
      basketItemId: basketItemId,
      quantity: quantity,
    }
    await this.basketItemService.updateBasketItemQuantity(basketItem)
    this.hideSpinner(SpinnerType.BallScaleMultiple);

    console.log("Basket Item ID:", basketItemId);
    console.log("Basket Item:", basketItem);


  };

}
