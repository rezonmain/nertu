let id: number | undefined = 0;
let interval = 25;

self.onmessage = (e: MessageEvent) => {
	if (e.data.interval) interval = e.data.interval;
	switch (e.data) {
		case 'start':
			id = setInterval(() => postMessage('beat'), interval);
			break;
		case 'stop':
			clearInterval(id);
			id = undefined;
			break;
	}
};

export type {};
