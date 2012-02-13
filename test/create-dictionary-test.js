var anagram = require('../lib/anagram');
	vows = require('vows'),
	assert = require('assert');

// initialization is expensive
// choosing speed over tests split across many files except where necessary
vows.describe('Create a custom dictionary').addBatch({
    
    'create dictionary': {    // context
        topic: function() {
            return anagram.createDictionary('./dict/2letters.txt', true);
        },
        
        'length of pre-built dictionary matches generated one': function(err) {
            assert.equal(err.length, 501);
        }
    }
    
}).export(module);