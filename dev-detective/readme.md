🕵️‍♂️ Dev-Detective: The Squid Game Edition
"Red Light... Green Light... Fetch!"

Welcome to Dev-Detective, a high-stakes GitHub user discovery tool. Built with a sleek, minimalist Squid Game aesthetic, this application allows you to scan the global database of developers, retrieve their mission history (repositories), and pit players against each other in the ultimate Battle Mode.

🎮 The Mission (Features)<br>
This project was built to master the art of asynchronous communication and external API integration.

🟢 Level 1: The Scan (Basic Search)<br>
1.Real-time Data: Fetches live data from the api.github.com/users/ endpoint.

2.Profile Intel: Displays avatars, bios, join dates, and account stats.

3.Fail-Safe: Implements error handling to catch 404s (User Not Found) without crashing the system.

🟡 Level 2: The Deep Dive (Advanced Fetch)<br>
1.Repository Retrieval: Makes secondary API calls to fetch the user's top 5 most recent repositories.

2.Data Transformation: Converts raw ISO timestamps (e.g., 2023-01-25T...) into human-readable formats.

3.External Links: Direct navigation to GitHub repos in new tabs.

🔴 Level 3: Battle Mode (Comparison Logic)<br>
1.Dual-Fetch: Uses Async/Await to handle two network requests simultaneously.

2.Victory Logic: Compares user stats (Followers + Repos) to determine the "Winner."

3.Dynamic Styling: Automatically highlights the winner in Mint Green and the loser in Eliminated Red.

🎨 Design Aesthetic<br>
1.The UI is inspired by the Squid Game color palette and geometric motifs:

2.Deep Charcoal (https://www.google.com/search?q=%230b0d0f): For a high-contrast, immersive feel.

3.Player Pink (https://www.google.com/search?q=%23ff4d8d): Used for primary actions and "Manager" level alerts.

4.Glassmorphism: Cards use semi-transparent backgrounds with a backdrop-filter: blur to feel modern and premium.

🛠️ Tech Stack<br>
1.HTML5/CSS3: Custom CSS variables and Grid/Flexbox layouts.

2.JavaScript (ES6+): * fetch() API

3.async/await for clean asynchronous code.

4.DOM Manipulation for dynamic UI updates.

5.Google Fonts: 'Orbitron' for a futuristic, digital clock look.

🚀 How to Run the Game
Clone the repository:<br>
"git clone https://github.com/your-username/dev-detective.git
Open the project: Simply open index.html in your favorite browser."<br>
1.Start Searching: Enter any GitHub username (like octocat or gaearon) to see the player's profile.

📜 Rules of the Game<br>
1.Don't spam the API: GitHub has rate limits for unauthenticated requests. If you stop getting data, wait a few minutes.
2.Error Handling: If a player is "Eliminated" (not found), the UI will notify you rather than breaking.

<img width="1920" height="1080" alt="Screenshot (203)" src="https://github.com/user-attachments/assets/3258fbf1-152a-4e00-ac96-257f3c6fef1a" /><br>
<img width="1920" height="1080" alt="Screenshot (204)" src="https://github.com/user-attachments/assets/cbb07cee-8977-4a1e-a60d-6e7d22a74967" /><br>

<img width="1920" height="1080" alt="Screenshot (205)" src="https://github.com/user-attachments/assets/7a5fa4fd-27fb-40ad-a76f-eae34632f97c" /><br>
