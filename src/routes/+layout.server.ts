export const load = ({ cookies }) => {
	return {
		lang: cookies.get('PARAGLIDE_LOCALE') ?? 'en'
	};
};
