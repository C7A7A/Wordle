


# Wordle 1vs1
Allows you to play wordle with your friend.

### Goal of the project
I created this project to learn ASP .NET Core, communication via websockets and authentication with JWT Tokens. I also used some js libraries which were new to me (react-hook-form, axios).


###  Built with
<ul>
	<li> .NET Core 6
	<li> MSSQL
	<li> React.js
	<li> Sass
	<li> Websockets
</ul>

### Getting started
1. Clone the repo
   ```
   git clone git@github.com:C7A7A/Wordle.git
   ```
2. Run backend
   ```
   dotnet run
   ```
3. Move to frontend project
   ```
   cd wordle-frontend
   ```
5. Install npm packages
   ```
   npm install
   ```
6. Run frontend
   ```
   npm start
   ```
   
### Features

#### Register
<div align="center">
<img src="https://github.com/C7A7A/Wordle/blob/main/wordle-frontend/public/images/register.PNG" alt="Register" width="960" height="540" />
</div>

#### Form validation
<div align="center">
<img src="https://github.com/C7A7A/Wordle/blob/main/wordle-frontend/public/images/register-validation.PNG" alt="Register validation" width="960" height="540" />
</div>

#### Choose name
You can play as logged user or as guest.

<div align="center">
<img src="https://github.com/C7A7A/Wordle/blob/main/wordle-frontend/public/images/login.PNG" alt="Register" width="960" height="540" />
</div>

#### Play as host
<div align="center">
<img src="https://github.com/C7A7A/Wordle/blob/main/wordle-frontend/public/images/login-host.PNG" alt="Login" width="960" height="540" />
</div>

#### Waiting for opponent
You can copy room code or whole url. Game will start when someone joins room by url or by entering room code in app.

<div align="center">
<img src="https://github.com/C7A7A/Wordle/blob/main/wordle-frontend/public/images/waiting-for-opponent.PNG" alt="Waiting for opponent" width="960" height="540" />
</div>

#### Join room
<div align="center">
<img src="https://github.com/C7A7A/Wordle/blob/main/wordle-frontend/public/images/join-room.PNG" alt="Enter room" width="960" height="540" />
</div>

#### Start game
<div align="center">
<img src="https://github.com/C7A7A/Wordle/blob/main/wordle-frontend/public/images/game.PNG" alt="Start game" width="960" height="540" />
</div>

#### 2 players game start
<div align="center">
<img src="https://github.com/C7A7A/Wordle/blob/main/wordle-frontend/public/images/game-2-players.PNG" alt="2 players game" width="960" height="540" />
</div>

#### Game in progress
<div align="center">
<img src="https://github.com/C7A7A/Wordle/blob/main/wordle-frontend/public/images/game-in-game.PNG" alt="Game in progress" width="960" height="540" />
</div>

#### Game over
<div align="center">
<img src="https://github.com/C7A7A/Wordle/blob/main/wordle-frontend/public/images/game-over.PNG" alt="Game Over" width="960" height="540" />
</div>

#### Play again
<div align="center">
<img src="https://github.com/C7A7A/Wordle/blob/main/wordle-frontend/public/images/game-play-again.PNG" alt="Play again" width="960" height="540" />
</div>

#### Game over on disconnect
<div align="center">
<img src="https://github.com/C7A7A/Wordle/blob/main/wordle-frontend/public/images/game-over-disconnect.PNG" alt="Disconnect" width="960" height="540" />
</div>
  
### React code
I'm aware that quality of my code in React is not high. Stuff that should be refactored:
<ul>
	<li> play again after socket disconnect
	<li> scss importing (!imporant)
	<li> useStateMachine importing 
	<li> useEffect (useEffects where I update state based on diffrent state update)
</ul>

### TODO
<ul>
	<li> React code refactor
	<li> user profile (stats)
	<li> scss modules
</ul>
