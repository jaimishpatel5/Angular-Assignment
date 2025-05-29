import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TmdbService } from './tmdb.service';
import { environment } from '../../environments/environments';

describe('TmdbService', () => {
  let service: TmdbService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://api.themoviedb.org/3';
  const apiKey = environment.tmdbApiKey;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TmdbService]
    });
    service = TestBed.inject(TmdbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies by genre', () => {
    const genreId = '28';
    service.discoverMoviesByGenre(genreId).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should search movies and actors', () => {
    const query = 'Inception';
    service.searchMoviesAndActors(query).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/search/multi?api_key=${apiKey}&query=${query}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get movie details with videos, credits, and similar', () => {
    const movieId = '123';
    service.getMovieDetails(movieId).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/movie/${movieId}?api_key=${apiKey}&append_to_response=videos,credits,similar`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get movie videos by ID', () => {
    const movieId = '456';
    service.getMovieVideos(movieId).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get featured (now playing) movies', () => {
    service.getFeaturedMovies().subscribe();

    const req = httpMock.expectOne(`${baseUrl}/movie/now_playing?api_key=${apiKey}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
