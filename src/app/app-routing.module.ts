import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin-interface/layout/layout.component';
import { DashboardsComponent } from './admin-interface/components/dashboards/dashboards.component';
import { HomesComponent } from './user-interface/components/homes/homes.component';

const routes: Routes = [

  {
    path: "admin-interface", component: LayoutComponent, children: [
      {
        path: "", component: DashboardsComponent
      },
      {
        path: "products", loadChildren: () => import("./admin-interface/components/products/products.module")
          .then(module => module.ProductsModule)
      },
      {
        path: "customers", loadChildren: () => import("./admin-interface/components/customers/customers.module")
          .then(module => module.CustomersModule)
      },
      {
        path: "orders", loadChildren: () => import("./admin-interface/components/orders/orders.module")
          .then(module => module.OrdersModule)
      },
      {
        path: "", component: HomesComponent
      },
      {
        path: "products", loadChildren: () => import("./user-interface/components/products/products.module")
        .then(module => module.ProductsModule)
      },
      {
        path: "baskets", loadChildren: () => import("./user-interface/components/baskets/baskets.module")
        .then(module => module.BasketsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
