
/**
 * @package     Graff
 * @subpackage  Main JavaScript
 */

var Graff;

( function( $ ) {

	/**
	 * Graff
	 */
	Graff = {

		/**
		 * Header
		 */
		Header : {

			MAX_HEIGHT       : 135,
			MIN_HEIGHT       : 60,
			TITLE_MAX_HEIGHT : 43,
			TITLE_MIN_HEIGHT : 24,
			BREAKPOINT       : 1024,  // Up to and including

			amtScrolled : 0,  // Amount Scrolled

			/**
			 * Init Submodule
			 */
			init : function() {

				$( document ).ready( Graff.Header.resized );
				$( window ).load( Graff.Header.resized );
				$( window ).resize( Graff.Header.resized );
				$( window ).scroll( Graff.Header.scrolled );

			},

			/**
			 * Resized
			 */
			resized : function() {

				if ( $( window ).width() > Graff.Header.BREAKPOINT ) {

					Graff.Header.amtScrolled = 0;
					Graff.Header.scrolled();

				} else {

					$( '.site-branding' ).removeAttr( 'style' );
					$( '.site-title a' ).removeAttr( 'style' );

				}

			},

			/**
			 * Scrolled
			 */
			scrolled : function() {

				var progress = Graff.Header.getScrollProgress();

				if ( Graff.Header.amtScrolled !== progress ) {

					Graff.Header.amtScrolled = progress;
					Graff.Header.updateDisplay( progress );

					if ( $( window ).width() > Graff.Header.BREAKPOINT ) {
						Graff.Header.updateDisplayDesktop( progress );
					}

				}

			},

			/**
			 * Update Display
			 */
			updateDisplay : function( progress ) {

				var progress = 1 - progress;  // Invert progress

				$( 'html' ).toggleClass( 'scroll-to-top', 0 == progress );

			},

			/**
			 * Update Display (Desktop only)
			 */
			updateDisplayDesktop : function( progress ) {

				var progress = 1 - progress;  // Invert progress

				$( '.site-branding' ).css( 'height', Graff.Header.getBrandingHeight( progress ) + 'px' );
				$( '.site-title a' ).css( 'background-size', 'auto ' + Graff.Header.getLogoHeight( progress ) + 'px' );

				$( 'html' ).toggleClass( 'min-header', 0 == progress );
				$( '.site-header-line' ).toggleClass( 'site-header-line--solid', 0 == progress );

			},

			/**
			 * Get Logo Height
			 */
			getLogoHeight : function( progress ) {

				return Graff.Header.TITLE_MIN_HEIGHT + ( ( Graff.Header.TITLE_MAX_HEIGHT - Graff.Header.TITLE_MIN_HEIGHT ) * progress );

			},

			/**
			 * Get Branding Height
			 */
			getBrandingHeight : function( progress ) {

				var brandingNewHeight = Graff.Header.MIN_HEIGHT + ( Graff.Header.getHeightDiff() * progress );

				if ( brandingNewHeight < Graff.Header.MIN_HEIGHT ) {
					return Graff.Header.MIN_HEIGHT;
				}

				return brandingNewHeight;

			},

			/**
			 * Get Scroll Progress
			 */
			getScrollProgress : function() {

				var amt = $( window ).scrollTop();
				var heightDiff = Graff.Header.getHeightDiff();

				if ( amt < 0 ) {
					amt = 0;
				}

				if ( amt > heightDiff ) {
					amt = heightDiff;
				}

				return amt / heightDiff;

			},

			/**
			 * Get Header Height Diff
			 */
			getHeightDiff : function() {

				return Graff.Header.MAX_HEIGHT - Graff.Header.MIN_HEIGHT;

			}

		},

		/**
		 * Nav
		 */
		Nav : {

			menu : null,

			/**
			 * Init
			 */
			init : function() {

				$( document ).ready( Graff.Nav.onDOMReady );

			},

			/**
			 * On DOM Ready
			 */
			onDOMReady : function() {

				if ( $( '#menu-primary-container' ).length ) {

					var $mmenu = $( '#menu-primary-container' ).first().clone();

					// Substitute menu item titles if set (for different mobile text)
					$mmenu.find( 'li > a, li > span' ).each( function( i, el ) {

						var title = $( el ).attr( 'title' );

						if ( '' !== title ) {
							$( el ).text( title );
						}

					} );

					// Add languages to mmenu
					var $langMenuItem = Graff.Nav.getLanguagesMenuItem();
					if ( $langMenuItem ) {
						$mmenu.children( 'ul' ).append( $langMenuItem );
					}

					// Items with subitem should open submenu
					$mmenu.find( 'li.menu-item-has-children > a' ).each( function() {
						$( this ).replaceWith( $('<span>' + this.innerHTML + '</span>') );
					} );

					Graff.Nav.menu = $mmenu.mmenu( {

						// Options
						extensions      : [ 'pagedim-black' ],
						navbar          : {
							add   : true,
							title : $( '.site-search' ).first().html()
						},
						slidingSubmenus : false

					}, {

						// Configuration
						classNames : {
							selected : 'selected'
						}

					} );

					var mmenuAPI = $mmenu.data( 'mmenu' );

					// Close panels when opening new
					mmenuAPI.bind( 'openPanel:start', function( $panel ) {
						var $siblings = $panel.parent( 'li' ).siblings().find( '.mm-panel' );
						mmenuAPI.closePanel( $siblings );
					} );

				}

			},

			/**
			 * Get Languages Menu Item
			 */
			getLanguagesMenuItem : function() {

				var $switcher = $( '.site-tools .language-switcher' ).first();

				if ( $switcher.length ) {

					var $label = $switcher.children( '.language-switcher--label' ).first().clone();
					$label.find( '.meta' ).remove();

					var $languages = $switcher.children( 'ul' ).first().clone();

					var $languagesItem = $( '<li class="menu-item menu-item-languages menu-item-has-children"><span>' + $label.text() + '</span></li>' );
					$languagesItem.append( $languages );

					return $languagesItem;

				}

				return false;

			},

			/**
			 * Open Search Menu
			 */
			openSearchMenu : function() {

				var api = Graff.Nav.menu.data( 'mmenu' );

				api.openPanel( Graff.Nav.menu.find( '.mm-panel' ).first() );
				api.open();

				Graff.Nav.menu.find( '.searchform .s' ).focus();

			}

		},

		/**
		 * Lazy Image Loading
		 */
		Lazy : {

			images      : null,

			init : function() {

				$( document ).ready( Graff.Lazy.onDOMReady );

			},

			/**
			 * On DOM Ready
			 */
			onDOMReady : function() {

				Graff.Lazy.images = new Blazy( {
					selector     : '.lazy',
					successClass : 'lazy-loaded',
					errorClass   : 'lazy-error',
					offset       : 800
				} );

			},

			/**
			 * Revalidate
			 */
			revalidate : function() {

				Graff.Lazy.images.revalidate();

			},

			/**
			 * Force Load
			 */
			forceLoad : function( $el ) {

				Graff.Lazy.images.load( $el, true );

			}

		},

		/**
		 * Search
		 */
		Search : {

			/**
			 * Init
			 */
			init : function() {

				$( '.site-tools .searchform .button-search' ).on( 'click', Graff.Search.handleSiteSearchClick );
				$( '.nav-drawers, .stores-search--bar' ).on( 'submit', 'form.stores-search-form', Graff.Search.handleStoreSearchSubmit );

			},

			/**
			 * Handle Site Search Click
			 */
			handleSiteSearchClick : function( e ) {

				if ( null !== Graff.Nav.menu && $( '.menu-toggle' ).is( ':visible' ) ) {

					Graff.Nav.openSearchMenu();
					e.preventDefault();

				}

			},

			/**
			 * Handle Store Search Submit
			 * Don't submit store search if empty.
			 */
			handleStoreSearchSubmit : function( e ) {

				var searchField = $( this ).find( 'input.search-field' ).first();

				if ( searchField.length && searchField.val() == '' ) {

					searchField.removeClass( 'pulse-error-field' ).focus();
					e.preventDefault();

					setTimeout( function() {
						searchField.addClass( 'pulse-error-field' );
					}, 100 );

				}

			}

		},

		/**
		 * Drawers
		 */
		Drawers : {

			createdDOM       : false,
			loadedGoogleMaps : false,
			autocomplete     : null,

			/**
			 * Init
			 */
			init : function() {

				$( document ).ready( Graff.Drawers.createDOM );

				// Open/close drawers
				$( '.site-navigation' ).on( 'mouseleave', function() {
					Graff.Drawers.closeDrawers();
				} );

				// Nav over change drawer
				$( '#menu-primary > li' ).on( 'mouseenter', function() {
					if ( ! $( 'html' ).hasClass( 'touchevents' ) ) {
						Graff.Drawers.openDrawers( $( this ) );
					}
				} )

				// Nav click change drawer
				$( '#menu-primary > li > a' ).on( 'click', function( e ) {

					var $li = $( this ).closest( 'li' );

					if ( ! $( 'body' ).hasClass( 'open-drawers' ) ) {

						Graff.Drawers.openDrawers( $li );
						e.preventDefault();

					} else if ( ! $li.hasClass( 'current-drawer' ) ) {

						Graff.Drawers.openDrawers( $li );
						e.preventDefault();

					}

				} )

				// Nav item over change item
				$( '.nav-drawers' ).on( 'mouseenter', '.drawers--nav-menu li a', function() {
					Graff.Drawers.changeNavImage( $( this ) );
				} )

			},

			/**
			 * Open Drawers
			 */
			openDrawers : function( $li ) {

				$( 'body' ).addClass( 'open-drawers' );
				$li.addClass( 'current-drawer' ).siblings().removeClass( 'current-drawer draw-ani' );
				var $drawer = Graff.Drawers.changeDrawer( $li.attr( 'id' ).toString().substr( 10 ) );
				Graff.Drawers.changeNavImageTarget( $li.children( 'a' ).first(), $drawer.find( '.drawers--nav-menu' ).first() );

				Graff.Lazy.forceLoad( $drawer.find( 'img.lazy' ) );

			},

			/**
			 * Close Drawers
			 */
			closeDrawers : function() {

				var $searchField = $( 'input#stores_search_autocomplete_drawer' );

				if ( ! $searchField.is( ':focus' ) || ! $searchField.closest( '.drawer' ).hasClass( 'current-drawer' ) ) {

					$( '.nav-drawers' ).removeAttr( 'style' );
					$( 'body' ).removeClass( 'open-drawers' );
					$( '#menu-primary > li' ).removeClass( 'current-drawer draw-ani' );

				}

			},

			/**
			 * Create DOM
			 */
			createDOM : function() {

				$( '.drawers .drawer' ).each( function() {

					Graff.Drawers.createDrawerDOM( $( this ) );

				} );

				Graff.Drawers.createdDOM = true;
				Graff.Drawers.storesSearchSetup();

			},

			/**
			 * Change Drawer
			 *
			 * @param  integer  drawerID  Drawer ID.
			 */
			changeDrawer : function( drawerID ) {

				var $drawer = $( '.nav-drawers #nav-drawer-' + drawerID );

				$drawer.addClass( 'current-drawer' ).siblings().removeClass( 'current-drawer' );
				$( '.nav-drawers' ).css( { 'height' : $drawer.outerHeight() } );

				setTimeout( function() {
					$drawer.addClass( 'drawer-ani' ).siblings().removeClass( 'drawer-ani' );
				}, 100 );

				return $drawer;

			},

			/**
			 * Change Nav Image
			 *
			 * @param  jQuery  $link  Link tag.
			 */
			changeNavImage : function( $link ) {

				Graff.Drawers.changeNavImageTarget( $link, $link.closest( '.drawers--nav-menu' ) );

			},

			/**
			 * Change Nav Image Target
			 *
			 * @param  jQuery  $link  Link tag.
			 * @param  jQuery  $menu  Nav menu tag.
			 */
			changeNavImageTarget : function( $link, $menu ) {

				var url = $link.attr( 'data-image' );
				var $img = $menu.next( '.drawers--nav-image' ).find( '.image-placeholder' ).first();
				var $currentImg = $img.children( 'img' ).first();
				$currentImg.attr( 'src' )

				if ( typeof url !== 'undefined' && url && ( $currentImg.length == 0 || url !== $currentImg.attr( 'src' ) ) ) {

					$img.stop().fadeOut( 400, function() {

						var downloadingImage = new Image();

						downloadingImage.onload = function() {
							$img.empty().append( $( '<img />' ).attr( 'src', this.src ) );
							$img.fadeIn();
						};
						downloadingImage.src = url;

					} );

				}

			},

			/**
			 * Create Drawer DOM
			 *
			 * @param  $  $drawer  Drawer jQuery element.
			 */
			createDrawerDOM : function( $drawer ) {

				var drawerID = $drawer.attr( 'data-drawer-id' );
				var $menuItem = $( '#menu-primary li#menu-item-' + drawerID );

				if ( $menuItem.length ) {

					var $childMenu = $menuItem.find( '> ul' ).first();

					// Create Menus
					if ( $childMenu.length ) {

						var $menu = $( [] );
						var hasDoubleMenu = $drawer.hasClass( 'drawer--double-menu' );

						// Double menu?
						if ( hasDoubleMenu ) {

							$childMenu.find( '> li > ul' ).each( function() {
								$menu = $menu.add( Graff.Drawers.createMenuDOM( $( this ) ) );
							} );

						} else {

							$menu = Graff.Drawers.createMenuDOM( $childMenu );

						}

						// Create
						var $menusContainer = $drawer.find( '.drawers--nav-menus' ).first();

						if ( $menusContainer.length ) {
							$menu.each( function() {

								var $m = $( '<div class="drawers--nav-menu" />' );
								var url = $( this ).attr( 'data-link' );

								if ( '' == url ) {
									$m.append( $( '<h4>' + $( this ).attr( 'data-title' ) + '</h4>' ) );
								} else {
									$m.append( $( '<h4><a href="' + url + '">' + $( this ).attr( 'data-title' ) + '</a></h4>' ) );
								}

								$m.append( $( this ) );
								$menusContainer.append( $m );

								$menusContainer.append( $( '.drawers--nav > .drawers--nav-image' ).first().clone() );

							} );
						}

					}

				}

				Graff.Drawers.createNavDrawerDOM( $drawer );

			},

			/**
			 * Create Menu DOM
			 *
			 * @param  $  $menu  List <ul> element.
			 */
			createMenuDOM : function( $menu ) {

				// Copy and clean
				$newmenu = $menu.clone();
				$newmenu.removeAttr( 'class' ).find( 'ul' ).remove();

				// Title
				var $parentLink = $menu.parents( 'li' ).first().children( 'a, span' ).first();
				var parentTitle = $parentLink.text();
				var parentLink =  $parentLink.attr( 'href' );

				if ( typeof parentTitle === typeof undefined || parentTitle === false ) {
					parentTitle = $parentLink.text();
				}

				if ( typeof parentLink === typeof undefined || parentLink === false || parentLink == '#' ) {
					parentLink = '';
				}

				$newmenu.attr( 'data-title', parentTitle );
				$newmenu.attr( 'data-link', parentLink );

				return $newmenu;

			},

			/**
			 * Create Nav Drawer DOM
			 *
			 * @param  $  $drawer  Drawer jQuery element.
			 */
			createNavDrawerDOM : function( $drawer ) {

				var $navDrawers = $( '.nav-drawers' );

				if ( $navDrawers.length ) {

					var drawerID = $drawer.attr( 'data-drawer-id' );
					var $navDrawer = $drawer.clone().attr( 'id', 'nav-drawer-' + drawerID );

					$navDrawers.append( $navDrawer );

				}

			},

			storesSearchInit : function() {

				Graff.Drawers.loadedGoogleMaps = true;
				Graff.Drawers.storesSearchSetup();

			},

			storesSearchSetup : function() {

				if ( Graff.Drawers.createdDOM && Graff.Drawers.loadedGoogleMaps ) {

					Graff.Drawers.autocomplete = new google.maps.places.Autocomplete( $( '#stores_search_autocomplete_drawer' )[0], {
						types : ['(cities)']
					} );

					Graff.Drawers.autocomplete.addListener( 'place_changed', function() {
						$( '#stores_search_autocomplete_drawer' ).closest( 'form' ).submit();
					} );

					var $locateButton = $( '#stores_search_autocomplete_drawer' ).closest( 'form' ).find( '.button-locate-action' );
					$locateButton.on( 'click', Graff.Drawers.geolocate );

				}

			},

			/**
			 * Geolocate
			 *
			 * Get the users geographical location, as supplied by
			 * the browsers navigator.geolocation object.
			 *
			 * Use it to bias search results.
			 */
			geolocate : function() {

				if ( navigator.geolocation ) {

					jQuery( '#stores_search_autocomplete_drawer' ).siblings( '.stores-search-msg' ).removeClass( 'show' );

					navigator.geolocation.getCurrentPosition( function( position ) {

						var geocoder = new google.maps.Geocoder();
						var latlng = new google.maps.LatLng( position.coords.latitude, position.coords.longitude );

						geocoder.geocode( { 'location' : latlng }, function( results, status ) {

							if ( status == 'OK' ) {

								jQuery( '#stores_search_autocomplete_drawer' ).val( results[0].formatted_address );
								jQuery( '#stores_search_autocomplete_drawer' ).closest( 'form' ).submit();

							}

						} );

					}, function( positionError ) {

						jQuery( '#stores_search_autocomplete_drawer' ).siblings( '.stores-search-msg-detect' ).addClass( 'show' );

					},
					{
						timeout : 5000
					} );

				}

			}

		},

		/**
		 * Video Overlay
		 */
		VideoOverlay : {

			/**
			 * Init
			 */
			init : function() {

				$( 'a[href^="#video-overlay-"]' ).on( 'click', function( e ) {

					Graff.VideoOverlay.open( $( this ).attr( 'href' ) );
					e.preventDefault();

				} );

				$( '.video-overlay' ).on( 'click', function( e ) {

					if ( e.currentTarget == e.target) {
						Graff.VideoOverlay.close();
					}

				} );

				if ( typeof videojs == 'function' ) {

					$( '.video-overlay video' ).each( function() {

						videojs( $( this ).attr( 'id' ) ).ready( function() {

							var player = this;

							player.on( 'loadedmetadata', function() {

								var id = $( player.el() ).attr( 'data-video-id' );

								$( 'a.video-overlay-link.image-placeholder--video[href="#video-overlay-' + id + '"]' ).css( {
									'background-image' : 'url( ' + player.poster() + ' )'
								} );

							} );

						} );

					} );

				}

			},

			/**
			 * Open
			 */
			open : function( anchor ) {

				var $overlay = $( anchor );

				if ( $overlay.length ) {

					$( 'html' ).addClass( 'scroll-lock' );
					$overlay.addClass( 'show' );

					Graff.VideoOverlay.playVideo( $overlay );

				}
				
			},

			/**
			 * Close
			 */
			close : function() {

				var $overlays = $( '.video-overlay' );
				
				$( 'html' ).removeClass( 'scroll-lock' );
				$overlays.removeClass( 'show' );

				Graff.VideoOverlay.pauseVideos( $overlays );

			},

			/**
			 * Play first video in container
			 */
			playVideo : function( $container ) {

				if ( typeof videojs == 'function' ) {

					var $video =  $container.find( 'video' ).first();

					if ( $video.length ) {

						var id = $video.attr( 'id' );
						var vid = videojs( id );
						vid.play();

					}

				}

			},

			/**
			 * Pause all videos in container
			 */
			pauseVideos : function( $container ) {

				if ( typeof videojs == 'function' ) {

					var $videos =  $container.find( 'video' );

					$videos.each( function() {

						var id = $( this ).attr( 'id' );
						var vid = videojs( id );
						vid.pause();

					} );

				}

			}

		},

		/**
		 * Scroll More Link
		 */
		ScrollMoreLink : {

			/**
			 * Init
			 */
			init : function() {

				var $scrollPagePart = $( '.type-page[data-scroll-view-more], .type-graff_campaign[data-scroll-view-more]' );

				if ( $scrollPagePart.length ) {

					var $nextID = $scrollPagePart.next().attr( 'id' );
					var text = $scrollPagePart.attr( 'data-scroll-view-more' );

					if ( text !== '' ) {

						var $link = $( '<a />' ).attr( 'href', '#' + $nextID ).text( text );
						var $div = $( '<div class="scroll-view-more" />' ).append( $link );

						$scrollPagePart.append( $div );
						$( '.scroll-view-more a' ).on( 'click', Graff.ScrollMoreLink.handleScrollClick );

					}

				}

				// Watches Page Part
				var $watchesScrollPagePart = $( '.page-template-watch-collection .type-page[data-watch-scroll-view-more]' );

				if ( $watchesScrollPagePart.length ) {

					var $watchesNextID = $watchesScrollPagePart.find( '.page-part--body' ).attr( 'id' );
					var watchText = $watchesScrollPagePart.attr( 'data-watch-scroll-view-more' );

					if ( watchText !== '' ) {

						var $watchesLink = $( '<a />' ).attr( 'href', '#' + $watchesNextID ).text( watchText );
						var $watchesDiv = $( '<div class="scroll-view-more" />' ).append( $watchesLink );

						$watchesScrollPagePart.find( '.page-part--image' ).append( $watchesDiv );
						$( '.scroll-view-more a' ).on( 'click', Graff.ScrollMoreLink.handleScrollClick );

					}

				}

				// Smooth scroll links
				$( 'a.smooth-scroll-to' ).on( 'click', function( e ) {

					var href = $( this ).attr( 'href' );

					if ( href.substr( 0, 1 ) == '#' ) {

						var $dest = $( href );

						if ( $dest.length ) {

							var scrollTo = $dest.offset().top - Graff.Header.MIN_HEIGHT + 2;  // +2 adjust for borders

							Graff.ScrollMoreLink.scrollTo( scrollTo );

							e.preventDefault();

						}

					}

				} );

			},

			/**
			 * Handle Scroll Click
			 */
			handleScrollClick : function( e ) {

				if ( $( 'body' ).hasClass( 'page-template-watch-collection' ) ) {
					$targetDiv = '.page-part--image';
				} else if ( $( 'body' ).hasClass( 'single-graff_campaign' ) ) {
					$targetDiv = '.type-graff_campaign';
				} else {
					$targetDiv = '.type-page';
				}

				var $pagePart = $( this ).closest( $targetDiv );
				var scrollTo = $pagePart.offset().top - Graff.Header.MIN_HEIGHT + $pagePart.outerHeight();

				Graff.ScrollMoreLink.scrollTo( scrollTo );

				$( this ).blur();  // IE/Firefox fix for selected state

				e.preventDefault();

			},

			/**
			 * Scroll To
			 */
			scrollTo : function( scrollTo ) {

				var $adminBar = $( '#wpadminbar' );

				if ( $adminBar.length ) {
					scrollTo -= $adminBar.outerHeight();
				}

				$( 'html, body' ).animate( { 'scrollTop' : scrollTo } );

			}

		},

		/**
		 * Scroll More Image Link
		 */
		ScrollMoreImageLink : {

			/**
			 * Init
			 */
			init : function() {

				var $scrollPagePart = $( '.page-part--image[data-scroll-view-more]' );

				if ( $scrollPagePart.length ) {

					var $nextID = $scrollPagePart.next().attr( 'id' );
					var $link = $( '<a />' ).attr( 'href', '#' + $nextID ).text( $scrollPagePart.attr( 'data-scroll-view-more' ) );
					var $div = $( '<div class="scroll-view-more" />' ).append( $link );

					$scrollPagePart.append( $div );

				}

				$( '.scroll-view-more a' ).on( 'click', Graff.ScrollMoreImageLink.handleScrollClick );

			},

			/**
			 * Handle Scroll Click
			 */
			handleScrollClick : function( e ) {

				var $pagePart = $( this ).closest( '.page-part--image' );
				var scrollTo = $pagePart.offset().top - Graff.Header.MIN_HEIGHT + $pagePart.outerHeight();
				var $adminBar = $( '#wpadminbar' );

				if ( $adminBar.length ) {
					scrollTo -= $adminBar.outerHeight();
				}

				$( 'html, body' ).animate( { 'scrollTop' : scrollTo } );

				e.preventDefault();

			}

		},

		/**
		 * Filters Panel
		 */
		FiltersPanel : {

			breakpointFixed : 1024,

			/**
			 * Init
			 */
			init : function() {

				$( document ).ready( Graff.FiltersPanel.resized );
				$( document ).ready( Graff.FiltersPanel.setFiltersStatus );
				$( window ).load( Graff.FiltersPanel.resized );
				$( window ).resize( Graff.FiltersPanel.resized );
				$( window ).scroll( Graff.FiltersPanel.scrolled );

				// Close filters if open when page clicked
				$( 'body' ).on( 'click', function( e ) {

					if ( $( '.filters-panel' ).hasClass( 'expanded' ) ) {

						var $container = $( e.target ).closest( '.filters-panel__container' );

						if ( ! $container.length ) {
							$( '.filters-panel' ).removeClass( 'expanded' );
							e.preventDefault();
						}

					}

				} );

				$( '.filters-panel .filters-panel--bar' ).on( 'click', 'h3 > a, .filters-panel--by', function( e ) {

					var $filtersPanel = $( this ).closest( '.filters-panel' );
					var isOpen = $filtersPanel.hasClass( 'expanded' );

					//$( 'body' ).toggleClass( 'open-drawers', ! $filtersPanel.hasClass( 'expanded' ) );
					$filtersPanel.toggleClass( 'expanded' );

					// Scroll
					if ( ! isOpen ) {

						var scrollDest = Math.ceil( $filtersPanel.offset().top - Graff.Header.MIN_HEIGHT + 1 );

						if ( $( 'body' ).hasClass( 'admin-bar' ) ) {
							if ( $( window ).width() >= 783 ) {
								scrollDest -= 32;
							} else {
								scrollDest -= 46;
							}
						}

						$( 'html, body' ).stop().animate( {
							scrollTop : scrollDest
						}, 800 );

					}

					e.preventDefault();

				} );

				$( '.filters-panel--group > h3 > a, .filters-panel--group > h3 > span' ).on( 'click', function( e ) {
					$( this ).parent().toggleClass( 'expanded' ).siblings().removeClass( 'expanded' );
					$( this ).closest( '.filters-panel--group' ).siblings().children( 'h3' ).removeClass( 'expanded' );

					// Trigger lazy loading
					setTimeout( Graff.Lazy.revalidate, 400 );

					e.preventDefault();

				} );

				$( '.filters-panel--group, .filters-nav' ).on( 'click', '.graff-filter-item.disabled a', function( e ) {
					e.preventDefault();
				} );

			},

			/**
			 * Resized
			 */
			resized : function() {

				if ( $( window ).width() >= Graff.FiltersPanel.breakpointFixed ) {

					Graff.FiltersPanel.amtScrolled = 0;
					Graff.FiltersPanel.scrolled();

				} else {

					$( '.filters-panel__container' ).removeClass( 'fixed' ).addClass( 'unfixed' );

				}

			},

			/**
			 * Scrolled
			 */
			scrolled : function() {

				var amt = $( window ).scrollTop();
				var $container = $( '.filters-panel__container' ).first();

				if ( $container.length ) {

					var offset = $container.offset().top + 1;

					if ( $( 'body' ).hasClass( 'admin-bar' ) ) {
						if ( $( window ).width() >= 783 ) {
							offset -= 32;
						} else {
							offset -= 46;
						}
					}

					if ( amt + Graff.Header.MIN_HEIGHT > offset && $( window ).width() >= Graff.FiltersPanel.breakpointFixed ) {
						$container.addClass( 'fixed' ).removeClass( 'unfixed' );
					} else {
						$container.removeClass( 'fixed' ).addClass( 'unfixed' );
					}

				}

			},

			/**
			 * Get Current Filter Classes
			 *
			 * @param   jQuery  $groups  Filter panel groups.
			 * @return  array            Filter item classes.
			 */
			getCurrentFilterClasses : function( $groups ) {

				var currentFilters = [];

				var $siblings = $groups.each( function( k, otherGroup ) {

					var otherFilterType = $( otherGroup ).attr( 'data-filter-type' );

					if ( '' !== otherFilterType ) {

						var $otherItems = $( otherGroup ).children( 'ul' ).children( 'li.current-item[data-filter-item]' );

						if ( $otherItems.length ) {

							var otherFilterItem = $( $otherItems ).attr( 'data-filter-item' );

							if ( '' !== otherFilterItem ) {
								currentFilters.push( '.filtered--' + otherFilterType + '-' + otherFilterItem );
							}

						}

					}

				} );

				return currentFilters;

			},

			/**
			 * Get Current Filter Groups
			 *
			 * @param   jQuery  $groups  Filter panel groups.
			 * @return  jQuery           Filter items.
			 */
			getCurrentFilterItems : function( $groups ) {

				var currentFilters = Graff.FiltersPanel.getCurrentFilterClasses( $groups );
				var currentFiltersSelector = currentFilters.join( '' );

				return $( '.grid' ).children( currentFiltersSelector );

			},

			/**
			 * Set Filters Status
			 */
			setFiltersStatus : function() {

				if ( $( '.grid' ).children().length ) {

					var $filterPanelGroups = $( '.filters-panel .filters-panel--group[data-filter-type]' ).filter( '[data-filter-item!=""]' );

					$filterPanelGroups.filter( '.filter-inline' ).each( function( i, group ) {

						var filterType = $( group ).attr( 'data-filter-type' );
						var $currentFilterItems = Graff.FiltersPanel.getCurrentFilterItems( $( group ).siblings( '.filters-panel--group[data-filter-type]' ) );
						var $items = $( group ).children( 'ul' ).children( 'li[data-filter-item]' ).filter( '[data-filter-item!=""]' );

						$items.each( function( i, item ) {

							var filterItemData = $( item ).attr( 'data-filter-item' );
							var filteredClass = '.filtered--' + filterType + '-' + filterItemData;
							var $filteredAvailableItems = $currentFilterItems.filter( filteredClass );

							$( item ).toggleClass( 'disabled', 0 == $filteredAvailableItems.length );

							if ( 'cut' == filterType ) {
								$( '.filters-nav--cuts .graff-filter-item[data-filter-item="' + filterItemData + '"]' ).toggleClass( 'disabled', 0 == $filteredAvailableItems.length );
							}

						} );

					} );

					if ( ! $( 'body' ).hasClass( 'single' ) ) {

						$filterPanelGroups.filter( '.remove-inline' ).each( function( i, group ) {

							var filterType = $( group ).attr( 'data-filter-type' );
							var $items = $( group ).children( 'ul' ).children( 'li[data-filter-item]' ).filter( '[data-filter-item!=""]' );

							$items.each( function( i, item ) {

								var filteredClass = '.filtered--' + filterType + '-' + $( item ).attr( 'data-filter-item' );
								var $filteredItems = $( '.grid' ).children( filteredClass );

								$( item ).toggleClass( 'hidden', 0 == $filteredItems.length );

							} );

						} );

					}

				}

			}

		},

		/**
		 * In View
		 */
		InView : {

			scrollTop : 0,

			/**
			 * Init
			 */
			init : function() {

				inView.offset( 50 );
				Graff.InView.createInViewListeners();

				$( window ).on( 'scroll', Graff.InView.onScroll );

			},

			/**
			 * On Scroll
			 */
			onScroll : function() {

				$( 'body' ).toggleClass( 'scrolled-up', $( window ).scrollTop() != 0 && $( window ).scrollTop() < Graff.InView.scrollTop  );
				Graff.InView.scrollTop = $( window ).scrollTop();

			},

			/**
			 * Create In View Listeners
			 */
			createInViewListeners : function() {

				setTimeout( function() {

					// Page Parts

					inView( '.page-part' ).on( 'enter', function( pagePart ) {
						$( pagePart ).addClass( 'in-view' );
						Graff.InView.playVideos( $( pagePart ), true );
					} ).on( 'exit', function( pagePart ) {
						$( pagePart ).removeClass( 'in-view' );
						Graff.InView.playVideos( $( pagePart ), false );
					} );

					inView( '.page-part' ).check();

					// Page Sections

					inView( '.page-section' ).on( 'enter', function( pagePart ) {
						$( pagePart ).addClass( 'in-view' );
						Graff.InView.playVideos( $( pagePart ), true );
					} ).on( 'exit', function( pagePart ) {
						$( pagePart ).removeClass( 'in-view' );
						Graff.InView.playVideos( $( pagePart ), false );
					} );

					inView( '.page-section' ).check();

					// Grid Squares

					inView( '.grid-item' ).on( 'enter', function( pagePart ) {
						$( pagePart ).addClass( 'in-view' );
					} ).on( 'exit', function( pagePart ) {
						$( pagePart ).removeClass( 'in-view' );
					} );

					inView( '.grid-item' ).check();

					// Grid Prelude

					inView( '.grid-prelude' ).on( 'enter', function( pagePart ) {
						$( pagePart ).addClass( 'in-view' );
					} ).on( 'exit', function( pagePart ) {
						$( pagePart ).removeClass( 'in-view' );
					} );

					inView( '.grid-prelude' ).check();

					// Page Part Content

					inView( '.page-part--content' ).on( 'enter', function( pagePart ) {
						$( pagePart ).addClass( 'in-view' );
					} ).on( 'exit', function( pagePart ) {
						$( pagePart ).removeClass( 'in-view' );
					} );

					inView( '.page-part--content' ).check();

					// Filters Nav

					inView( '.filters-nav' ).on( 'enter', function( pagePart ) {
						$( pagePart ).addClass( 'in-view' );
					} ).on( 'exit', function( pagePart ) {
						$( pagePart ).removeClass( 'in-view' );
					} );

					inView( '.filters-nav' ).check();

				}, 800 );

			},

			/**
			 * Play videos when in view
			 *
			 * @param  $     $el   Containing element.
			 * @param  bool  play  Play (or pause).
			 */
			playVideos : function( $el, play ) {

				var $videos = $el.find( '.graff-video.context-image video' );

				if ( typeof videojs == 'function' ) {

					$videos.each( function() {

						var id = $( this ).attr( 'id' );
						var vid = videojs( id );

						if ( play ) {
							vid.play();
						} else {
							vid.pause();
						}

					} );

				}

			}

		},

		/**
		 * Header Back to Top Link
		 */
		BackToTop : {

			/**
			 * Init
			 */
			init : function() {

				$( '.back-to-top' ).on( 'click', Graff.BackToTop.handleClick );

			},

			/**
			 * Handle Click
			 */
			handleClick : function( e ) {

				$( 'html, body' ).stop().animate( {	scrollTop : 0 }, 800 );
				
				e.preventDefault();
				
			}

		},

		/**
		 * Modal
		 */
		Modal : {

			/**
			 * Init
			 */
			init : function() {

				if ( window.self == window.top ) {
					$( 'html' ).removeClass( 'is-modal' );
				}

				$( 'body' ).on( 'click', '.modal', Graff.Modal.clickOpen );
				$( 'body' ).on( 'click', '#graff-modal', Graff.Modal.clickClose );

			},

			/**
			 * Handle Open Click
			 */
			clickOpen : function( e ) {

				if ( $( window ).width() >= 1024 && ! $( 'html' ).hasClass( 'ios' ) ) {

					Graff.Modal.open( $( this ) );
					e.preventDefault();

				}
				
			},

			/**
			 * Handle Close Click
			 */
			clickClose : function( e ) {

				var src = $( e.srcElement );

				if ( src.attr( 'id' ) == 'graff-modal' || src.hasClass( 'graff-modal-inner' ) ) {
					Graff.Modal.close();
				}
				
			},

			/**
			 * Open
			 */
			open : function( $link ) {

				var pause = Graff.Modal.createOverlay();

				if ( pause ) {

					setTimeout( function() {
						Graff.Modal.show( $link );
					}, 100 );

				} else {

					Graff.Modal.show( $link);

				}
				
			},

			/**
			 * Close
			 */
			close : function() {

				$( 'html' ).removeClass( 'scroll-lock' );
				$( '#graff-modal' ).removeClass( 'show' ).find( '.graff-modal-page' ).empty();

			},

			/**
			 * Show
			 */
			show : function( $link ) {

				$( 'html' ).addClass( 'scroll-lock' );
				$( '#graff-modal' ).addClass( 'show' );

				var $page = $( '#graff-modal' ).find( '.graff-modal-page' ).empty();
				var $iframe = $( '<iframe src="' + $link.attr( 'href' ) + '" name="graff-modal-iframe" frameborder="0" marginwidth="0" marginheight="0" scrolling="auto" title="Overlay Window" />' );

				$page.append( $iframe );

			},

			/**
			 * Create Overlay (if doesn't exist)
			 */
			createOverlay : function() {

				if ( ! $( '#graff-modal' ).length ) {

					var $page = $( '<div class="graff-modal-page" />' );
					var $inner = $( '<div class="graff-modal-inner" />' ).append( $page );
					var $modal = $( '<div id="graff-modal" />' ).append( $inner );

					$( 'body' ).append( $modal );

					return true;

				}

				return false;

			}

		},

		/**
		 * WeChat
		 */
		WeChat : {

			init : function() {

				$( 'li.social-icon.wechat > a' ).each( function( i, item ) {

					$( item ).on( 'click', function( e ) {
						$( '.wechat-qr .wechat-qr-title' ).text( $( item ).text() );
						$( 'body' ).toggleClass( 'show-wechat-qr' );
						e.preventDefault();
					} );

				} );

				$( '.wechat-qr' ).on( 'click', function( e ) {
					$( 'body' ).toggleClass( 'show-wechat-qr' );
					e.preventDefault();
				} );

			}

		},

		/**
		 * Language Selector
		 */
		LanguageSelector : {

			/**
			 * Init
			 */
			init : function() {

				$( '.language-switcher' ).on( 'click', Graff.LanguageSelector.clickOpen );
				$( '.language-switcher' ).on( 'mouseleave touchend', Graff.LanguageSelector.mouseLeave );
				$( 'body' ).on( 'touchstart', Graff.LanguageSelector.mouseLeave ); // Touch anywhere to close selector

			},

			/**
			 * Handle Open Click
			 */
			clickOpen : function( e ) {

				if ( ! $( this ).find( 'ul' ).hasClass( 'open') ) {
					e.preventDefault();
				}

				$( this ).find( 'ul' ).addClass( 'open' );
				
			},

			/**
			 * Handle Mouse Leave
			 */
			mouseLeave : function( e ) {
				
				if ( $( 'html' ).hasClass( 'touchevents' ) ) {

					if ( ! $( e.target ).closest( '.language-switcher ul' ).length ) {
						$( '.language-switcher ul' ).removeClass( 'open' ); // If not tapping on a language, close switcher
					}

				} else {

					$( '.language-switcher ul' ).removeClass( 'open' ); // Desktop roll out

				}

			}

		},

		/**
		 * Stores List Anchor
		 */
		StoresListAnchor : {

			/**
			 * Init
			 */
			init : function() {

				$( document ).ready( Graff.StoresListAnchor.onDOMReady );

			},

			/**
			 * On DOM Ready
			 */
			onDOMReady : function() {

				var $indexNav = $( '.stores-list-index-nav' );

				if ( $indexNav.length ) {

					var hash = location.hash.replace( '#', '' );

					if ( hash !== '' && hash.length == 1 ) {

						var letter = hash.toUpperCase();

						$indexNav.children( 'a' ).each( function( i, el ) {
							if ( $( el ).text() == letter ) {

								var anchor = $( el ).attr( 'href' );

								if ( $( anchor ).length ) {
									var dest = $( anchor ).offset().top - $( '.site-branding' ).height();
									$( 'html, body' ).animate( { scrollTop : dest }, 800 );
								}

							}
						} );

					}

				}

			}

		},

		/**
		 * Grid Brand Images
		 */
		GridBrandImages : {

			currentBreakpoint : -1,
			breakpoints       : [ 0, 1024, 1500, 2000, 2500 ],

			/**
			 * Init
			 */
			init : function() {

				$( document ).ready( Graff.GridBrandImages.onDOMReady );
				$( window ).resize( Graff.GridBrandImages.checkBreakpoint );

			},

			/**
			 * On DOM Ready
			 */
			onDOMReady : function() {

				Graff.GridBrandImages.checkBreakpoint();

			},

			checkBreakpoint : function() {

				var winWidth = $( window ).width();
				var newBreakpoint = 0;

				for ( var i = 0; i < Graff.GridBrandImages.breakpoints.length; i++ ) {
					if ( winWidth >= Graff.GridBrandImages.breakpoints[ i ] ) {
						newBreakpoint = Graff.GridBrandImages.breakpoints[ i ];
					}
				}

				if ( newBreakpoint != Graff.GridBrandImages.currentBreakpoint ) {
					Graff.GridBrandImages.currentBreakpoint = newBreakpoint;
					Graff.GridBrandImages.updateBreakpoint();
				}

			},

			/**
			 * Update Breakpoint
			 */
			updateBreakpoint : function() {

				var $brandImages = $( '.grid > .grid-item--brand-image' );

				if ( $brandImages.length ) {

					var $grid = $brandImages.first().closest( '.grid' );
					var $gridItems = $grid.children().not( '.grid-item--brand-image' );

					$brandImages.each( function( i, el ) {

						var columns = Graff.GridBrandImages.getGridColumns( $grid );
						var addAfter = Graff.GridBrandImages.getKeyGridItem( columns, i );

						if ( addAfter >= 0 && addAfter < $gridItems.length - 1 ) {
							$gridItems.eq( addAfter ).after( $( el ).removeClass( 'hide' ) );
						} else {
							$( el ).addClass( 'hide' );
						}

					} );

					// Trigger lazy loading
					setTimeout( Graff.Lazy.revalidate, 400 );

				}

			},

			/**
			 * Get Grid Columns
			 *
			 * @param   jQuery   $grid  Grid element.
			 * @return  integer         Number of columns.
			 */
			getGridColumns : function( $grid ) {

				if ( $grid.hasClass( 'grid--3' ) ) {

					var matrix = {
						'0'    : 2,
						'1024' : 3,
						'1500' : 3,
						'2000' : 4,
						'2500' : 4
					};

					return matrix[ Graff.GridBrandImages.currentBreakpoint ];

				} else if ( $grid.hasClass( 'grid--4' ) ) {

					var matrix = {
						'0'    : 2,
						'1024' : 3,
						'1500' : 4,
						'2000' : 5,
						'2500' : 6
					};

					return matrix[ Graff.GridBrandImages.currentBreakpoint ];

				}

				return 2;

			},

			/**
			 * Get Key Grid Item
			 *
			 * Add brand image after this image.
			 *
			 * @param  integer  columns  Grid columns.
			 * @param  integer  n        Brand image index.
			 */
			getKeyGridItem : function( columns, n ) {

				if ( columns == 3 ) {

					// 3 Column
					return Graff.GridBrandImages.calculateKeyGridItem( n, [ 3, 8 ], 8 );

				} else if ( columns == 4 ) {

					// 4 Column
					return Graff.GridBrandImages.calculateKeyGridItem( n, [ 4, 12 ], 12 );

				} else if ( columns == 5 ) {

					// 5 Column
					return Graff.GridBrandImages.calculateKeyGridItem( n, [ 5, 16 ], 16 );

				} else if ( columns == 6 ) {

					// 6 Column
					return Graff.GridBrandImages.calculateKeyGridItem( n, [ 6, 20 ], 20 );

				} else if ( columns > 6 ) {

					// Hide
					return -1;

				}

				// Default 2 column
				return ( 4 * ( n + 1 ) ) - 1;

			},

			/**
			 * Calculate Key Grid Item Position based on formula
			 *
			 * @param   integer  n          Brand image index.
			 * @param   array    positions  Repeat pattern.
			 * @param   integer  repeat     Repeat pattern frequency.
			 * @return  integer             Grid item
			 */
			calculateKeyGridItem : function( n, positions, repeat ) {

				if ( n < positions.length ) {

					return positions[ n ] - 1;

				} else {

					var p = Math.floor( n / positions.length );
					var r = n % positions.length;
					var v = positions[ r ] + ( repeat * ( p ) );

					return v - 1;

				}

			}

		},

		/**
		 * Layout
		 */
		Layout : {

			/**
			 * Init
			 */
			init : function() {

				$( document ).ready( Graff.Layout.resize );
				$( window ).load( Graff.Layout.resize );
				$( window ).resize( Graff.Layout.resize );

			},

			/**
			 * Resize
			 */
			resize : function() {

				var $pageVideo = $( '.page-parts > .type-page .background-image-container > .background-video-placeholder > .page-part--image-display' ).first();

				if ( $pageVideo.length ) {

					var vHeight = $pageVideo.height();
					var pHeight = $pageVideo.parent().height();

					if ( pHeight < vHeight ) {
						$pageVideo.css( 'margin-top', Math.ceil( ( pHeight - vHeight ) / 2 ) );
					} else {
						$pageVideo.css( 'margin-top', 0 );
					}

				}

			}

		},

		/**
		 * Header Back to Top Link
		 */
		StoresSearchMsg : {

			/**
			 * Init
			 */
			init : function() {

				$( '.stores-search-msg' ).on( 'click', Graff.StoresSearchMsg.handleClick );

			},

			/**
			 * Handle Click
			 */
			handleClick : function( e ) {

				$( this ).removeClass( 'show' );
				
				e.preventDefault();
				
			}

		},

		/**
		 * Button Explode
		 */
		ButtonExplode : {

			init : function() {

				$( document ).ready( Graff.ButtonExplode.ready );

			},

			/**
			 * Ready
			 */
			ready : function() {

				$( '.button-explode > h3 a' ).on( 'click', function( e ) {

					var $explodeButton = $( this ).closest( '.button-explode' );

					$( '.button-explode' ).not( $explodeButton ).removeClass( 'exploded' );
					$explodeButton.toggleClass( 'exploded' );

					e.preventDefault();

				} );

			}

		},

		/**
		 * Tracking
		 * 
		 */
		Tracking : {

			init : function() {

				$( document ).ready( Graff.Tracking.ready );

			},

			/**
			 * Ready
			 */
			ready : function() {

				$gforms = $( 'form .gform_body' );

				if ( $gforms.length ) {

					// Track checkbox/radio button click
					$gforms.on( 'click', '.gfield input[type=radio], .gfield input[type=checkbox]', function( e ) {

						var $el = $( e.currentTarget );
						var $elField = $el.closest( '.gfield' );

						var trackingEvent = {
							'fieldClasses' : $elField.attr( 'class' ),
							'inputType'    : $el.attr( 'type' ),
							'inputValue'   : $el.attr( 'value' ),
							'event'        : 'trigger--form-input-click'
						};

						window.dataLayer = window.dataLayer || [];
						window.dataLayer.push( trackingEvent );

					} );

					// Track select menu changes
					$gforms.on( 'change', '.gfield select', function( e ) {

						var $el = $( e.currentTarget );
						var $elField = $el.closest( '.gfield' );
						var $elOption = $elField.find( ':selected' ).first();

						var trackingEvent = {
							'fieldClasses' : $elField.attr( 'class' ),
							'inputType'    : 'select',
							'inputLabel'   : $elOption.text(),
							'inputValue'   : $elOption.attr( 'value' ),
							'event'        : 'trigger--form-input-change'
						};

						window.dataLayer = window.dataLayer || [];
						window.dataLayer.push( trackingEvent );

					} );

				}

				// Confirmations (non AJAX)
				if ( $( '.gform_confirmation_message' ).is( ":visible" ) ) {

					window.dataLayer = window.dataLayer || [];
					window.dataLayer.push( {
						'formID' : $( '.gform_confirmation_message' ).attr( 'id' ).replace( 'gform_confirmation_message_', '' ),
						'event'  : 'trigger--form-success'
					} );

				}

				// Confirmations (AJAX)
				$( document ).bind( 'gform_confirmation_loaded', function( e, formID ) {

					window.dataLayer = window.dataLayer || [];
					window.dataLayer.push( {
						'formID' : formID,
						'event'  : 'trigger--form-success'
					} );

				} );

			}

		},

		/**
		 * Init
		 */
		init : function() {

			Graff.Header.init();
			Graff.Nav.init();
			Graff.Lazy.init();
			Graff.Search.init();
			Graff.Drawers.init();
			Graff.VideoOverlay.init();
			Graff.ScrollMoreLink.init();
			Graff.ScrollMoreImageLink.init();
			Graff.FiltersPanel.init();
			Graff.InView.init();
			Graff.BackToTop.init();
			Graff.Modal.init();
			Graff.WeChat.init();
			Graff.LanguageSelector.init();
			Graff.StoresListAnchor.init();
			Graff.GridBrandImages.init();
			Graff.Layout.init();
			Graff.StoresSearchMsg.init();
			Graff.ButtonExplode.init();
			Graff.Tracking.init();

		}

	};

} )( jQuery );

Graff.init();
