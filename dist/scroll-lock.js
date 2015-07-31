define([], function () {
    var ScrollLock = function () {
        var disabled = false, currentScrollPosition, previousOverflow,
            touchMoveCallback = function (e) {
                e.preventDefault();
            };

        this.lock = function () {
            if (disabled === true) {
                return;
            }
            disabled = true;

            currentScrollPosition = [
                self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            ];
            previousOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            window.scrollTo(currentScrollPosition[0], currentScrollPosition[1]);

            document.addEventListener('touchmove', touchMoveCallback);
        };

        this.unlock = function () {
            if (disabled === false) {
                return;
            }
            disabled = false;

            document.body.style.overflow = previousOverflow;
            window.scrollTo(currentScrollPosition[0], currentScrollPosition[1]);

            document.removeEventListener('touchmove', touchMoveCallback);
        };
    };

    return new ScrollLock();
});