function LoadFromUrl(urlSource, divId) {

    if(navigator.appName == "Microsoft Internet Explorer") {        
    var xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlHttp.open( "GET", urlSource, true );

    xmlHttp.onreadystatechange = function() {
        if( xmlHttp.readyState == 4 && ( xmlHttp.status == 0 || xmlHttp.status == 200 ) )
        {                
            document.getElementById(divId).innerHTML = '"' + xmlHttp.responseText + '"';
        }
    };
    xmlHttp.send();
}

else {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", urlSource, true);
    xmlHttp.onreadystatechange = function()
    {
        if(xmlHttp.readyState == 4 && (xmlHttp.status == 0 || xmlHttp.status == 200))
        {
            document.getElementById(divId).innerHTML = xmlHttp.responseText;
        }
    };
    xmlHttp.send();
  }
}
