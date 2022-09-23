import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const error = useRouteError() as { statusText: string };
	return (
		<Link to={'/'}>
			<div
				id='error-page'
				className='w-full h-screen flex flex-col justify-center items-center gap-5 font-sans text-center bg-black'
			>
				<h1 className='text-3xl flex flex-row items-center gap-2'>
					Oops 🥴 something went wrong...
				</h1>
				<i>
					{error.statusText === 'Not Found'
						? 'No tuning going on here'
						: error.statusText}
				</i>
				<small className=' text-base'>tap anywhere to go to main page</small>
			</div>
		</Link>
	);
};

export default ErrorPage;
