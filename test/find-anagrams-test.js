var anagram = require('../lib/anagram');
	vows = require('vows'),
	assert = require('assert');

// initialization is expensive
// choosing speed over tests split across many files except where necessary
vows.describe('Find anagrams using twl06 dictionary').addBatch({
    
    'initializing fake dictionary': {
        
        'error initializing': function(err) {
            assert.throws(anagram.init('/zu.rp', function(){}), Error);
        }
        
    },
    
    'initializing dictionary': {    // context
        topic: function() {
            anagram.init('./dict/twl06.js', this.callback);
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
                        '3': [ 'dog', 'god' ],
                        count: 5,
                        input: 'dog'
                    })
                );
            }
        },
        
        'find anagrams for `retina`': {
            topic: function () {
                anagram.findAnagrams('retina', this.callback);
            },

            'we get 88 total anagrams': function (err, anagrams) {
                assert.equal(anagrams.count, 88);
            },
            'we get 15 two letter anagrams': function (err, anagrams) {
                assert.equal(anagrams['2'].length, 15);
            },
            'we get 32 three letter anagrams': function (err, anagrams) {
                assert.equal(anagrams['3'].length, 32);
            },
            'we get 24 four letter anagrams': function (err, anagrams) {
                assert.equal(anagrams['4'].length, 24);
            },
            'we get 14 five letter anagrams': function (err, anagrams) {
                assert.equal(anagrams['5'].length, 14);
            },
            'we get 3 six letter anagrams': function (err, anagrams) {
                assert.equal(anagrams['6'].length, 3);
            }
        },
        
        'find anagrams for `??`': {
            topic: function() {
                anagram.findAnagrams('??', this.callback);
            },
            
            'we get 101 total angrams': function (err, anagrams) {
                assert.equal(anagrams.count, 101);
            }
        },
        
        'find anagrams for `retina??`': {
            topic: function() {
                anagram.findAnagrams('retina??', this.callback);
            },
            
            'we get 8204 total anagrams': function (err, anagrams) {
                assert.equal(anagrams.count, 8204);
            }
        },
        
        'find anagrams _safely_ for `??????????`': {
            topic: function() {
                anagram.findAnagramsSafely('??????????', this.callback);
            },
            
            'we know max wildcards was cut to 3 because there \
             are 1116 total angrams': function (err, anagrams) {
                assert.equal(anagrams.count, 1116);
            }
        },

        'find anagrams _safely_ with custom max wildcard setting': {
            topic: function() {
                anagram.findAnagramsSafely('??????????', { maxWildcards: 2 },
                    this.callback);
            },

            'we know max wildcards was cut to 2 because there \
             are 101 total anagrams': function (err, anagrams) {
                 assert.equal(anagrams.count, 101);
             }
        },

         'find anagrams _safely_ with max wildcard setting set to 1': {
             topic: function() {
                 anagram.findAnagramsSafely('t???', { maxWildcards: 1 },
                     this.callback);
             },

             'we know max wildcards was cut to 1 because there \
              are 7 total anagrams': function (err, anagrams) {
                  assert.equal(anagrams.count, 7);
              }
         },

         'find anagrams safely without wildcards (`dog`)': {            
             topic: function() {
                 anagram.findAnagramsSafely('dog', this.callback);
             },

             'we get these anagrams': function (err, anagrams) {
                 assert.equal(JSON.stringify(anagrams),
                     JSON.stringify({
                         '2': [ 'do', 'go', 'od' ],
                         '3': [ 'dog', 'god' ],
                         count: 5,
                         input: 'dog'
                     })
                 );
             }
         }
         
         // add tests for custom formats
         
        // end sub-context
    }
    
}).export(module);