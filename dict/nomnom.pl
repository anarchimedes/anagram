#!/usr/bin/perl

use strict;
use warnings;

# ---------------------------------------------------------------------------
# Helper for dictionary parsing
# 	Takes new lines and places 1 space between each word
#   Will then be ready for consumption by anagram.createDictionary
# ---------------------------------------------------------------------------

my $file = $ARGV[0];
my $output;

open( DICT, "<", $file ) || die "Can't open $file: $!";

while (<DICT>) {
	chomp;
	my $line = lc($_);
	$line =~ s/(\n|\r|\x0d)//g;
	$output .= "$line ";
}
close (DICT);

print substr($output, 0, -1);