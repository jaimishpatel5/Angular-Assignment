import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { TmdbService } from '../../services/tmdb.service';
import { of, throwError } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatBadgeModule } from '@angular/material/badge';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';



describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let tmdbServiceSpy: jasmine.SpyObj<TmdbService>;

  const mockMovies = [{ id: 1, title: 'Test Movie', backdrop_path: '/test.jpg' }];

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('TmdbService', [
      'getFeaturedMovies',
      'discoverMoviesByGenre',
      'searchMoviesAndActors'
    ]);

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
        MatProgressSpinnerModule,

        CarouselModule,
        MatBadgeModule,

        LandingComponent,

      ],
      providers: [
        { provide: TmdbService, useValue: spy },
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    tmdbServiceSpy = TestBed.inject(TmdbService) as jasmine.SpyObj<TmdbService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch featured movies on init', () => {
    tmdbServiceSpy.getFeaturedMovies.and.returnValue(of({ results: mockMovies }));
    component.ngOnInit();
    expect(component.featuredMovies).toEqual(mockMovies);
    expect(tmdbServiceSpy.getFeaturedMovies).toHaveBeenCalled();
  });

  it('should handle mood selection and load movies', fakeAsync(() => {
    tmdbServiceSpy.discoverMoviesByGenre.and.returnValue(of({ results: mockMovies }));
    component.selectMood('action');
    tick();
    expect(component.selectedMood).toBe('action');
    expect(component.movies).toEqual(mockMovies);
  }));

  it('should handle search query', fakeAsync(() => {
    tmdbServiceSpy.searchMoviesAndActors.and.returnValue(of({ results: mockMovies }));
    component.searchQuery = 'test';
    component.onSearchChange();
    tick();
    expect(component.searchResults).toEqual(mockMovies);
    expect(tmdbServiceSpy.searchMoviesAndActors).toHaveBeenCalledWith('test');
  }));

  it('should not search if query is empty', () => {
    component.searchQuery = '   ';
    component.onSearchChange();
    expect(component.searchResults).toEqual([]);
    expect(tmdbServiceSpy.searchMoviesAndActors).not.toHaveBeenCalled();
  });

  it('should update wishlist count from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([{ id: 1 }]));
    component.loadWishlistCount();
    expect(component.wishlistCount).toBe(1);
  });

  it('should add movie to watchlist if not already present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([]));
    const setItemSpy = spyOn(localStorage, 'setItem');
    spyOn(window, 'alert');
    component.addToWatchlist({ id: 1 });
    expect(setItemSpy).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Added to Watchlist!');
  });

  it('should not add movie to watchlist if already present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([{ id: 1 }]));
    spyOn(window, 'alert');
    component.addToWatchlist({ id: 1 });
    expect(window.alert).toHaveBeenCalledWith('Already in Watchlist!');
  });

});
