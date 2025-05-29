import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  discoverMoviesByGenre(genreId: string) {
    return this.http.get(`${this.baseUrl}/discover/movie`, {
      params: {
        api_key: environment.tmdbApiKey,
        with_genres: genreId
      }
    });
  }

  searchMoviesAndActors(query: string) {
    return this.http.get<any>(`${this.baseUrl}/search/multi`, {
      params: {
        api_key: environment.tmdbApiKey,
        query
      }
    });
  }

  getMovieDetails(movieId: string) {
    return this.http.get(`${this.baseUrl}/movie/${movieId}`, {
      params: {
        api_key: environment.tmdbApiKey,
        append_to_response: 'videos,credits,similar'
      }
    });
  }

  getMovieVideos(id: string) {
    return this.http.get(`${this.baseUrl}/movie/${id}/videos?api_key=${environment.tmdbApiKey}`);
  }
  getFeaturedMovies() {
    return this.http.get(`${this.baseUrl}/movie/now_playing?api_key=${environment.tmdbApiKey}`);
  }



}
