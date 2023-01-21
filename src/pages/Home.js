import React from 'react';
import "./Home.css"

function Home() {
    return (
        <>
            <img src="../assets/gooseChess.png" alt="no imgage"></img>
            <h1>Welcome to Goose Chess</h1>
            <center>Goose chess is chess with a twist: There are multiple goose pieces on the board.
            Goose pieces are initialized at random positions and will move randomly to any unoccupied adjacent space.
            </center>
            <center><button>
                <span className="shadow"></span>
                <span className="edge"></span>
                <span className="front text"> Play Now
                </span>
            </button></center>
        </>
    );
}

export default Home;