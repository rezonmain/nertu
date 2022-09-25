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
						className='w-full min-h-screen absolute top-0 left-0 max-w-[640px] sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 bg-black z-30 sm:border-[0.5px] border-stone-600'
					>
						<div id='modal-content'>
							<div
								id='settings-header'
								className='top-0 sticky w-fit h-fit flex flex-row bg-black px-7 py-5 gap-8'
							>
								<div
									id='settings-exit'
									className='w-fit cursor-pointer'
									onClick={onSettings}
								>
									<IoMdClose size={30} className='translate-y-[3px]' />
								</div>
								<h2 className='text-2xl'>settings</h2>
							</div>
							<div>{children}</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default SettingsModal;
