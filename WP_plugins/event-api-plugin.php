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
  
  add_filter( 'acf/rest_api/item_permissions/edit', function( $permission ) {
    return current_user_can( 'edit_posts' );
  } );