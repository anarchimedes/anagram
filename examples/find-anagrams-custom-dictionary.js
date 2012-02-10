var anagram = require ('../lib/anagram');

// initialize a custom dictionary and find anagrams
anagram.init('../dict/2letters.js', function() {
	anagram.findAnagrams('dog', function(err, anagrams) {
		console.log('%s: %d', 'dogs', anagrams.count);
		console.log(anagrams);
	});
});