import React from 'react';
import "./Home.css"

function Home() {
    return (
        <div id = "home">
            <div id = "content">
                <img src = "https://i.ibb.co/tDn2GZf/goose-Chess.png" width= "15%" alt=""/>
                <h1>Welcome to Goose Chess</h1>
                Goose chess is chess with a twist: There are multiple goose pieces on the board.
                Goose pieces are initialized at random positions and will move randomly to any unoccupied adjacent space. There are two geese at the start of the game, and a new goose is added for every three pieces taken, until there are nine geese on the board. <br /> <br />
                Goose pieces act as a third party and will block any form of movement. If a goose piece is completely surrounded they will capture one of the surrounding pieces. <br /><br />
                To win in goose chess, the opposing king must be captured. Check and checkmate do not exist, as the player can utilize goose pieces to block checks
                <div id="spacer"></div>
                <a href="/game">
                <center><button>
                    <span className="shadow"></span>
                    <span className="edge"></span>
                    <span className="front text"> Play Now
                    </span>
                </button></center>
                </a>
            </div>
        </div>
    );
}

export default Home;