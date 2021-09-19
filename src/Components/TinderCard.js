import React, { Component, useState, useMemo } from "react";
import { Fade, Slide } from "react-reveal";
import TinderCard from "react-tinder-card";

//NDP 1 , LIBERAL 2, CONSERVATIVE 3
const db = [
  {
    name: "Tweet 1",
    url: "./images/tweets/1.png",
    party: 2,
  },
  {
    name: "Tweet 2",
    url: "./images/tweets/2.png",
    party: 2,
  },
];
// const db = [
//   {
//     name: "Tweet 1",
//     url: "./images/tweets/1.png",
//     party: 2,
//   },
//   {
//     name: "Tweet 2",
//     url: "./images/tweets/2.png",
//     party: 2,
//   },
//   {
//     name: "Tweet 3",
//     url: "./images/tweets/3.png",
//     party: 2,
//   },
//   {
//     name: "Tweet 4",
//     url: "../images/tweets/4.png",
//     party: 2,
//   },
//   {
//     name: "Tweet 5",
//     url: "../images/tweets/5.png",
//     party: 2,
//   },
//   {
//     name: "Tweet 6",
//     url: "../images/tweets/6.png",
//     party: 2,
//   },
//   {
//     name: "Tweet 7",
//     url: "../images/tweets/7.png",
//     party: 2,
//   },
//   {
//     name: "Tweet 8",
//     url: "../images/tweets/8.png",
//     party: 2,
//   },
//   {
//     name: "Tweet 9",
//     url: "../images/tweets/9.png",
//     party: 2,
//   },
//   {
//     name: "Tweet 10",
//     url: "../images/tweets/10.png",
//     party: 2,
//   },
//   {
//     name: "Tweet 11",
//     url: "../images/tweets/11.png",
//     party: 2,
//   },
//   {
//     name: "Tweet 12",
//     url: "../images/tweets/12.png",
//     party: 3,
//   },
//   {
//     name: "Tweet 13",
//     url: "../images/tweets/13.png",
//     party: 3,
//   },
//   {
//     name: "Tweet 14",
//     url: "../images/tweets/14.png",
//     party: 3,
//   },
//   {
//     name: "Tweet 15",
//     url: "../images/tweets/15.png",
//     party: 3,
//   },
//   {
//     name: "Tweet 16",
//     url: "../images/tweets/16.png",
//     party: 3,
//   },
//   {
//     name: "Tweet 17",
//     url: "../images/tweets/17.png",
//     party: 3,
//   },
//   {
//     name: "Tweet 18",
//     url: "../images/tweets/18.png",
//     party: 3,
//   },
//   {
//     name: "Tweet 19",
//     url: "../images/tweets/19.png",
//     party: 3,
//   },
//   {
//     name: "Tweet 20",
//     url: "../images/tweets/20.png",
//     party: 3,
//   },
//   {
//     name: "Tweet 21",
//     url: "../images/tweets/21.png",
//     party: 3,
//   },
//   {
//     name: "Tweet 22",
//     url: "../images/tweets/22.png",
//     party: 1,
//   },
//   {
//     name: "Tweet 22",
//     url: "../images/tweets/22.png",
//     party: 1,
//   },
//   {
//     name: "Tweet 23",
//     url: "../images/tweets/23.png",
//     party: 1,
//   },
//   {
//     name: "Tweet 24",
//     url: "../images/tweets/24.png",
//     party: 1,
//   },
//   {
//     name: "Tweet 25",
//     url: "../images/tweets/25.png",
//     party: 1,
//   },
//   {
//     name: "Tweet 26",
//     url: "../images/tweets/26.png",
//     party: 1,
//   },
//   {
//     name: "Tweet 27",
//     url: "../images/tweets/27.png",
//     party: 1,
//   },
//   {
//     name: "Tweet 28",
//     url: "../images/tweets/28.png",
//     party: 1,
//   },
//   {
//     name: "Tweet 29",
//     url: "../images/tweets/29.png",
//     party: 1,
//   },
//   {
//     name: "Tweet 30",
//     url: "../images/tweets/30.png",
//     party: 1,
//   },
//   {
//     name: "Tweet 31",
//     url: "../images/tweets/31.png",
//     party: 1,
//   },
// ];

const alreadyRemoved = [];
let charactersState = db; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function Tindercard(data) {
  const [characters, setCharacters] = useState(db);
  const [lastDirection, setLastDirection] = useState();
  //used to set the current card being displayed
  const [currindex, setIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [userScore, setUserScore] = useState(0);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const swiped = (direction, nameToDelete, party) => {
    console.log("removing: " + nameToDelete);
    //setIndex(currindex + 1);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
    if (direction == "right") {
      setUserScore(userScore + party);
    }
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
    charactersState = charactersState.filter(
      (character) => character.name !== name
    );
    setCharacters(charactersState);
  };

  //   const swipe = (dir, party) => {
  //     setIndex(currindex + 1);
  //     if (dir == "right") {
  //       setUserScore(userScore + party);
  //     }
  //     const cardsLeft = characters.filter(
  //       (person) => !alreadyRemoved.includes(person.name)
  //     );
  //     if (db.length) {
  //       //   const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
  //       //   const index = db.map((person) => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
  //       //   alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
  //       childRefs[currindex].current.swipe(dir); // Swipe the card!
  //     }

  //     setCounter(counter + 1);
  //   };

  const sendColour = () => {
    console.log("data", data);
    if (32 <= userScore <= 53) {
      //NDP is result
      const colour = "#FFAC1C";
    } else if (54 <= userScore <= 75) {
      //LIBERAL
      const colour = "#F12211";
    } else {
      //CONSERVATIVE
      const colour = "#152FF2";
    }
    onReplayPressed();
  };

  const current = db[currindex];
  const onReplayPressed = () => {
    setCounter(0);
  };
  return (
    <section id="resume">
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
            console.log("currindex", currindex);
            if (currindex !== i) {
              return null;
            } else {
              return (
                <TinderCard
                  //TODO
                  ref={childRefs[currindex]}
                  className="swipe"
                  key={character.name}
                  onSwipe={(dir) =>
                    swiped(dir, character.name, character.party)
                  }
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
        {/* <div className="buttons">
            <button onClick={() => swipe("left", character.party)}>
              Swipe left!
            </button>
            <button onClick={() => swipe("right", character.party)}>
              Swipe right!
            </button>
          </div> */}
        {lastDirection ? (
          <div>
            <h2 key={lastDirection} className="infoText">
              You swiped {lastDirection}
            </h2>
            <div>
              <button onClick={sendColour}>Submit Results</button>
              <button onClick={onReplayPressed}>Play Again</button>
            </div>
          </div>
        ) : (
          <h4 className="infoText">
            Swipe a card or press a button to get started!
          </h4>
        )}
      </div>
      )
    </section>
  );
}

export default Tindercard;
