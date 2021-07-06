<?php
/**
 * Plugin Name: Event Api Plugin
 * Plugin URI: http://www.noddy.co.za/event-api-plugin
 * Description: Event Api Plugin.
 * Version: 1.0
 * Author: Freddie O'Donnell
 * Author URI: http://www.noddy.co.za
 */
require_once(ABSPATH . 'wp-config.php'); 
require_once(ABSPATH . 'wp-includes/wp-db.php'); 
require_once(ABSPATH . 'wp-admin/includes/taxonomy.php');

function confirm_party_payment_api( WP_REST_Request $request ) {    
    $parameters = $request->get_json_params();
    
    $response = new WP_REST_Response( 0 );
    
    $response->set_status( 200 );
    
    if ( empty( $parameters ) ) {
        return new WP_Error( 'no_parameters', 'Invalid body', array( 'status' => 400 ) );
    }
    
    $confirmed = get_post_meta( $parameters['partyId'], 'payment_confirmed', true );
    if ($confirmed){
      return $response;
    }
    
    $a = confirm_party_payment_db($parameters);
    $b = update_event_ticket_number($parameters['eventId'], $parameters['tickets']);
    
    $response = new WP_REST_Response( $b );
    
    return $response;
}

function verify_recaptcha(WP_REST_Request $request){
    $parameters = $request->get_json_params();
      
    $response = new WP_REST_Response( 0 );
    
    if ( empty( $parameters ) || $parameters['recaptchaResponse'] == '' ) {
        return new WP_Error( 'no_parameters', 'Invalid body', array( 'status' => 400 ) );
    }
    
    $secret = getenv('RECAPTCHA_SECRET');
    $recaptcha_response = $parameters['recaptchaResponse'];
    $url = "https://www.google.com/recaptcha/api/siteverify";
    
    $response = wp_remote_post($url, array(
      'method'      => 'POST',
      'timeout'     => 45,
      'redirection' => 5,
      'httpversion' => '1.0',
      'blocking'    => true,
      'headers'     => array(),
      'body'        => array(
          'secret' => $secret,
          'response' => $recaptcha_response,
      ),
      'cookies'     => array()
    ));
    
    if(is_wp_error($response)){
      return new WP_Error( 'no_parameters', 'Error', array( 'status' => 500 ) );
    }

    return $response;
}

