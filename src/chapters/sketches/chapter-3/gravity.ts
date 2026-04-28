import p5 from "p5";
import { sketchWidth, sketchHeight } from "../sketchSize";

export const sketchGravity = (p: p5) => {
    class Ball {
        position: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        mass: number;
        radius: number;

        constructor(mass: number) {
            this.position = p.createVector(p.random(sketchWidth), p.random(sketchHeight));
            this.velocity = p.createVector(0, 0);
            this.acceleration = p.createVector(0, 0);
            this.mass = mass
            this.radius = p.sqrt(mass) * 2;
        }

        applyForce(force: p5.Vector) {
            const f = p5.Vector.div(force, this.mass);
            this.acceleration.add(f);
        }
                
        update() {
            this.bounceEdges();
            
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
        }

        attract(ball: Ball) {
            const force = p5.Vector.sub(this.position, ball.position);
            
            const distanceSquared = p.constrain(force.magSq(), 500, 1000);
            const G = 3;
            const strength = G * (this.mass * ball.mass) / distanceSquared;
            
            force.setMag(strength);
            ball.applyForce(force);
        }

        bounceEdges() {
            const bounce = -0.8;
            if (this.position.x > sketchWidth - this.radius) {
                this.position.x = sketchWidth - this.radius;
                this.velocity.x *= bounce;
            } 
            else if (this.position.x < this.radius) {
                this.position.x = this.radius;
                this.velocity.x *= bounce;
            }
            if (this.position.y > sketchHeight - this.radius) {
                this.position.y = sketchHeight - this.radius;
                this.velocity.y *= bounce;
            }
            else if(this.position.y < this.radius) {
                this.position.y = this.radius;
                this.velocity.y *= bounce;
            }
        }
                
        draw() {
            p.stroke(0);
            p.fill(127);
                    
            p.circle(this.position.x, this.position.y, this.radius * 2)
        }
    }

    const balls: Ball[] = [];

    p.setup = () => {
        p.createCanvas(sketchWidth, sketchHeight);

        for(let i = 0; i < 3; i++) {
          balls.push(new Ball(p.random(30, 80)));
        }
    }

    p.draw = () => {
        p.background(225);
        
        for(const ball of balls) {
          for(const other of balls) {
            if(ball !== other) {
              ball.attract(other);
            }
          }
          ball.update();
          ball.draw();
        }
    }
}