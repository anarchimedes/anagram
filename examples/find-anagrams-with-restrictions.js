var anagram = require ('../lib/anagram');

// the default options with findAnagramsSafely are:
//  maxWilcards: 3
anagram.init(function() {
    anagram.findAnagramsSafely('??????', function(err, anagrams) {
    	console.log('`%s`: found %d anagrams', '??????', anagrams.count);
    });
	anagram.findAnagramsSafely('??????', {maxWildcards: 2}, function(err, anagrams) {
		console.log('`%s`: found %d anagrams', '??????', anagrams.count);
	});
});