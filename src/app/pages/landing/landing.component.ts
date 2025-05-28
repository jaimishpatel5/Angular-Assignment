import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatToolbarModule, MatCardModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  selectedMood: string | null = null;

  moodLabels: Record<string, string> = {
    'feel-good': 'Feel Good',
    'action': 'Action Fix',
    'mind-benders': 'Mind Benders'
  };

  get selectedMoodLabel(): string {
    return this.selectedMood ? this.moodLabels[this.selectedMood] : '';
  }

  selectMood(mood: string) {
    this.selectedMood = mood;
  }
}
