import React from "react";
import type { ConsoleLine } from "../types/simulations";

const InfoIcon = ({ text }: { text: string }) => <span title={text}>ℹ️</span>;
const StatusConsole = ({ consoleOutputs }: { consoleOutputs: ConsoleLine[] }) => (
	<div className="h-36 bg-gray-900 font-mono text-xs p-2 rounded-md overflow-y-auto">
		{consoleOutputs.map((line, i) => (
			<p
				key={i}
				className="whitespace-pre-wrap"
				style={{ color: line.color ? line.color : "white" }}
			>{`> ${line.text}`}</p>
		))}
	</div>
);

interface SimulationControlsProps {
	numTurtles: number;
	setNumTurtles: (n: number) => void;
	numFeatures: number;
	setNumFeatures: (n: number) => void;
	searchRadius: number;
	setSearchRadius: (n: number) => void;
	maxIterations: number;
	setMaxIterations: (n: number) => void;
	stepInterval: number;
	setStepInterval: (n: number) => void;
	isRunning: boolean;
	isInitialized: boolean;
	consoleOutputs: ConsoleLine[];
	onInitialize: () => void;
	onStep: () => void;
	onRun: () => void;
}

const ControlInput = ({
	label,
	id,
	value,
	onChange,
	infoText,
}: {
	label: string;
	id: string;
	value: number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	infoText: string;
}) => (
	<div className="flex items-center space-x-2">
		<label htmlFor={id} className="w-6 text-center font-mono font-bold text-gray-500">
			{label}
		</label>
		<input
			type="number"
			id={id}
			value={value}
			onChange={onChange}
			className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
		/>
		<div className="w-6 text-center">
			<InfoIcon text={infoText} />
		</div>
	</div>
);

const ActionButton = ({
	onClick,
	disabled,
	children,
	variant = "primary",
}: {
	onClick: () => void;
	disabled: boolean;
	children: React.ReactNode;
	variant?: "primary" | "secondary";
}) => {
	const baseClasses =
		"w-full rounded-md px-4 py-2 text-sm cursor-pointer font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
	const variantClasses =
		variant === "primary"
			? "bg-amber-600 text-white hover:bg-amber-500 focus-visible:outline-amber-600"
			: "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50";

	return (
		<button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variantClasses}`}>
			{children}
		</button>
	);
};

export const SimulationControls: React.FC<SimulationControlsProps> = (props) => {
	return (
		<div className="bg-gray-100 p-4 rounded-lg shadow-md space-y-4 text-gray-900">
			<div className="space-y-3">
				<ControlInput
					label="n"
					id="num-turtles"
					value={props.numTurtles}
					onChange={(e) => props.setNumTurtles(parseInt(e.target.value, 10))}
					infoText="Number of turtles in the population."
				/>
				<ControlInput
					label="m"
					id="num-features"
					value={props.numFeatures}
					onChange={(e) => props.setNumFeatures(parseInt(e.target.value, 10))}
					infoText="Number of features each turtle has."
				/>
				<ControlInput
					label="r"
					id="search-radius"
					value={props.searchRadius}
					onChange={(e) => props.setSearchRadius(parseInt(e.target.value, 10))}
					infoText="Search radius of each turtle."
				/>
				<ControlInput
					label="k"
					id="num-iterations"
					value={props.maxIterations}
					onChange={(e) => props.setMaxIterations(parseInt(e.target.value, 10))}
					infoText="Maximum iterations for the full simulation run."
				/>
			</div>

			<ActionButton onClick={props.onInitialize} disabled={props.isRunning}>
				Initialize
			</ActionButton>

			<StatusConsole consoleOutputs={props.consoleOutputs} />

			<div className="pt-4 border-t">
				<ControlInput
					label="k"
					id="step-interval"
					value={props.stepInterval}
					onChange={(e) => props.setStepInterval(parseInt(e.target.value, 10))}
					infoText="Number of iterations for a single step."
				/>
				<div className="mt-3 grid grid-cols-2 gap-3">
					<ActionButton
						onClick={props.onStep}
						disabled={props.isRunning || !props.isInitialized}
						variant="secondary"
					>
						Step
					</ActionButton>
					<ActionButton onClick={props.onRun} disabled={props.isRunning || !props.isInitialized}>
						Run
					</ActionButton>
				</div>
			</div>
		</div>
	);
};
