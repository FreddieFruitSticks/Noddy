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

add_action( 'the_content', 'my_thank_you_text' );

function my_thank_you_text ( $content ) {
    return $content .= '<p>Thank you for reading!</p>';
}

function confirm_party_payment_api( WP_REST_Request $request ) {    
    $parameters = $request->get_json_params();
    
    $a = confirm_party_payment_db($parameters);
    $b = update_event_ticket_number($parameters['eventId'], $parameters['tickets']);
    
    $response = new WP_REST_Response( $b );
    
    $response->set_status( 200 );
    
    if ( empty( $parameters ) ) {
        return new WP_Error( 'no_parameters', 'Invalid body', array( 'status' => 400 ) );
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
    
    $response = new WP_REST_Response($a);
    
    $response->set_status( 200 );
    
    return $response;
  }

add_action( 'rest_api_init', function () {
    register_rest_route('party-api/v1', '/party', array(
      'methods' => 'PUT',
      'callback' => 'confirm_party_payment_api',
      'permission_callback' => function () {
        $user = wp_get_current_user();
        $allowed_roles = array('editor', 'administrator', 'author');
        return array_intersect($allowed_roles, $user->roles );
      }
    ) );
  } );
  
  add_action( 'rest_api_init', function () {
    register_rest_route( 'party-api/v1', '/party', array(
      'methods' => 'POST',
      'callback' => 'create_party_api',
      'permission_callback' => function () {
        $user = wp_get_current_user();
        $allowed_roles = array('editor', 'administrator', 'author');
        return array_intersect($allowed_roles, $user->roles );
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
        'post_status'   => 'draft',
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
      
      $field_children = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'children'));
      $field_children_age = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'child_age'));
      $field_children_name = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'child_name'));
      $field_children_has_gift = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'has_gift'));
    
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $party_id,
          'meta_key' => 'payment_confirmed',
          'meta_value' => false
      ),
      array('%d','%s','%s'));      
        
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