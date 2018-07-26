<?php

$curDirPath           = dirname(__FILE__);
$dbSyncStatusFilePath = "$curDirPath/../syncStatus.txt";
$dbSyncStatus         = file_get_contents($dbSyncStatusFilePath);
if ($dbSyncStatus == '1')
{
    header('Content-type: text/html; charset=utf-8');
    exit('只今メンテナンスを行っております。5分程お待ちください（カートに入れた商品は保持されます）。');
}

if (!isset($_REQUEST['pc_view']) || ($_REQUEST['pc_view'] != 1))
{
    $strUserAgent = $_SERVER['HTTP_USER_AGENT'];

    // Redirect iPhone/iPod visitors
    if(strpos($strUserAgent, 'Android') ||
       strpos($strUserAgent, 'iPhone') ||
       strpos($strUserAgent, 'iPod'))
    {
        header("Location: ../s/index.php");
    }
}

if ((!empty($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] !== 'off')) ||
    ($_SERVER['SERVER_PORT'] == 443))
{
    header("Location: http://anyway-grapes.jp/store/index.php");
}

?>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
        <title>ワインのAnyway-Grapes｜世田谷区 経堂</title>
        <script type="text/javascript">

        document.createElement('header');
        document.createElement('aside');
        document.createElement('section');
        document.createElement('footer');

        </script>
        <link rel="stylesheet" type="text/css" href="index.min.css" />
    </head>
    <body>
        <header></header>
        <div id="page-container">
            <aside></aside>
            <div id="page-contents"></div>
        </div>
        <footer></footer>
    </body>
</html>

<script type="text/javascript">

function iframeLoaded()
{
    var rgobjIframe = document.getElementsByClassName('content-height-iframe'),
        cIframe     = rgobjIframe.length,
        objIframe   = null;

    for (var i = 0; i < cIframe; ++i)
    {
        objIframe = rgobjIframe[i];

        if (objIframe)
        {
            if (objIframe.contentDocument)
            {
                objIframe.height = objIframe.contentDocument.documentElement.scrollHeight + 'px';
            }
            else
            {
                objIframe.height = objIframe.contentWindow.document.body.scrollHeight + 'px';
            }
        }
    }

    // Scroll to top when one of the child links are clicked.
    window.parent.parent.scrollTo(0, 0);
}

</script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> 
<script type="text/javascript" src="//anyway-grapes.jp/store/index.min.js?rev=20180110_002"></script> 
<script type="text/javascript">

// Google Analytics
// ------------------------------------------------------------------------------
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-44746254-1', 'auto');
ga('send', 'pageview');
// ------------------------------------------------------------------------------

</script>

