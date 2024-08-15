import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ListProduct } from '../../../../contracts/products/listproduct';
import { ProductService } from '../../../../services/common/models/product.service';
import { BasesComponent, SpinnerType } from '../../../../bases/bases.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  AlertifyService,
  MessageType,
  Position,
} from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../../../services/common/dialog.service';
import { AddProductImageDialogComponent } from '../../../../dialogs/add-product-image-dialog/add-product-image-dialog.component';

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
    'actions',
  ];
  dataSource: MatTableDataSource<ListProduct> | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }
 
  async ngOnInit() {
    await this.getProducts();
  }
  async changePageAndData() {
    await this.getProducts();
  }
  async getProducts() {
    this.showSpinner(SpinnerType.BallScaleMultiple);
    await this.productService
      .read(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.BallScaleMultiple),
        (errorMessage) =>
          this.alertifyService.message(errorMessage, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight,            
          })
      )
      .then((data: { totalDataCount: number; products: ListProduct[] }) => {
        this.dataSource = new MatTableDataSource<ListProduct>(data.products);
        this.paginator.length = data.totalDataCount;
      }) .finally(() => {
        this.hideSpinner(SpinnerType.BallScaleMultiple);
      });
  }

  updateProduct(product: any) {
    // Navigate to the update product page or open a dialog
  }

  addProductImage(id: string){
    this.dialogService.openDialog({
      componentType: AddProductImageDialogComponent,
      data: id,
      //options:{ width: '400px'}      
    })

  }
}
