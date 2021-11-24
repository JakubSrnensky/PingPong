
    //lisener
    document.addEventListener("keyup", keyPush);

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    //counting
    let numberFirst = document.getElementById("numberFirst");
    let scoreNumberFirst = 0;

    let numberSecond = document.getElementById("numberSecond");
    let scoreNumberSecond = 0;

    //winner
    let winner = document.getElementById("winner");

    //legend
    let legend = document.getElementById("legend");

    const playerFirst = {
        width: 10 ,
        height: 100 ,
        speed: 5,
        velocityY: 0,
        positionX: 0 + 10,
        positionY: canvas.height/2 - 50,
    }

    const playerSecond = {
        width: 10 ,
        height: 100 ,
        speed: 5 ,
        velocityY: 0,
        positionX: canvas.width - 20,
        positionY: canvas.height/2 - 50,
    }

    const ball = {
        size: 10 ,
        speed: 5 ,
        positionX: canvas.width/2,
        positionY: canvas.height/2 ,
        velocityX: -1 ,
        velocityY: 1 ,
    }

    function draw(color, x, y, width, height){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    function drawCircle(){
        ctx.beginPath();
        ctx.arc(ball.positionX, ball.positionY, ball.size, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
}

    function drawItems(){
        draw("black", 0, 0, canvas.width, canvas.height) //background
        drawLine(); //drawLine background
        draw("white", 0, 0, canvas.width, 20) //background
        draw("white", 0, canvas.height - 20, canvas.width, 20) //background
        draw("white", playerFirst.positionX, playerFirst.positionY, playerFirst.width, playerFirst.height); // player1
        draw("white", playerSecond.positionX, playerSecond.positionY, playerSecond.width, playerSecond.height); // player2
        drawCircle();
    }

    //drawLine background
    function drawLine(){
        for(let i = 0; i < canvas.height; i++){
            draw("white", canvas.width/2, 50 * i + 10, 7, 30);
        }
    }

    //reset game
    function resetBall(){
        ball.positionX = canvas.width/2;
        ball.positionY = canvas.height/2;
    }

    //winner
    function winnerShow(){
        if(scoreNumberFirst === 5){
            winner.textContent = "Hráč číslo 1 je vítěz";
        }

        if(scoreNumberSecond === 5){
            winner.textContent = "Hráč číslo 2 je vítěz";
        }

        if(scoreNumberFirst === 5 || scoreNumberSecond === 5){
            winner.classList.add("show");
            legend.textContent = "Pro resetování hry zmáčkni Enter";
        }
    }

    function moveBall(){
        //moving ball
        ball.positionX += ball.speed * ball.velocityX;
        ball.positionY += ball.speed * ball.velocityY;
        
        //collision wall YOU LOSE
        if(ball.positionX < 0){
            ball.velocityX = 1;
            numberSecond.textContent = ++scoreNumberFirst;
            resetBall();
        }

        if(ball.positionX > canvas.width){
            ball.velocityX = -1;
            numberFirst.textContent = ++scoreNumberSecond;
            resetBall();
        }

        //collision wall    
        if(ball.positionY === canvas.height - 20){
            ball.velocityY = -1;
        }

        if(ball.positionY === 0 + 20){
            ball.velocityY = 1;
        }
    }

    //move paddles
    function movePlayer(){
        playerFirst.positionY = playerFirst.positionY + playerSecond.speed * playerFirst.velocityY;
        playerSecond.positionY = playerSecond.positionY + playerSecond.speed * playerSecond.velocityY;

        //player1
        if(playerFirst.positionY < 0 + 20 ){
            playerFirst.velocityY = 0;
        }

        if(playerFirst.positionY > canvas.height - playerFirst.height - 20){
            playerFirst.velocityY = 0;
        }

        let paddleTop = playerFirst.positionY;
		let paddleBottom = paddleTop + playerFirst.height;
		let paddleLeft = playerFirst.positionX;
		let paddleRight = playerFirst.positionX + playerFirst.width;

		if(ball.positionY >= paddleTop && ball.positionY <= paddleBottom && ball.positionX >= paddleLeft && ball.positionX <= paddleRight) {
			ball.velocityX = 1;
		}


        //player2
        if(playerSecond.positionY < 0 + 20 ){
            playerSecond.velocityY = 0;
        }

        if(playerSecond.positionY > canvas.height - playerSecond.height - 20){
            playerSecond.velocityY = 0;
        }

        let paddleTopSecond = playerSecond.positionY;
        let paddleBottomSecond = paddleTopSecond + playerSecond.height;
        let paddleLeftSecond = playerSecond.positionX;
        let paddleRightSecond = playerSecond.positionX + playerSecond.width;

        if(ball.positionY >= paddleTopSecond && ball.positionY <= paddleBottomSecond && ball.positionX >= paddleLeftSecond && ball.positionX <= paddleRightSecond) {
            ball.velocityX = -1;
        }
    }

  
    function keyPush(event){
        switch(event.key){
            case "ArrowUp" :
                    playerFirst.velocityY = -1;
                break;
            case "ArrowDown" :
                    playerFirst.velocityY = 1
                break;
        }

        switch (event.key){
            case "9" :
                    playerSecond.velocityY = -1;
                break;
            case "6" :
                    playerSecond.velocityY = 1
                break;
        }

        if(scoreNumberFirst === 5 || scoreNumberSecond === 5){
            switch (event.key){
                case "Enter" :
                    location.reload()
                break;
            }
        }
    }

    function gamePlay(){
        drawItems();
        moveBall();
        movePlayer();
        if(scoreNumberFirst === 5 || scoreNumberSecond === 5){
            winnerShow();
        } else {
            requestAnimationFrame(gamePlay); 
        }
    }

    gamePlay();
