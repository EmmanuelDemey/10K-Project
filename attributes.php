<?php
error_reporting(E_ERROR | E_PARSE);

if(isset($_POST['element'])){
    // copy file content into a string var
    $json_file = file_get_contents('api/'.$_POST['element'].'.json');
    // convert the string to a json object
    $jfo = json_decode($json_file);
    // copy the posts array to a php var
    $attributes = $jfo->attributes;

    if(!isset($attributes)){
        echo '<p class="err">Wrong element</p>';
        exit();
    }
    echo '<h2>Attributes for <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/'.$_POST['element'].'">'.$_POST['element'].'</a></h2><ul>';

    // listing posts
    foreach ($attributes as $attr) {
        echo '<li>'.$attr.'</li>';
    }

    echo '</ul>';
}
?>
