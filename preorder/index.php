<?php

require('../includes/config.inc.php');
require(MYSQL);

session_start();
if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_name']))
{
    header('location:https://anyway-grapes.jp/login.php?return_url=https%3A%2F%2Fanyway-grapes.jp%2Fpreorder%2F');
    exit();
}

?>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="Yukitaka Maeda">
        <title>予約販売｜Anyway-Grapes</title>

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
        <script type="text/javascript">

        document.createElement("header");
        document.createElement("footer");

        </script>
        <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <style type="text/css">

        header
        {
            height: 80px;
            padding: 15px;
        }

        @media only screen and (max-device-width: 480px)
        {
            header, div.contents, footer
            {
                width: 100%;
            }
        }

        @media print
        {
            header
            {
                display:none;
            }
        }

        </style>
    </head>
    <body ng-app="preorderApp" ng-controller="preorderCtrl">
    <div class="container">
        <header class="text-center">
            <img class="img-responsive" src="https://anyway-grapes.jp/cart_images/logo_top.png" />
        </header>
        <div class="contents">
            <div class="well well-lg">
                ※ 先着順にてオーダーを承ります。売り切れの際はご容赦下さい。<br />
                ※ 年代の古いボトルはラベルやキャップセルに経年の劣化が見受けられます。<br />
                ※ 輸入元在庫のため、ボトルやラベルの写真を提供することが出来ません。<br />
                ※ 金額は全て税抜き表示です。
            </div>
            <br />
            <div class="row">
                <div class="col-sm-4" style="border:1px solid rgb(221,221,221);padding:10px;">RP: ロバート・パーカー</div>
                <div class="col-sm-4" style="border:1px solid rgb(221,221,221);padding:10px;">AM: アラン・メドー</div>
                <div class="col-sm-4" style="border:1px solid rgb(221,221,221);padding:10px;">WS: ワイン・スペクテイター</div>
            </div>
            <div class="row">
                <div class="col-sm-4" style="border:1px solid rgb(221,221,221);padding:10px;">IWC: インターナショナル・ワインセラー</div>
                <div class="col-sm-4" style="border:1px solid rgb(221,221,221);padding:10px;">WE: ワイン・エンスージアスト</div>
                <div class="col-sm-4" style="border:1px solid rgb(221,221,221);padding:10px;">AG: アントニオ・ガッローニ</div>
            </div>
            <div class="row">
                <div class="col-sm-12" style="border:1px solid rgb(221,221,221);padding:10px;">JS: ジェームス・サックリング</div>
            </div>
            <div style="font-size:16px;padding:25px;display:{{displayAttr}};">Loading...</div>
            <div ng-if="!fLinkEnabled" style="padding:25px;color:darkred;font-size:16px;">
                インターネット経由でのご注文の受付期間が終了いたしました。<br />
                お手数ですが、ご購入希望の商品がございましたら<a href="mailto:order@anyway-grapes.jp">order@anyway-grapes.jp</a>までお問い合わせください。
            </div>
            <div ng-repeat="objWine in rgobjWine | orderBy : 'sortOrder'">
                <h2>{{ objWine.type }}</h2>
                <a href="../cart.php?cart_type=2&returnUrl={{returnUrl}}">買い物かご（予約販売用）へ移動</a>
                <div>
                    <table class="table table-striped" style="margin-bottom:20px;">
                        <thead>
                            <tr>
                                <th ng-click="setSortOrder('vintage')" class="text-center" style="cursor:pointer;">年</th>
                                <th>品名</th>
                                <th ng-click="setSortOrder('producer')" class="text-center" style="cursor:pointer;">生産者</th>
                                <th>Qty</th>
                                <th>会員価格</th>
                                <th class="text-center">メモ</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="preorderWine in objWine.preorderWines | orderBy : strSortColumn">
                                <td class="text-center" style="padding:8px;">{{ preorderWine.vintage }}</td>
                                <td class="text-left"   style="padding:8px;">{{ preorderWine.combined_name }}{{ preorderWine.capacity1 != '750' ? ' [' + preorderWine.capacity1 + 'ml]' : '' }}</td>
                                <td class="text-center" style="padding:8px;">{{ preorderWine.producer }}</td>
                                <td class="text-center" style="padding:8px;">{{ preorderWine.stock }}</td>
                                <td class="text-right"  style="padding:8px;">
                                    <span style="font-size:10px;text-decoration:line-through;">{{ preorderWine.price | currency : '¥' : 0 }}</span><br />
                                    {{ preorderWine.member_price | currency : '¥' : 0 }}
                                </td>
                                <td class="text-center" style="padding:8px;font-size:10px;">{{ preorderWine.point }}</td>
                                <td ng-if="fLinkEnabled" class="text-center" style="padding:8px;width:50px;"><a href="#" id="{{preorderWine.barcode_number}}" style="font-size:10px;" class="link--action-addtocart">追加</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <footer>
            <span>&copy;{{ intCurYear }}&nbsp;Conceptual Wine Boutique Anyway-Grapes</span>
        </footer>
    </div>
    </body>
</html>
<script type="text/javascript" src="./app.js"></script>
<script type="text/javascript" src="./controller/preorder.js?q=1"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript">

$(document).ready(function()
{
    $('div.contents').on('click', 'a.link--action-addtocart', function()
    {
        var $parentTd = $(this).closest('td'),
            strId     = $(this).attr('id'),
            intQty    = 1;

        $parentTd.html('<img src="../wholesale/load_ajax_post.gif" style="width:15px;height:15px;" />');

        $.post('../cart.php', { pid: strId, action: 'add', qty: intQty, cart_type: 2 })
            .done(function(data)
            {
                $parentTd.html('<img src="../wholesale/success.png" style="width:15px;height:15px;" />');
            });

        return false;
    });
});

</script>

