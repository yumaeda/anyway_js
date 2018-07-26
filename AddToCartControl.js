//-------------------------------------------------------
//
// AddToCartControl
//
//-------------------------------------------- YuMaeda --
class AddToCartControl
{
    constructor()
    {
    }

    toHtml(objWine)
    {
        var html = '';

        if (CartUtility.isPurchasable(objWine))
        {
            var price         = parseInt(objWine.price, 10),
                memberPrice   = ((objWine.member_price > 0) ? parseInt(objWine.member_price, 10) : price),
                priceHtml     = '',
                addToCartHtml = '',
                barcode       = objWine.barcode_number,
                tableTag      = new TableTag();

            priceHtml =
                '<span class="price-label">{0}</span>円 (税抜)'.format(price.format()) +
                '<br />' +
                '<span class="member-price-label">会員価格：<span>{0}</span>円 (税抜)</span>'.format(memberPrice.format());

            if (objWine.stock > 0)
            {
                addToCartHtml =
                    'Qty:&nbsp;<input type="number" value="1" min="1" max="{0}" class="qty-input" />'.format(objWine.stock) +
                    '<img id="{0}" class="add-to-cart-img" src="../campaign/add_to_cart.png" />'.format(objWine.barcode_number);
            }

            var priceRow = new TableRow();
            priceRow.addColumn(new TableColumn(priceHtml));
            priceRow.addColumn(new TableColumn(addToCartHtml));
            tableTag.body.addRow(priceRow);

            if (CartUtility.isComingSoon(objWine))
            {
                var strPreOrder = '<br /><p class="preorder-p">{0}入荷予定。<br />入荷の翌日以降の発送となります。</p>'.format(objWine.etc),
                    preOrderRow = new TableRow(),
                    preOrderCol = new TableColumn(strPreOrder);

                preOrderCol.addAttr('colspan', '2');
                preOrderRow.addColumn(preOrderCol);
                tableTag.body.addRow(preOrderRow);
            }

            html = tableTag.toHtml();
        }
        else
        {
            html = '<span class="soldout-label">Sold Out</span>';
        }

        return html;
    }

    registerEventHandler($container)
    {
        $container.off('click', 'img.add-to-cart-img');
        $container.on('click', 'img.add-to-cart-img', function(event)
        {
            var strBarcode = this.id,
                $this      = $(this),
                intQty     = $this.siblings('input').val();

            $.ajax(
            {
                url:  '//anyway-grapes.jp/cart.php',
                type: 'POST',
                data:
                {
                    action: 'add',
                    pid:    strBarcode,
                    qty:    intQty
                },

                success: function(strResponse)
                {
                    $this.notify('買い物かごに追加されました。',
                    {
                        autoHideDelay: 2500,
                        arrowSize: 6,
                        className: 'success'
                    });
                },

                error: function() {}
            });
        });
    }
}

export default AddToCartControl;

