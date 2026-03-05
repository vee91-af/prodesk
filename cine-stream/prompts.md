1. The "Base Setup" Prompt<br>
"Create a React application using Vite and Tailwind CSS. I want to build a movie discovery app called 'Cine-Stream' that fetches data from the TMDB API. Set up a basic grid layout to display movie posters, titles, and ratings for the 'Popular Movies' endpoint."<br>
2. The "Search & State" Prompt<br>
"Add a search bar at the top of the app. When a user types, it should switch from showing 'Popular Movies' to showing results from the TMDB search endpoint. Make sure the 'Heart' icon on each card allows users to save movies to a Favorites list that stays saved even if the page refreshes using LocalStorage."<br>
3. The "Performance (Debouncing)" Prompt<br>
"My search bar is making an API call for every single letter I type, which is hitting the rate limit. How do I implement a custom debounce hook or logic in React so the app waits for the user to stop typing for 500ms before making the API request?"<br>
4. The "Advanced UX (Infinite Scroll)" Prompt<br>
"I want to remove my 'Next Page' buttons and use Infinite Scroll instead. How can I use the Intersection Observer API in React to detect when the user has scrolled to the last movie card and automatically fetch and append the next page of results to the current list?"<br>

5. The "Configuration Debugging" Prompt<br>
"I am getting a PostCSS error saying Tailwind CSS has moved to a separate package. How do I configure the @tailwindcss/postcss bridge for a Vite project so that my @tailwind directives (or @import 'tailwindcss') work correctly in my index.css file?"<br>
