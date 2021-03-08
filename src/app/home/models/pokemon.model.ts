export interface Pokemon {
  next: string;
  results: PokemonResult[];
}

export interface PokemonCompleted {
  count: number;
  next: string;
  previous: string;
  results: PokemonResultOriginal[]
}

export interface PokemonResultOriginal {
  name: string;
  url: string;
}

export interface PokemonResult {
  id: string;
  name: string;
  url: string;
  image: string;
  bigImage: string;
}
