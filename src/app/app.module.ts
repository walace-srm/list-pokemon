import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './+state/app.effects';
import {reducer, metaReducers, appFeatureKey} from './+state/app.reducer';
import { PokemonEffects } from './+state/pokemon/pokemon.effects';
import * as fromPokemonReducers from './+state/pokemon/pokemon.reducer'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
    StoreModule.forRoot(reducer, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    //StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forFeature(appFeatureKey, reducer),
    EffectsModule.forFeature([PokemonEffects]),
    StoreModule.forFeature(fromPokemonReducers.pokemonFeatureKey, fromPokemonReducers.reducer),
    //EffectsModule.forFeature([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
