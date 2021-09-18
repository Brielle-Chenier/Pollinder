import React, { Component, useState, useMemo } from "react";
import { Fade, Slide } from "react-reveal";
import TinderCard from "react-tinder-card";

const db = [
  {
    name: "Tweet 1",
    url: "../img/tweets/1.png",
  },
  {
    name: "Tweet 2",
    url: "../img/tweets/2.png",
  },
  {
    name: "Tweet 3",
    url: "../img/tweets/3.png",
  },
  {
    name: "Tweet 4",
    url: "./images/tweets/4.png",
  },
  {
    name: "Tweet 5",
    url: "./images/tweets/5.png",
  },
  {
    name: "Tweet 6",
    url: "../img/tweets/6.png",
  },
  {
    name: "Tweet 7",
    url: "../img/tweets/7.png",
  },
  {
    name: "Tweet 8",
    url: "../img/tweets/8.png",
  },
  {
    name: "Tweet 9",
    url: "../img/tweets/9.png",
  },
  {
    name: "Tweet 10",
    url: "../img/tweets/10.png",
  },
  {
    name: "Tweet 11",
    url: "../img/tweets/11.png",
  },
  {
    name: "Tweet 12",
    url: "../img/tweets/12.png",
  },
  {
    name: "Tweet 13",
    url: "../img/tweets/13.png",
  },
  {
    name: "Tweet 14",
    url: "../img/tweets/14.png",
  },
  {
    name: "Tweet 15",
    url: "../img/tweets/15.png",
  },
  {
    name: "Tweet 16",
    url: "../img/tweets/16.png",
  },
  {
    name: "Tweet 17",
    url: "../img/tweets/17.png",
  },
  {
    name: "Tweet 18",
    url: "../img/tweets/18.png",
  },
  {
    name: "Tweet 19",
    url: "../img/tweets/19.png",
  },
  {
    name: "Tweet 20",
    url: "../img/tweets/20.png",
  },
  {
    name: "Tweet 21",
    url: "../img/tweets/21.png",
  },
  {
    name: "Tweet 22",
    url: "../img/tweets/22.png",
  },
  {
    name: "Tweet 23",
    url: "../img/tweets/23.png",
  },
  {
    name: "Tweet 24",
    url: "../img/tweets/24.png",
  },
  {
    name: "Tweet 25",
    url: "../img/tweets/25.png",
  },
  {
    name: "Tweet 26",
    url: "../img/tweets/26.png",
  },
  {
    name: "Tweet 27",
    url: "../img/tweets/27.png",
  },
  {
    name: "Tweet 28",
    url: "../img/tweets/28.png",
  },
  {
    name: "Tweet 29",
    url: "../img/tweets/29.png",
  },
  {
    name: "Tweet 30",
    url: "../img/tweets/30.png",
  },
  {
    name: "Tweet 31",
    url: "../img/tweets/31.png",
  },
  {
    name: "Tweet 32",
    url: "/images/tweets/32.png",
  },
];

const alreadyRemoved = [];
let charactersState = db; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function Tindercard() {
  const [characters, setCharacters] = useState(db);
  const [lastDirection, setLastDirection] = useState();
  //used to set the current card being displayed
  const [currindex, setIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
    charactersState = charactersState.filter(
      (character) => character.name !== name
    );
    setCharacters(charactersState);
  };

  const swipe = (dir) => {
    const cardsLeft = characters.filter(
      (person) => !alreadyRemoved.includes(person.name)
    );
    if (cardsLeft.length) {
      //   const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
      //   const index = db.map((person) => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
      //   alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[currindex].current.swipe(dir); // Swipe the card!
    }

    setCounter(counter + 1);
  };

  const current = db[currindex];
  const onReplayPressed = () => {
    setCounter(0);
  };
  return (
    <section id="resume">
      {counter <= db.length ? (
        <div>
          <link
            href="https://fonts.googleapis.com/css?family=Damion&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
            rel="stylesheet"
          />
          <h1>Play our Political Compass game</h1>
          <div className="cardContainer">
            {characters.map((character, i) => {
              if (currindex !== i) {
                return null;
              } else {
                return (
                  <TinderCard
                    ref={childRefs[currindex]}
                    className="swipe"
                    key={character.name}
                    onSwipe={(dir) => swiped(dir, character.name)}
                    onCardLeftScreen={() => outOfFrame(character.name)}
                  >
                    <div
                      style={{
                        backgroundRepeat: "no-repeat",
                        backgroundImage: "url(./images/emptyTweet.png)",
                        backgroundSize: "1000px",
                      }}
                      className="card"
                    >
                      <h5>{character.name}</h5>
                      <img src={character.url} />
                      <br></br>
                    </div>
                  </TinderCard>
                );
              }
            })}
          </div>
          <div className="buttons">
            <button onClick={() => swipe("left")}>Swipe left!</button>
            <button onClick={() => swipe("right")}>Swipe right!</button>
          </div>
          {lastDirection ? (
            <h2 key={lastDirection} className="infoText">
              You swiped {lastDirection}
              //use math random here setIndex(index+1);
            </h2>
          ) : (
            <h4 className="infoText">
              Swipe a card or press a button to get started!
            </h4>
          )}
        </div>
      ) : (
        <div>
          <button onClick={onReplayPressed}>Play Again</button>
          <h1>hello</h1>
        </div>
      )}
    </section>
  );
}

export default Tindercard;
