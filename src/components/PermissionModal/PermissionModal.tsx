import { FiMic } from 'react-icons/fi';

const PermissionModal = ({ onAsk }: { onAsk: () => void }) => {
	return (
		<aside
			onClick={onAsk}
			className='fixed top-0 left-0 w-screen h-screen backdrop-blur-md z-20 cursor-pointer'
		>
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full'>
				<div className='flex flex-col items-center gap-5'>
					<p className='font-semibold text-xl p-2 text-center'>
						tap to start tuning
					</p>
					<div className='bg-stone-800 p-2 rounded-full'>
						<FiMic size={25} />
					</div>
				</div>
			</div>
		</aside>
	);
};

export default PermissionModal;
