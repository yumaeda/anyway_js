//-------------------------------------------------------
//
// ImporterControl
//
//-------------------------------------------- YuMaeda --
class ImporterControl extends HtmlControl
{
    constructor($parentContainer)
    {
        super($parentContainer);
    }

    renderChildren()
    {
        var self     = this,
            objParam =
        {
            dbTable: 'anyway_importers',
            orderBy: 'sort_order'
        };

        $.ajax(
        {
            url: 'http://sei-ya.jp/anyway-grapes/get_items.php', 
            dataType: 'jsonp',
            jsonp: 'xDomainCallback',
            data: objParam,
            success: function(rgobjImporter)
            {
                var objImporter, strName, strLogoFile, logoImg, logoLink,
                    cImporter = rgobjImporter.length,
                    tableTag  = new TableTag(),
                    tableRow  = null;

                for (var i = 0; i < cImporter; ++i)
                {
                    if ((i % 5) == 0)
                    {
                        if (tableRow != null)
                        {
                            tableTag.body.addRow(tableRow);
                        }

                        tableRow = new TableRow();
                    }

                    objImporter = rgobjImporter[i];
                    strName = encodeURIComponent(objImporter.name);

                    strLogoFile = objImporter.filename;
                    if (!strLogoFile)
                    {
                        strLogoFile = 'nologo.jpg';
                    }

                    logoImg = new ImageTag('../' + objImporter.dir + strLogoFile);
                    logoImg.addClass('importer-img');

                    logoLink = new AnchorTag('#', logoImg.toHtml());
                    logoLink.addAttr('title', objImporter.name);

                    tableRow.addColumn(new TableColumn(logoLink.toHtml()));
                }

                tableTag.body.addRow(tableRow);
                self.$m_parentContainer.html(tableTag.toHtml());
            },

            error: function() {}
        });
    }
}

