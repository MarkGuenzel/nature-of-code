import p5 from "p5";
import { sketchWidth, sketchHeight } from "./sktechSize";

class ValueNoise {
    hash1D(x: number) {
        let h = Math.imul(x, 0x9e3779b9);
        h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
        h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
        return (h ^ (h >>> 16)) >>> 0;
    }
  
    getValue(x: number) {
        // Perform linear interpolation
        const floorHash = this.hash1D(Math.floor(x));
        const ceilHash = this.hash1D(Math.ceil(x));
        const fraction = x - Math.floor(x);
        const interpolatedHash = floorHash + fraction * (ceilHash - floorHash);

        // Normalize to get values between 0 and 1
        return interpolatedHash / 0xFFFFFFFF; // hash1D returns a 32-bit integer
    }
}

class ValueNoiseSmooth {
    hash1D(x: number) {
        let h = Math.imul(x, 0x9e3779b9);
        h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
        h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
        return (h ^ (h >>> 16)) >>> 0;
    }

    smoothstep(x: number) {
        return x * x * (3 - 2 * x);
    }
  
    getValue(x: number) {
        // Perform linear interpolation
        const floorHash = this.hash1D(Math.floor(x));
        const ceilHash = this.hash1D(Math.ceil(x));
        const fraction = x - Math.floor(x);
        const interpolatedHash = floorHash + this.smoothstep(fraction) * (ceilHash - floorHash);

        // Normalize to get values between 0 and 1
        return interpolatedHash / 0xFFFFFFFF; // hash1D returns a 32-bit integer
    }
}

class ValueNoise2D {
    hash2D(x: number, y: number) {
        let h = Math.imul(x, 0x9e3779b9);
        h ^= Math.imul(y, 0x85ebca6b);
        h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
        h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
        return (h ^ (h >>> 16)) >>> 0;
    }
  
    smoothstep(x: number) {
        return x * x * (3 - 2 * x);
    }
  
    interpolation(floor: number, ceil: number, fraction: number) {
        return floor + this.smoothstep(fraction) * (ceil - floor);
    }
  
    getValue(x: number, y: number) {
        const xFloor = Math.floor(x);
        const yFloor = Math.floor(y);
        const xCeil = xFloor + 1;
        const yCeil = yFloor + 1;
      
        const n00 = this.hash2D(xFloor, yFloor); // bottom-left
        const n10 = this.hash2D(xCeil,  yFloor); // bottom-right
        const n01 = this.hash2D(xFloor, yCeil);  // top-left
        const n11 = this.hash2D(xCeil,  yCeil);  // top-right
        
        // Perform Bilinearinterpolation
        const lerpBottom = this.interpolation(n00, n10, x - xFloor);
        const lerpTop = this.interpolation(n01, n11, x - xFloor);
        return this.interpolation(lerpBottom, lerpTop, y - yFloor) / 0xFFFFFFFF;
    }
}

export const sketchValueNoise = (p: p5) => {
    let time = 0.0;
    const timeStep = 0.01;
    const noise = new ValueNoise();

    p.setup = () => {
        p.createCanvas(sketchWidth, sketchHeight);
    };

    p.draw = () => {
        p.background(255);
        let xoff = time;
        p.noFill();
        p.stroke(0);
        p.strokeWeight(2);

        p.beginShape();
        for (let i = 0; i < sketchWidth; i++) {
            const y = noise.getValue(xoff) * sketchHeight;
            xoff += timeStep;
            p.vertex(i, y);
        }
        p.endShape();
        time +=  timeStep;
    };
};

export const sketchValueNoiseSmooth = (p: p5) => {
    let time = 0.0;
    const timeStep = 0.01;
    const noise = new ValueNoiseSmooth();

    p.setup = () => {
        p.createCanvas(sketchWidth, sketchHeight);
    };

    p.draw = () => {
        p.background(255);
        let xoff = time;
        p.noFill();
        p.stroke(0);
        p.strokeWeight(2);

        p.beginShape();
        for (let i = 0; i < sketchWidth; i++) {
            const y = noise.getValue(xoff) * sketchHeight;
            xoff += timeStep;
            p.vertex(i, y);
        }
        p.endShape();
        time +=  timeStep;
    };
};

export const sketchValueNoise2D = (p: p5) => {
    const timeStep = 0.05;
    const noise = new ValueNoise2D();

    p.setup = () => {
        p.createCanvas(sketchWidth, sketchHeight);
        p.loadPixels();

        let xoff =  0.0;
        for (let x = 0; x < sketchWidth; x++) {
            let yoff = 0.0;

            for (let y = 0; y < sketchHeight; y++) {
                const brightness = p.map(noise.getValue(xoff, yoff), 0, 1, 0, 255);
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
