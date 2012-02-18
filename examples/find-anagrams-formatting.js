var anagram = require ('../lib/anagram');

// output anagrams with wildcard highlighting
anagram.init('../dict/twl06.js', function(err) {
    if (err) throw err;
    anagram.findAnagrams('aa?', { 'format': 'md' }, function(err, anagrams) {
    	console.log('Found %d anagrams for `%s`.', anagrams.count, anagrams.input);
    	console.log('3 letters:');
    	console.log('  ' + anagrams['3']);
    	console.log('2 letters:');
    	console.log('  ' + anagrams['2']);
    });
});