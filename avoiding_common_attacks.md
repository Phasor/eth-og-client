# Avoiding Common Attacks

I have utilised the following techniques, among other, to avoid common security attacks on this contract:

## Re-Entrancy Guarding (SWC 107)

I am using Checks-Effects-Interactions pattern (see the mint() function) to reduce re-entrancy attack risk.

## Integer Under/Over Flow (SWC 101)

I am avoiding integer over and underflow by checking the bounds of the integer entered by the user in the mint() function e.g. require(_mintAmount > 0).
