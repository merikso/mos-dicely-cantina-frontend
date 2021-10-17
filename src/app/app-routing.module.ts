
// import { AccountsComponent } from './components/accounts/accounts.component';
import { BlackjackComponent } from './components/blackjack/blackjack.component';
import { UserComponent } from './components/user/user.component';
import { CardsComponent } from './components/cards/cards.component';
import { MapComponent } from './components/map/map.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckComponent } from './components/deck/deck.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatchComponent } from './components/match/match.component';
import { RouletteComponent } from './components/roulette/roulette.component';
import { WarComponent } from './war/war.component';
// import { WartestComponent } from './components/wartest/wartest.component';



const routes: Routes = [

  {path: 'blackjack', component: BlackjackComponent},
  {path: 'cards', component: CardsComponent},
  {path: 'user', component: UserComponent},
  {path: 'map', component: MapComponent},
  // {path: 'accounts', component: AccountsComponent},
  {path: 'deck', component: DeckComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'match', component: MatchComponent},
  {path: 'roulette', component: RouletteComponent},
  {path: 'war', component: WarComponent},
  // {path: 'testwar', component: WartestComponent},
  {path: '', component: LoginComponent},
  {path: '**', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
