var fs = require("fs"),
	util = require("./util.js"),
	//word = 'retinarr?';
	word = process.argv[2],
	d = (process.argv[3]) ? "dict/" + process.argv[3] : "dict/_twl06.js";

fs.readFile( d, "utf8", function( err, data ) {

	util.buildTrie( data );
	
	var start = (new Date).getTime();
	
	util.findTrieAnagrams(word);

	console.log( (new Date).getTime() - start );
});