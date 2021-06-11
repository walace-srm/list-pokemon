import {Component, OnInit, ViewChild} from '@angular/core';
import {PokemonService} from './services/pokemon.service';
import {PoModalComponent} from '@po-ui/ng-components';
import {Pokemon, PokemonResult} from './models/pokemon.model';
import {select, Store} from '@ngrx/store';
import * as PokemonActions from '../+state/pokemon/pokemon.actions';
import * as PokemonSelectors from '../+state/pokemon/pokemon.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(PoModalComponent, {static: true}) modal: any;

  public pokemonData: Pokemon | undefined;
  public pokemonList: PokemonResult[] = [];
  public loadingImage: string = '';
  public loadingName: string = '';
  public next: string = '';

  public pokemonList$: Observable<PokemonResult[]>;
  public pokemonNext$: Observable<any>;

  constructor(private pokemonService: PokemonService,
              private store: Store) {
    this.pokemonList$ = this.store.pipe(select(PokemonSelectors.getPokemonList));
    this.pokemonNext$ = this.store.pipe(select(PokemonSelectors.getPokemonNext));

    this.pokemonList$.subscribe((data: any) => {
      this.pokemonList = data;
      this.pokemonData = data;
      console.log(data);
    });

    this.pokemonNext$.subscribe(data => {
      this.next = data
    });
  }

  ngOnInit(): void {
    this.loadPokemon();
    this.fetchPokemon()
  }

  loadPokemon() {
    this.store.dispatch(PokemonActions.loadPokemons());
  }

  fetchPokemon(next?: string) {
    this.pokemonService.getList(next).subscribe((data: Pokemon) => {
      this.pokemonData = data;
      this.pokemonList = [...this.pokemonList, ...data.results];
    });
  }

  openModal(img: string, name: string) {
    this.loadingImage = img;
    this.loadingName = name;
    this.modal.open();
  }
}
