/**
 * Exposes functions to handle pitch and
 * frequency conversions in 12th equal temperament.
 */
class TET {
	A: number;
	C0: number;
	min: number;
	max: number;
	/**
	 *
	 * @param A Reference pitch for calculations, it defaults to `440hz`
	 */
	constructor(A: number = 440) {
		this.A = A;
		// Use C0 to calculate note frequencies
		this.C0 = this.A * 2 ** (-57 / 12);
		this.min = this.C0;
		this.max = this.toFrequency({
			noteName: 'B',
			octave: 8,
			cents: 0,
			ref: this.A,
		});
	}
	/**
	 * Get the semitone number of a given pitch e.g.
	 * `C0 = 0`, `C♯0 = 1`, `A4 = 57`
	 */
	noteToSemitoneNumber(note: Note) {
		const { noteName, octave } = note;
		return octave * 12 + NoteMap[noteName];
	}

	/**
	 * Provides a map function to iterate over every note name
	 * @param callback Callback function to execute on each note name
	 */
	noteNameIter<T>(callback: (note: NoteName, index: number) => T) {
		const notes = [
			'C',
			'C♯',
			'D',
			'E♭',
			'E',
			'F',
			'F♯',
			'G',
			'A♭',
			'A',
			'B♭',
			'B',
		] as NoteName[];
		return notes.map(callback);
	}

	/**
	 *
	 * @param note input `note` object or semitone number.
	 * @returns frequency in hz.
	 */
	toFrequency(note: Note | number) {
		const num =
			typeof note === 'number' ? note : this.noteToSemitoneNumber(note);
		const cents = typeof note === 'number' ? 0 : note.cents ?? 0;
		// f = C0 * 2 ^ (SemitoneNumber / 12)
		// f(+-)cents = f * 2 ^ (AmountOfCents / 12000)
		return this.C0 * 2 ** (num / 12) * 2 ** (cents / 1200);
	}

	/**
	 * Convert a given frequency to its closest note,
	 * considering cents. e.g. an `A4` with +51 cents
	 * (453.15455hz) will return an `B♭4` with -49 cents
	 * @param frequency input frequency in hz.
	 * @returns `note` object for given fequency.
	 */
	frequencyToNote(frequency: number, transposition = 0): Note | undefined {
		if (frequency >= this.min && frequency <= this.max) {
			const number = Math.round(this.log2((frequency / this.C0) ** 12));
			const octave = Math.floor((number - transposition) / 12);
			const noteName = NoteMap[
				(number - octave * 12 + (12 - transposition)) % 12
			] as NoteName;
			const cents = Math.round(
				this.log2((frequency / (this.C0 * 2 ** (number / 12))) ** 1200)
			);
			return {
				noteName,
				octave,
				cents,
				ref: this.A,
			};
		}
	}

	getEnharmonic(noteName: NoteName) {
		return noteName && Enharmonic[noteName];
	}

	private log2(x: number) {
		return Math.log(x) / Math.log(2);
	}
}

export enum NoteMap {
	'C' = 0,
	'C♯' = 1,
	'D' = 2,
	'E♭' = 3,
	'E' = 4,
	'F' = 5,
	'F♯' = 6,
	'G' = 7,
	'A♭' = 8,
	'A' = 9,
	'B♭' = 10,
	'B' = 11,
}

enum Enharmonic {
	'C' = '',
	'D' = '',
	'E' = '',
	'F' = '',
	'G' = '',
	'A' = '',
	'B' = '',
	'C♯' = 'D♭',
	'E♭' = 'D♯',
	'F♯' = 'G♭',
	'A♭' = 'G♯',
	'B♭' = 'A♯',
}

export type NoteName = keyof typeof NoteMap;

export interface Note {
	noteName: NoteName;
	octave: number;
	cents: number;
	ref: number;
}

export default TET;
