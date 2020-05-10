# CalcPlus by VirxEC

## Navigation

+ [VirxEC Showcase](https://www.virxcase.ga)
+ [Preview CalcPlus ES6](https://www.virxcase.ga/CP-P)
+ [CalcPlus Source Code](https://www.virxcase.ga/CP-S)
+ [Preview CalcPlus NodeJS on Repl.it](https://repl.it/github/VirxEC/CalcPlus)
+ [What is ES6?](#what-is-es6)
+ [About CalcPlus](#about-calcplus)
+ [The advantages of using CalcPlus](#advantages-of-using-calcplus)
+ [How does CalcPlus work?](#how-does-calcplus-work)
+ [What languages does CalcPlus support](#what-languages-does-calcplus-support)
+ [Installing/downloading CalcPlus](#installing/downloading-calcplus)
+ [Largest number CalcPlus can understand, written out](#what's-the-largest-number-calcplus-can-understand,-written-out)
+ [Contact me](#contact-me)

## What is ES6

Whenever ES6 is mentioned, Module JavaScript is what's actually being talked about. If you don't know what ModuleJS is, you can read about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

If you want to write in ES6, then just do this: `<script type="module">/*ModuleJS here*/</script>`. ES6 is currently unsupported in Internet Explorer (big surprise there) but it has been support for a while in Chrome, Edge, Firefox, Opera, and Safari.

## About CalcPlus

This is a ES6 Library that let's numbers be calculated up to:

+ 64 bit OS: 2<sup>64</sup>-1 digits ***long***, or 10<sup>(2<sup>64</sup>-1)</sup>-1.
+ 32 bit OS: 2<sup>32</sup>-1 digits ***long***, or 10<sup>(2<sup>32</sup>-1)</sup>-1.

Please note that the ES6/Node version of this Library is extremely RAM efficient. The speed of your RAM may also limit the speed of the program, but the biggest bottleneck (for speed) is most often going to be your CPU. This is a change from built-in systems in programming languages, which hog tons of RAM but are very CPU efficient.

It is planned that once the ES6 version is done, it will be ported to be a Python 3 Library.

Want to see this library in action? Just go [here](https://www.virxcase.ga/CP-P)!

## Advantages of using CalcPlus

PLEASE NOTE: CalcPlus no longer uses large integers for its limit. It instead uses a number representing the length of the biggest number that it shouldn't preform its computations on. since normal JavaScript can only understand up to 2<sup>53</sup>, so this number is 15, or 999,999,999,999,999.

Normally, you can only calculate numbers on a 64-bit OS as long as the final result is less than 18,446,744,073,709,551,616. (4,294,967,296 for a 32-bit OS.) Or, if your language supports using more RAM to calculate huge numbers without losing precision, (like Python,) then the max number is 10<sup>custom_max_integer</sup>-1.

In most modern languages, when you go over the limit (we're using a 64-bit OS as an example) it just starts to lose its precision. For example, to it, 18,446,744,073,709,551,621,573 is just 18,446,744,073,709,551,620,000. That's not the case with this library. Now, you might work in some languages like Python where your language is magically able to calculate huge numbers in an instant without losing precision. However, these languages are tricking you: the larger the number gets, the more RAM it takes. With JavaScript, this hasn't been implemented yet, so this program is still extremely viable. However, even when this comes to JavaScript, it won't matter. There's a feature in CalcPlus that lets you set a threshold. Above x number, the library will kick in, saving your RAM & instead of using your CPU. Don't worry, though - If you're using a high threshold and you do something like 10<sup>2<sup>64</sup></sup>, it won't have to start from the beginning. It will instantly calculate 2<sup>64</sup> with the language (using a bit of RAM) and from there multiply 18,446,744,073,709,551,616 by itself the remaining times. If your threshold is double 2<sup>64</sup>, or 2<sup>65</sup>, then it will multiply 18,446,744,073,709,551,616 by 18,446,744,073,709,551,616 and then the algorithm will kick in - even then, the threshold will continue to speed up the process, but it's a little more complicated and I don't feel like explaining. In short, in languages that increase the max number by using up more RAM, setting the threshold is like striking the perfect balance between how much RAM you want to use, and letting the CPU take over for the missing RAM that's needed.

## How does CalcPlus work

In short, it does basic function like addition & subtraction like a human would - breaking it down, solving it column by column:

```text
      1 1   1
    3 0 2 . 0 1 5
+   0 1 8 . 9 9 0
=================
    3 2 1 . 0 0 5
```

And from there, multiplication is just repeated addition, dividing is just repeated subtraction, exponents are just repeated multiplication and that kind of thing. Of course, this is very inefficient, so there are a number of optimizations to vastly speed up the process. Weak computers can instantaneously calculate 2<sup>256</sup>, which is 115792089237316195423570985008687907853269984665640564039457584007913129639936.

## What languages does CalcPlus support

For now, it only supports ES6/NodeJS. I have plans to eventually port it to Python 3, and then from there who knows where.

## Installing/downloading CalcPlus

### ES6 CalcPlus

+ [Download latest beta](https://github.com/VirxEC/CalcPlus/releases)
+ [Download latest alpha](https://calcplus.virxcase.ga/CalcPlus.js)
+ Import latest alpha:

```html
<script type="module">
  import * as CalcPlus from "https://calcplus.virxcase.ga/calcplus.js";
  /*Import latest alpha*/
</script>
```

### NodeJS CalcPlus

Some of you might already know everything, and some of you might not know about Node. For this purpose, I will be going through, step-by-step, everything from installing Node and NPM to configuring NPM to install from GitHub packages and importing CalcPlus into your project. If you know enough, you can just look further below for the import command.

1. Download and install Node and the Node Package Manager (NPM) from [nodejs.org](https://nodejs.org).

2. Create a project folder. For this project, I've gone to my coding folder called GitHub in Command Prompt and I ran `mkdir ImportCalcPlus`, which just creates a folder with said name. I then ran `cd ImportCalcPlus` so get into the directory. If you're not already inside your OS's command line, I would recommend doing that now and navigating to the folder. If you don't know how to do that, look it up!

3. Now, we must create our Node project. In your command line, run `npm init`. For now, just keep hitting your enter key until you come upon the prompt for a test command. Here, type `node ./index.js`. Again, keep hitting enter until you get to the end. You can fill out the rest of the details later! When asked "Is this OK?" just hit enter. A file called `package.json will be create in your directory.

4. Open you project folder in you editor of choice. This could be anything from Notepad++ to Visual Studio Code. Don't close out of you command line, yet.

5. Go to `package.json`. Here, you're going to add an extra line. Go to the end of the first line, and press your enter key and then your tab key. Here, put this line of JSON: `"type": "module",`

6. Next, go to [github.com](https://github.com) and sign in. If you don't have an account, you will need one for this!

7. Go to [github.com/settings/tokens](https://github.com/settings/tokens) and hit "Generate new token". Then, enter your password.

8. For the note, type NPM. Then, for the scopes, check off these:

    + write:packages
    + read:packages
    + delete:packages

9. Scroll down and click "Generate token". Copy the token and put it somewhere safe!

10. Create a new file, and call it `.gitignore`. In this file, type `*.npmrc`. Even if you never intend to put you code up on GitHub, do this just incase! The file `.npmrc` will contain your token, and you don't want this to get out on the internet!

11. Create another new file, and call it `.npmrc`. In this file, type the following, replacing `TOKEN` with your personal token:

    ```text
    //npm.pkg.github.com/:_authToken=TOKEN
    @virxec:registry=https://npm.pkg.github.com
    ```

12. Go back to your command line. Here, type the following command. This will install CalcPlus!

    ```text
    npm install @virxec/calcplus --save
    ```

13. Finally, create a file called `index.js`. In this file, type the following:

    ```javascript
    import * as CalcPlus from "@virxec/calcplus";
    ```

    Now, you can use all of the modules as reference in the [CalcPlus wiki](https://github.com/VirxEC/CalcPlus/wiki) but with the `CalcPlus.` prefix. This uses ES6 modules, not Node modules, so you're oing to want to look into those. You can then run `npm test` in your command line to run `index.js`.

Here's the `package.json` file:

```json
{
  "type": "module",
  "name": "importcalcplus",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "node ./index.js"
  },
  "author": "",
  "license": "",
  "dependencies": {
    "@virxec/calcplus": "^0.5.6"
  }
}
```

## What's the largest number CalcPlus can understand, written out

I can't put it here. It's WAY to big. If you want to get an idea of just how big it is, go to the [one million digits of pi page](https://www.piday.org/million/) and try to get to the bottom. Then multiply the length of that page by trillions of trillions of times. That's why it can't be here, it's just a really damn big number.

## Contact me

  I'm in the EST time zone.

  Discord: [discord.gg/Fyu8Bdd](https://discord.gg/Fyu8Bdd)
  
  Email: [virx@virxcase.ga](mailto:virx@virxcase.ga)

  Issues/Questions/Feature Requests: [github.com/VirxEC/CalcPlus/issues](https://github.com/VirxEC/CalcPlus/issues)
  