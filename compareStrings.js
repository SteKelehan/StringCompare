const _ = require('lodash')


_edit_string = function (s) {
    return s.toLowerCase().replace(/\s+/g, '').replace(/[&\/\\#,£+()$~%.'":*?<>{}]/g, '').replace(/ltd/g, '').replace(/limited/g, '').replace(/company/g, '').replace(/unlimited/g, '');
};

_edit_distance = function (s1, s2) {
    s1 = this._edit_string(s1);
    s2 = this._edit_string(s2);


    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    if (s1.includes(s2) || s2.includes(s1)) {
        costs[s2.length] = costs[s2.length] - 1;
    }
    else {
        costs[s2.length] = costs[s2.length] + 1;
    }
    return costs[s2.length];
}

compareStrings = function (s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - this._edit_distance(longer, shorter)) / parseFloat(longerLength);

}

stringScore = function (s1, s2) {
    var res = compareStrings(s1, s2)
    return res > 1 ? 1 : res < 0 ? 0 : res;
}

// These are to be removed from the one to one matching
const likingWords = [
    'the',
    'and',
    'I',
    'there',
    'thier',
    'they\'re',
    'at',
    'his',
    'her',
    'him',
    'she',
    'that',
    'be',
    'to',
    'of',
    "a",
    "it",
    "not",
    "he",
    "as",
    "you",
    "this",
    "but",
    "or",
    "an",
    "will",
    "my",
    "one",
    "all",
    "would",
    "to",
    "in",
    "for",
    "on",
    "with",
    "at",
    "by",
    "from",
    "up",
    "about",
    "into",
    "over",
    "after"
];


// This is equating plurals
let plures = {
    '//g': ('/\s+$/g'),
    '': ('\(ies)+$')
}

// There are several exceptions to this rule. Nouns ending in –s,–o, -sh, -ch and –x, form their plurals by adding –es to the singular.
// Nouns ending in a consonant + -y, form their plurals by changing that –y into –i and adding –es.
// Most nouns ending in –f or –fe form their plurals by changing –f or –fe into v and adding –es.



console.log(compareStrings("GREEN", "green"))

generateStrings = function (s1, s2) {
    let size = Math.min(s1.split(' ').length, s2.split(' ').length);

    s1.split(' ').forEach(s1word => {
        s2.split(' ').forEach(s2word => {
            console.log(s1word + ' ' + s2word)
            console.log(singlewords(s1word, s2word))
        })
    });
}


generateStrings("the GREENs car", "green car")
exports = module.exports = compareStrings;




// This is to be used to match word to word
function singlewords(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}


// Alg 
// Match whole string using compare string alg if 80% or above give that answer
// If bellow 80% 
// Remove joining words (linkingWords) 
// Choose the lenght of the shortest string 
// If there are the length of the shorest string comparisons > 70 % -> add 40% to the origonal number



// -> have to mess around with algs







