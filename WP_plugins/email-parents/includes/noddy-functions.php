<?php
/*
 * Add my new menu to the Admin Control Panel
 */
 
// Hook the 'admin_menu' action hook, run the function named 'mfp_Add_My_Admin_Link()'
add_action( 'admin_menu', 'noddy_email_parents_admin' );
 
// Add a new top level menu link to the ACP
function noddy_email_parents_admin()
{
      add_menu_page(
        'Email Parents', // Title of the page
        'Email Parents', // Text to show on the menu link
        'manage_options', // Capability requirement to see the link
        'includes/noddy-email-parents-view.php', // The 'slug' - file to display when clicking the link
        'email_parents_call'
    );
}

function email_parents_call() {
	if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
  }
  
  $js_to_load = plugin_dir_url( __FILE__ ) . 'fetch_emails.js';
  wp_enqueue_script('fetch_emails_button_js', $js_to_load, '', mt_rand(10,1000), true);
  // wp_enqueue_script('react');
  // wp_enqueue_script('react-dom');
  
  readfile(__DIR__ . '/noddy-email-parents-view.php');
}

add_filter('script_loader_tag', 'add_type_attribute' , 10, 3);

function add_type_attribute($tag, $handle, $src) {
  // if not your script, do nothing and return original $tag
  if ( 'fetch_emails_button_js' !== $handle ) {
      return $tag;
  }
  // change the script tag by adding type="module" and return it.
  $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
  return $tag;
};

add_action( 'rest_api_init', function () {
  register_rest_route('email-api/v1', '/email', array(
    'methods' => 'PUT',
    'callback' => 'email_parents',
    'permission_callback' => function () {
      return current_user_can("edit_posts");
    }
  ) );
} );

function email_parents( WP_REST_Request $request ) {    
  $response = new WP_REST_Response( "WORKS!!" );
  
  $response->set_status( 200 );
  
  return $response;
}

?>
