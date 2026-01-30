Prompt 1: The "Parallel Fetching" Architect<br>
Purpose: Solves the difficulty of fetching data for two different users simultaneously without making the UI wait for one to finish before starting the other.

"I am building a 'Battle Mode' for my GitHub App. I need a JavaScript function using async/await that takes two usernames as arguments. Use Promise.all to fetch data for both users from the GitHub API simultaneously.

Please explain:<br>
How to handle the case where one user exists but the other doesn't.
How to destructure the results from Promise.all into two separate objects (player1 and player2) so I can compare them."<br>

Prompt 2: The "Star Counter" Logic Specialist<br>
Purpose: Solves the specific difficulty of "Total Stars." The GitHub User API doesn't give a total star count; you have to fetch the repositories and sum the stargazers_count for each.

"I need to calculate a 'Power Level' for a GitHub user based on their total stars. Since the main User API doesn't provide a total_stars property, please write a helper function that:

Fetches all public repositories for a specific user using their repos_url.

Uses the .reduce() method to sum up the stargazers_count from every repository object.

Returns the final number so I can use it to determine the winner in my Battle Mode."<br>

Prompt 3: The "Dynamic UI & Conditional Styling" Expert<br>
Purpose: Solves the UI/UX challenge of comparing two sets of data and applying the "Squid Game" theme (Green for winner, Red for loser) dynamically via JavaScript.

"I have two objects containing user data and their calculated scores. I need a function that compares score1 and score2 and updates the DOM.

Requirements:

If User A has a higher score, apply a CSS class .winner (Mint Green glow) to their card and .loser (Red/grayscale) to User B’s card.

Handle a 'Tie' scenario where both get a neutral style.

Use template literals to inject the 'Winner' or 'Eliminated' text badge into the HTML based on the result. Make sure the code follows a clean UI/UX pattern for a Squid Game themed project."
