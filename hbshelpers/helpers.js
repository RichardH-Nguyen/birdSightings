var moment = require('moment-timezone');

function formatDate(date){
    //Get UTC standard version of date
    m = moment.utc(date);
    //Convert to MN timezone and format
    return m.tz('America/Chicago').format('dddd, MMM Do YYY, h:mm a');
}

function length(array){
    return array.length;
}

module.exports = {
    formatDate,
    length
};