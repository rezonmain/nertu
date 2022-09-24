export class TunerSettings {
	A: number;
	showEnharmonic: boolean;
	transposition: number;
	noteNameSystem: number;

	// Default values:
	constructor(
		A = TunerSettings.DEF.A,
		showEnharmonic = TunerSettings.DEF.showEnharmonic,
		transposition = TunerSettings.DEF.transposition,
		noteNameSystems = TunerSettings.DEF.noteNameSystems
	) {
		this.A = A;
		this.showEnharmonic = showEnharmonic;
		this.transposition = transposition;
		this.noteNameSystem = noteNameSystems;
		return {
			...this,
		};
	}

	static DEF = {
		A: 440,
		showEnharmonic: true,
		transposition: 0,
		noteNameSystems: 0,
	};
}

export enum Transpositions {
	'C→C' = 0,
	'C♯→C' = 1,
	'D→C' = 2,
	'E♭→C' = 3,
	'E→C' = 4,
	'F→C' = 5,
	'F♯→C' = 6,
	'G→C' = 7,
	'A♭→C' = 8,
	'A→C' = 9,
	'B♭→C' = 10,
	'B→C' = 11,
}

export enum NoteSystems {
	'Alphabetic (C-B)' = 0,
	'Syllabic (Do-Si)' = 1,
}
