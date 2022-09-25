import { AnimatePresence, motion } from 'framer-motion';

const ControlModal = ({
	onCancel,
	title,
	children,
	visible,
}: {
	onCancel: () => void;
	title: string | null;
	children: JSX.Element | null;
	visible: boolean;
}) => {
	return (
		<AnimatePresence>
			{visible && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.6 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.2,
						}}
						onClick={onCancel}
						id='control-modal-bg'
						className='absolute top-0 left-0 w-full h-full bg-black'
					></motion.div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.2,
						}}
						id='control-modal'
						className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit w-[85vw] max-w-md bg-stone-700 p-4 rounded-md'
					>
						<h1 className='text-xl font-semibold'>{title}</h1>
						<div id='control' className='my-5'>
							{children}
						</div>
						<div
							id='control-modal-buttons'
							className='flex flex-row justify-end gap-4 font-semibold'
						>
							<button onClick={onCancel}>CANCEL</button>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};
export default ControlModal;
