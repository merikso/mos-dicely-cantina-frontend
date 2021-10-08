import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './components/cards/cards.component';
import { DealerComponent } from './components/dealer/dealer.component';
import { UserComponent } from './components/user/user.component';
import { DeckComponent } from './components/deck/deck.component';
import { HttpClientModule } from '@angular/common/http';
import { BlackjackComponent } from './components/blackjack/blackjack.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    DealerComponent,
    UserComponent,
    DeckComponent,
    BlackjackComponent,
    LoginComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
