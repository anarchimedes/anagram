var anagram = require ('../lib/anagram');

// Create dictionary expects a single line file with 1 space between each word
// See nomnom.pl in the dict directory for some small help with dictionary parsing
anagram.createDictionary('../dict/twl06.txt');