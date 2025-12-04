export interface Work {
	_id: string;
	title: string;
	slug: {
		current: string;
	};
	serial: number;
	image: SanityImage;
	image_2: SanityImage;
	image_3: SanityImage;
	image_4: SanityImage;
	image_5: SanityImage;
	description: string;
	info: string;
	link: string;
}

export interface NextWork {
	_id: string;
	title: string;
	slug: string;
	image: SanityImage;
	description: string;
}

export interface SanityImage {
	_type: 'image';
	asset: {
		_ref: string;
		_type: 'reference';
	};
	alt?: string;
}
