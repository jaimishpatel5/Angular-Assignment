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




@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatToolbarModule, MatFormFieldModule,
    MatInputModule,FormsModule, MatIconModule],
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

  selectMood(mood: string) {
    this.selectedMood = mood;
    const genreId = this.moodGenres[mood];

    this.tmdbService.discoverMoviesByGenre(genreId.toString()).subscribe((response: any) => {
      this.movies = response.results;
    });
  }

  searchQuery = '';

  onSearch() {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      // Call TMDB service and show results below
    }
  }

  clearSearch() {
    this.searchQuery = '';
  }

}
