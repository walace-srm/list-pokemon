import { createReducer, on } from '@ngrx/store';
import * as PokemonActions from './pokemon.actions';
import {PokemonResult} from '../../home/models/pokemon.model';

export const pokemonFeatureKey = 'pokemon';

export interface State {
  next: string;
  list: PokemonResult[];
}

export const initialState: State = {
  next: '',
  list: []
};


export const reducer = createReducer(
  initialState,

  on(PokemonActions.loadPokemons, state => state),
  on(PokemonActions.loadPokemonsSuccess, (state, action) => {
    return {
      ...state,
      next: action.data.next,
      list: action.data.results
    }
  }),
  on(PokemonActions.loadPokemonsFailure, (state, action) => state),

);

