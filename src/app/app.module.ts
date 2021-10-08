import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './components/cards/cards.component';
import { DealerComponent } from './components/dealer/dealer.component';
import { UserComponent } from './components/user/user.component';
import { DeckComponent } from './components/deck/deck.component';
import { NavComponent } from './components/nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    DealerComponent,
    UserComponent,
    DeckComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
