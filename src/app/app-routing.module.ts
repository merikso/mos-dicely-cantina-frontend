import { BlackjackComponent } from './components/blackjack/blackjack.component';
import { CardsComponent } from './components/cards/cards.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckComponent } from './components/deck/deck.component';

const routes: Routes = [

  {path: 'blackjack', component: BlackjackComponent},
  {path: 'cards', component: CardsComponent},
  {path: '', component: DeckComponent},
  {path: '**', component: DeckComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
