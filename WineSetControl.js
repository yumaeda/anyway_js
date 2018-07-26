//-------------------------------------------------------
//
// WineSetControl
//
//-------------------------------------------- YuMaeda --
class WineSetControl extends HtmlControl
{
    constructor(headerHtml, intType)
    {
        super($('div#page-contents'));

        this.m_headerHtml = headerHtml;
        this.m_intType    = intType;
    }

    renderChildren()
    {
        var headerHtml       = this.m_headerHtml,
            intType          = this.m_intType,
            $parentContainer = this.$m_parentContainer;

        $.ajax(
        { 
            url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wine-sets',
            type: 'GET',
            dataType: 'json', 
            data:
            {
                type: intType
            },

            success: function(data)
            { 
                var rgobjWineSet = data.wines,
                    cWineSet     = rgobjWineSet.length; 
                if (cWineSet == 0)
                {
                    $parentContainer.html('Coming soon...');
                }
                else
                {
                    var html       = '',
                        objWineSet = null,
                        cColumn    = 3,
                        tableTag   = new TableTag(),
                        tableRow   = null,
                        tableCol   = null;

                    for (var i = 0; i < cWineSet; ++i)
                    {
                        objWineSet = rgobjWineSet[i];
                        html =
                            '<a href="#">'.format(objWineSet.id) +
                                "<img class=\"wine-set-img\" rel=\"{0}\" src=\"../images/wine_sets/{0}.png?lastmod=0129\" onerror=\"this.src='../images/wine_sets/no_wine_set_image.png';\" />".format(objWineSet.id) +
                            '</a>' +
                            '<br /><br />' +
                            '<span>{0}</span><br /><br />'.format(objWineSet.name);

                        html += (objWineSet.stock > 0) ?
                            '<span class="emphasis-span">【 送料無料 】</span>' :
                            '<span class="emphasis-span">完売しました</span>';

                        if ((i % 3) == 0)
                        {
                            if (tableRow != null)
                            {
                                tableTag.body.addRow(tableRow);
                            }

                            tableRow = new TableRow();
                        }

                        tableCol = new TableColumn(html);
                        tableCol.addClass('wine-set-td');
                        tableRow.addColumn(tableCol);
                    }

                    tableTag.body.addRow(tableRow);
                    $parentContainer.html('<div id="wine-set-contents">{0}</div>'.format(headerHtml + tableTag.toHtml()));
                }
            },

            error: function() {}
        });
    }

    postRender()
    {
        this.$m_parentContainer.on('click', 'img.wine-set-img', function()
        {
            location.href = './index.php?submenu=set_detail&id={0}&pc_view=1'.format($(this).attr('rel'));
            return false;
        });
    }
}

