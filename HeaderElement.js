//-------------------------------------------------------
//
// HeaderElement
//
//-------------------------------------------- YuMaeda --
class HeaderElement extends HtmlControl
{
    constructor()
    {
        super($('header'));
        this.pressedKey = '';
    }

    renderChildren()
    {
        var $parentContainer = this.$m_parentContainer;

        $.ajax(
        {
            url: '//anyway-grapes.jp/is_authenticated.php',
            dataType: 'text',
            success: function(strResponse)
            {
                var html =
                    '<a href="./index.php"><img src="../images/_logo.png" /></a>' +
                    '<br />' +
                    //'<a href="./index_old.php?submenu=advanced_search">Search</a>' +
                    '<a href="./index.php?submenu=vintage_info">Vintages</a>' +
                    '<a href="../producers/index.html">Producers</a>' +
                    '<a href="./index.php?submenu=critics">Critics</a>' +
                    '<div id="simple-search-fld">' +
                        '<input type="text" placeholder=" ワイン検索" /><img src="../images/search_wine.png" />' +
                    '</div>' +
                    '<div id="signup-fld">' +
                        '<input id="cart-btn" type="button" value="カート" />';

                if (strResponse != 'TRUE')
                {
                    html +=
                        '&nbsp;<input id="login-btn" type="button" value="ログイン" />' +
                        '&nbsp;<input id="register-btn" type="button" value="会員登録" />';
                }
                else
                {
                    html +=
                        '&nbsp;<input id="logout-btn" type="button" value="ログアウト" />' +
                        '&nbsp;<input id="membership-btn" type="button" value="会員ページ" />';
                }

                html += '</div>';
                $parentContainer.html(html);
            },

            error: function() {}
        });
    }

    postRender()
    {
        this.$m_parentContainer.on('click', 'div#signup-fld input[type=button]', function()
        {
            var id          = $(this).attr('id'),
                redirectUrl = '';

            switch (id)
            {
            case 'cart-btn':
                location.href = 'https://anyway-grapes.jp/cart.php';
                break;
            case 'login-btn':
                location.href = 'https://anyway-grapes.jp/login.php';
                break;
            case 'logout-btn':
                location.href = 'https://anyway-grapes.jp/logout.php';
                break;
            case 'register-btn':
                $('div#page-contents').load('../pages/member_rules.inc.html', function(){});
                break;
            case 'membership-btn':
                location.href = '../customer_info.php';
                break;
            }

            return false;
        });

        this.$m_parentContainer.on('click', 'div#simple-search-fld img', function()
        {
            $input = $(this).siblings('input');

            location.href = './index.php?submenu=search&keyword=' + $input.val();
            return false;
        });

        $(document).on('keydown', function(e)
        {
            this.pressedKey = e ? (e.which || e.keyCode) : event.keyCode;
        });

        $(document).on('keyup', function(e)
        {
            var keyCode = e ? (e.which || e.keyCode) : event.keyCode;
            if ((keyCode == 13) && (this.pressedKey !== 229))
            {
                var $input     = $('div#simple-search-fld input'),
                    strKeyword = $input.val();

                $.ajax(
                {
                    url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wines',
                    dataType: 'json',
                    data:
                    {
                        keyword: strKeyword
                    },
                    success: function(data)
                    {
                        var resultTable   = new SearchResultTable($('div#page-contents'));
                        resultTable.wines = data.wines;
                        resultTable.clearFilter();
                        resultTable.render();
                    },

                    error: function() {}
                });
            }
        });
    }
}

