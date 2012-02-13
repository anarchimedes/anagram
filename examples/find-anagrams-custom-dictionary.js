var anagram = require ('../lib/anagram');

// initialize a custom dictionary and find anagrams
anagram.init('../dict/2letters.js', function() {
	anagram.findAnagrams('dogs', function(err, anagrams) {
		console.log('`%s`: found %d anagrams', 'dogs', anagrams.count);
		console.log(anagrams);
	});
});