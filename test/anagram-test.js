var anagram = require('../lib/anagram');
	vows = require('vows'),
	assert = require('assert');

// build test
anagram.createDictionary('../dict/twl06.txt');

// lookup tests
anagram.init(function() {
	anagram.findAnagrams('dog', function(err, anagrams) {
		console.log('%s: %d', 'dog', anagrams.count);
	});

	anagram.findAnagrams('??', function(err, anagrams) {
		console.log('%s: %d', '??', anagrams.count);
	});
});