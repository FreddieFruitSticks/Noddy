START TRANSACTION;

INSERT INTO 
    wp_posts(post_content, post_excerpt,to_ping, pinged, post_content_filtered, comment_status, ping_status, post_type, post_title) 
    VALUES('','', '','','','closed', 'closed','event', %s);


SET @last_id_in_wp_posts = LAST_INSERT_ID();

SET @field_id1 = (select post_name from wp_posts where post_excerpt='date');
SET @field_id2 = (select post_name from wp_posts where post_excerpt='numberoftickets');

insert into wp_postmeta (post_id, meta_key, meta_value) VALUES (@last_id_in_wp_posts, 'date', %d);
insert into wp_postmeta (post_id, meta_key, meta_value) VALUES (@last_id_in_wp_posts, '_date', @field_id1);

insert into wp_postmeta (post_id, meta_key, meta_value) VALUES (@last_id_in_wp_posts, 'numberoftickets', %d);
insert into wp_postmeta (post_id, meta_key, meta_value) VALUES (@last_id_in_wp_posts, '_numberoftickets', @field_id2);

COMMIT;