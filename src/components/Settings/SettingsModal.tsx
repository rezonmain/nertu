import { AnimatePresence, motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';

const SettingsModal = ({
	visible,
	onSettings,
	children,
}: {
	visible: boolean;
	onSettings: () => void;
	children: JSX.Element;
}) => {
	return (
		<AnimatePresence>
			{visible && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.65 }}
						exit={{ opacity: 0 }}
						className='fixed top-0 left-0 w-full h-screen sm:bg-black z-20'
						onClick={onSettings}
					></motion.div>
					<motion.div
						initial={{ top: '100%' }}
						animate={{ top: '0%' }}
						exit={{ top: '100%' }}
						transition={{
							type: 'keyframes',
						}}
						className='w-full h-screen absolute top-0 left-0 max-w-[640px] sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 bg-black z-30 sm:border-[0.5px] border-stone-600'
					>
						<div id='modal-content' className='px-7'>
							<div
								className='top-0 sticky cursor-pointer w-fit h-fit mb-5 flex flex-row bg-black py-5 gap-8'
								onClick={onSettings}
							>
								<IoMdClose size={30} className='translate-y-[3px]' />
								<h2 className='text-2xl'>settings</h2>
							</div>
							<div className=''>{children}</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default SettingsModal;
