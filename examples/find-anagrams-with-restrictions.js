var anagram = require ('../lib/anagram');

// the default options with findAnagrams are:
//  maxWilcards: 3
anagram.init('../dict/twl06.js', function() {
    anagram.findAnagrams('??????', function(err, anagrams) {
    	console.log('`%s`: found %d anagrams', '??????', anagrams.count);
    });
	anagram.findAnagrams('??????', {maxWildcards: 2}, function(err, anagrams) {
		console.log('`%s`: found %d anagrams', '??????', anagrams.count);
	});
});