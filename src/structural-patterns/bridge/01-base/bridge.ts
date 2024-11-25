interface Device {
	turnOn(): void;

	turnOff(): void;
}

class TV implements Device {
	turnOn() {
		console.info('TV is On');
	}

	turnOff() {
		console.info('TV is Off');
	}
}

class Radio implements Device {
	turnOn() {
		console.info('Radio is On');
	}

	turnOff() {
		console.info('Radio is Off');
	}
}

class RemoteControl {
	private device: Device;

	constructor(device: Device) {
		this.device = device;
	}

	on() {
		this.device.turnOn();
	}

	off() {
		this.device.turnOff();
	}
}

const tvRemote = new RemoteControl(new TV());
tvRemote.on(); // TV is On
tvRemote.off(); // TV is Off
