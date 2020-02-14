## Navigation
<a href="/PreviewLibrary/">Preview the CalcPlus Library</a><br>
<a href="/LibrarySource/">CalcPlus Library Source Code</a><br>
<a href="/CPQuerySource/">CPQuery Source Code</a><br>
<a href="/CalcPlus/">About the CalcPlus Library</a><br>
<a href="/Discord/">Join the Official Discord</a>
<a href="https://repl.it/github/VirxEC/CalcPlus">Test latest Node on Repl.it</a>

## About

This is a JavaScript Library that let's numbers be calculated up to:

  64 bit OS: 2<sup>64</sup>-1 digits <i><b>long</b></i>, or 10<sup>(2<sup>64</sup>-1)</sup>-1.
  
  32 bit OS: 2<sup>32</sup>-1 digits <i><b>long</b></i>, or 10<sup>(2<sup>32</sup>-1)</sup>-1.

Please note that the JavaScript version of this Library is extremely RAM efficient. Only about 100 megabytes of free RAM is required for the heaviest of tasks (measured by doing 10<sup>2<sup>64</sup></sup> and leaving it for 2 days with no threshold). The speed of your RAM may also limit the speed of the program, but the biggest bottleneck (for speed) is most often going to be your CPU. This is a change from built-in systems in programming languages, which hog tons of RAM but are very CPU efficient.

It is planned that once the JavaScript version is done, it will be ported to be a Python 3 Library.

Want to see this library in action? Just go [here](https://www.virxcase.ga/PreviewLibrary/)!

## Advantages of using this library
Normally, you can only calculate numbers on a 64-bit OS as long as the final result is less than 18,446,744,073,709,551,616. (4,294,967,296 for a 32-bit OS.) Or, if your language supports using more RAM to calculate huge numbers without losing precision, (like Python,) then the max number is 10<sup>custom_max_integer</sup>-1.

In most modern languages, when you go over the limit (we're using a 64-bit OS as an example) it just starts to lose it's precision. For example, to it, 18,446,744,073,709,551,621,573 is just 18,446,744,073,709,551,620,000. That's not the case with this library. Now, you might work in some languages like Python where your language is magically able to calculate huge numbers in an instant without losing precision. However, these languages are tricking you: the larger the number gets, the more RAM it takes. With JavaScript, this hasn't been implemented yet, so this program is still extremely viable. However, even when this comes to JavaScript, it won't matter. There's a feature in CalcPlus that lets you set a threshold. Above x number, the library will kick in, saving your RAM & instead using your CPU. Don't worry, though - If you're using a high threshold and you do something like 10<sup>2<sup>64</sup></sup>, it won't have to start from the beginning. It will instantly caclulate 2<sup>64</sup> with the language (using a bit of RAM) and from there multiply 18,446,744,073,709,551,616 by itself ten times (because it's faster than multiplying ten by itself 18,446,744,073,709,551,616 times, and 2<sup>4</sup> = 4<sup>2</sup>.) If your threshold is double 2<sup>64</sup>, or 2<sup>65</sup>, then it will multiply 18,446,744,073,709,551,616 by 18,446,744,073,709,551,616 and then the algorithm will kick in - even then, the threshold will continue to speed up the process, but it's a little more complicated and I don't feel like explaining. In short, in languages that increase the max number by using up more RAM, setting the threshold is like striking the perfect balance between how much RAM you want to use, and and letting the CPU take over for the missing RAM that's need.

## How does CalcPlus work?
In short, it does basic function like addition & subtraction like a human would - breaking it down, solving it column by column:
<pre>
  302
+ 138
-----
  420
</pre>

And from there, multiplication is just repeated addition, division is just repeated subtraction, exponents is just repeated multiplication, and that kind of thing. Of course, thing is very inefficient, so there are a number of opimizations to greatly speed up the process.

## What coding languages does CalcPlus support?
For now, it only supports JavaScript. I have plans to eventually port it to Python 3, and then from there who knows where.

## Where do I get the CalcPlus library?

JavaScript Library:<br>
&nbsp;&nbsp;<a href="https://github.com/VirxEC/CalcPlus/releases">Download latest beta</a><br>
&nbsp;&nbsp;<a href="https://www.virxcase.ga/assets/Library.js" download="CalcPlus_Library_ALPHA.js">Download latest alpha</a><br>
&nbsp;&nbsp;`<script src="https://www.virxcase.ga/assets/Library.js">/*Import latest alpha*/</script>`

NodeJS Library:<br>
&nbsp;&nbsp;`npm install @virxec/calcplus@0.4.0`

## What's the larget number CalcPlus can understand, written out?

I can't put it here. It's WAY to big. If you want to get an idea of just how big it is, go to the [one million digits of pi page](https://www.piday.org/million/) and try to get to the bottom. Then multiply the length of that page by trillions of trillions of times. That's why it can't be here, it's just a really damn big number.

## Contact me!
  Visit meh [discord](https://www.virxcase.ga/Discord/)
  
  Email: <a href="mailto:virx@virxcase.ga">virx@virxcase.ga</a>
  
  Or just leave a question in the issues tab, each will get about the same response time.
  
  I'm in the EST timezone.
