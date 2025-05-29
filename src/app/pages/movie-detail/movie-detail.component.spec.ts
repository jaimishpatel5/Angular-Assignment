import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { TmdbService } from '../../services/tmdb.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

const mockTmdbService = {
  getMovieDetails: jasmine.createSpy('getMovieDetails'),
  getMovieVideos: jasmine.createSpy('getMovieVideos'),
};

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (key: string) => '123',
    },
  },
};

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailComponent],
      providers: [
        { provide: TmdbService, useValue: mockTmdbService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: { back: jasmine.createSpy('back') } },
        { provide: DomSanitizer, useValue: { bypassSecurityTrustResourceUrl: (url: string) => url } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie details on init', () => {
    const mockMovie = { id: 123, title: 'Test Movie', genres: [{ name: 'Action' }] };
    mockTmdbService.getMovieDetails.and.returnValue(of(mockMovie));
    mockTmdbService.getMovieVideos.and.returnValue(of({ results: [] }));

    component.ngOnInit();

    expect(mockTmdbService.getMovieDetails).toHaveBeenCalledWith('123');
    expect(component.movie).toEqual(mockMovie);
    expect(component.loading).toBeFalse();
  });

  it('should handle error in movie details fetch', () => {
    mockTmdbService.getMovieDetails.and.returnValue(throwError(() => new Error('API error')));
    mockTmdbService.getMovieVideos.and.returnValue(of({ results: [] }));

    component.ngOnInit();

    expect(component.loading).toBeFalse();
  });

  it('should extract trailer key and safe URL', () => {
    const mockMovie = { id: 123, title: 'Test Movie' };
    const trailer = { key: 'abc123', type: 'Trailer', site: 'YouTube' };

    mockTmdbService.getMovieDetails.and.returnValue(of(mockMovie));
    mockTmdbService.getMovieVideos.and.returnValue(of({ results: [trailer] }));

    component.ngOnInit();

    expect(component.trailerKey).toBe('abc123');
    expect(component.safeTrailerUrl).toContain('abc123');
  });

  it('should toggle trailer visibility', () => {
    expect(component.showTrailer).toBeFalse();
    component.toggleTrailer();
    expect(component.showTrailer).toBeTrue();
  });

  it('should manage watchlist correctly', () => {
    const mockMovie = { id: 123, title: 'Test Movie' };
    component.movie = mockMovie;

    localStorage.setItem('watchlist', JSON.stringify([]));
    component.toggleWatchlist();

    let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    expect(watchlist.length).toBe(1);

    component.toggleWatchlist();
    watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    expect(watchlist.length).toBe(0);
  });

  it('should correctly check if movie is in watchlist', () => {
    const mockMovie = { id: 123 };
    localStorage.setItem('watchlist', JSON.stringify([mockMovie]));

    component.movie = mockMovie;
    component.checkWatchlist();
    expect(component.isInWatchlist).toBeTrue();
  });

  it('should navigate back', () => {
    component.goBack();
    const location = TestBed.inject(Location);
    expect(location.back).toHaveBeenCalled();
  });
});
