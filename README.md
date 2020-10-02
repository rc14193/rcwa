[![Build Status](https://travis-ci.com/edmundsj/RCWA.svg?branch=master)](https://travis-ci.com/edmundsj/RCWA) [![Coverage Status](https://coveralls.io/repos/github/edmundsj/RCWA/badge.svg?branch=master)](https://coveralls.io/github/edmundsj/RCWA?branch=master) [![Documentation Status](https://readthedocs.org/projects/rcwa/badge/?version=latest)](https://rcwa.readthedocs.io/en/latest/?badge=latest)


Author: Jordan Edmunds
Affiliation: UC Irvine, UC Berkeley
Date Started: 2020/01/05
Title: Rigorous Coupled Wave Analysis Solver
License: BSD

GETTING STARTED --- 
1. Create a netlist that describes your system. This contains all the thicknesses, permittivities,
permeabilities, crystal structure, excitation wavelength/range, and so on.

SOFTWARE STATUS
Whenever possible I have attempted to stay with the convention introduced in Dr. Rumpf's online class on computational electromagnetics.

KNOWN ISSUES
When computing rTE / rTM for ellipsometry calculations, you must ensure there is some TM component to your incident wave, otherwise you will just get NaN values for rTM. This will show up on the plot as not having a TM component.
