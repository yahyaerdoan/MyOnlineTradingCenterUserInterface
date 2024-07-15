import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin-interface/layout/layout.component';
import { DashboardsComponent } from './admin-interface/components/dashboards/dashboards.component';
import { HomesComponent } from './user-interface/components/homes/homes.component';

const routes: Routes = [
  {
    path: 'admin-interface',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardsComponent,
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./admin-interface/components/products/products.module').then(m=> m.ProductsModule),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import(
            './admin-interface/components/customers/customers.module'
          ).then((module) => module.CustomersModule),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./admin-interface/components/orders/orders.module').then(
            (module) => module.OrdersModule
          ),
      },
    ],
  },
  {
    path: '',
    component: HomesComponent,
  },
  {
    path: 'baskets',
    loadChildren: () =>
      import('./user-interface/components/baskets/baskets.module').then(
        (module) => module.BasketsModule
      ),
  },
  {
    path: 'blogs',
    loadChildren: () =>
      import('./user-interface/components/blogs/blogs.module').then(
        (module) => module.BlogsModule
      ),
  },
  {
    path: 'footers',
    loadChildren: () =>
      import('./user-interface/components/footers/footers.module').then(
        (module) => module.FootersModule
      ),
  },
  {
    path: 'headers',
    loadChildren: () =>
      import('./user-interface/components/headers/headers.module').then(
        (module) => module.HeadersModule
      ),
  },
  {
    path: 'heros',
    loadChildren: () =>
      import('./user-interface/components/heros/heros.module').then(
        (module) => module.HerosModule
      ),
  },
  {
    path: 'populars',
    loadChildren: () =>
      import('./user-interface/components/populars/populars.module').then(
        (module) => module.PopularsModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./user-interface/components/products/products.module').then(
        (module) => module.ProductsModule
      ),
  },
  {
    path: 'testimonials',
    loadChildren: () =>
      import(
        './user-interface/components/testimonials/testimonials.module'
      ).then((module) => module.TestimonialsModule),
  },
  {
    path: 'we-helps',
    loadChildren: () =>
      import('./user-interface/components/we-helps/we-helps.module').then(
        (module) => module.WeHelpsModule
      ),
  },
  {
    path: 'why-chooses',
    loadChildren: () =>
      import('./user-interface/components/why-chooses/why-chooses.module').then(
        (module) => module.WhyChoosesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
