# AuditionJY

Have you played AuditionSEA before? I definitely did as a kid, so here is my attempt at a minimalistic version of my childhood. Try it out [here](https://audition-jy-git-main-lhinjy.vercel.app/)

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
-   [Vercel](https://vercel.com/)
-   [cypress](https://www.cypress.io/)
-   [ESlint](https://eslint.org/docs/latest/use/getting-started)

## Setup

To run this project, install it locally using npm:

```
$ npm install
$ npm start
```

## Test

## Best practices
