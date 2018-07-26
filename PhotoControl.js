//-------------------------------------------------------
//
// PhotoControl
//
//-------------------------------------------- YuMaeda --
class PhotoControl extends HtmlControl
{
    constructor(intCategory)
    {
        super($('div#page-contents'));

        this.m_intCategory = intCategory;
    }

    renderChildren()
    {
        var self = this;

        $.ajax(
        {
            url: 'http://sei-ya.jp/anyway-grapes/get_items.php', 
            dataType: 'jsonp',
            jsonp:    'xDomainCallback',
            data:
            {
                dbTable: 'anyway_photos',
                condition: 'category=' + self.m_intCategory,
                orderBy: 'sort_order'
            },

            success: function(rgobjPhoto)
            {
                var cPhoto   = rgobjPhoto.length,
                    tableTag = new TableTag();

                tableTag.addAttr('style', 'margin-top:50px;');

                for (var i = 0; i < cPhoto; ++i)
                {
                    if ((i % 4) === 0)
                    {
                        var newRow = new TableRow();
                        tableTag.body.addRow(newRow);
                    }

                    var objPhoto = rgobjPhoto[i],
                        imgUrl   = 'http://sei-ya.jp/{0}thumb_{1}'.format(objPhoto.dir, objPhoto.filename),
                        imgHtml  =
                            '<a href="#" img="http://sei-ya.jp/{0}" rel="{1}">'.format(objPhoto.dir + objPhoto.filename, objPhoto.comment) +
                                '<img src="{0}" class="thumbnail-img" style="width:150px;" />'.format(imgUrl) +
                            '</a>',
                        imgCol = new TableColumn(imgHtml);
                    imgCol.addAttr('style', 'text-align:center;padding-bottom:50px;');

                    tableTag.body.lastRow.addColumn(imgCol);
                }

                self.$m_parentContainer.html(tableTag.toHtml());
            },

            error: function() {}
        });
    }

    postRender()
    {
        this.$m_parentContainer.on('click', 'img.thumbnail-img', function()
        {
            var $parentAnchor = $(this).closest('a');

            ModalWindow.show('<img src="' + $parentAnchor.attr('img') + '" />',
                $parentAnchor.attr('rel'));

            return false;
        });
    }
}

