export class TunerSettings {
	A: number;
	showEnharmonic: boolean;
	transposition: number;
	noteNameSystem: number;

	// Default values:
	constructor(
		A = 440,
		showEnharmonic = true,
		transposition = 0,
		noteNameSystems = 0
	) {
		this.A = A;
		this.showEnharmonic = showEnharmonic;
		this.transposition = transposition;
		this.noteNameSystem = noteNameSystems;
		return {
			...this,
		};
	}
}

export enum Transpositions {
	'C->C' = 0,
	'C-C#' = 1,
	'C->D' = 2,
	'C->Eb' = 3,
	'C->E' = 4,
	'C->F' = 5,
	'C->F#' = 6,
	'C->G' = 7,
	'C->Ab' = 8,
	'C->A' = 9,
	'C-Bb' = 10,
	'C-B' = 11,
}

export enum NoteSystems {
	'Alphabetic (C-B)' = 0,
	'Syllabic (Do-Si)' = 1,
}
