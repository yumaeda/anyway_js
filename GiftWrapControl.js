//-------------------------------------------------------
// GiftWrapControl
//-------------------------------------------- YuMaeda --
class GiftWrapControl extends HtmlControl
{
    _generateGiftBoxInnerHtml(boxNumber)
    {
        var boxPrice = (boxNumber === 100) ? 300 : 500,
            boxTitle = (boxNumber === 100) ? 'ギフト・ボックス（1本用）' : 'ギフト・ボックス（2本用）',
            html     =
            '<table id="gift{0}" style="margin:20px;">'.format(boxNumber) +
                '<tr>' +
                    '<td colspan="2">' +
                        boxTitle +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>' +
                        '<span>{0}</span>円 (税抜)'.format(boxPrice.format()) +
                    '</td>' +
                    '<td>' +
                        '<div>' +
                            '数量:&nbsp;' +
                            '<input type="number" value="1" min="1" max="500" />' +
                            '<img id="{0}" src="../campaign/add_to_cart.png" class="add-to-cart-img" />'.format(boxNumber) +
                        '</div>' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="jpnText textSmall">' +
                        'ワインを複数ご購入の場合は、どのワインを包装するか｢備考欄｣にご記入下さい。<br /><br />また、特殊な形状のワインはギフトボックスに入らない場合がございます。その場合、別途ご連絡させて頂きますので何卒ご了承下さい。' +
                    '</td>' +
                '</tr>' +
            '</table>';

        return html;
    }

    constructor()
    {
        super($('div#page-contents'));
    }

    renderChildren()
    {
        var tableTag = new TableTag();

        var imgRow = new TableRow(),
            imgCol = new TableColumn('<img src="../images/gift_main_img.png" />');
        imgCol.addAttr('colspan', '2');
        imgCol.addAttr('style', 'text-align:center;');
        imgRow.addColumn(imgCol);

        var descRow = new TableRow(),
            descCol = new TableColumn('当店では、一般的なワインボトル[750ml]とマグナムボトル[1500ml]にご利用いただける贈答用のギフトボックスを取り扱っております（ハーフボトルにはご利用いただけませんのでご注意下さい）。ギフトボックスは、クラフト紙を使った当店オリジナルの包装紙で包装いたします。');
        descCol.addAttr('colspan', '2');
        descCol.addAttr('style', 'padding: 25px 0;');
        descRow.addColumn(descCol);

        var gift1Row = new TableRow();
        gift1Row.addColumn(new TableColumn('<img src="../images/giftbox1.png" />'));
        gift1Row.addColumn(new TableColumn(this._generateGiftBoxInnerHtml(100)));

        var gift2Row = new TableRow();
        gift2Row.addColumn(new TableColumn('<img src="../images/giftbox2.png" />'));
        gift2Row.addColumn(new TableColumn(this._generateGiftBoxInnerHtml(101)));

        var noshiDescription =
            '<p>' +
                'ギフトボックスをご購入して下さったお客様には、熨斗をサービス致します。<br /><br />' +
                '<span class="textUnderline">熨斗紙</span><br /><br />' +
                '熨斗紙をご希望の方は、注文画面の備考欄で熨斗文字、水引の種類の指定をお願い致します。<br />' +
                '1. 表書き（出産、入学、お中元、お歳暮などの目的）<br />' +
                '2. 熨斗下文字（送り主様のお名前）<br />' +
                '3. 水引は色、本数、結び方で用途がわかれます。代表的な例は下を参照ください。<br />' +
                '&nbsp;&nbsp;<<蝶結び>>&nbsp;&nbsp;一般祝辞、お中元、お歳暮など何度でも繰り返してよいお祝いに用います<br />' +
                '&nbsp;&nbsp;<<5本紅白結びきり>>&nbsp;&nbsp;繰り返して起きてほしくない傷病の全快、快気祝いなどに用います<br />' +
                '&nbsp;&nbsp;<<10本紅白結びきり>>&nbsp;&nbsp;結婚祝い、寿など結婚に関する祝いに用います。<br />' +
                '<br /><br />' +
                '<span class="textUnderline">内熨斗、外熨斗について </span><br /><br />' +
                '包装する前に箱に直接かける方法を内熨斗、包装した上から掛ける方法を外熨斗といいます。お住まいの地方、時代によって解釈が異なりますがどちらの掛け方でも間違いはありません。最近は、内熨斗は、主に手渡しではなく、配送する場合に用います。配送によって破れたり汚れたりするのを防ぐためです。外熨斗は、主に贈り物を持参してお渡しする場合に用います。当店では特に指定がなければ内熨斗でお送り致します。' +
            '</p>',

            noshiRow = new TableRow(),
            noshiCol = new TableColumn(noshiDescription);
        noshiCol.addAttr('colspan', '2');
        noshiCol.addAttr('style', 'padding: 25px 0;');

        tableTag.head.addRow(imgRow);
        tableTag.body.addRow(descRow);
        tableTag.body.addRow(gift1Row);
        tableTag.body.addRow(gift2Row);
        tableTag.body.addRow(noshiRow);

        this.$m_parentContainer.html(tableTag.toHtml());
    }

    postRender()
    {
        this.$m_parentContainer.off('click', 'img.add-to-cart-img');
        this.$m_parentContainer.on('click', 'img.add-to-cart-img', function(event)
        {
            var $this      = $(this),
                strBarcode = $this.attr('id'),
                intQty     = $this.siblings('input[type=number]').val();

            $.ajax(
            {
                url:  '../cart.php',
                type: 'POST',
                data:
                {
                    action: 'add',
                    pid:    strBarcode,
                    qty:    intQty
                },

                success: function(strResponse)
                {
                    $this.notify('買い物かごに{0}個追加されました。'.format(intQty),
                    {
                        autoHideDelay: 2500,
                        arrowSize: 6,
                        className: 'success'
                    });
                },

                error: function()
                {
                    console.error(barcode + ' cannot be added to the cart.');
                }
            });
        });
    }
}

