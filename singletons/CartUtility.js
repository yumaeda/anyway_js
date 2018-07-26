//-------------------------------------------------------
//
// CartUtility
//
//-------------------------------------------- YuMaeda --
class CartUtility
{
    constructor()
    {
        if (!CartUtility.instance)
        {
            CartUtility.instance = this;
        }

        return CartUtility.instance;
    }

    isPurchasable(objWine)
    {
        return ((objWine.apply != 'SO') &&
                (objWine.apply != 'DP') &&
                (objWine.availability == 'Online') &&
                (objWine.stock > 0) &&
                (objWine.price > 0));
    }

    isComingSoon(objWine)
    {
        var fComingSoon = false,
            strEtc      = objWine.etc;   

        if (strEtc && strEtc.length > 0)
        {
             var rgstrToken  = strEtc.split('.');
             if (rgstrToken.length == 2)
             {
                 fComingSoon = (!Number.isNaN(Number(rgstrToken[0])) && !Number.isNaN(Number(rgstrToken[1])));
             }
        }

        return ((objWine.stock > 0) && (objWine.availability == 'Online') && fComingSoon);
    }
}

const instance = new CartUtility();
Object.freeze(instance);

export default instance;

