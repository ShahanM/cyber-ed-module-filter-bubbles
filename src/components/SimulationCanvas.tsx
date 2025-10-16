import React, { useEffect, useRef } from "react";
import { type Turtle } from "../types/simulations";

interface SimulationCanvasProps {
	turtles: Map<number, Turtle>;
	width: number;
	height: number;
}

const drawTurtle = (ctx: CanvasRenderingContext2D, turtle: Turtle, label: number) => {
	const { centerX: posX, centerY: posY, colors } = turtle;
	const turtleColors = Array.from(colors);

	// Head
	ctx.beginPath();
	ctx.fillStyle = "green";
	ctx.arc(posX, posY - 18, 8, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();

	// Tail
	ctx.beginPath();
	ctx.moveTo(posX - 5, posY + 6);
	ctx.lineTo(posX + 5, posY + 6);
	ctx.lineTo(posX, posY + 22);
	ctx.fill();
	ctx.stroke();

	// Legs
	ctx.fillStyle = "green";
	ctx.beginPath();
	ctx.ellipse(posX - 10, posY + 13, 5, 7, Math.PI / 4, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.ellipse(posX + 10, posY + 13, 5, 7, -Math.PI / 4, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.ellipse(posX - 11, posY - 10, 5, 7, -Math.PI / 4, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.ellipse(posX + 11, posY - 10, 5, 7, Math.PI / 4, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();

	// Body/Shell
	ctx.beginPath();
	ctx.fillStyle = turtleColors[0] || "#cccccc";
	ctx.ellipse(posX, posY, 13, 16, 0, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();

	// Shell patches
	ctx.fillStyle = turtleColors[1] || "#cccccc";
	ctx.fillRect(posX, posY, 10, 10);
	ctx.stroke();

	ctx.fillStyle = turtleColors[2] || "#cccccc";
	ctx.fillRect(posX - 10, posY, 10, 10);
	ctx.stroke();

	ctx.fillStyle = turtleColors[3] || "#cccccc";
	ctx.fillRect(posX - 10, posY - 10, 10, 10);
	ctx.stroke();

	ctx.fillStyle = turtleColors[4] || "#cccccc";
	ctx.fillRect(posX, posY - 10, 10, 10);
	ctx.stroke();

	// Label
	ctx.font = "10px Arial";
	ctx.fillStyle = "white";
	const labelStr = label.toString().padStart(2, "0");
	ctx.fillText(labelStr, posX - 6, posY - 16);
};

export const SimulationCanvas: React.FC<SimulationCanvasProps> = ({ turtles, width, height }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Clear canvas before drawing
		ctx.clearRect(0, 0, width, height);

		// Draw all turtles from the current state
		turtles.forEach((turtle, id) => {
			drawTurtle(ctx, turtle, id);
		});
	}, [turtles, width, height]);

	return <canvas ref={canvasRef} width={width} height={height} className="bg-gray-700 rounded-lg shadow-inner" />;
};
