/**
 * @return {string}
 */
function PriceFormat(price) {
    price+= '';
    price= price.replace(',', '');
    var x = price.split('.');
    var y = x[0];
    var z= x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(y))
        y= y.replace(rgx, '$1' + ',' + '$2');
    return y+ z;
}

export default PriceFormat;
