import p5 from "p5";
import { sketchWidth, sketchHeight } from "./sktechSize";

export const mySketch = (p: p5) => {
    p.setup = () => p.createCanvas(sketchWidth, sketchHeight);
    p.draw = () => {
        p.background(30);
        p.fill(255, 100, 100);
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
    };
};