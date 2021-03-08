import {Component, OnInit, ViewChild} from '@angular/core';
import {PokemonService} from './services/pokemon.service';
import {PoModalComponent} from '@po-ui/ng-components';
import {Pokemon, PokemonResult} from './models/pokemon.model';

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

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemon();
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
