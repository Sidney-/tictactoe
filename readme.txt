Hello!

To start, thank you for taking the time to review my coding challenge and for our interviews. I enjoyed talking with each member of your team and learning more about Tafi/Daz 3D.

Development time:
Learn canvas/code game & logic: ~4 hours
Learn to animate/code animation: ~3 hours

Description:
When I was first assigned this project I thought it was going to be a quick turn around. I have coded tic-tac-toe in the past, but the addition of canvas as a requirement had a number of interesting challenges. I enjoyed working on this project. The further in I got the more I found I could do to stylize the board or improve my code. I would have probably continued working on it all week but I want to be respectful of your time. Good job on the interesting coding challenge this was a fun experience. 

My process:
Initially I considered doing this one of three ways:
A) create the board using a grid system and inside of each grid having a canvas to draw the current X or O into each box. This would create a clean way to interact with each container and track clicks, however it would mean I would need an additional layer on top of the board to be able to draw a line across from container to container. I thought this would be a bit clumsy (requiring 10 canvases) and since the challenge was focused around canvas I decided to go all in on one canvas. 

B) Next, I thought I would create the game board then create a square shape inside of each box, then interact with that shape. I quickly learned that shapes in a canvas board are not dom elements, they are just shapes so you cannot assign values to each of them or build listeners based onclick. (You can do this based on x,y values on the canvas but that doesn't have anything to do with the shape in the canvas)

C) I landed on using the entire canvas (as I imagine) was intended. Any time someone clicks on the canvas I captured the x,y value then did some quick math to discover what the x,y values are for the upper left corner of that square. For example, if you clicked (20,187) that would be (0,0). I then created a dictionary to keep track of which corner was selected and fill the value with an X or O depending what was clicked (otherwise null). Each click resulted in a check for a win. When the character is drawn the X was pretty simple it's just corner to corner on both side, but the circle radius starts in the middle of the container so I had to discover based on the upper left corner what the center of the container is, then place the circle there. I also put in a bunch of checks for edge cases: If a box is already full, do not place a character in it, if the game is tied, etc. When it came to checking for a winner, if I am honest, I coded myself into a bit of a corner using a dictionary the way I did. I set up the dictionary in a way I thought would provide an easier update down the line for a more responsive design. In doing this it made finding the winner more difficult in the traditional way (loops). Since there were only 8 possible ways to win I just hard coded them conditionally.

Improvements
If I were to do this again, I would probably spend more time upfront considering how I want to handle the check for win first, then move on to the rest of the game. There are many more places I could have added functions for reusability, for the sake of turning in the project I left it as is (it's not terrible). I could have also implemented class based programming for the Xs and Os and treated them as objects. I could have put in a stop to prevent the user from being able to click on the canvas while a shape is still drawing. Right now if you click on a shape then quickly click on another the shape gets all crazy. Implemented a responsive game board. Lastly, I have realized one of my weaknesses is getting a better understanding of when to use arrow functions over regular JS functions.

This was a great learning experience, I had a lot of fun with it. Thank you again for taking the time to review my code. Have a great day. 

Sidney Eubanks
(310) 954-6595
sidneykeubanks@gmail.com





