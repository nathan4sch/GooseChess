![gooseChess.png](https://i.ibb.co/tDn2GZf/goose-Chess.png)
# Goose Chess
## Game Rules:
Goose chess is chess with a twist: There are multiple goose pieces on the board.

Goose pieces are initialized at random positions and will move randomly to any unoccupied adjacent space. There are two geese at the start of the game, and a new goose is added for every three pieces taken, until there are nine geese on the board.

Goose pieces act as a third party and will block any form of movement. If a goose piece is completely surrounded they will capture one of the surrounding pieces.

### **To win in goose chess, the opposing king must be captured. Check and checkmate do not exist, as the player can utilize goose pieces to block checks. Don't accidentally blunder your king!**

---
## Using the website:
The website is simple - just visit the home page and select the "Play Game" button. This will place you in a game queue until another player also joins the queue. Once you are both in the game, it begins!

---
## Why??

Over the last few months several of us have gotten obsessed with chess but at a certain point the game became stale. We theorized this is because chess is a **very** logical game, one that lacks a randomness. That's why we came up with the idea for goose chess - essentially chess with significantly increased RNG!

---
## Backend

Our backend is built on top of a node.js server running with web sockets.

Check it out here - https://github.com/Tyler16/goose-chess-backend

---

### Built based on tutorial written by Talha Awan

The tutorial helped us with displaying the chess board and some of the piece logic, but those were the only things that were implemented by Talha. Everything else was written by us <em>(home page, goose features, castling & en passant, multiplayer capabilities, etc)</em>.

[Check out the tutorial here!](https://www.techighness.com/post/develop-two-player-chess-game-with-react-js/)
