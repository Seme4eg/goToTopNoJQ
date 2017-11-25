document.addEventListener('DOMContentLoaded', function () {

    var up = document.getElementsByClassName('up')[0];

    window.addEventListener('scroll', check);

    function check(e) {
        if (pageYOffset >= 500) {
            up.classList.add('visible');
        }
        if (pageYOffset < 500) {
            up.classList.remove('visible');
        }
    }

    // ------------------- easeOut go to top ----------------------

    let body = document.documentElement;

    up.onclick = function() {

        animate({
            duration: 700,
            timing: goUpEaseOut,
            draw: function(progress) {
                body.scrollTop = (body.scrollTop * (1 - progress / 7));
            }
        });

    }

    function circ(timeFraction) {
        if (timeFraction > 1) timeFraction = 1;
        return 1 - Math.sin(Math.acos(timeFraction));
    }

    // преобразователь в easeOut
    function makeEaseOut(timing) {
        return function(timeFraction) {
            return 1 - timing(1 - timeFraction);
        }
    }

    var goUpEaseOut = makeEaseOut(circ);


});

// Функция анимации
function animate(options) {

    var start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction от 0 до 1
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) {
            console.log('lksdjf');
            timeFraction = 1;
        }

        var progress = options.timing(timeFraction)

        options.draw(progress);

        if (timeFraction < 1) requestAnimationFrame(animate);
    });
}