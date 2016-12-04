# js-popup-closer

A simple javascript function for enabling a div that both dims any background content, as well as functioning as a clickable div that will close the current popup element.

As I stated in all my other repositories - The first thing that you will probably notice is that it is HEAVILY commented. This was intentional (yes, even to this extreme degree), mostly just for myself. I am still fairly new to coding, and multiple times in the past when I have gone back to some of my previous work I would always have a hard time understanding what my code meant. So along with relentlessly detailing everything that I was doing in the code, I also tried to capture the mindset that I had while I was coding it (or rather, why I coded it the way that I did).

This also has the added benefit of helping to remember this information without the need for comments - sort of like when you write something down to remember it, and the act of writing it down is what helped you remember it. With the only downside being the time taken to write the comments (since minifying removes all of the extraneous content), I saw no reason not to.

The code for this is farily straightforward, but obviously the div needs to be created in CSS beforehand.  I originally created the div inside of this function, as well setting it's CSS properties, but in the interest of separation-of-concerns I separated them out.  The ID of the div needs to be "dimmerDiv", or the name needs to be changed inside of the function.

Whatever function creates the current popup only needs to call this function, which will both fade (setting display: block and opacity: 0.1-1.0) the dimmerDiv into view, as well as set an event listener on the div for closing the current popup box.  The calling function should pass itself in as a paramter, so that this event listener knows what function to call when clicked on (or pass it whatever function will close the current popup, if not the calling function).

The fade.js file is also included, but can also be found by itself here - https://github.com/S1lentEchoes/js-fade-in-out .

I think that about covers it, any more code explanations that may be needed can easily be found inside the file's comments. I have included both the normal version, and the minified version.