function create_party_api( WP_REST_Request $request ) {    
  
  $parameters = $request->get_json_params();
  if ( empty( $parameters ) ) {
    return new WP_Error( 'no_parameters', 'Invalid body', array( 'status' => 400 ) );
  }
  
    $newDate = date("l, F j, Y", strtotime($parameters['date']));
    
    $catId = 1;
    
    if (!category_exists($newDate)){
      $catId = wp_insert_category( array(
        'cat_ID' => 0,
        'taxonomy' => 'category',
        'cat_name' => $newDate,
        'category_description' => 'event date the party is booked for',
        'category_nicename' => sanitize_title($newDate),
        'category_parent' => 0
      ), true );
    }else {
      $term = get_term_by('name', $newDate, 'category');
      $catId=$term->term_id;
    }
    
    $a = create_party_db($parameters, $catId);
    
    $name = $parameters['name'];
    $adults = $parameters['adults'];
    $date = $parameters['date'];
    $numberOfKids = count($parameters['kids']);
    
    $c = wp_mail( $parameters['email'], 'Noddy Party Booking Confirmation', "<!DOCTYPE html>
      <html lang=\"en\">
      <head>
          <style>
              table, th, td {
                  border: 1px solid black;
                  border-collapse: collapse;
                  padding: 10px;
              }
          </style>
          <meta charset=\"UTF-8\">
          <title>Create AGUT account instruction</title>
      </head>
      <body>
        Dear $name,
      <h3 style=\"color:#f16159\">Your booking details are as follows</h3>
      <br>
      <table>
        <tr>
            <th>Party Name</th>
            <th>Number of adults</th>
            <th>Number of kids</th>
            <th>Date</th>
        </tr>
        <tr>
            <td>$name</td>
            <td>$adults</td>
            <td>$numberOfKids</td>
            <td>$date</td>
        </tr>
      </table>
      <br>
      
      
      <br>
      Thanks,<br>
      The Noddy Team
      </body>
      </html>", 'Content-type: text/html', '' );
    
    $response = new WP_REST_Response($a);
    
    $response->set_status( 200 );
    
    return $response;
  }

add_action( 'rest_api_init', function () {
    register_rest_route('party-api/v1', '/party', array(
      'methods' => 'PUT',
      'callback' => 'confirm_party_payment_api',
      'permission_callback' => function () {
        return current_user_can("edit_posts");
      }
    ) );
  } );
  
add_action( 'rest_api_init', function () {
  register_rest_route('party-api/v1', '/recaptcha-verify', array(
    'methods' => 'POST',
    'callback' => 'verify_recaptcha',
    'permission_callback' => function () {
      return true;
    }
  ) );
} );
  
  add_action( 'rest_api_init', function () {
    register_rest_route( 'party-api/v1', '/party', array(
      'methods' => 'POST',
      'callback' => 'create_party_api',
      'permission_callback' => function () {
        return true;
      }
    ) );
  } );
  
function confirm_party_payment_db($parameters){
  global $wpdb;
  
  return $wpdb->update(
    $wpdb->postmeta,
    array(
        'meta_value' => true
    ),
    array(
      'meta_key' => 'payment_confirmed',
      'post_id' => $parameters['partyId']        
    ));   
}
  
  function update_event_ticket_number($event_id, $numberOfTickets){
    global $wpdb;
    
    $numberOfTicketsRemaining = get_post_meta( $event_id, 'numberoftickets', true );
    $n = (int)$numberOfTicketsRemaining;
    $n2 = (int)$numberOfTickets;
    
    $wpdb->update(
      $wpdb->postmeta,
      array(
          'meta_value' => ($n - $n2)
      ),
      array(
        'meta_key' => 'numberoftickets',
        'post_id' => $event_id
      ));
      
      return $numberOfTickets;
  }
  
  function create_party_db($parameters, $catId) {
    global $wpdb;
    
    $party_id = wp_insert_post( array(
        'post_title'    => $parameters['name'],
        'post_type'  => 'party',
        'post_status'   => 'publish',
        'comment_status'   => 'closed',
        'ping_status'   => 'closed',
        'post_category' => array($catId)
      ) );
      
      $field_name = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'party_name'));
      $field_adults = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'number_of_adults'));
      $field_date = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'event_date'));
      $field_email = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'email'));
      $field_eventid = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'eventid'));
      $field_cell = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'cell_number'));
      $field_confirmed = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'payment_confirmed'));
      $field_invitation_sent = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'invitation_sent'));
      
      $field_children = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'children'));
      $field_children_age = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'child_age'));
      $field_children_name = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'child_name'));
      $field_children_has_gift = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'has_gift'));
    
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => 'payment_confirmed',
          'meta_value' => 0
      ),
      array('%d','%s','%d'));      
        
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => '_payment_confirmed',
          'meta_value' => $field_confirmed
      ),
      array('%d','%s','%s'));
      
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => 'invitation_sent',
          'meta_value' => 0
      ),
      array('%d','%s','%d'));      
        
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => '_invitation_sent',
          'meta_value' => $field_invitation_sent
      ),
      array('%d','%s','%s'));       
        
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => 'party_name',
          'meta_value' => $parameters['name']
      ),
      array('%d','%s','%s'));      
        
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => '_party_name',
          'meta_value' => $field_name
      ),
      array('%d','%s','%s'));        
        
        
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => 'number_of_adults',
          'meta_value' => $parameters['adults']
      ),
      array('%d','%s','%d'));        
        
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => '_number_of_adults',
          'meta_value' => $field_adults
      ),
      array('%d','%s','%s'));
        
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => 'event_date',
          'meta_value' => str_replace('-','',$parameters['date'])
      ),
      array('%d','%s','%d'));        
          
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => '_event_date',
          'meta_value' => $field_date
      ),
      array('%d','%s','%s'));
          
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => 'email',
          'meta_value' => $parameters['email']
      ),
      array('%d','%s','%s'));        
            
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => '_email',
          'meta_value' => $field_email
      ),
    array('%d','%s','%s'));
            
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => 'eventid',
          'meta_value' => $parameters['eventId']
      ),
      array('%d','%s','%d'));        
              
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => '_eventid',
          'meta_value' => $field_eventid
      ),
      array('%d','%s','%s'));            
            
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => 'cell_number',
          'meta_value' => $parameters['cell']
      ),
      array('%d','%s','%s'));        
              
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => '_cell_number',
          'meta_value' => $field_cell
      ),
      array('%d','%s','%s'));
      
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => 'children',
          'meta_value' => count($parameters['kids'])
      ),
      array('%d','%s','%d'));      
        
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => '_children',
          'meta_value' => $field_children
      ),
      array('%d','%s','%s'));     
          
    for ($x = 0; $x < count($parameters['kids']); $x++) {
      $count = strval($x);
    
      $wpdb->insert(
        $wpdb->postmeta,
        array(
            'post_id' => $party_id,
            'meta_key' => "children_{$count}_has_gift",
            'meta_value' => $parameters['kids'][$count]['hasGift']
        ),
        array('%d','%s','%s'));      
          
      $wpdb->insert(
        $wpdb->postmeta,
        array(
            'post_id' => $party_id,
            'meta_key' => "_children_{$count}_has_gift",
            'meta_value' => $field_children_has_gift
        ),
        array('%d','%s','%s'));
        
      $wpdb->insert(
        $wpdb->postmeta,
        array(
            'post_id' => $party_id,
            'meta_key' => "children_{$count}_child_name",
            'meta_value' => $parameters['kids'][$count]['name']
        ),
        array('%d','%s','%s'));      
          
      $wpdb->insert(
        $wpdb->postmeta,
        array(
            'post_id' => $party_id,
            'meta_key' => "_children_{$count}_child_name",
            'meta_value' => $field_children_name
        ),
        array('%d','%s','%s'));
        
        $wpdb->insert(
          $wpdb->postmeta,
          array(
              'post_id' => $party_id,
              'meta_key' => "children_{$count}_child_age",
              'meta_value' => $parameters['kids'][$count]['age']
          ),
          array('%d','%s','%d'));      
            
        $wpdb->insert(
          $wpdb->postmeta,
          array(
              'post_id' => $party_id,
              'meta_key' => "_children_{$count}_child_age",
              'meta_value' => $field_children_age
          ),
          array('%d','%s','%s'));  
    }
    
    return $party_id;
  };
  
  add_filter( 'acf/rest_api/item_permissions/edit', function( $permission ) {
    return current_user_can( 'edit_posts' );
  } );
  
