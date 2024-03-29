<?php
/*
 * Add my new menu to the Admin Control Panel
 */
require(ABSPATH . 'wp-load.php');
require_once(ABSPATH . 'wp-includes/pluggable.php'); 
require_once(ABSPATH . 'wp-config.php'); 

add_action( 'phpmailer_init', 'send_smtp_email' );
global $phpmailer;

function send_smtp_email( $phpmailer ) {
	if ( ! is_object( $phpmailer ) ) {
		$phpmailer = (object) $phpmailer;
	}

	$phpmailer->Mailer     = 'smtp';
	$phpmailer->Host       = SMTP_HOST;
	$phpmailer->SMTPAuth   = SMTP_AUTH;
	$phpmailer->Port       = SMTP_PORT;
	$phpmailer->Username   = SMTP_USER;
	$phpmailer->Password   = SMTP_PASS;
	$phpmailer->SMTPSecure = SMTP_SECURE;
	$phpmailer->From       = SMTP_FROM;
	$phpmailer->FromName   = SMTP_NAME;
}

// define the wp_mail_failed callback
function action_wp_mail_failed($wp_error){
    return error_log(print_r($wp_error, true));
}
 
// add the action
add_action('wp_mail_failed', 'action_wp_mail_failed', 10, 1);

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
  global $wpdb;

  $results=$wpdb->get_results("select distinct * from wp_postmeta where meta_key='email'");
  $sent = false;
  
  foreach($results as $key => $row) {
    $email_address = $row->meta_value;
    $party_id = $row->post_id;
    
    $row2=$wpdb->get_row("select distinct * from wp_postmeta where meta_key='invitation_sent' and post_id=$party_id");
    
    $invitation_sent = $row2->meta_value;
    
    if (!$invitation_sent) {
      $a = wp_mail( $email_address, 'Noddy Party bookings are now OPEN!!', '<!DOCTYPE html>
      <html lang="en">
      <head>
          <style>
              table, th, td {
                  border: 1px solid black;
                  border-collapse: collapse;
                  padding: 10px;
              }
          </style>
          <meta charset="UTF-8">
          <title>Noddy bookings open</title>
      </head>
      <body>
        Dear parents,
      <h3 style="color:#f16159">Noddy Party bookings are now OPEN!</h3>
      <br>
        Please click <a href="https://noddy.co.za">here</a> to go to our website and make a booking!
      <br>
      
      
      <br>
      Thanks,<br>
      The Noddy Team
      </body>
      </html>
  
  ', 'Content-type: text/html', '' );
      $sent=true;
    }
    
    $wpdb->update(
      $wpdb->postmeta,
      array(
          'meta_value' => 1
      ),
      array(
        'meta_key' => 'invitation_sent',
        'post_id' => $party_id      
      ));   
  }
  
  $converted_res = $sent ? 'true' : 'false';
  $response = new WP_REST_Response( $converted_res . SMTP_HOST );
  
  if ($sent){
    $response->set_status( 200 );
  }else{
    $response->set_status( 400 );
  }
  
  return $response;
}

?>
