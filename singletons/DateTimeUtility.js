//-------------------------------------------------------
//
// DateTimeUtility
//
//-------------------------------------------- YuMaeda --
class DateTimeUtility
{
    constructor()
    {
        if (!DateTimeUtility.instance)
        {
            // Copied from seiya.utility-0.1.jp
            //-----------------------------------------------------
            this.m_rgstrWeek =
                [
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat'
                ];

            DateTimeUtility.instance = this;
        }

        return DateTimeUtility.instance;
    }

    get weeks() { return this.m_rgstrWeek; }

    getLastDateOfMonth(intYear, intMonth)
    {
        return (new Date(intYear, intMonth, 0)).getDate();
    }

    getDayOfWeek(intYear, intMonth, intDate)
    {
        var intDayOfWeek =
            (new Date(intYear, intMonth - 1, intDate)).getDay();

        return this.m_rgstrWeek[intDayOfWeek];
    }

    addLeadingZero(intNumber, cDigit)
    {
        var strNumber = intNumber + '';

        return (strNumber.length < cDigit) ?
            this.addLeadingZero('0' + strNumber, cDigit) :
            strNumber;
    }
}

const instance = new DateTimeUtility();
Object.freeze(instance);

export default instance;

