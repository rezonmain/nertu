import { FiMic } from 'react-icons/fi';

const PermissionModal = ({
	onPermissionClick,
}: {
	onPermissionClick: () => void;
}) => {
	return (
		<aside
			onClick={onPermissionClick}
			className='fixed top-0 left-0 w-screen h-screen backdrop-blur-md z-20 cursor-pointer'
		>
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
				<div className='flex flex-col items-center gap-5'>
					<p>Tap to start tuning</p>
					<FiMic size={25} />
				</div>
			</div>
		</aside>
	);
};

export default PermissionModal;
