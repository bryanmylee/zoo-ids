/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RandomGenerator {
	(): number;
	version?: string;
	seed?: any[];
}

interface Masher {
	(data: any): number;
	version?: string;
}

const alea = (...seed: any[]): RandomGenerator => {
	return getRandomGenerator([...seed]);
};

const getRandomGenerator = (seed: any[]) => {
	// Johannes Baagøe <baagoe@baagoe.com>, 2010
	let s0 = 0;
	let s1 = 0;
	let s2 = 0;
	let c = 1;

	if (seed.length == 0) {
		seed = [+new Date()];
	}
	const mash = getMasher();
	s0 = mash(' ');
	s1 = mash(' ');
	s2 = mash(' ');

	for (let i = 0; i < seed.length; i++) {
		s0 -= mash(seed[i]);
		if (s0 < 0) {
			s0 += 1;
		}
		s1 -= mash(seed[i]);
		if (s1 < 0) {
			s1 += 1;
		}
		s2 -= mash(seed[i]);
		if (s2 < 0) {
			s2 += 1;
		}
	}

	const random: RandomGenerator = function () {
		const t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
		s0 = s1;
		s1 = s2;
		return (s2 = t - (c = t | 0));
	};
	random.version = 'Alea 0.9';
	random.seed = seed;
	return random;
};

function getMasher() {
	let n = 0xefc8249d;
	const masher: Masher = (data: any) => {
		data = data.toString();
		for (let i = 0; i < data.length; i++) {
			n += data.charCodeAt(i);
			let h = 0.02519603282416938 * n;
			n = h >>> 0;
			h -= n;
			h *= n;
			n = h >>> 0;
			h -= n;
			n += h * 0x100000000; // 2^32
		}
		return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
	};
	masher.version = 'Mash 0.9';
	return masher;
}

export default alea;
