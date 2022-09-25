import { useEffect, useState } from 'react';

/* Hook to handle toggle states, that toggles false on back button
   used for modals or menus for example */
const useDisclosure = (initial = false): [boolean, () => void] => {
	const [toggle, setDispatchToggle] = useState(initial);

	const setToggle = () => {
		if (!toggle) {
			/* Push to history so back button doesn't exit page
			   and can be used to toggle state */
			window.history.pushState({}, '');
		} else {
			/* If user didn't use back button, rather a defined exit button
			   pop the history so not to accumulate history states */
			window.history.back();
		}
		// Toggle state
		setDispatchToggle((prev) => !prev);
	};

	useEffect(() => {
		// Listen to back events, on back event set toggle to false
		window.addEventListener('popstate', () => setDispatchToggle(false));
		return () =>
			window.removeEventListener('popstate', () => setDispatchToggle(false));
	}, [toggle]);

	return [toggle, setToggle];
};

export default useDisclosure;
