import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { Button } from "./ui/button";

type P5SketchProps = {
  sketch: (p: p5) => void;
  description?: string;
}

export default function SketchPlayer({ sketch, description }: P5SketchProps) {
  const containerRef = useRef(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [running, setRunning] = useState(true);
 
  // Load sketch on mount or when sketch prop changes
  useEffect(() => {
    if (sketch && containerRef.current) {
      p5InstanceRef.current = new p5(sketch, containerRef.current);
    }
    return () => p5InstanceRef.current?.remove();
  }, [sketch]);
 
  const handleStartStop = () => {
    if (!p5InstanceRef.current) return;
    if (running) {
      p5InstanceRef.current.noLoop();
    } else {
      p5InstanceRef.current.loop();
    }
    setRunning((prev) => !prev);
  };
 
  const handleReload = () => {
    p5InstanceRef.current?.remove();
    if (sketch && containerRef.current) {
      p5InstanceRef.current = new p5(sketch, containerRef.current);
    }
    setRunning(true);
  };

  return (
    <div>
      <div ref={containerRef} style={{ width: 700, height: 400 }}/>
      <span>{description}</span>
      <div>
        <Button onClick={handleStartStop} > {running ? "Stop" : "Start"} </Button>
        <Button onClick={handleReload}> Reload </Button>
      </div>
    </div>
  )
}