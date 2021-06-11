import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPokemon from './pokemon.reducer';
import {State} from './pokemon.reducer';

export const selectPokemonState = createFeatureSelector<fromPokemon.State>(
  fromPokemon.pokemonFeatureKey
);

export const getPokemonList = createSelector(
  selectPokemonState,
  (state: State) => {
    return state.list;
  }
);

export const getPokemonNext = createSelector(
  selectPokemonState,
  (state: State) => {
    return state.next;
  }
);
