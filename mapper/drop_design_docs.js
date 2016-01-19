(function () {
    // see http://stackoverflow.com/questions/646628/how-to-check-if-a-string-startswith-another-string
    // with performance tests at http://jsperf.com/startswith2/4
    var startsWith = function (str, prefix) {
        if (str.length < prefix.length) {
            return false;
        }
        for (var i = prefix.length - 1; (i >= 0) && (str[i] === prefix[i]); --i) {
            //continue;
        }
        return i < 0;
    };

    var dropDesignDocs = function (doc) {
        return startsWith(doc['_id'], '_design/') ? null : doc;
    };

    module.exports = function (doc) {
        return dropDesignDocs(doc);
    }
})();
