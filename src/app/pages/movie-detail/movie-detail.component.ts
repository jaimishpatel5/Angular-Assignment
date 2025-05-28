import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {
  route = inject(ActivatedRoute);
  tmdbService = inject(TmdbService);

  movieId: string | null = null;
  movie: any = null;
  loading = false;
  cast: any[] = [];

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id');
    if (this.movieId) {
      this.loading = true;
      this.tmdbService.getMovieDetails(this.movieId).subscribe({
        next: res => {
          this.movie = res;
          
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  // ✅ Getter for genres
  get genreList(): string {
    return this.movie?.genres?.map((g:any) => g.name).join(', ') || '';
  }
}