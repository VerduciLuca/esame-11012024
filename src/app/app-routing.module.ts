import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { FavouritesComponent } from './components/favourites/favourites.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'country/:id', component: DetailComponent },
  { path: 'favourites', component: FavouritesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
