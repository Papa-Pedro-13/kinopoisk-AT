export interface SimmilarMovie {
  id: number;
  name: string;
  enName: any;
  alternativeName: string;
  type: string;
  poster: Poster;
  year: number;
  rating: Rating;
}
export interface FilmCardProps {
  name: string;
  previewUrl: string;
  id: number;
  year: number;
  rating?: number;
}

export interface Poster {
  url: string;
  previewUrl: string;
}

export interface Rating {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: any;
}
