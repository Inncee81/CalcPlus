# About CalcPlus Library

## About

This is a library that let's numbers be calculated up to:

  64 bit OS: 2<sup>64</sup>-1 digits <i><b>long</b></i>, or 10<sup>2<sup>64</sup></sup>-1.
  
  32 bit OS: 2<sup>32</sup>-1 digits <i><b>long</b></i>, or 10<sup>2<sup>64</sup></sup>-1.

Please note that the JavaScript version of this Library is extremely RAM efficient. Only about 100 megabytes of free RAM is required for heavy tasks. The speed of your RAM may also limit the speed of the program, but the biggest bottleneck (for speed) is most often going to be your CPU. 

Want to see this library in action? Just go [here](https://virxec.github.io/CalcPlus/PreviewLibrary)!

## Advantages of using this library
Normally, you can only calculate numbers on a 64-bit OS as long as the final result is less than 18,446,744,073,709,551,616. (4,294,967,296 for a 32-bit OS.)

In most modern languages, when you go over the limit (we're using a 64-bit OS as an example) it just starts to lose it's precision. For example, to it, 18,446,744,073,709,551,621,573 is just 18,446,744,073,709,551,620,000. That's not the case with this library. The largest number this library can understand is written out at the bottom of this readme. Just remember what the normal limit is before you look at it.

## What coding languages does this library support?
For now, it only support JavaScipt. I have plans to eventually port it to Python.

## How do I install this library?

For JavaScript, simply link somewhere in your HTML <head> tag this text:

<script src="https://virxec.github.io/CalcPlus/assets/Library.js "></script>

## What's the larget number this library can understand, written out?

I can't put it here. It's WAY to big. If you want to get an idea of just how big it is, go to the [one million digits of pi page](https://www.piday.org/million/) and try to get to the bottom. Then multiply the length of that page by trillions of trillions of times. That's why it can't be here. But it's also a really damn big number.
