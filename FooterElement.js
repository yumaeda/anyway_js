//-------------------------------------------------------
//
// FooterElement
//
//-------------------------------------------- YuMaeda --
class FooterElement extends HtmlControl
{
    constructor()
    {
        super($('footer'));
    }

    renderChildren()
    {
        var html =
            '<div>' +
                '<span class="emphasis-span">!! 未成年の方には酒類の販売を行いません。!!</span>' +
                '<br /><br />' +
                '<p>' +
                    '<a href="./index.php?submenu=guide">{0}</a>'.format('ご利用ガイド') +
                    '<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>' +
                    '<a href="./index.php?submenu=quality">{0}</a>'.format('品質の保証') +
                    '<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>' +
                    '<a href="./index.php?submenu=company">{0}</a>'.format('会社概要') +
                    '<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>' +
                    '<a href="./index.php?submenu=privacy">{0}</a>'.format('個人情報') +
                    '<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>' +
                    '<a href="./index.php?submenu=cmtransaction">{0}</a>'.format('特定商取引法') +
                    '<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>' +
                    '<a href="mailto:{0}?subject=問い合わせ">{1}</a>'.format('mail@anyway-grapes.jp', 'お問い合わせ') +
                    '<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>' +
                    '<a href="./index.php?submenu=faq">よくあるご質問</a>' +
                '</p>' +
            '</div>' +
            '<div id="payment-info-pane"></div>' +
            '<div id="shipping-info-pane"></div>';

        this.$m_parentContainer.html(html);
    }

    postRender()
    {
        var $paymentInfoPane  = this.$m_parentContainer.find('div#payment-info-pane'),
            $shippingInfoPane = this.$m_parentContainer.find('div#shipping-info-pane'),
            strLang           = UrlQuery.getValue('lang');

        if ((strLang != 'en') && (strLang != 'fr'))
        {
            strLang = 'ja';
        }

        HtmlUtility.renderPage($paymentInfoPane, '//anyway-grapes.jp/pages/' + strLang + '/payment.html');
        HtmlUtility.renderPage($shippingInfoPane, '//anyway-grapes.jp/pages/' + strLang + '/shipping_fee.html');
    }
}

