import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TmdbService } from '../../services/tmdb.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatToolbarModule, MatFormFieldModule,
    MatInputModule, FormsModule, MatIconModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  selectedMood: string | null = null;
  movies: any[] = [];

  moodGenres: Record<string, number> = {
    'feel-good': 35,     // Comedy
    'action': 28,        // Action
    'mind-benders': 878  // Sci-Fi or 53 for Thriller
  };

  moodLabels: Record<string, string> = {
    'feel-good': 'Feel Good',
    'action': 'Action Fix',
    'mind-benders': 'Mind Benders'
  };

  constructor(private tmdbService: TmdbService) { }

  get selectedMoodLabel(): string {
    return this.selectedMood ? this.moodLabels[this.selectedMood] : '';
  }
  loading = false;

  selectMood(mood: string) {
    this.selectedMood = mood;
    const genreId = this.moodGenres[mood];
    this.loading = true;
    this.tmdbService.discoverMoviesByGenre(genreId.toString()).subscribe((response: any) => {
      this.movies = response.results;
      this.loading = false;
    }, (error) => {
      console.error('Error fetching movies:', error);
      this.loading = false;

    });
  }
  searchQuery = '';
  searchResults: any[] = [];

  onSearchChange() {
    const trimmed = this.searchQuery.trim();
    if (trimmed.length > 0) {
      this.loading = true;
      this.tmdbService.searchMoviesAndActors(trimmed).subscribe((res) => {
        this.searchResults = res.results;
        this.loading = false;
      }, (error) => {
        console.error('Error searching:', error);
        this.loading = false;
        this.searchResults = [];
      });
    } else {
      this.searchResults = [];
    }
  }



}
