/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';

/**
 * Converts a Country code to it's corresponding flag.
 * Explanation: https://dev.to/jorik/country-code-to-flag-emoji-a21
 *
 * @param {string} countryCode The Country code.
 * @return {string} The Country's flag emoji.
 */
export function getEmojiFlag( countryCode ) {
	return String.fromCodePoint(
		...countryCode
			.toUpperCase()
			.split( '' )
			.map( ( char ) => 127397 + char.charCodeAt() )
	);
}

/**
 * Get a list of the options to display in dropdown.
 *
 * @return {Array} List of options for the Dropdown.
 */
export function getCountryDropdownOptions() {
	return Object.entries( countries ).map( ( [ code, country ] ) => ( {
		value: code,
		label: `${ getEmojiFlag( code ) } ${ country } — ${ code }`,
	} ) );
}
