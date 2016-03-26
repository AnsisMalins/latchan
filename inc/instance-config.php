<?php

/*
*  Instance Configuration
*  ----------------------
*  Edit this file and not config.php for imageboard configuration.
*
*  You can copy values from config.php (defaults) and paste them here.
*/

require('secret-config.php');

$config['root'] = '/';

$config['thumb_width'] = 128;
$config['thumb_height'] = 128;
$config['thumb_op_width'] = 256;
$config['thumb_op_height'] = 256;

$config['allowed_ext_files'][] = 'webm';
$config['additional_javascript'][] = 'js/jquery.min.js';
$config['additional_javascript'][] = 'js/catalog-link.js';
$config['additional_javascript'][] = 'js/expand-video.js';
$config['additional_javascript'][] = 'js/show-op.js';
$config['additional_javascript'][] = 'js/webm-settings.js';
