var anagram = require ('../lib/anagram');

// the default restrictions with findAnagramsSafely are:
//  no more than 3 wildcards
anagram.init(function() {
	anagram.findAnagramsSafely('??????', function(err, anagrams) {
		console.log('%s: %d', '??????', anagrams.count);
	});
});