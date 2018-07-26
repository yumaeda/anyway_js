//-------------------------------------------------------
//
// NewInfoControl
//
//-------------------------------------------- YuMaeda --
class NewInfoControl extends HtmlControl
{
    constructor($parentContainer)
    {
        super($parentContainer);
        this.m_intYear = (new Date()).getFullYear();
    }

    renderChildren()
    {
        var self     = this,
            objParam =
        {
            dbTable:   'anyway_new_info',
            condition: '(year >= {0})'.format(self.m_intYear - 1),
            orderBy:   'year DESC, month DESC, date DESC'
        };

        $.ajax(
        {
            url: 'http://sei-ya.jp/anyway-grapes/get_items.php', 
            dataType: 'jsonp',
            jsonp: 'xDomainCallback',
            data: objParam,
            success:  function(rgobjNewInfo)
            {
                var objNewInfo   = null,
                    cNewInfo     = rgobjNewInfo.length,
                    tableTag     = new TableTag(),
                    strDayOfWeek = '',
                    strMonth     = '',
                    strDate      = '';

                for (var i = 0; i < cNewInfo; ++i)
                {
                    objNewInfo   = rgobjNewInfo[i];
                    strDayOfWeek = DateTimeUtility.getDayOfWeek(objNewInfo.year, objNewInfo.month, objNewInfo.date);
                    strMonth     = DateTimeUtility.addLeadingZero(objNewInfo.month, 2);
                    strDate      = DateTimeUtility.addLeadingZero(objNewInfo.date, 2);

                    var tableRow = new TableRow(),
                        tableCol = new TableColumn('{0}.{1}.{2}'.format(objNewInfo.year, strMonth, strDate));
                    if (strDayOfWeek == DateTimeUtility.weeks[0])
                    {
                        tableCol.addClass('sunday-color');
                    }
                    else if (strDayOfWeek == DateTimeUtility.weeks[6])
                    {
                        tableCol.addClass('saturday-color');
                    }

                    tableRow.addColumn(tableCol);
                    tableRow.addColumn(new TableColumn(objNewInfo.description));
                    tableTag.body.addRow(tableRow);
                }

                self.$m_parentContainer.html(tableTag.toHtml());
            },

            error: function() {}
        });
    }
}

