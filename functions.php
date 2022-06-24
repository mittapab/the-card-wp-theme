<?php 

function wp_theme_setup() {
	/**
	 * Load translation identity
	 * add default WordPress support for title, feed and enable post thumbnail in post/page.
	 */
	load_theme_textdomain( 'wp-theme-prototype' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );

	/**
	 * un comment these lines if you want to register your own image size
	 * it's effect when uploading new image.
	 */
	// add_image_size( 'wp-theme-prototype-1024', 1024, 768, true );
	// add_image_size( 'wp-theme-prototype-600', 600, 300, true );

	/**
	 * Register menu 
	 * It will show up in Appearance > Menus
	 */
	// register_nav_menus( array(
	// 	'top'    => __( 'Top Navigation', 'wp-theme-prototype' ),
	// 	'social' => __( 'Footer Sitemap', 'wp-theme-prototype' ),
	// ) );
	
	/**
	 * Enable html5 power for comment, gallery and caption element.
	 */
	add_theme_support( 'html5', array(
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );
}
add_action( 'after_setup_theme', 'wp_theme_setup' );

function wp_theme_register_script() {
	/**
	 * Enqueue stylesheet that generated from gulp
	 * first is vendor, second is your style.css
	 */
	wp_enqueue_style('wp-style', get_stylesheet_uri(), array(), '1.0.0');
	wp_enqueue_style('the_card' , get_theme_file_uri('/css/slick/slick.css'), array(), '1.0.0');
	wp_enqueue_style('the_card_1' , get_theme_file_uri('/css/slick/slick-theme.css'), array(), '1.0.0');
	wp_enqueue_style('the_card_1' , get_theme_file_uri('/css/magnific-popup.css'), array(), '1.0.0');
	wp_enqueue_style('the_card_2' , get_theme_file_uri('/css/tooplate-style.css'), array(), '1.0.0');


	wp_enqueue_script('the_card' , get_theme_file_uri('/js/jquery-1.11.0.min.js') , array() , '1.0' , true); 
	wp_enqueue_script('the_card-1_sc' , get_theme_file_uri('/js/background.cycle.js') , array('jquery') , '1.0' , true); 
	wp_enqueue_script('the_card-2_sc' , get_theme_file_uri('/css/slick/slick.min.js') , array('jquery') , '1.0' , true); 
	wp_enqueue_script('the_card-3_sc' , get_theme_file_uri('/js/jquery.magnific-popup.min.js') , array('jquery') , '1.0' , true); 
	wp_enqueue_script('the_card-4_sc' , get_theme_file_uri('/js/main.js') , array('jquery') , '1.0' , true); 
	
	/**
	 * Register js script file(js/client.js) 
	 * dependency on jQuery, and place this before close body tag
	 */
	wp_register_script('wp-client', get_theme_file_uri('/js/compiled.js'), array('jquery'), '1.0.0', true);

	/**
	 * Uncomment if you want to pass an php variebles to js-script
	 * for example, you can use homeURL in main.js(its return root url).
	 */
	// $js_variables = array('homeURL' => home_url());
	// wp_localize_script( 'wp-client', 'themeVariables', $js_variables );
	wp_enqueue_script('wp-client');
}
add_action('wp_enqueue_scripts', 'wp_theme_register_script');

?>
