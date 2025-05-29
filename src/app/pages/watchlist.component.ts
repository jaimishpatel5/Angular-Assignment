import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent {
  watchlist: any[] = [];

  ngOnInit() {
    this.loadWatchlist();
  }

  loadWatchlist() {
    const stored = localStorage.getItem('watchlist');
    this.watchlist = stored ? JSON.parse(stored) : [];
  }

  removeFromWatchlist(movieId: number) {
    this.watchlist = this.watchlist.filter((m) => m.id !== movieId);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }
}
