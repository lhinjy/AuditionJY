# AuditionJY

Have you played AuditionSEA before? I definitely did as a kid, so here is my attempt at a minimalistic version of my childhood. Try it out [here](https://audition-jy-git-main-lhinjy.vercel.app/)

## How to play

1. Click on the arrows
2. Click according to the following mapping:

| Key | Reference                                |
| --- | ---------------------------------------- |
| w   | ![arrow-up](.\public\arrow-up.svg)       |
| a   | ![arrow-left](.\public\arrow-left.svg)   |
| s   | ![arrow-down](.\public\arrow-down.svg)   |
| d   | ![arrow-right](.\public\arrow-right.svg) |

### Some common questions

-   Why is "w","a","s","d" being used?

    -   It is the standard movement keys in games!

-   Why is it 15 seconds?
    -   It follows the idea of how doctors will take 15 seconds of your heart beat, and multiply it by 4

## How it works

Each stage consist of 3 scenarios:

1. Success - when player type all the sequence without errors
2. Failure - when players type all the sequence with minimum 1 error
3. Warning - when player did not manage to finish the sequence before the counter ends

When player clears the stage with scenario 1 (success), they will be brought to the next stage, with an increase in number of sequence. The increase is defined by the `characterIncrease` variable.

Each game consist of 3 scenarios:

1. UpdateHighscore - when player overtake their highscore
2. !UpdateHighscore - when player scores lower then their highscore
3. UpdateLeaderboard - when player's highscore is higher than the lowest score on the leaderboard

## Technologies

-   [React](https://github.com/reactjs/reactjs.org)
-   [react-typing-game-hook](https://github.com/jokarz/react-typing-game-hook)
-   [ChakraUI](https://chakra-ui.com/getting-started)
-   [fontawesome](https://github.com/rstudio/fontawesome/blob/main/README.md)
-   [Vercel](https://vercel.com/)
-   [cypress](https://www.cypress.io/)
-   [supabase](https://supabase.com/)
-   [ESlint](https://eslint.org/docs/latest/use/getting-started)
-   [prettier](https://prettier.io/)

This game is created from scratch with `create-react-app`, with `chakra-ui` as the front end framework, `cypress` for UI, unit and integration testing, and `eslint` and `prettier` for consistency. Game logic is implemented with the aid of `react-typing-game-hook`, where the keys are mapped to the arrows provided by `fontawesome`. The high scores are stored on `supabase`, and the site is hosted on `vercel`.

## Setup

To run this project, install it locally using npm:

```
$ npm install
$ npm start
```

To run the test cases:

```
 $ cypress open
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. They can be obtained from Supabase `Project Settings>API`:

`REACT_APP_API_URL`: Project API

`REACT_APP_API_KEY`: Project API keys> anon | public

## Test

### UI/Unit testing with Cypress

-   User starts the game:

    -   After the user click on the arrows, and press "w", the counter should start, and show a "9" after one second.

-   User pass stage 1:

    -   After the user click on the arrows, and press "w","a","s" and "d", the score should increase, and user should see a "1"

-   User time out:

    -   After the user start the game, the counter should decrease and show a "0" after 10 seconds

-   Read more under components :)

### Integration testing with Cypress

-   On load
    -   Website should GET the top 3 scores in the database and display them in the UI
-   On update
    -   Website should POST the user's highscore in the database and display them in the UI

## Best practices

1. [Institute a Structured Import Order](https://kinsta.com/blog/react-best-practices/)

    - 3rd parties libraries are imported first, followed by local files

2. [Adhere to Naming Conventions](https://kinsta.com/blog/react-best-practices/)

    - PascalCase

3. [Component Patterns](https://www.freecodecamp.org/news/best-practices-for-react/)
    - Container pattern with the game logic, leaderboard and API client apart.
4. [Using a linter](https://www.freecodecamp.org/news/best-practices-for-react/)

    - ESlint is used along with prettier

5. [Using a fragment to avoid div hell](https://www.freecodecamp.org/news/best-practices-for-react/)

6. [Using Functional Components and Hooks Instead of Classes](https://www.makeuseof.com/must-follow-react-practices/)

## Color Reference

| Color            | Hex                                                              |
| ---------------- | ---------------------------------------------------------------- |
| Background Color | ![#E6E6E6](https://via.placeholder.com/10/E6E6E6?text=+) #E6E6E6 |
| Header           | ![#556052](https://via.placeholder.com/10/556052?text=+) #556052 |
| Base arrows      | ![#2D4059](https://via.placeholder.com/10/2D4059?text=+) #2D4059 |
| Green arrows     | ![#59886B](https://via.placeholder.com/10/59886B?text=+) #59886B |
| Red arrows       | ![#C05555](https://via.placeholder.com/10/C05555?text=+) #C05555 |

## Some learnings

-   Do not, I repeat, do not, put ./cypress into .gitignore :(. It took me a while to figure out why my vercel deployment failed...
-   Testing for frontend! I have always worked on testing for java (springboot) so testing for frontend is a first :)

## Future improvement

1. Addition of music
2. Increase of counter timing with each stage pass
3. Input validations
