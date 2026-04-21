import p5 from "p5";
import { sketchWidth, sketchHeight } from "../sketchSize";

export const sketchDrag = (p: p5) => {
    class Liquid {
        x: number;
        y: number;
        width: number;
        height: number;
        dragCoefficient: number;

        constructor(
            x: number, 
            y: number, 
            width: number, 
            height: number, 
            dragCoefficient: number
        ) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.dragCoefficient = dragCoefficient;
        }

        constains(ball: Ball) {
            const pos = ball.position;
            
            return (pos.x > this.x && pos.x < this.x + this.width && 
                    pos.y > this.y && pos.y < this.y + this.height);
        }

        draw() {
            p.noStroke();
            p.fill(175);
            p.rect(this.x, this.y, this.width, this.height);
        }
    }
    class Ball {
        position: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        mass: number;
        radius: number;
        
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

        applyFriction() {
            const friction = this.velocity.copy().normalize();
            const N = this.mass;
            const mu = 0.1;

            friction.mult(-1);
            friction.setMag(mu * N);
            this.applyForce(friction);
        }

        applyDrag(dragCoefficient: number) {
            const drag = this.velocity.copy().normalize();
            const speed = this.velocity.copy().mag()
            const v2 = speed * speed;

            drag.setMag(dragCoefficient * v2 * -1);
            this.applyForce(drag);
        }
        
        update() {
            this.bounceEdges();

            if(this.contactGround()) {
                this.applyFriction();
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
            return (this.position.y + this.radius >= sketchHeight)
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

    const balls: Ball[] = [];
    let liquid: Liquid;
    let wind: p5.Vector;

    p.setup = () => {
        p.createCanvas(sketchWidth, sketchHeight);

        wind = p.createVector(0.5, 0);
        liquid = new Liquid(0, sketchHeight / 2, sketchWidth, sketchHeight, 0.2);

        balls.push(new Ball(150, 30, 2));
        balls.push(new Ball(300, 30, 4));
    };

    p.draw = () => {
        p.background(255);
        liquid.draw();

        for(const ball of balls) {
            const gravity = p.createVector(0, 0.1 * ball.mass)
            ball.applyForce(gravity);

            if(liquid.constains(ball)) {
                ball.applyDrag(liquid.dragCoefficient);
            }

            if(p.mouseIsPressed) {
                ball.applyForce(wind);
            }

            ball.update();
            ball.draw();
        }
    };
};