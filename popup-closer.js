/*--------------------------------------------------------------------*\
------------------------ #POPUP-CLOSER -----------------------
\*--------------------------------------------------------------------*/

/* *
 * The dimmer div is for dimming the background content that is behind
 * the currently called overlaid content (popup box, lightbox, menu,
 * etc...), and as a clickable element that can close the overlaid
 * content (popup box, lightbox, menu, etc...).
 *
 * fadeDuration is either the total duration of the calling functions animation
 * in order to sync the fade function animation, or a value for the
 * intervalSetting (though if this is how it is used then it needs to be
 * remembered that it will be divided by 10).
 *
 * The curPopupFunction variable passed into the function is the function name
 * that was used to open whatever element is currently being displayed.
 * curPopupFunction is then passed into an event listener that is called at the
 * end of this function, so that if dimmerDiv is clicked on then it can close
 * that element.
 */

function popupCloser (fadeDuration, curPopupFunction) {

	'use strict';

	var counterAdjust, counterEnd, counterStart, counterValue, dimmerDiv, intervalSetting;

	// Initialize any variables that will be needed for calliing the fade in function (fade-in-out.js)
	counterAdjust = 0;  // This is only used for closing or fading out elements, since in that case the values will actually need to be decremented.  Since this will be fading an element in, it is not needed.  A value must be still be sent though because the function is expecting a value to be there, so it is set it to 0 when it is not needed
	counterEnd = 10;  // This tells fade-in-out.js when to stop it's loop;  This MUST be in powers of 10 in order for it work properly (since opacity needs to be a floating point number);  Adjusting this (in powers of 10) can make the animation run slower or faster
	counterStart = 0;  // This is sent to the fade-in-out.js function to tell it where to start it's counter
	counterValue = 1;  // This tells fade-in-out.js how much to increase it's counter for each loop;  This MUST be divisible from 10 evenly in order for it work properly (since opacity needs to be a floating point number);  Adjusting this (again, as long as it is divisible from 10 evenly) can make the animation run slower or faster
	dimmerDiv = grabID("dimmerDiv");  // This is the element that will be faded in, and have the event listener for closing the currently displayed popup/light box/menu/etc... attached to it
	intervalSetting = Math.round(fadeDuration / (counterEnd - counterStart / counterValue));  // Setting for telling the fade in animation (fade-in-out.js) how long each step/loop should take;  This is calculated by the formula for determining an animation's duration - ([counter's end value - counter's start value] / counter value increased each loop) * interval setting = animation duration;  This was calculated for the function that called the popupCloser function, and then passed as the fadeDuration value;  To find out what our intervalSetting should be, we just substitute x for the interval setting and solve for x.  We then round up/down to get a nice even number and then pass that value to the fade function below as it's intervalSetting;  This helps time multiple animations if it is needed.  For instance, when opening the menu this will time the fade duration to be the same as the menu animation;  The only complication that this might have is if the calling function does not have a need for this, then it will have to be remembered that 1) a value must be sent regardless, and 2) that value will be divided by 10.  So for example  if you want a 100ms interval setting, then a value of 1000 will need to be sent;  A conditional could have been written to bypass this and set the interval to a default value, but how do you set a minimum for that?  Also, this still allows the calling function to set it's own interval setting so I think this works best

	fade(dimmerDiv, counterStart, counterEnd, counterValue, counterAdjust, intervalSetting);  // Fade (in) function (fade-in-out.js) so that the dimmer div fades into view as the menu becomes fully opened; Variables are the element to be faded in, where the counter should start counting from, when the counter should stop counting, how much to increase the counter each loop, how much to adjust the counter after it has increased, and the interval setting;  Since the opacity setting needs to be a floating point number (decimals), the counterValue will be divided by the counterEnd value upon each pass in the loop.  Because of this, the counterEnd value can only be powers of 10 (10, 100, 1000, etc...);  counterAdjust is moot for fading in since it needs to start at 0 and contiues adding until counterEnd, which is why it is 0.  This still needs to be passed in though or else the function will throw an error or cause the settings to be off; The passed in variables as seen by the function are as follows: targetElement, counterStart, counterEnd, counterValue, counterAdjust, intervalSetting

	// Add event listeners to the dimmer div so that it can close the current popup/lightbox/menu/etc... (the function needed to do this is passed in from the called function and into the event listener here)
	if (window.addEventListener) {  // All event listeners for browsers except for IE <= 8

		dimmerDiv.addEventListener('click', curPopupFunction, false);

	} else if (window.attachEvent) {  // IE <=8 fallback

		dimmerDiv.addEventListener('onclick', curPopupFunction);
		
	}

}
