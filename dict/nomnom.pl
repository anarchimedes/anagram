#!/usr/bin/perl

use strict;
use warnings;

my $file = 'TWL06.txt';
	
open( DICT, "<", $file ) || die "Can't open $file: $!";

while (<DICT>) {
	chomp;
	my $line = lc($_);
	$line =~ s/(\n|\r|\x0d)//g;
	print "\n$line";
}
close (DICT);