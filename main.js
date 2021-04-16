var shapes = []
var tools = document.querySelector('.tools')
var colorMe = document.querySelector('#colorMe')
var rotateMe = document.querySelector('#rotateMe')
var removeMe = document.querySelector('#removeMe')



function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

removeMe.addEventListener('click', () => {
    shapes.map(shape => {
        if (shape.tagged == true) {
            shape.x = 0
            shape.y = 0
            shape.z = 0
            console.log(shape);
        }
    })
})

rotateMe.addEventListener('input', (event) => {
    console.log(event.target.value);
    shapes.map(shape => {
        if (shape.tagged == true) {
            shape.rotate = +event.target.value
            console.log(shape);
        }
    })
})

colorMe.addEventListener('input', (event) => {
    console.log(event.target.value);
    var rgb = hexToRgb(event.target.value)
    console.log(rgb);
    shapes.map(shape => {
        if (shape.tagged == true) {
            shape.color = rgb
        }
    })

})




function setup() {
    const canvas = createCanvas(windowWidth, windowHeight / 2);
    canvas.parent('shape')
    angleMode(DEGREES)

    document.querySelectorAll('.inputs .card').forEach(elm => {
        elm.addEventListener('click', (event) => {
            let x = random(width);
            let y = random(height);
            let r = random(20, 60);
            elm.getAttribute('id') == 'Circule' ? b = new Circle(x, y, r) : null
            elm.getAttribute('id') == 'Triangle' ? b = new Triangle(x, y, r) : null
            elm.getAttribute('id') == 'Line' ? b = new Line(x, y, r) : null
            elm.getAttribute('id') == 'Rectangle' ? b = new Rectangle(x, y, r) : null
            shapes.push(b);
        }
        )
    })
}

function makeItHapped() {
    tools.style.display = "flex"
}

function mouseDragged() {
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].clicked(mouseX, mouseY);
    }
}

function draw() {
    
    rectMode(CENTER);
    background(0);
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].show();
    }
}

function mouseWheel(event) {
    console.log(event.delta);
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].hovred(mouseX, mouseY, event.delta)
    }
}


function doubleClicked() {
    shapes.map(shape => {
        if (shape.tagged == true) {
            shape.tagged = false

        }
    })

    shapes.map(shape => {
        shape.tagMe(mouseX, mouseY)
        makeItHapped()
        console.log(shape);
    })
}




class Rectangle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = {
            r: 255,
            g: 255,
            b: 255
        }
        this.tagged = false
        this.rotate = 0


    }
    clicked(x, y) {
        console.log(this.x, this.y);
        let d = dist(x, y, this.x, this.y);
        console.log(d + ' r = ' + Math.abs(this.r));
        if (d < Math.abs(this.r)) {
            clear();
            this.x = x;
            this.y = y;
        }
    }
    show() {
        push()
        
        stroke(this.color.r, this.color.g, this.color.b);
        fill(this.color.r, this.color.g, this.color.b);
        strokeWeight(4);
        rotate(this.rotate);
        rect(this.x, this.y, this.r, this.r);
        pop()
    }
    hovred(x, y, delta) {
        let d = dist(x, y, this.x, this.y);
        if (d < Math.abs(this.r)) {
            delta > 0 ? this.r += (10) : this.r -= (10)
        }
    }
    tagMe(x, y) {
        let d = dist(x, y, this.x, this.y);
        if (d < Math.abs(this.r)) {
            this.tagged = true
        }
    }
}


class Line {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = {
            r: 255,
            g: 255,
            b: 255
        }
        this.tagged = false
    }
    clicked(x, y) {
        let d = dist(x, y, this.x, this.y);
        if (d < Math.abs(this.r)) {
            clear();
            this.x = x;
            this.y = y;
        }
    }
    hovred(x, y, delta) {
        let d = dist(x, y, this.x, this.y);
        if (d < Math.abs(this.r)) {
            delta > 0 ? this.r += (10) : this.r -= (10)
        }
    }
    show() {
        stroke(this.color.r, this.color.g, this.color.b);
        fill(this.color.r, this.color.g, this.color.b);
        strokeWeight(4);
        line(this.x + this.r, this.y - this.r, this.x - this.r, this.y + this.r);
    }
    tagMe(x, y) {
        let d = dist(x, y, this.x, this.y);
        if (d < Math.abs(this.r)) {
            this.tagged = true
        }
    }
}

class Triangle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r
        this.color = {
            r: 255,
            g: 255,
            b: 255
        }
        this.tagged = false
    }
    clicked(x, y) {
        let d = dist(x, y, this.x, this.y);
        if (d < 40) {
            clear();
            this.x = x;
            this.y = y;
        }
    }
    hovred(x, y, delta) {
        let d = dist(x, y, this.x, this.y);
        if (d < Math.abs(this.r)) {
            delta > 0 ? this.r += (10) : this.r -= (10)
        }
    }
    show() {
        stroke(this.color.r, this.color.g, this.color.b);
        fill(this.color.r, this.color.g, this.color.b);
        strokeWeight(4);
        triangle(this.x, this.y, this.x - this.r, this.y + (this.r * 2), this.x + this.r, this.y + (this.r * 2));
    }
    tagMe(x, y) {
        let d = dist(x, y, this.x, this.y);
        if (d < Math.abs(this.r)) {
            this.tagged = true
        }
    }
}
class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = {
            r: 255,
            g: 255,
            b: 255
        }
        this.tagged = false
    }

    clicked(x, y) {
        let d = dist(x, y, this.x, this.y);
        if (d < this.r) {
            clear();
            this.x = x;
            this.y = y;
        }
    }
    hovred(x, y, delta) {
        let d = dist(x, y, this.x, this.y);
        if (d < Math.abs(this.r)) {
            delta > 0 ? this.r += (10) : this.r -= (10)
            this.r < 0 ? this.r = 0 : null
        }
    }
    show() {
        stroke(this.color.r, this.color.g, this.color.b);
        fill(this.color.r, this.color.g, this.color.b);
        strokeWeight(4);

        ellipse(this.x, this.y, this.r * 2);
    }
    tagMe(x, y) {
        let d = dist(x, y, this.x, this.y);
        if (d < Math.abs(this.r)) {
            this.tagged = true
        }
    }
}