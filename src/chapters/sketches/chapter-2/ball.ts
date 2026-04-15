import p5 from "p5";
import { sketchWidth, sketchHeight } from "../sketchSize";

export const sketchBall = (p: p5) => {
    class Ball {
        position: p5.Vector;
        velocity: p5.Vector;
        accelerationSpeed: number;
        topSpeed: number;

        constructor() {
            this.position = p.createVector(p.random(sketchWidth), p.random(sketchHeight));
            this.velocity = p.createVector(0, 0);
            this.accelerationSpeed = 0.2;
            this.topSpeed = 8;
        }
        
        update() {
            const mouse = p.createVector(p.mouseX, p.mouseY);
            
            const acceleration = p5.Vector.sub(mouse, this.position)
            acceleration.setMag(this.accelerationSpeed);
            
            this.velocity.add(acceleration);
            this.velocity.limit(this.topSpeed)
            
            this.position.add(this.velocity);
            
            this.checkEdges();
        }
        
        draw() {
            p.stroke(0);
            p.fill(127);
            
            p.circle(this.position.x, this.position.y, 48)
        }
        
        checkEdges() {
            if (this.position.x > sketchWidth) {
            this.position.x = sketchWidth;
            this.velocity.x *= -1;
            } 
            else if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x *= -1;
            }
            if (this.position.y > sketchHeight) {
            this.position.y = sketchHeight;
            this.velocity.y *= -1;
            } 
            else if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y *= -1;
            }
        }
    }

    let ball: Ball;
    p.setup = () => {
        p.createCanvas(sketchWidth, sketchHeight);
        ball = new Ball();
    };

    p.draw = () => {
        p.background(255);

        ball.update();
        ball.draw();
    };
};