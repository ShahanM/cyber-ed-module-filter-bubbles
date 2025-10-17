import { useCallback, useState } from "react";
import { InstructionsModal } from "../components/InstructionsModal";
import { SimulationCanvas } from "../components/SimulationCanvas";
import { SimulationControls } from "../components/SimulationControls";
import type { ConsoleLine, Turtle, TurtleBound } from "../types/simulations";

const features = [
	"#DC143C",
	"#FF7F50",
	"#FF8C00",
	"#FFD700",
	"#9ACD32",
	"#00FA9A",
	"#008080",
	"#00FFFF",
	"#00BFFF",
	"#0000CD",
	"#BA55D3",
	"#EE82EE",
	"#FF00FF",
	"#FFB6C1",
	"#FF1493",
	"#B0C4DE",
	"#778899",
	"#708090",
	"#2F4F4F",
	"#7FFFD4",
	"#F0FFFF",
	"#F5F5DC",
	"#FFE4C4",
	"#FFEBCD",
	"#F5DEB3",
	"#DEB887",
];

function sample<T>(array: T[], n: number): T[] {
	const arrayIndexes = [...Array(array.length).keys()];
	const result: T[] = [];

	for (let i = 0; i < n; i++) {
		if (arrayIndexes.length === 0) break;
		const randomIndex = Math.floor(Math.random() * arrayIndexes.length);
		result.push(array[arrayIndexes[randomIndex]]);
		arrayIndexes.splice(randomIndex, 1);
	}

	return result;
}

