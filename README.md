**Inspiration**
<br> We wanted to make voting and getting informed on political topics easier for young adults. This is why we combined some of the most popular apps, Twitter and Tinder, to make the app more appealing. Another cool thing is the app allows people from all over the world to participate, whether this means getting tweets for their area or seeing how another country would've voted in the Canadian election.

**What it does**
<br>In the app you will be presented with anonymous quotes from different political parties, you can swipe right on them to agree and left to disagree. From the results of your swiping, we calculate a score and then display which party your ideals align with most. After this, you can choose to add your result to our live map where you can see the results of other people who have taken the test, allowing you to see trends in data. Lastly, the app provides links to current news articles allowing users to stay informed.

**How we built it**
<br>We used React for our front-end and special npm packages to help with the tinder cards. For the map, we used Google Maps API in tandem with Firebase to store our data.

**Challenges we ran into**
<br>We initially had trouble trying to connect the app to Flask, but then found an alternate implementation to save on time. We also had trouble sending the live data from the user selections to Firebase which allows the map to update in real-time with the database information.

**Accomplishments that we're proud of**
<br>We are super proud of the idea we came up with, and our ability to complete the site in time. We are also glad we had the time to create the map and use data visualization to display the results.

**What we learned**
<br>We learned a lot more about React, how to use Google Maps API, and how to access a lot of data on Firebase. We also learned how to create a nice-looking website.

**What's next for Pollinder**
<br>We would hope to be able to pull tweets from both the federal representatives and use geodata to pll tweet from users' local representatives to make the data more targeted. Due to the time limit, we weren't able to get tweets from the Twitter API but in the future, this would also be nice as we could then implement ways to filter tweets by content and stay up to date with current events.
