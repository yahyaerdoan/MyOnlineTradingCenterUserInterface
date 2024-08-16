import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { CreateProductComponent } from './create-product/create-product.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductsRoutingModule } from './products-routing.module';
import { ListProductComponent } from './list-product/list-product.component';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDirective } from '../../../directives/admin/delete.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { DialogModule } from '../../../dialogs/dialog.module';
import { FileUploadModule } from '../../../services/shared/components/file-upload/file-upload.module';





@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    ListProductComponent,
    DeleteDirective,
   // DeleteDialogComponent    

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: ProductsComponent}
    ]),
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ProductsRoutingModule,
    MatPaginator, MatPaginatorModule,
    MatTableModule,
    MatIconModule,
   // MatDialogModule,
    FileUploadModule,
    DialogModule 

  ]
})
export class ProductsModule { }
