import { CardsComponent } from './components/cards/cards.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckComponent } from './components/deck/deck.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [

  {path: 'cards', component: CardsComponent},
  {path: '', component: LoginComponent},
  {path: '**', component: DeckComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
