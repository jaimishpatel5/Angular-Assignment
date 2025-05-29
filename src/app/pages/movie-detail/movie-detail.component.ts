import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common'; // ✅ Add this line




@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {
  route = inject(ActivatedRoute);
  tmdbService = inject(TmdbService);
  sanitizer = inject(DomSanitizer);
  safeTrailerUrl: SafeResourceUrl | null = null;

  movieId: string | null = null;
  movie: any = null;
  cast: any[] = [];
  loading = false;
  trailerKey: string | null = null;
  showTrailer = false;
  isInWatchlist = false;

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id');
    if (this.movieId) {
      this.loading = true;

      this.tmdbService.getMovieDetails(this.movieId).subscribe({
        next: (res) => {
          this.movie = res;
          this.loading = false;
          this.checkWatchlist();
        },
        error: () => {
          this.loading = false;
        }
      });

      this.tmdbService.getMovieVideos(this.movieId).subscribe({
        next: (res: any) => {
          const trailer = res.results.find(
            (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
          );
          if (trailer) {
            this.trailerKey = trailer.key;
            this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://www.youtube.com/embed/${trailer.key}`
            );
          }
        }
      });

      // this.tmdbService.getMovieCredits(this.movieId).subscribe({
      //   next: (res: any) => {
      //     this.cast = res.cast?.slice(0, 12) || [];
      //   }
      // });
    }
  }

  get genreList(): string {
    return this.movie?.genres?.map((g: any) => g.name).join(', ') || '';
  }

  toggleWatchlist() {
    let list = JSON.parse(localStorage.getItem('watchlist') || '[]');
    if (this.isInWatchlist) {
      list = list.filter((m: any) => m.id !== this.movie.id);
    } else {
      list.push(this.movie);
    }
    localStorage.setItem('watchlist', JSON.stringify(list));
    this.isInWatchlist = !this.isInWatchlist;
  }

  checkWatchlist() {
    const list = JSON.parse(localStorage.getItem('watchlist') || '[]');
    this.isInWatchlist = list.some((m: any) => m.id === this.movie?.id);
  }

  toggleTrailer() {
    this.showTrailer = !this.showTrailer;
  }
constructor(private location: Location) {}

goBack() {
  this.location.back();
}


}
