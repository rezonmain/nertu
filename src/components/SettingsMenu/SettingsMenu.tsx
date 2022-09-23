import { AnimatePresence, motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
const SettingsMenu = ({
	visible,
	onSettings,
}: {
	visible: boolean;
	onSettings: () => void;
}) => {
	return (
		<AnimatePresence>
			{visible && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.75 }}
						exit={{ opacity: 0 }}
						className='fixed top-0 left-0 w-full h-screen md:bg-black z-20'
						onClick={onSettings}
					></motion.div>
					<motion.div
						initial={{ top: '100%' }}
						animate={{ top: '0%' }}
						exit={{ top: '100%' }}
						transition={{
							type: 'keyframes',
						}}
						className='w-full h-full fixed top-0 left-0 max-w-3xl md:mx-auto bg-black z-30'
					>
						<div className='cursor-pointer w-fit h-fit' onClick={onSettings}>
							<IoMdClose size={30} />
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default SettingsMenu;
