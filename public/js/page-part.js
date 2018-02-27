
/**
 * @package     Graff
 * @subpackage  Page Part JavaScript
 */

var GraffPagePart;

( function( $ ) {

	/**
	 * Graff PagePart
	 */
	GraffPagePart = {

		/**
		 * Brand Image Link
		 */
		BrandImageLink : {

			/**
			 * Init
			 */
			init : function() {

				$( document ).ready( GraffPagePart.BrandImageLink.onReady );

			},

			/**
			 * On Ready Callback
			 */
			onReady : function() {

				$( '.page-part--image' ).on( 'click', GraffPagePart.BrandImageLink.handleClick );
				$( '.page-part' ).each( GraffPagePart.BrandImageLink.imageHoverCursor );

			},

			/**
			 * Change cursor to pointer if page part has link thorough 
			 */
			imageHoverCursor : function() {

				var link = GraffPagePart.BrandImageLink.getFirstLink( $( this ) );

				if ( link ) {
					$( this ).find( '.page-part--image' ).addClass( 'has-link' );
				}

			},

			/**
			 * Handle Click
			 */
			handleClick : function() {

				var link = GraffPagePart.BrandImageLink.getFirstLink( $( this ).parent() );

				if ( link ) {
					document.location = link;
				}

			},

			/**
			 * Get First Link
			 *
			 * @param  jQuery  $obj  Element.
			 */
			getFirstLink : function( $obj ) {

				var $a = $obj.find( '.page-part--body a' ).first();

				if ( $a.length ) {

					var link = $a.attr( 'href' );

					if ( link && '#' != link.substr( 0, 1 ) ) {
						return link;
					}

				}

				return false;

			}

		},

		/**
		 * Page Part Scroll To Link
		 */
		PagePartScrollToLink : {

			/**
			 * Init
			 */
			init : function() {

				$( '.page-part--content a[href="#next"], .page-part--content a[href="#last"]' ).on( 'click', GraffPagePart.PagePartScrollToLink.handleClick );

			},

			/**
			 * Handle Click
			 */
			handleClick : function( e ) {
				
				var hash = $( this ).attr( 'href' );
				var scrollTo = '';
				
				if ( hash == '#next' ) {

					var $nextPagePart = $( this ).closest( '.page-part' );
					scrollTo = $nextPagePart.offset().top - 59 + $nextPagePart.outerHeight();

				} else if ( hash == '#last' ) {

					var $lastPagePart = $( '.page-parts' ).children().last();
					scrollTo = $lastPagePart.offset().top - 59;

				}

				var $adminBar = $( '#wpadminbar' );

				if ( $adminBar.length ) {
					scrollTo -= $adminBar.outerHeight();
				}

				$( 'html, body' ).animate( { 'scrollTop' : scrollTo } );

				e.preventDefault();

			}

		},

		/**
		 * Init
		 */
		init : function() {

			GraffPagePart.BrandImageLink.init();
			GraffPagePart.PagePartScrollToLink.init();

		}

	};

} )( jQuery );

GraffPagePart.init();
