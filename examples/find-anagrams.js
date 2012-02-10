var anagram = require ('../lib/anagram');

// initialize the dictionary and find anagrams
anagram.init(function() {
	anagram.findAnagrams('??', function(err, anagrams) {
		console.log('%s: %d', 'dog', anagrams.count);
		console.log(anagrams);
		console.log(anagrams['2']);
	});
});