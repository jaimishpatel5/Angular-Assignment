
# Angular Movie Discovery App 

A responsive Angular web application for discovering movies using [The Movie Database (TMDB)](https://www.themoviedb.org/) API. Features include mood-based browsing, a featured carousel slider, search functionality, and a persistent watchlist saved in local storage.

## Features 

-  Mood-based movie discovery (Feel Good, Action, Mind Bending)
-  Search bar with live filtering
-  Netflix-style featured carousel using `ngx-owl-carousel-o`
-  Add to Watchlist (saved in localStorage)
-  Fully responsive design with mobile-friendly navbar
-  Unit tests with Jasmine & Karma

## TMDB API Setup 

1. Go to [TMDB Developer Portal](https://www.themoviedb.org/settings/api) and log in.
2. Create an API key (v3 auth).
3. Create a file `src/environments/environment.ts` and add:

```ts
export const environment = {
  production: false,
  tmdbApiKey: 'YOUR_API_KEY_HERE',
  tmdbBaseUrl: 'https://api.themoviedb.org/3'
};
```

For production, also add the key to `src/environments/environment.prod.ts`.

## Installation & Setup 🛠️

```bash
# Install dependencies
npm install

# Run the development server
npm run start

# Run tests
npm run test

# Build the application
npm run build
```

## Technologies Used

- Angular 17
- Angular Material
- ngx-owl-carousel-o
- TMDB API
- SCSS for styling

## Folder Structure 📁

```
src/
├── app/
│   ├── components/
│   ├── services/
│   ├── models/
├── assets/
├── environments/
└── styles.scss
```


## License 📄

This project is licensed under the MIT License.
