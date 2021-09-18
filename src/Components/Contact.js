import { Fade, Slide } from "react-reveal";
import React, { Component, useState } from "react";
import TinderCard from "react-tinder-card";

const onSwipe = (direction) => {
  console.log("You swiped: " + direction);
};

const onCardLeftScreen = (myIdentifier) => {
  console.log(myIdentifier + " left the screen");
};

const db = [
  {
    name: "Richard Hendricks",
    url: "../img/politicalParties",
  },
  {
    name: "Erlich Bachman",
    url: "../img/politicalParties",
  },
  {
    name: "Monica Hall",
    url: "../img/politicalParties",
  },
  {
    name: "Jared Dunn",
    url: "../img/politicalParties",
  },
  {
    name: "Dinesh Chugtai",
    url: "../img/politicalParties",
  },
];

function Contact() {
  const characters = db;
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="tindercard">
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <h1>Play our Twitter Political Compass Game here!</h1>
      <div className="cardContainer">
        {characters.map((character) => (
          <TinderCard
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name)}
            onCardLeftScreen={() => outOfFrame(character.name)}
          >
            <div
              style={{ backgroundImage: "url(" + character.url + ")" }}
              className="card"
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      {lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText" />
      )}
    </div>
  );
}

export default Contact;
