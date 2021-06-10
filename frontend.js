function smoothScroll(target, duration){
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top-120;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime){
        if(startTime===null){
            startTime = currentTime;
        }
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed,startPosition,distance,duration);
        window.scrollTo(0,run);
        if (timeElapsed < duration){
            requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t*t + b;
            t -= 2;
            return -c/2 * (t*t*t*t - 2) + b;
        }
    }
    requestAnimationFrame(animation);
}

var education = document.querySelector('.educationbtn');
var project = document.querySelector('.projectbtn');
var contact = document.querySelector('.contactbtn');
var about = document.querySelector('.aboutbtn');

education.addEventListener('click', function (){

    smoothScroll('.education', 4000);

});

project.addEventListener('click', function (){
    smoothScroll('.projects', 4000);
});

contact.addEventListener('click', function (){
    smoothScroll('.contact', 4000);
});

about.addEventListener('click', function (){
    smoothScroll('.about', 4000);
});
