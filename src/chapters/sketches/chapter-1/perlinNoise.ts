import p5 from "p5";
import { sketchWidth, sketchHeight } from "../sketchSize";

class PerlinNoise {   
    smoothstep(x: number) {
        return x * x * (3 - 2 * x);
    }
  
    randomGradient(x: number, y: number) {
        let h = Math.imul(x, 0x9e3779b9);
        h ^= Math.imul(y, 0x85ebca6b);
        h = Math.imul(h ^ (h >>> 16), 0x45d9f3b7);
        h = Math.imul(h ^ (h >>> 16), 0x45d9f3b7);
        h = (h ^ (h >>> 16)) >>> 0;

        const angle = (h / 0xFFFFFFFF) * Math.PI * 2;
        return [Math.cos(angle), Math.sin(angle)];
    }
  
    dot(gradient: number[], dx: number, dy: number) {
        return gradient[0] * dx + gradient[1] * dy
    }
  
    interpolation(floor: number, ceil: number, fraction: number) {
        return floor + this.smoothstep(fraction) * (ceil - floor);
    }
  
    getValue(x: number, y: number, scale: number = 0.9) {
        // Apply scale to avoid dx, dy = 0
        x *= scale;
        y *= scale;
      
        const xFloor = Math.floor(x);
        const yFloor = Math.floor(y);
        const xCeil = xFloor + 1;
        const yCeil = yFloor + 1;
      
        // Gradients
        const g00 = this.randomGradient(xFloor, yFloor); // bottom-left
        const g10 = this.randomGradient(xCeil,  yFloor); // bottom-right
        const g01 = this.randomGradient(xFloor, yCeil);  // top-left
        const g11 = this.randomGradient(xCeil,  yCeil);  // top-right
      
        // Direction Vectors
        const dx = x - xFloor;
        const dy = y - yFloor;
      
        // Calculate dot product between gradients and input position
        const n00 = this.dot(g00, dx, dy);
        const n10 = this.dot(g10, dx - 1, dy);
        const n01 = this.dot(g01, dx, dy - 1);
        const n11 = this.dot(g11, dx - 1, dy - 1);
        
        // Perform Bilinearinterpolation
        const lerpBottom = this.interpolation(n00, n10, dx);
        const lerpTop = this.interpolation(n01, n11, dx);
        return this.interpolation(lerpBottom, lerpTop, dy);
    }
}

export const sketchPerlinNoise = (p: p5) => {
    const timeStep = 0.05;
    const noise = new PerlinNoise();

    p.setup = () => {
        p.createCanvas(sketchWidth, sketchHeight);
        p.loadPixels();

        let xoff =  0.0;
        for (let x = 0; x < sketchWidth; x++) {
            let yoff = 0.0;

            for (let y = 0; y < sketchHeight; y++) {
                const brightness = p.map(noise.getValue(xoff, yoff), -1, 1, 0, 255, true);
                p.set(x, y, p.floor(brightness));
                yoff  += timeStep;
            }
            xoff += timeStep;
        }

        p.updatePixels();
    };

    p.draw = () => {

    };
};