export default function PreferenceDispersion() {
	const [turtles, setTurtles] = useState<Map<number, Turtle>>(new Map());
	const [consoleOutputs, setConsoleOutputs] = useState<ConsoleLine[]>([]);
	const [isRunning, setIsRunning] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [showInstructions, setShowInstructions] = useState(false);

	// Simulation Parameters
	const [numTurtles, setNumTurtles] = useState(30);
	const [numFeatures, setNumFeatures] = useState(5);
	const [searchRadius, setSearchRadius] = useState(50);
	const [maxIterations, setMaxIterations] = useState(500);
	const [stepInterval, setStepInterval] = useState(10);

	const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

	const updateConsole = useCallback((outputStr: string, color?: string) => {
		const newLine: ConsoleLine = { text: outputStr, color: color };
		setConsoleOutputs((prev) => [...prev, newLine]);
	}, []);

	const replaceConsole = useCallback((newLine: ConsoleLine) => {
		setConsoleOutputs([newLine]);
	}, []);

	const populate = useCallback((n: number, m: number): Map<number, Turtle> => {
		const newTurtles = new Map<number, Turtle>();
		for (let i = 0; i < n; i++) {
			const turtleColors = sample(features, m);
			const centerX = 24 + Math.random() * 456;
			const centerY = 24 + Math.random() * 456;

			const turtleBound: TurtleBound = {
				top: centerY - 24,
				bottom: centerY + 24,
				left: centerX - 24,
				right: centerX + 24,
			};

			let overlap = false;
			for (const existingTurtle of newTurtles.values()) {
				const val = existingTurtle.bound;
				if (
					val.top < turtleBound.bottom &&
					val.bottom > turtleBound.top &&
					val.left < turtleBound.right &&
					val.right > turtleBound.left
				) {
					overlap = true;
					break;
				}
			}
			if (overlap) {
				i--;
				continue;
			}
			const turtle: Turtle = {
				centerX,
				centerY,
				colors: new Set(turtleColors),
				bound: turtleBound,
			};
			newTurtles.set(i, turtle);
		}
		return newTurtles;
	}, []);

	const findNeighbors = (hostId: number, turtles: Map<number, Turtle>, radius: number): number[] => {
		const hostTurtle = turtles.get(hostId);
		if (!hostTurtle) return [];

		const neighbors: number[] = [];
		for (const [key, value] of turtles.entries()) {
			if (key === hostId) continue;

			const hostBound = hostTurtle.bound;
			const valueBound = value.bound;

			if (
				valueBound.top < hostBound.bottom + radius &&
				valueBound.bottom > hostBound.top - radius &&
				valueBound.left < hostBound.right + radius &&
				valueBound.right > hostBound.left - radius
			) {
				neighbors.push(key);
			}
		}
		return neighbors;
	};

	const axelrodStep = (currentTurtles: Map<number, Turtle>): Map<number, Turtle> => {
		const newTurtles = new Map(currentTurtles);
		const turtleIds = Array.from(newTurtles.keys());
		if (turtleIds.length === 0) return newTurtles;

		const turtleIdx = turtleIds[Math.floor(Math.random() * turtleIds.length)];
		const turtle = newTurtles.get(turtleIdx);
		if (!turtle) return newTurtles;

		const neighbors = findNeighbors(turtleIdx, newTurtles, searchRadius);
		if (neighbors.length === 0) return newTurtles;

		const neighborIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
		const neighbor = newTurtles.get(neighborIdx);
		if (!neighbor) return newTurtles;

		const overlap = [...turtle.colors].filter((x) => neighbor.colors.has(x));

		if (overlap.length > 0 && overlap.length < turtle.colors.size) {
			const turtleDiff = [...turtle.colors].filter((x) => !neighbor.colors.has(x));
			const neighborDiff = [...neighbor.colors].filter((x) => !turtle.colors.has(x));

			if (turtleDiff.length > 0 && neighborDiff.length > 0) {
				const featureToGain = neighborDiff[Math.floor(Math.random() * neighborDiff.length)];
				const featureToLose = turtleDiff[Math.floor(Math.random() * turtleDiff.length)];

				const newColors = new Set(turtle.colors);
				newColors.delete(featureToLose);
				newColors.add(featureToGain);

				newTurtles.set(turtleIdx, { ...turtle, colors: newColors });
			}
		}
		return newTurtles;
	};

	const handleInitialize = () => {
		replaceConsole({ text: "Initializing scene..." });
		if (numTurtles > 50) {
			updateConsole(
				"Error: Failed to initialize. This simulation world is not big enough for more than 50 turtles.",
				"red"
			);
			return;
		}
		if (numFeatures > 5) {
			updateConsole(
				"Warning: Turtles are simple creatures, and likes small number of preferences." +
					" More than 5 preferences, and some turtles will become secretive." +
					" It may be difficult for you see the information they are sharing but they are still secretly talking.",
				"yellow"
			);
		}
		const newTurtles = populate(numTurtles, numFeatures);
		setTurtles(newTurtles);
		setIsInitialized(true);
		updateConsole(`Initialized ${newTurtles.size} turtles.`);
	};

	const handleStep = () => {
		setTurtles((prevTurtles) => {
			let newTurtles = new Map(prevTurtles);
			for (let i = 0; i < stepInterval; i++) {
				newTurtles = axelrodStep(newTurtles);
			}
			return newTurtles;
		});
	};

	const runSimulation = async () => {
		setIsRunning(true);
		updateConsole("Running simulation...");

		let currentTurtles = turtles;
		for (let i = 0; i < maxIterations; i++) {
			currentTurtles = axelrodStep(currentTurtles);
			if (i % 10 === 0) {
				setTurtles(new Map(currentTurtles));
				await timer(10);
			}
		}
		setTurtles(new Map(currentTurtles));

		setIsRunning(false);
		updateConsole("Simulation complete.");
	};

	return (
		<div className="bg-gray-800 text-white min-h-screen font-sans p-4 lg:p-8 rounded-lg">
			<InstructionsModal isOpen={showInstructions} onClose={() => setShowInstructions(false)} />
			<div className="container mx-auto">
				<div className="flex flex-col lg:flex-row gap-8">
					<main className="w-full lg:w-2/3">
						<div className="flex flex-col md:flex-row gap-6">
							<div className="w-full md:w-1/3 text-gray-300 space-y-4">
								<div>
									<h2 className="text-3xl font-bold text-white">Filter Bubbles</h2>
									{/* <p className="mt-2 text-indigo-300">An agent-based simulation.</p> */}
								</div>
								<p>
									Filter bubbles form when you're only exposed to content that agrees with your
									existing beliefs.
								</p>
								<button
									onClick={() => setShowInstructions(true)}
									className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
								>
									Show Instructions
								</button>
								<hr className="border-gray-600" />
								<div className="text-sm">
									<h3 className="font-bold text-lg text-white">Experiments</h3>
									<p className="mt-2 font-semibold">After initializing:</p>
									<ol className="list-decimal list-inside mt-1 space-y-1">
										<li>Count the number of different turtle shell patterns.</li>
										<li>Count the number of different colors in total.</li>
									</ol>
									<p className="mt-4 font-semibold">After running:</p>
									<ol className="list-decimal list-inside mt-1 space-y-1">
										<li>How many distinct groups (bubbles) have formed?</li>
										<li>Did any turtles remain isolated?</li>
									</ol>
								</div>
							</div>
							<div className="w-full md:w-2/3">
								<SimulationCanvas turtles={turtles} width={500} height={500} />
							</div>
						</div>
					</main>

					<aside className="w-full lg:w-1/3">
						<SimulationControls
							numTurtles={numTurtles}
							setNumTurtles={setNumTurtles}
							numFeatures={numFeatures}
							setNumFeatures={setNumFeatures}
							searchRadius={searchRadius}
							setSearchRadius={setSearchRadius}
							maxIterations={maxIterations}
							setMaxIterations={setMaxIterations}
							stepInterval={stepInterval}
							setStepInterval={setStepInterval}
							isRunning={isRunning}
							isInitialized={isInitialized}
							consoleOutputs={consoleOutputs}
							onInitialize={handleInitialize}
							onStep={handleStep}
							onRun={runSimulation}
						/>
					</aside>
				</div>
			</div>
		</div>
	);
}
