define([], function () {
    var ScrollLock = function () {

        /**
         * Whether the window is currently locked
         * @type {boolean}
         */
        var locked = false,

            /**
             * X and Y scroll position of the window
             * @type {array}
             */
            scrollPosition,

            /**
             * Current overflow property value
             */
            overflow,

            /**
             * touchmove callback,
             * disables default action of event
             * @param e
             */
            touchMoveCallback = function (e) {
                e.preventDefault();
            };

        /**
         * Lock the scroll position and disable scrolling
         */
        this.lock = function () {
            // make sure it isn't already disabled
            if (locked === true) {
                return;
            }
            locked = true;

            // save the current scroll position (x and y)
            scrollPosition = [
                self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            ];
            // save the current overflow
            overflow = document.body.style.overflow;

            // set the overflow to hidden,
            // which will snap the window to the top
            document.body.style.overflow = 'hidden';
            // scroll the window back down to the current scroll position
            window.scrollTo(scrollPosition[0], scrollPosition[1]);

            // FOR MOBILE
            // add a touchmove event listener to disable this action
            document.addEventListener('touchmove', touchMoveCallback);
        };

        /**
         * Unlock the scroll position and enable scrolling (if disabled)
         */
        this.unlock = function () {
            // make sure it is already disabled
            if (locked === false) {
                return;
            }
            locked = false;

            // set the overflow back to whatever it was,
            // which may snap the window in undesired ways
            document.body.style.overflow = overflow;
            // scroll the window back to the original scroll position
            window.scrollTo(scrollPosition[0], scrollPosition[1]);

            // FOR MOBILE
            // remove the event listener that disables the touchmove action
            document.removeEventListener('touchmove', touchMoveCallback);
        };
    };

    return new ScrollLock();
});