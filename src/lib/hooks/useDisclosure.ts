import { useEffect, useState } from 'react';

/**
 * Hook to handle toggle states, toggles false on back button, and escape keydown,
   used for modals or menus for example.
 * @param initial Initial state, defaults to false
 * @returns [state, state dispatcher function]
 */
const useDisclosure = (initial = false): [boolean, () => void] => {
	const [toggle, setDispatchToggle] = useState(initial);

	const setToggle = () => {
		if (!toggle) {
			/* Push to history so back button doesn't exit page
			   and can be used to toggle state */
			window.history.pushState({}, '');
		} else {
			/* If user didn't use back button, rather a defined exit button,
			   pop the history so not to accumulate history states */
			window.history.back();
		}
		// Toggle state
		setDispatchToggle((prev) => !prev);
	};

	const handleKeyDown = (ev: KeyboardEvent) => {
		ev.key === 'Escape' && setDispatchToggle(false);
	};

	useEffect(() => {
		// Listen to back events, on back event set toggle to false
		window.addEventListener('popstate', () => setDispatchToggle(false));
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('popstate', () => setDispatchToggle(false));
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [toggle]);

	return [toggle, setToggle];
};

export default useDisclosure;
