/*-------------------------------------------------------------------*\
--------------- #FADE-IN-OR-OUT-FUNCTIONS ------------
\*-------------------------------------------------------------------*/

/* *
 * Fade in or out functionality using the opacity setting on the targetElement.
 * I would have loved to use my css-animation.js function to do this, but (as I
 * found out the hard way) programming does not deal with floating points very
 * well.
 *
 * To get the integer needed for the opacity setting, counterStart is divided by
 * counterEnd (counterEnd must be powers of 10).  For example, 1 /10 = 0.1
 * opacity;  For fading out, a negative value is passed into counterAdjust so
 * that we get the correct value for the opacity setting.  For exmaple,
 * counterStart = 1, and counterend = -10 then we would get -9 by adding them
 * together.  This is then converted to a positive integer, 9, and divided by
 * the counterEnd, 10, to get a value of 0.9 for the opacity setting.  0 is
 * passed for fading in since we only need to count up from 0 to 10 for that
 * setting.  A value must be passed though or else the function will throw an
 * error or mess up the settings.
 *
 * counterEnd and intervalSetting can be combined to control how fast the
 * element fades in or out.  Remember though that counterEnd must in powers of
 * 10 only (10, 100, 1000, etc...) since we need a floating point for the
 * opacity setting.  counterValue can be increased to increase the animation
 * speed as well, but counterEnd must be divisible from 10 (i.e. 1, 2, 5, 10).
 * Although, counterValue and intervalSetting are still the better ways to
 * control the speed than counterValue.
 *
 * An optional callback function can be included in order to call certain things
 * (most notable a reset to the animation variable) after the function has
 * completed.  If conditionals are needed for the callback function, then wrap
 * the callback inside an anonymous function.
 */

 function fade (targetElement, counterStart, counterEnd, counterValue, counterAdjust, intervalSetting, callback) {

   'use strict';

   var adjustedValue, interval;

   // Redundancy settings, just to make sure everything is set properly (in case the function ended prematurely for some reason and the values did not reach their full/correct amount, although this should be prevented if possible by using the animating variable in the initializing function to track animations in progress)
   if (counterAdjust < 0) {

     // If counter adjust has a negative value, then it means the element needs to be faded out (since we will be counting down from 10, a negative value is needed).  So make sure the element is in display: block and its opacity is 1.0 (0.9, 0.8, etc... will throw the counter off, best to make sure it is counting from 1.0)
     targetElement.style.display = "block";
     targetElement.style.opacity = 1;

  } else if (counterAdjust >= 0) {

    // If the counter is 0 or positive then it means the element needs to faded in (0 means no adjustment needed, so we need only to count from 0 to 10).  So make sure the element is in display: block so that it can be seen, and thus faded in and that its opacity is at 0 (0.1, 0.2, etc... will throw the counter off, best to make sure it starts counting from 0)
     targetElement.style.display = "block";
     targetElement.style.opacity = 0;

   }

   // Start the interval for the animation process.  This will continue to loop until counterStart reaches or exceeds counterEnd, at which point the interval will be cleared and the callback function initiated (if provided)
   interval = setInterval(function () {

     // If counterStart has reached or exceeded counterEnd then the loop is ready to be stopped
     if (counterStart >= counterEnd) {

       // If counterAdjust has a negative value, then that means the element is fading out, so set display: none.  Even though opacity: 0 does hide it, display: none is needed on some elements so that they do not display on a page load.  This check is not needed for elements that are being fade in, since they are already in display: block
       if (counterAdjust < 0) {

         targetElement.style.display = "none";  // If counterAdjust has a negative value then the element is being faded out, so set the element to display: none in order to complete the animation by hiding the element

       }

       // Callback function initiated here.  If parameters are needed for the callback function, then wrap the needed function in an anonymous function and have the anonymous function called instead (this is how bounce as done, so refer to that for an example)
       if (callback) {
         callback();
       }

       clearInterval(interval);  // Finally, clear the interval setting after all settings have been set

      // As long as counterStart is less than counterEnd, this will be looped over
     } else if (counterStart < counterEnd) {

       counterStart += counterValue;  // Increase the counterStart variable by the counterValue variable;  counterVariable should almost always be 1 since fading requires an exact process of dividing by powers of 10.  To control the speed of fade, increasing (or decreasing) counterEnd by powers of 10 is the better way to do this.  intervalSetting will control the speed as well

       adjustedValue = Math.abs(counterStart + counterAdjust) / counterEnd;  // Add the counterAdjust variable to the new counterStart variable in order to get the correct settings for the opacity;  Fading out elements will use a negative value for counterAdjust (fading in elements should be send 0, and thus are a moot point since we only need to count up from 0 to 10).  For example, if we need to fade out from 1, then we send a -10 for counterAdjust which is added to counterStart, 1, to get a value of -9 for the adjustedValue.  This will be converted back to a positive integer and then divided by counterEnd, 10, in order to arrive with a newSetting of 0.9 for our opacity setting

       targetElement.style.opacity = adjustedValue;  // Apply the new value to the targetElement

     }

   }, intervalSetting);  // intervalSetting was passed in from the initializing function;  Adjusting this value will make the animation run faster or slower

 }
