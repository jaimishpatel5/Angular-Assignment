import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchlistComponent } from './watchlist.component';
import { provideRouter } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';

describe('WatchlistComponent', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture<WatchlistComponent>;

  const mockWatchlist = [
    {
      id: 1,
      title: 'Inception',
      poster_path: '/inception.jpg',
      release_date: '2010-07-16',
      vote_average: 8.8
    },
    {
      id: 2,
      title: 'Interstellar',
      poster_path: '/interstellar.jpg',
      release_date: '2014-11-07',
      vote_average: 8.6
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistComponent, MatCardModule],
      providers: [provideRouter([])] // 👈 Use this instead of RouterTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    localStorage.setItem('watchlist', JSON.stringify(mockWatchlist));
    component.ngOnInit();
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load watchlist from localStorage on init', () => {
    expect(component.watchlist.length).toBe(2);
    expect(component.watchlist[0].title).toBe('Inception');
  });

  it('should display watchlist items in the DOM', () => {
    const cards = fixture.debugElement.queryAll(By.css('.movie-card'));
    expect(cards.length).toBe(2);
  });

  it('should remove a movie from the watchlist', () => {
    component.removeFromWatchlist(1);
    fixture.detectChanges();

    expect(component.watchlist.length).toBe(1);
    expect(component.watchlist[0].id).toBe(2);

    const stored = JSON.parse(localStorage.getItem('watchlist') || '[]');
    expect(stored.length).toBe(1);
    expect(stored[0].id).toBe(2);
  });

  it('should display empty state if watchlist is empty', () => {
    localStorage.removeItem('watchlist');
    component.ngOnInit();
    fixture.detectChanges();

    const emptyMessage = fixture.debugElement.query(By.css('.empty-watchlist'));
    expect(emptyMessage).toBeTruthy();
  });
});
