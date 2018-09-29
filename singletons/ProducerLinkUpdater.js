import AnywayUrlUtility from '../singletons/AnywayUrlUtility';

//-------------------------------------------------------
//
// ProducerLinkUpdater
//
//-------------------------------------------- YuMaeda --
class ProducerLinkUpdater
{
    constructor()
    {
        if (!ProducerLinkUpdater.instance)
        {
            ProducerLinkUpdater.instance = this;
        }

        return ProducerLinkUpdater.instance;
    }

    update($parentContainer)
    {
        $parentContainer.find('a.producer-lnk').each(function()
        {
            var $this       = $(this),
                strProducer = $this.attr('rel');

            strProducer = strProducer.replace(/\&amp;/g, '&'); 
            strProducer = strProducer.replace(/'/g, "\\'");

            $.ajax(
            {
                url: '//anyway-grapes.jp/laravel5.3/public/api/v1/producer-details/{0}'.format(strProducer),
                dataType: 'json',
                success: function(data)
                {
                    var rgobjProducer = data.details;

                    if (rgobjProducer.length == 1)
                    {
                        $this.attr('href', AnywayUrlUtility.generateProducerPageUrl(rgobjProducer[0]));
                    }
                },

                error: function() {}
            });
        });
    }
}

const instance = new ProducerLinkUpdater();
Object.freeze(instance);

export default instance;

