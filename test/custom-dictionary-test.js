var anagram = require('../lib/anagram');
	vows = require('vows'),
	assert = require('assert');

// initialization is expensive
// choosing speed over tests split across many files except where necessary
vows.describe('Find anagrams using custom dictionary').addBatch({
    
    'initializing dictionary': {    // context
        topic: function() {
            anagram.init('./dict/2letters.js', this.callback);
        },
        
        'successfully initialized': function(err) {
            assert.isUndefined(err);
        },
        
        // start sub-context 
        'finding anagrams for `dog`': {
            topic: function() {
                anagram.findAnagrams('dog', this.callback);
            },
            
            'we get these anagrams': function (err, anagrams) {
                assert.equal(JSON.stringify(anagrams),
                    JSON.stringify({
                        '2': [ 'do', 'go', 'od' ],
                        count: 3
                    })
                );
            }
        }
        // end sub-context
    }
    
}).export(module);