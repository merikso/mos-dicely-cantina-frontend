

import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './components/cards/cards.component';
import { DealerComponent } from './components/dealer/dealer.component';
import { UserComponent } from './components/user/user.component';
import { DeckComponent } from './components/deck/deck.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlackjackComponent } from './components/blackjack/blackjack.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
// import { AccountsComponent } from './components/accounts/accounts.component';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from './services/user.service';
import { BasicAuthHtppInterceptorService } from './services/basic-auth-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouletteComponent } from './components/roulette/roulette.component';
import { MatchComponent } from './components/match/match.component';
import { WarComponent } from './war/war.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlipanimationComponent } from './components/flipanimation/flipanimation.component';



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
    // AccountsComponent,
    NavComponent,
    RegisterComponent,
    RouletteComponent,
    MatchComponent,
    WarComponent,
    FlipanimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
