var dict,
	config = {
		maxWildcards: 3
	};

function renderDict(txt) {
	return (dict = eval( "(" + txt + ")" ));
}

function createDictionary(path) {
	var txt = require('fs').readFileSync(path, 'utf8'),
		words = txt.replace(/\n/g, '').split(' '),
		trie = {},
		end = {},
		keepEnd = {},
		endings = [0],
		reserved = ["abstract", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", "default", "delete", "do", "double", "else", "enum", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", "long", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with"],
		ret;

	// Build a simple Trie structure
	for (var i = 0, l = words.length; i < l; i++) {
		var word = words[i],
			letters = word.split(""),
			cur = trie;

		for (var j = 0; j < letters.length; j++) {
			var letter = letters[j],
				pos = cur[letter];

			if (pos == null) {
				cur = cur[letter] = j === letters.length - 1 ? 0 : {};

			} else if (pos === 0) {
				cur = cur[letter] = { $: 0 };

			} else {
				cur = cur[letter];
			}
		}
	}

	ret = JSON.stringify(trie).replace(/"/g, "");

	for (var i = 0; i < reserved.length; i++) {
		ret = ret.replace(new RegExp("([{,])(" + reserved[i] + "):", "g"), "$1'$2':" );
	}

	console.log(ret);
}

function findUniqueLetters(word){
	
	var uniqueLetters = [],
		letters = word.split(''),
		i = 0,
		l = letters.length;
			
	for (; i < l; i++)
	{
		if (uniqueLetters.indexOf(letters[i]) === -1)
			uniqueLetters.push( letters[i] );
	}
	
	return uniqueLetters.sort();
}

function findLetterFreqs(word){

	var letters = word.split(''),
		i = 0,
		l = letters.length,
		letterFreq = {};

	for (; i < l; i++)
	{
		if (letterFreq[ letters[i] ])
			letterFreq[ letters[i] ]++;
		else
			letterFreq[ letters[i] ] = 1;
	}

	return letterFreq;
}

function decrementOrDelete(node, collection) {
	collection.total--;
	
	if (collection[node] > 1)
		collection[node]--;
	else
		delete collection[node];
}

function isTrailAccurate(trail, cur) {
	var letters = trail.split(''),
		i = 0,
		l = trail.length,
		d = null;
		
	for (; i < l; i++) {
		d = (d) ? d[letters[i]] : dict[letters[i]];
	}
	
	console.log((d === cur) ? 'Trail is accurate' : 'Trail is INACCURATE');
}

function findAnagramsSafely(rack, callback) {
	
	// Restrict to three wildcard characters maximum
	var lFreq = findLetterFreqs(rack),
		options = {},
		i = 0;
		
	if (lFreq['?'] && lFreq['?'] > config.maxWildcards) {
		
		lFreq['?'] = config.maxWildcards;
		options.letterFreq = lFreq;
		
		options.rack = rack.replace(/\?/g, '');
		for (;i < config.maxWildcards; i++) options.rack += '?';
		
	}
	
	findTrieAnagrams(options, callback);
	
}

function findAnagrams(rack, callback) {
	findTrieAnagrams({ 'rack': rack }, callback);
}

function findTrieAnagrams(options, callback) {
	var groupedMatches = {'count': 0},
			uniqueLetters = findUniqueLetters(options.rack),
			ul = uniqueLetters.length,
			i = 0,
			letterFreq = options.letterFreq || findLetterFreqs(options.rack),
			debug = false,
			debugTrail = false,
			recurse = true,
			extend = require("node.extend");

    try {
            
		// the recursion point
		function searchTrie(freq, cur, trail)
		{
			for ( var node in cur ) {

				var isWildcard = (freq[node] === undefined && freq['?'] !== undefined);

				if ( freq.total > 0 && ( freq[node] !== undefined || ( isWildcard && node !== '$' ) ) ) {

					// copy trail otherwise it will innacurately bleed into recursions for non-matches
					// deep copy freq otherwise it will innacurately bleed into recursions for non-matches
					var localTrail = trail + node,
						localFreq = extend(true, {}, freq),
						localTrailLength = localTrail.replace(/<\/*em>|\*/g, '').length;

					if (isWildcard) {

						// format
						switch (options.format) {
							case 'html':
								localTrail = trail + '<em>' + node + '</em>';
								break;
							case 'markdown':
							case 'md':
								localTrail = trail + '*' + node + '*';
								break;
							default:
								localTrail = trail + node;
						}

						decrementOrDelete('?', localFreq);

					} else {
						decrementOrDelete(node, localFreq);
					}

					var val = cur[ node ];

					// valid anagram?
					if (val === 0 || val.$ === 0) {

						if (groupedMatches[localTrailLength] === undefined) groupedMatches[localTrailLength] = [];
						groupedMatches[localTrailLength].push(localTrail);
						groupedMatches.count++;

					}

					// reeecurse
					if (localFreq.total > 0 && recurse) searchTrie(localFreq, val, localTrail);

				}
			}
		}

		letterFreq.total = options.rack.length;

		searchTrie( letterFreq, dict, '');

		callback(null, groupedMatches);
    } catch (e) {
        callback(e, null);
    }
	return false;
}

function init(path, callback) {
	var fs = require('fs');
	path = path || '../dict/twl06.js';
	fs.readFile(path, 'utf8', function(err, data) {
		if (err) { console.log(err); return false; }
		renderDict(data);
		callback();
	});
};

exports.init = function flexibleInit(argh, callback) {
	switch (typeof argh) {
		case 'function':
			init(null, argh);
			break;
		case 'object':
			init(argh.dictionary, callback);
			break;
		case 'string':
			init(argh, callback);
			break;
		default:
			throw 'Unknown initialization method';
			break;
	}
};

exports.createDictionary = createDictionary;

exports.findAnagramsSafely = findAnagramsSafely;

exports.findAnagrams = findAnagrams;