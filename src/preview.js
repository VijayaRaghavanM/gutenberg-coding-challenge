/**
 * WordPress dependencies
 */
import { __, sprintf, _n } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';
import continentNames from '../assets/continent-names.json';
import continents from '../assets/continents.json';
import { getEmojiFlag } from './utils';

export default function Preview( { countryCode, relatedPosts } ) {
	if ( ! countryCode ) return null;

	const emojiFlag = getEmojiFlag( countryCode ),
		hasRelatedPosts = relatedPosts?.length > 0;

	return (
		<article className="xwp-country-card">
			<div
				className="xwp-country-card__media"
				data-emoji-flag={ emojiFlag }
			>
				<div className="xwp-country-card__flag">{ emojiFlag }</div>
			</div>
			<h2 className="xwp-country-card__heading">
				{ __( 'Hello from', 'xwp-country-card' ) }{ ' ' }
				<strong>{ countries[ countryCode ] }</strong> (
				<span className="xwp-country-card__country-code">
					{ countryCode }
				</span>
				), { continentNames[ continents[ countryCode ] ] }!
			</h2>
			<div className="xwp-country-card__related-posts">
				<h3 className="xwp-country-card__related-posts__heading">
					{ hasRelatedPosts
						? sprintf(
								// translators: Number of related posts
								_n(
									'There is %d related post',
									'There are %d related posts',
									relatedPosts.length,
									'xwp-country-card'
								),
								relatedPosts.length
						  )
						: __(
								'There are no related posts.',
								'xwp-country-card'
						  ) }
				</h3>
				{ hasRelatedPosts && (
					<ul className="xwp-country-card__related-posts__list">
						{ relatedPosts.map( ( relatedPost, index ) => (
							<li key={ index } className="related-post">
								<a
									className="related-post__link"
									href={ relatedPost.link }
									data-post-id={ relatedPost.id }
								>
									<h4
										className="related-post__title"
										dangerouslySetInnerHTML={ {
											__html: relatedPost.title,
										} }
									/>
									<div
										className="related-post__excerpt"
										dangerouslySetInnerHTML={ {
											__html: relatedPost.excerpt,
										} }
									/>
								</a>
							</li>
						) ) }
					</ul>
				) }
			</div>
		</article>
	);
}
