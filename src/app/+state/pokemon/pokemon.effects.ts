import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, mergeMap} from 'rxjs/operators';
import { of } from 'rxjs';

import * as PokemonActions from './pokemon.actions';
import {PokemonService} from '../../home/services/pokemon.service';



@Injectable()
export class PokemonEffects {

  loadPokemons$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(PokemonActions.loadPokemons),
      mergeMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.pokemonService.getList().pipe(
          map(data => {
            return PokemonActions.loadPokemonsSuccess({ data })
          }),
          catchError(error => of(PokemonActions.loadPokemonsFailure({ error }))))
      )
    );
  });

  constructor(private actions$: Actions,
              private pokemonService: PokemonService) {}

}
