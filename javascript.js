function bottoMood() {
    var randomNumber = Math.floor((Math.random() * 7) + 1);
    var imgName = "botto" + randomNumber + ".png";
    document.body.style.backgroundImage = 'url(Images/Botto/' + imgName + ')';
}

function streetball() {
    var paddleHeight = 150;
    var paddleWidth = 10;
    var ballRadius = 25;
    var speedOfPaddle1 = 0;
    var positionOfPaddle1 = 460;
    var speedOfPaddle2 = 0;
    var positionOfPaddle2 = 460;
    var topPositionOfBall = 510;
    var leftPositionOfBall = 820;
    var topSpeedOfBall = 0;
    var leftSpeedOfBall = 0;
    var score1 = 0;
    var score2 = 0;
    var sides = [-1, 1];

    var isPractice;
    var name;
    var ballAcceleration;
    var initBallSpeed;

    startBall();

    function startBall() {
        isPractice = document.getElementById("practiceBool").innerHTML;
        name = document.getElementById("name").innerHTML;
        ballAcceleration = document.getElementById("ballAcceleration").innerHTML;
        initBallSpeed = document.getElementById("initBallSpeed").innerHTML;
        topPositionOfBall = window.innerHeight / 2;
        leftPositionOfBall = window.innerWidth / 2;
        topSpeedOfBall = sides[Math.floor(Math.random() * sides.length)] * initBallSpeed;
        leftSpeedOfBall = sides[Math.floor(Math.random() * sides.length)] * initBallSpeed;
    }

    document.addEventListener('keydown', function (e) {
        if (e.keyCode == 87 || e.which == 87) { //W key
            speedOfPaddle1 -= 10;
        }
        if (e.keyCode == 83 || e.which == 83) { //S key
            speedOfPaddle1 += 10;
        }
        if (e.keyCode == 38 || e.which == 38) { //up arrow
            speedOfPaddle2 -= 10;
        }
        if (e.keyCode == 40 || e.which == 40) { //down arrow
            speedOfPaddle2 += 10;
        }
    }, false);

    document.addEventListener('keyup', function (e) {
        if (e.keyCode == 87 || e.which == 87) { //W key
            speedOfPaddle1 = 0;
        }
        if (e.keyCode == 83 || e.which == 83) { //S key
            speedOfPaddle1 = 0;
        }
        if (e.keyCode == 38 || e.which == 38) { //up arrow
            speedOfPaddle2 = 0;
        }
        if (e.keyCode == 40 || e.which == 40) { //down arrow
            speedOfPaddle2 = 0;
        }
    }, false);

    var target1 = document.querySelector("#name");
    var observer1 = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            score1 = 0;
            score2 = 0;
            startBall();
        });
    });
    var config1 = { attributes: true, childList: true, characterData: true }
    observer1.observe(target1, config1);

    var target2 = document.querySelector("#practiceBool");
    var observer2 = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            score1 = 0;
            score2 = 0;
            startBall();
        });
    });
    var config2 = { attributes: true, childList: true, characterData: true }
    observer2.observe(target2, config2);

    window.setInterval(function show() {
        if (document.activeElement.id != "modes") {
            positionOfPaddle1 += speedOfPaddle1;
            positionOfPaddle2 += speedOfPaddle2;

            if (positionOfPaddle1 <= 100) {
                positionOfPaddle1 = 100;
            }
            if (positionOfPaddle2 <= 100) {
                positionOfPaddle2 = 100;
            }
            if (positionOfPaddle1 >= window.innerHeight - paddleHeight) {
                positionOfPaddle1 = window.innerHeight - paddleHeight;
            }
            if (positionOfPaddle2 >= window.innerHeight - paddleHeight) {
                positionOfPaddle2 = window.innerHeight - paddleHeight;
            }

            document.getElementById('paddle1').style.top = (positionOfPaddle1) + "px";
            document.getElementById('paddle2').style.top = (positionOfPaddle2) + "px";

            topPositionOfBall += topSpeedOfBall;
            leftPositionOfBall += leftSpeedOfBall;

            if (topPositionOfBall <= 100 || (topPositionOfBall >= window.innerHeight - ballRadius - 5)) {
                topSpeedOfBall = -topSpeedOfBall;
            }
            if (leftPositionOfBall <= paddleWidth - 2) {
                if (topPositionOfBall > positionOfPaddle1 &&
                    topPositionOfBall < positionOfPaddle1 + paddleHeight) {
                    leftSpeedOfBall = -leftSpeedOfBall * ballAcceleration;
                } else {
                    score2 += 1;
                    startBall();
                }
            }
            if (leftPositionOfBall >= window.innerWidth - ballRadius - paddleWidth + 2) {
                if ((topPositionOfBall > positionOfPaddle2 &&
                    topPositionOfBall < positionOfPaddle2 + paddleHeight) || (isPractice=="true")) {
                    leftSpeedOfBall = -leftSpeedOfBall * ballAcceleration;
                } else {
                    score1 += 1;
                    startBall();
                }
            }

            document.getElementById('ball').style.top = (topPositionOfBall) + "px";
            document.getElementById('ball').style.left = (leftPositionOfBall) + "px";

            document.getElementById('score1').innerHTML = score1.toString();
            document.getElementById('score2').innerHTML = score2.toString();
        }
    }, 1000 / 60);
}

function streetballClassic() {
    document.getElementById("name").innerHTML = "classic";
    document.getElementById("ballAcceleration").innerHTML = 1.15;
    document.getElementById("initBallSpeed").innerHTML = 5;
}

function streetballSpeedy() {
    document.getElementById("name").innerHTML = "speedy";
    document.getElementById("ballAcceleration").innerHTML = 1;
    document.getElementById("initBallSpeed").innerHTML = 10;
}