<?php
/**
 * Plugin Name: Event Api Plugin
 * Plugin URI: http://www.noddy.co.za/event-api-plugin
 * Description: Event Api Plugin.
 * Version: 1.0
 * Author: Freddie O'Donnell
 * Author URI: http://www.noddy.co.za
 */

add_action( 'the_content', 'my_thank_you_text' );

function my_thank_you_text ( $content ) {
    return $content .= '<p>Thank you for reading!</p>';
}

function event_api_return_data( WP_REST_Request $request ) {    
    $parameters = $request->get_json_params();
 
    
    $a = create_event_db();
    
    $response = new WP_REST_Response( $a );
    
    $response->set_status( 200 );
    
    if ( empty( $parameters ) ) {
        return new WP_Error( 'no_parameters', 'Invalid body', array( 'status' => 400 ) );
    }
    
    return $response;
}

function create_party_api( WP_REST_Request $request ) {    
    $parameters = $request->get_json_params();
    
    $a = create_party_db($parameters);
    
    $response = new WP_REST_Response( count($parameters['kids']) );
    
    $response->set_status( 200 );
    
    if ( empty( $parameters ) ) {
        return new WP_Error( 'no_parameters', 'Invalid body', array( 'status' => 400 ) );
    }
    
    return $response;
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'event-api/v1', '/event', array(
      'methods' => 'POST',
      'callback' => 'event_api_return_data',
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
  
  
  function create_event_db() {
    global $wpdb;
    
    $event_id = wp_insert_post( array(
        'post_title'    => 'test_event_4',
        'post_type'  => 'event',
        'post_status'   => 'publish',
        'comment_status'   => 'closed',
        'ping_status'   => 'closed',
      ) );
      
      $field_id1 = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'date'));
      $field_id2 = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'numberoftickets'));
      
      $wpdb->insert(
        $wpdb->postmeta,
        array(
            'post_id' => $event_id,
            'meta_key' => 'date',
            'meta_value' => 20201126
        ),
        array('%d','%s','%d'));      
        
        $wpdb->insert(
        $wpdb->postmeta,
        array(
            'post_id' => $event_id,
            'meta_key' => '_date',
            'meta_value' => $field_id1
        ),
        array('%d','%s','%s'));        
        
        
        $wpdb->insert(
        $wpdb->postmeta,
        array(
            'post_id' => $event_id,
            'meta_key' => 'numberoftickets',
            'meta_value' => 200
        ),
        array('%d','%s','%d'));        
        
        $wpdb->insert(
        $wpdb->postmeta,
        array(
            'post_id' => $event_id,
            'meta_key' => '_numberoftickets',
            'meta_value' => $field_id2
        ),
        array('%d','%s','%s'));
        
    return $event_id;
  };
  
  function create_party_db($parameters) {
    global $wpdb;
    
    $event_id = wp_insert_post( array(
        'post_title'    => $parameters['name'],
        'post_type'  => 'party',
        'post_status'   => 'draft',
        'comment_status'   => 'closed',
        'ping_status'   => 'closed',
      ) );
      
      $field_name = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'party_name'));
      $field_adults = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'number_of_adults'));
      $field_date = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'event_date'));
      $field_email = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'email'));
      $field_eventid = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'eventid'));
      $field_cell = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'cell_number'));
      
      $field_children = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'children'));
      $field_children_age = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'child_age'));
      $field_children_name = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'child_name'));
      $field_children_has_gift = $wpdb->get_var( $wpdb->prepare( "SELECT post_name FROM $wpdb->posts WHERE post_excerpt = %s", 'has_gift'));
            
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $event_id,
          'meta_key' => 'party_name',
          'meta_value' => $parameters['name']
      ),
      array('%d','%s','%s'));      
        
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $event_id,
          'meta_key' => '_party_name',
          'meta_value' => $field_name
      ),
      array('%d','%s','%s'));        
        
        
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $event_id,
          'meta_key' => 'number_of_adults',
          'meta_value' => $parameters['adults']
      ),
      array('%d','%s','%d'));        
        
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $event_id,
          'meta_key' => '_number_of_adults',
          'meta_value' => $field_adults
      ),
      array('%d','%s','%s'));
        
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $event_id,
          'meta_key' => 'event_date',
          'meta_value' => str_replace('-','',$parameters['date'])
      ),
      array('%d','%s','%d'));        
          
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $event_id,
          'meta_key' => '_event_date',
          'meta_value' => $field_date
      ),
      array('%d','%s','%s'));
          
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $event_id,
          'meta_key' => 'email',
          'meta_value' => $parameters['email']
      ),
      array('%d','%s','%s'));        
            
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $event_id,
          'meta_key' => '_email',
          'meta_value' => $field_email
      ),
    array('%d','%s','%s'));
            
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $event_id,
          'meta_key' => 'eventid',
          'meta_value' => $parameters['eventId']
      ),
      array('%d','%s','%d'));        
              
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $event_id,
          'meta_key' => '_eventid',
          'meta_value' => $field_eventid
      ),
      array('%d','%s','%s'));            
            
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $event_id,
          'meta_key' => 'cell_number',
          'meta_value' => $parameters['cell']
      ),
      array('%d','%s','%s'));        
              
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $event_id,
          'meta_key' => '_cell_number',
          'meta_value' => $field_cell
      ),
      array('%d','%s','%s'));
      
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $event_id,
          'meta_key' => 'children',
          'meta_value' => count($parameters['kids'])
      ),
      array('%d','%s','%d'));      
        
    $wpdb->insert(
      $wpdb->postmeta,
      array(
          'post_id' => $event_id,
          'meta_key' => '_children',
          'meta_value' => $field_children
      ),
      array('%d','%s','%s'));     
          
    for ($x = 0; $x < count($parameters['kids']); $x++) {
      $count = strval($x);
    
      $wpdb->insert(
        $wpdb->postmeta,
        array(
            'post_id' => $event_id,
            'meta_key' => "children_{$count}_has_gift",
            'meta_value' => $parameters['kids'][$count]['hasGift']
        ),
        array('%d','%s','%s'));      
          
      $wpdb->insert(
        $wpdb->postmeta,
        array(
            'post_id' => $event_id,
            'meta_key' => "_children_{$count}_has_gift",
            'meta_value' => $field_children_has_gift
        ),
        array('%d','%s','%s'));
        
      $wpdb->insert(
        $wpdb->postmeta,
        array(
            'post_id' => $event_id,
            'meta_key' => "children_{$count}_child_name",
            'meta_value' => $parameters['kids'][$count]['name']
        ),
        array('%d','%s','%s'));      
          
      $wpdb->insert(
        $wpdb->postmeta,
        array(
            'post_id' => $event_id,
            'meta_key' => "_children_{$count}_child_name",
            'meta_value' => $field_children_name
        ),
        array('%d','%s','%s'));
        
        $wpdb->insert(
          $wpdb->postmeta,
          array(
              'post_id' => $event_id,
              'meta_key' => "children_{$count}_child_age",
              'meta_value' => $parameters['kids'][$count]['age']
          ),
          array('%d','%s','%d'));      
            
        $wpdb->insert(
          $wpdb->postmeta,
          array(
              'post_id' => $event_id,
              'meta_key' => "_children_{$count}_child_age",
              'meta_value' => $field_children_age
          ),
          array('%d','%s','%s'));  
    }
    
    return $event_id;
  };
  
  add_filter( 'acf/rest_api/item_permissions/edit', function( $permission ) {
    return current_user_can( 'edit_posts' );
  } );