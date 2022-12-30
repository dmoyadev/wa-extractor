export enum DateFormats {
	HOURS = 'hh:MM:ss',
	SHORT_NUMERIC = 'dd/mm/yyyy',
	LONG_NUMERIC = 'dd/mm/yyyy hh:MM:ss',
	SHORT = 'd mmm, yyyy',
	LONG = 'd mmm, yyyy hh:MM:ss',
}

/**
 * Parses a date with the DD/MM/YYYY format
 * @param {Date | string} date
 * @param {DateFormats} format
 * @returns {string} The date in the format DD/MM/YYYY
 */
export function formatDate(date: Date | string, format: DateFormats = DateFormats.SHORT_NUMERIC) {
	if(!date) return;

	if (typeof date === 'string') {
		date = new Date(date);
	}

	if(format === DateFormats.HOURS) {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	}

	if(format === DateFormats.SHORT_NUMERIC) {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
	}

	if(format === DateFormats.LONG_NUMERIC) {
		return `${formatDate(date, DateFormats.SHORT_NUMERIC)} ${formatDate(date, DateFormats.HOURS)}`;
	}

	if(format === DateFormats.SHORT) {
		const monthNames = [
			'Ene',
			'Feb',
			'Mar',
			'Abr',
			'May',
			'Jun',
			'Jul',
			'Ago',
			'Sep',
			'Oct',
			'Nov',
			'Dic'
		];

		const day = date.getDate();
		const month = monthNames[date.getMonth()];
		const year = date.getFullYear();
		return `${String(day).padStart(2, '0')} ${month}, ${year}`;
	}

	if(format === DateFormats.LONG) {
		return `${formatDate(date, DateFormats.SHORT)} ${formatDate(date, DateFormats.HOURS)}`;
	}

	return date.toISOString();
}

/**
 * Parses a price quantity with the currency and the decimals if needed
 * @param price
 * @param currency
 */
export function formatPrice(price: number, currency = '€') {
	if(isNaN(price)) {
		return `???${currency}`;
	}

	const priceWithCurrency = price.toString().includes('.')
		? `${price.toFixed(2)}${currency}`
		: `${price}${currency}`;

	// Add dots to separate thousands
	return priceWithCurrency.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
