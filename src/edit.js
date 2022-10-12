/**
 * WordPress dependencies
 */
import { edit, globe } from '@wordpress/icons';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import {
	ComboboxControl,
	Placeholder,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';
import { getCountryDropdownOptions } from './utils';
import Preview from './preview';
import './editor.scss';

const options = getCountryDropdownOptions();

export default function Edit( { attributes, setAttributes } ) {
	const { countryCode, relatedPosts } = attributes;

	const [ isPreview, setPreview ] = useState();
	const blockProps = useBlockProps( false );

	useEffect( () => setPreview( !! countryCode ), [ countryCode ] );

	const handleChangeCountry = () => {
		if ( isPreview ) setPreview( false );
		else if ( countryCode ) setPreview( true );
	};

	const handleChangeCountryCode = ( newCountryCode ) => {
		if ( newCountryCode && countryCode !== newCountryCode ) {
			setAttributes( {
				countryCode: newCountryCode,
				relatedPosts: [],
			} );
		}
	};

	const { fetchedPosts } = useSelect( ( select ) => {
		const posts = select( 'core' ).getEntityRecords( 'postType', 'post', {
			search: countries[ countryCode ],
			exclude: select( 'core/editor' ).getCurrentPostId(),
			fields: [ 'id', 'title', 'excerpt', 'link' ],
		} );
		return { fetchedPosts: posts };
	} );

	useEffect( () => {
		setAttributes( {
			relatedPosts:
				fetchedPosts?.map( ( relatedPost ) => ( {
					...relatedPost,
					title: relatedPost.title?.rendered || relatedPost.link,
					excerpt: relatedPost.excerpt?.rendered || '',
				} ) ) || [],
		} );
	}, [ fetchedPosts, setAttributes ] );

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={ __( 'Change Country', 'xwp-country-card' ) }
						icon={ edit }
						onClick={ handleChangeCountry }
						disabled={ ! Boolean( countryCode ) }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div { ...blockProps }>
				{ isPreview ? (
					<Preview
						countryCode={ countryCode }
						relatedPosts={ relatedPosts }
					/>
				) : (
					<Placeholder
						icon={ globe }
						label={ __( 'XWP Country Card', 'xwp-country-card' ) }
						isColumnLayout={ true }
						instructions={ __(
							'Type in the name of the country you want to display on your site.',
							'xwp-country-card'
						) }
					>
						<ComboboxControl
							label={ __( 'Country', 'xwp-country-card' ) }
							hideLabelFromVision
							options={ options }
							value={ countryCode }
							onChange={ handleChangeCountryCode }
							allowReset={ true }
						/>
					</Placeholder>
				) }
			</div>
		</>
	);
}