/* Sort posts in wp_list_table by column in ascending or descending order. */
function custom_post_order($query){
  /* 
      Set post types.
      _builtin => true returns WordPress default post types. 
      _builtin => false returns custom registered post types. 
  */
  if ($query->get('post_type') == 'event'){
    $query->set('orderby', 'meta_value');
    $query->set('meta_key', 'date');
    $query->set('order', 'ASC');
  }
  
  // $post_types = get_post_types('', 'names');
  // /* The current post type. */
  // $post_type = $query->get('post_type');
  
  /* Check post types. */
  if($query->get('post_type') == 'party'){
      /* Post Column: e.g. title */
      if($query->get('orderby') == ''){
          $query->set('orderby', 'meta_value_num');
          $query->set('meta_key', 'children_0_child_age');
      }
      /* Post Order: ASC / DESC */
      if($query->get('order') == ''){
          $query->set('order', 'ASC');
      }
  }
}
add_action('pre_get_posts', 'custom_post_order');
// if(is_admin()){
// }

add_action( 'before_delete_post', 'return_tickets' );
function return_tickets( $postid ) {
  global $wpdb;
    // // We check if the global post type isn't ours and just return
    // global $post_type;   
 
    // if ( 'wpdocs_my_custom_post_type' !== $post_type ) {
    //     return;
    // }
    
    if(get_post_type($postid) == 'party'){
      $numberOfChildren = get_post_meta( $postid, 'children', true );
      $numberOfAdults = get_post_meta( $postid, 'number_of_adults', true );
      $eventId = get_post_meta( $postid, 'eventid', true );
      $numberOfTickets = get_post_meta( $eventId, 'numberoftickets', true );
      
      $numberOfPeople = (int)$numberOfChildren + (int)$numberOfAdults;
      $n2 = (int)$numberOfTickets + $numberOfPeople;
    
      $wpdb->update(
        $wpdb->postmeta,
        array(
            'meta_value' => ($n2)
        ),
        array(
          'meta_key' => 'numberoftickets',
          'post_id' => $eventId
        ));
    }
    // My custom stuff for deleting my custom post type here
}

add_filter( 'manage_party_posts_columns', 'set_custom_party_columns' );
function set_custom_party_columns($columns) {
    $columns['payment_confirmed'] = __( 'Payment Confirmed', 'your_text_domain' );

    return $columns;
}

// Add the data to the custom columns for the book post type:
  add_action( 'manage_party_posts_custom_column' , 'custom_party_column', 10, 2 );
  function custom_party_column( $column, $post_id ) {
      switch ( $column ) {
  
          case 'payment_confirmed' :
              echo get_post_meta( $post_id , 'payment_confirmed' , true ); 
              break;
  
      }
  }
