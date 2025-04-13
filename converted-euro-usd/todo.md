## TODO – List of Improvements and Shortcuts

## Shortcuts taken due to time constraints:

    - Custom rate validation: The difference between the entered rate and the actual rate is checked when applied, but immediate visual feedback to the user is not always provided (e.g., highlighting the input field in red in case of an error).

    - Conversion history: The conversion history is not as detailed as it could be. Only a limited number of entries (last 5 requests) are saved instead of storing the full history.

    - Design: The app design is quite basic. It lacks customization elements and animations that would make the interface smoother.

    - Unit tests: Due to time limitations, unit tests were not implemented to validate the various features of the application.

    - User data security: There is no validation or security mechanism in place to protect user inputs from malicious or incorrect values.

## Possible improvements:

1. User authentication: Add an authentication system to save each user's conversion history.

2. Real-time exchange rate updates: Instead of generating a random exchange rate locally, connect the app to a real-time exchange rate API.

3. Real-time notifications: Add a notification system to inform users when a custom rate is deactivated or when an action is successfully completed.

4. Improved user interface: Add a more modern design with transitions and animations to create a smoother user experience.

5. Multi-currency support: Allow conversion between multiple currencies, not just EUR/USD.

6. Saving exchange requests: Allow users to save or download their exchange requests as CSV or JSON files
