import { Component ,Inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-temp';

  isDarkMode = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const themeClass = this.isDarkMode ? 'dark-theme' : 'light-theme';
    this.document.body.className = themeClass;
  }
}
