//-------------------------------------------------------
//
// NewArrivalControl
//
//-------------------------------------------- YuMaeda --
class NewArrivalControl extends HorizontallyScrollable
{
    constructor($parentContainer)
    {
        super($parentContainer);
    }

    renderChildren()
    {
        var self = this;

        $.ajax(
        {
            url: '//anyway-grapes.jp/laravel5.3/public/api/v1/new-wines',
            dataType: 'json',
            success: function(data)
            {
                self.items = data.wines;
                self._renderChildren(self);
            },

            error: function() {}
        });
    }
}

