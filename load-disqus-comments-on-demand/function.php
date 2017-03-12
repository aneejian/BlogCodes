function disqus_embed() {
	global $post;
    echo '<script type="text/javascript">
    var disqus_shortname = "aneejian";
    var disqus_title = "'.$post->post_title.'";
    var disqus_url = "'.get_permalink($post->ID).'";
    var disqus_identifier = "'.$disqus_shortname.'-'.$post->ID.'";
    var disqus_loaded = false;
    function loadDisqus() {
      if (!disqus_loaded)  {
        disqus_loaded = true;
        var e = document.createElement("script");
        e.type = "text/javascript";
        e.async = true;
        e.src = "//" + disqus_shortname + ".disqus.com/embed.js";
        (document.getElementsByTagName("head")[0] ||
         document.getElementsByTagName("body")[0])
        .appendChild(e);
      }
    } 
    </script>';
}
add_action('wp_head', 'disqus_embed');
