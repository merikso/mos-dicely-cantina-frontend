import { CardsComponent } from './components/cards/cards.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckComponent } from './components/deck/deck.component';

const routes: Routes = [

  {path: 'cards', component: CardsComponent},
  {path: '', component: DeckComponent},
  {path: '**', component: DeckComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
