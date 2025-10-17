export interface TurtleBound {
	top: number;
	bottom: number;
	left: number;
	right: number;
}

export interface Turtle {
	centerX: number;
	centerY: number;
	colors: Set<string>;
	bound: TurtleBound;
}

export interface ConsoleLine {
	text: string;
	color?: string;
}
