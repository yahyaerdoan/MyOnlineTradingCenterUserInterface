import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ListProduct } from '../../../../contracts/listproduct';
import { ProductService } from '../../../../services/common/models/product.service';
import { BasesComponent, SpinnerType } from '../../../../bases/bases.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  AlertifyService,
  MessageType,
  Position,
} from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
})
export class ListProductComponent extends BasesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
  ];
  dataSource: MatTableDataSource<ListProduct> | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertifyService: AlertifyService
  ) {
    super(spinner);
  }

  async ngOnInit() {
    await this.getProducts();
  }

  async getProducts() {
    this.showSpinner(SpinnerType.BallScaleMultiple);
    await this.productService
      .read(
        () => this.hideSpinner(SpinnerType.BallScaleMultiple),
        (errorMessage) =>
          this.alertifyService.message(errorMessage, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight,
          })
      )
      .then((data: ListProduct[]) => {
        this.dataSource = new MatTableDataSource<ListProduct>(data);
        this.dataSource.paginator = this.paginator;
      });
  }
}
