import { NgModule  } from '@angular/core';
import { LayoutComponent } from './admin-interface/layout/layout.component';
import { DashboardsComponent } from './admin-interface/components/dashboards/dashboards.component';
import { HomesComponent } from './user-interface/components/homes/homes.component';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard } from './guards/commons/authentication.guard';

const routes: Routes = [
  { path: 'admin-interface', component: LayoutComponent, children: [
      { path: '', component: DashboardsComponent },
      { path: 'products', loadChildren: () => import('./admin-interface/components/products/products.module').then(m => m.ProductsModule), canActivate: [authenticationGuard] },
      { path: 'customers', loadChildren: () => import('./admin-interface/components/customers/customers.module').then(m => m.CustomersModule), canActivate: [authenticationGuard] },
      { path: 'orders', loadChildren: () => import('./admin-interface/components/orders/orders.module').then(m => m.OrdersModule), canActivate: [authenticationGuard] },
    ], canActivate: [authenticationGuard]
  },
  { path: '', component: HomesComponent },
  { path: 'baskets', loadChildren: () => import('./user-interface/components/baskets/baskets.module').then(m => m.BasketsModule) },
  { path: 'blogs', loadChildren: () => import('./user-interface/components/blogs/blogs.module').then(m => m.BlogsModule) },
  { path: 'footers', loadChildren: () => import('./user-interface/components/footers/footers.module').then(m => m.FootersModule) },
  { path: 'headers', loadChildren: () => import('./user-interface/components/headers/headers.module').then(m => m.HeadersModule) },
  { path: 'heros', loadChildren: () => import('./user-interface/components/heros/heros.module').then(m => m.HerosModule) },
  { path: 'populars', loadChildren: () => import('./user-interface/components/populars/populars.module').then(m => m.PopularsModule) },
  { path: 'products', loadChildren: () => import('./user-interface/components/products/products.module').then(m => m.ProductsModule) },
  { path: 'testimonials', loadChildren: () => import('./user-interface/components/testimonials/testimonials.module').then(m => m.TestimonialsModule) },
  { path: 'we-helps', loadChildren: () => import('./user-interface/components/we-helps/we-helps.module').then(m => m.WeHelpsModule) },
  { path: 'why-chooses', loadChildren: () => import('./user-interface/components/why-chooses/why-chooses.module').then(m => m.WhyChoosesModule) },
  { path: 'shops', loadChildren: () => import('./user-interface/components/shops/shops.module').then(m => m.ShopsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
