import { Component, OnInit } from '@angular/core';
import { BasesComponent, SpinnerType } from '../../../bases/bases.component';
import { BasketItemService } from '../../../services/core/models/basket-item.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListBasketItem } from '../../../contracts/basketItems/list-basket-item';

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

}
