var socket = io();

let symbolSize = 18;
let timeElapsed = 0.0;

let cols;

let streams = [];

let gfx;

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}


function setup() {
    createCanvas(windowWidth, windowHeight, P2D);

    colorSet = color(132, 92, 100);

    cols = width / symbolSize;

    for (let i = 0; i < cols; i++) {
        let x = i * symbolSize;
        streams[i] = new Stream(x);
        streams[i].prepare();
    }

    gfx = createGraphics(width, height, P2D);
}

function draw() {
    background(0);
    gfx.background(0);

    for (let i = 0; i < streams.length; i++) {
        streams[i].update(timeElapsed);
        streams[i].render();
    }

    //gfx.filter(BLUR,5);
    image(gfx, 0, 0);

    timeElapsed = 1 / frameRate();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    cols = width / symbolSize;

    for (let i = 0; i < cols; i++) {
        let x = i * symbolSize;
        streams[i] = new Stream(x);
        streams[i].prepare();
    }
}


class Stream {
    constructor(x) {
        this.x = x;
        this.y = 0;
        this.length = 1;
        this.text = "";
        this.interval = 0.05;
        this.time = 0.0;
    }

    prepare() {
        let rows = height * 0.5 / symbolSize;
        this.y = random(rows) * symbolSize * -1;
        this.length = round(random(12, 64));

        this.text = this.getRandomString(this.length);


        this.interval = random(0.01, 0.08);
    }

    getRandomString(len) {
        let st = "";
        for (let i = 0; i < len; i++) {
            st += (this.randomChar());

        }
        return st;
    }



    shiftString(s) {
        return s.charAt(s.length - 1) + s.substring(0, s.length - 1);
    }

    randomChar() {
        return String.fromCharCode(
            0x30A0 + round(random(0, 96))
        );
    }

    flicker() {
        let r = round(random(0, 2));

        if (r == 0) {
            let idx = round(random(2, this.text.length));
            this.text = this.text.replaceAt(idx, this.randomChar());
        }
    }

    update(elapsed) {
        if (this.time >= this.interval) {
            this.y += symbolSize;
            this.time = 0;

            this.text = this.shiftString(this.text);
        }

        if (this.y - (this.text.length * symbolSize) > height) {
            this.prepare();
        }

        this.flicker();

        this.time += elapsed;

    }


    render() {
        colorMode(HSB, 360, 100, 100);


        for (let i = 0; i < this.text.length; i++) {
            let col = colorSet;

            let _x = this.x;
            let _y = this.y - (i * symbolSize);

            let brightVal = map(this.interval, 0.01, 0.08, 100, 20);
            col = color(132, 92, brightVal);

            let c = this.text[i];

            if (i < 4) {
                col = color(132, 20, brightVal + 20);
            }

            if (i > this.text.length - (this.text.length / 4)) {
                col = color(132, 992, brightVal - 20);
            }

            if (i == 0) {
                c = this.randomChar();
                col = color(0, 0, 100);
            }

            gfx.textSize(symbolSize);
            gfx.fill(col);
            gfx.text(c, _x, _y);
        }
    }
}

// Language: javascript
// Path: public\sketch.js

var colorSet;

var codeInput = document.getElementById("codeInput");
codeInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        checkCode()
    }
});
var submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
    event.preventDefault();
    checkCode();
});

function checkCode() {
    var msg = document.getElementById("codeInput").value;
    if (msg == "1234") {
        console.log("correct");
        document.getElementById("codeInput").style.display = "none";
        document.getElementById("response").style.display = "block";
        document.getElementById("response").innerHTML = "Correct! The key is: <b>KUTSTAMBESTUUR</b>";
    } else {
        console.log("incorrect");
        document.getElementById("codeInput").style.display = "none";
        document.getElementById("response").style.display = "block";
        document.getElementById("response").innerHTML = "Incorrect! Try again.";
    }
    setTimeout(function () {
        document.getElementById("codeInput").style.display = "block";
        document.getElementById("response").style.display = "none";
        colorSet = color(132, 92, 100);
    }, 2500);
}