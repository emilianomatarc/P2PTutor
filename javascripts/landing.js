
/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

var v='I love you';
function hi() {
    console.log(v);
    var v='you love me';
    return bar
    var bar =10;
    function bar () {
        
    }
    var foo= function () {
        console.log('this is foo')
    }

}
console.log(typeof hi());

function swap (items, a, b){
    var temp=items[b];
    items[b]=items[a];
    items[a]=temp;
}

function partition (array, left, right) {
    var pivot=array[Math.round((left+right)/2)]
    while(left<right){
        while(array[left]<pivot){
            left++;
        }

        while(array[right]>pivot){
            right--;
        }
        if(left<=right){
            swap(array, left, right);
            left++;
            right--;
        }
    }
    return left;
}

function quicksort(array, left, right){
    if(!array&&array.length<=1){
        return;
    }
    var index=partition(array, left, right);

    if(left<index-1){
        quicksort(array,left, index-1);
    }

    if(right>index){
        quicksort(array,index, right);
    }
}


var dog=function  () {
    return 'hello';
}
// var i=0;
// while(i<10){
//     setTimeout(function(){
//         var j=0;
//         while(j<i){
//             console.log(dog());
//             j++;
//         }
//         i++;
//     }, 1000)
// }