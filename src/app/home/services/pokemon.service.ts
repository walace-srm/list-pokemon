import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Pokemon, PokemonCompleted} from '../models/pokemon.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly initialUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'

  constructor(private http: HttpClient) {
  }

  getList(next?: string): Observable<Pokemon> {
    return this.http.get<PokemonCompleted>(next || this.initialUrl)
      .pipe(map((data:PokemonCompleted) => {
        const a: Pokemon = {
          next: data.next,
          results: data.results.map((res) => {
            return {
              id: this.searchById(res.url),
              name: res.name,
              url: res.url,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.searchById(res.url)}.png`,
              bigImage: `https://pokeres.bastionbot.org/images/pokemon/${this.searchById(res.url)}.png`
            };
          }),
        }
        return a
      }));
  }

  searchById(url: string) {
    const a = url;
    const id = a.substring(34, a.length - 1);
    return id;
  }
}
