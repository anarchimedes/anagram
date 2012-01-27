var dict,
	FrozenTrie = require("./Bits.js").FrozenTrie;

exports.buildTrie = function( txt ) {
	return (dict = eval( "(" + txt + ")" ));
};

exports.buildBinaryDict = function( txt ) {
	return (dict = txt.split(","));
};

exports.buildSuccinctDict = function( txt ) {
	var parts = txt.split(",");
	
	return (dict = new FrozenTrie( parts[2], parts[1], parts[0] ));
};

exports.buildStringDict = function( txt ) {
	return (dict = " " + txt + " ");
};

exports.buildHashDict = function( txt ) {
	var words = txt.split(" "),
		tmp = {};
	
	for ( var i = 0, l = words.length; i < l; i++ ) {
		tmp[ words[i] ] = true;
	}

	return (dict = tmp);
};

exports.findTrieWord = function findTrieWord( word, cur ) {
	cur = cur || dict;

	for ( var node in cur ) {
		if ( word.indexOf( node ) === 0 ) {
			var val = typeof cur[ node ] === "number" && cur[ node ] ?
				dict.$[ cur[ node ] ] :
				cur[ node ];

			if ( node.length === word.length ) {
				return val === 0 || val.$ === 0;

			} else {
				return findTrieWord( word.slice( node.length ), val );
			}
		}
	}

	return false;
};

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

exports.findTrieAnagrams = function findTrieAnagrams( word ) {
	
	var matches = [],
		uniqueLetters = findUniqueLetters(word),
		ul = uniqueLetters.length,
		i = 0,
		letterFreq = findLetterFreqs(word),
		debug = false,
		debugTrail = false,
		recurse = true,
		extend = require("node.extend");
		
	if (debug) console.log('|--------------------------|');
	if (debug) console.log('|- Anagram GOOOOOOOOOOOOO -|');
	if (debug) console.log('|--------------------------|');
	if (debug) console.log('DUMP: Word: ' + word);
	if (debug) console.log({'DUMP: Uniq': uniqueLetters});
	if (debug) console.log({'DUMP: Freq': letterFreq});
		
	// the recursion point
	function searchTrie(freq, cur, trail)
	{
		for ( var node in cur ) {
		// only iterating the items in freq is more efficient but hinders flexibility to deal with wildcards
		// for ( var node in freq) {
			
			var isWildcard = (freq[node] === undefined && freq['?'] !== undefined);
			if (debugTrail) console.log('TRAIL: ' + trail + '/' + node);
			// non-wildcard version of the parent loop
			// if (debugTrail && node !== 'total') console.log('TRAIL: ' + trail + ':' + node);
				
			if ( freq.total > 0 && ( freq[node] !== undefined || ( isWildcard && node !== '$' ) ) ) {
			// non-wildcard version of the parent loop
			// if ( freq.total > 0 && node !== 'total' && cur[node] !== undefined ) {
				
				// copy trail otherwise it will innacurately bleed into recursions for non-matches
				// deep copy freq otherwise it will innacurately bleed into recursions for non-matches
				var localTrail = trail + node,
					localFreq = extend(true, {}, freq);
					
				if (debugTrail) console.log('TRAIL: ' + trail + '>' + node + ( isWildcard ? ' (?)' : '' ) );
					
				if (debug) console.log('INFO: Entering "' + node  + '" lief ('+ localTrail +')');
		
				if (isWildcard)
					decrementOrDelete('?', localFreq);
				else
					decrementOrDelete(node, localFreq);
					
				if (debug) console.log({'DUMP: Freq': localFreq});
				
				var val = cur[ node ];
				if (debugTrail) isTrailAccurate(localTrail, val);
		
				// valid anagram?
				if (val === 0 || val.$ === 0) {
					matches.push(localTrail);
				}
		
				if (debugTrail && localFreq.total > 0 && recurse) console.log({'RECRS': {'lFreq': localFreq, 'trail': localTrail}});
				if ( localFreq.total > 0 && recurse ) searchTrie( localFreq, val, localTrail );
		
			}
		}
	}
	
	// start an iteration for each unique letter
	// non-wildcard version
	// for (; i < ul; i++)
	// 	{
	// 		var letter = uniqueLetters[i],
	// 			freq = extend(true, {}, letterFreq),
	// 			stem = (dict[ letter ]) ? dict[ letter ] : null;
	// 			
	// 		freq.total = word.length;
	// 		
	// 		if (debug) console.log('|--------------------------|');
	// 		if (debug) console.log('STRT: ' + l);
	// 		
	// 		// immediately enter a stem and search trie
	// 		if (stem != null) {
	// 			decrementOrDelete(letter, freq);
	// 			searchTrie( freq, stem, letter);
	// 		}
	// 	}
	
	letterFreq.total = word.length;
	
	if (debug) console.log('|--------------------------|');
	if (debug) console.log('STRT: ' + l);
	
	searchTrie( letterFreq, dict, '');
	
	if (debug) 
		console.log({'END': matches});
	if (debug) 
		console.log('END: ' + matches.length + ' matches.');
	
	return false;
};

exports.findBinaryWord = function( word ) {
	var l = word.length;
	
	if ( !dict[l] ) {
		return false;
	}
	
	var words = dict[l].length / l,
		low = 0, high = words - 1, mid = Math.floor( words / 2 );
		
	while ( high >= low ) {
		var found = dict[l].substr( l * mid, l );
		
		if ( word === found ) {
			return true;
		}
		
		if ( word < found ) {
			high = mid - 1;
		
		} else {
			low = mid + 1;
		}
		
		mid = Math.floor( (low + high) / 2 );
	}
	
	return false;
};

exports.findSuccinctWord = function( word ) {
	return dict.lookup( word );
};

exports.findStringWord = function( word ) {
	return dict.indexOf( " " + word + " " ) > -1;
};

exports.findHashWord = function( word ) {
	return !!dict[ word ];
};