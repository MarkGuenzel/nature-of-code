import p5 from "p5";
import { sketchWidth, sketchHeight } from "../sketchSize";

export const sketchFriction = (p: p5) => {
    class Ball {
        position: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        mass: number;
        radius: number;
        frictionCoefficient = 0.1;
        
        constructor(x: number, y: number, mass: number) {
            this.position = p.createVector(x, y);
            this.velocity = p.createVector(0, 0);
            this.acceleration = p.createVector(0, 0);
            this.mass = mass;
            this.radius = mass * 8;
        }

        applyForce(force: p5.Vector) {
            const f = p5.Vector.div(force, this.mass);
            this.acceleration.add(f);
        }
        
        update() {
            this.bounceEdges();

            if(this.contactGround()) {
                const friction = this.velocity.copy();
                friction.mult(-1);
                friction.setMag(this.frictionCoefficient);
                this.applyForce(friction)
            }

            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
        }

        
        draw() {
            p.stroke(0);
            p.strokeWeight(2)
            p.fill(127, 127);
            
            p.circle(this.position.x, this.position.y, this.radius * 2);
        }
        
        contactGround(): boolean {
            return (this.position.y + this.radius > sketchHeight)
        }

        bounceEdges() {
            // A new variable to simulate an inelastic collision
            // 10% of the velocity's x or y component is lost
            const bounce = -0.9;
            if (this.position.x > sketchWidth - this.radius) {
                this.position.x = sketchWidth - this.radius;
                this.velocity.x *= bounce;
            } else if (this.position.x < this.radius) {
                this.position.x = this.radius;
                this.velocity.x *= bounce;
            }
            if (this.position.y > sketchHeight - this.radius) {
                this.position.y = sketchHeight - this.radius;
                this.velocity.y *= bounce;
            }
        }
    }

    let ball: Ball;
    let gravity: p5.Vector;
    let wind: p5.Vector;
    p.setup = () => {
        p.createCanvas(sketchWidth, sketchHeight);

        ball = new Ball(sketchWidth / 2, 30, 5);
        gravity = p.createVector(0, 1);  //{!1} I should scale by mass to be more accurate, but this example only has one circle
        wind = p.createVector(0.5, 0);
    };

    p.draw = () => {
        p.background(255);

        ball.applyForce(gravity);

        if(p.mouseIsPressed) {
            ball.applyForce(wind);
        }

        ball.update();
        ball.draw();
    };
};