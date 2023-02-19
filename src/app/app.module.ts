import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

// Firebase¬
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getDatabase, provideDatabase} from '@angular/fire/database';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

// NgRx
import {StoreModule} from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {appReducers} from "./app.reducer";

import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    ScreenTrackingService, UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
