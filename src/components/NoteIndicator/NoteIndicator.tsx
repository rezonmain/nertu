import { useSpring, animated } from '@react-spring/web';
import TET, { NoteName } from '../../lib/classes/TET';

const NoteIndicator = ({
	note,
	octave,
	as = 'linear',
}: {
	note: NoteName | undefined;
	octave: number | undefined;
	as?: 'linear' | 'curved';
}) => {
	const noteIndicatorProps = useSpring({
		to: {
			opacity: note ? 1 : 0,
		},
	});

	const enharmonic = new TET().getEnharmonic(note!);
	return (
		<animated.div
			id='note-indicator'
			style={noteIndicatorProps}
			className={`h-[100px] self-center ${
				as === 'curved' ? '-translate-y-10' : ''
			}`}
		>
			<div
				className={`flex flex-col gap-7 -rotate-45 ${
					enharmonic ? '-translate-y-3' : ''
				}`}
			>
				<p className='text-5xl block rotate-45'>
					{note}
					<sub className='text-xl'>{octave}</sub>
				</p>
				{enharmonic && (
					<>
						<hr className='border-stone-500' />
						<p className='text-4xl block rotate-45 text-stone-500 translate-x-4 -translate-y-1'>
							{enharmonic}
							<sub className='text-lg'>{octave}</sub>
						</p>
					</>
				)}
			</div>
		</animated.div>
	);
};

export default NoteIndicator;
