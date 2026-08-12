
// so here we're demonstrating function locality using nested functions
let a = function(x) {
    function b(y) {
        function d(z) {
            console.log("hello world")
            var g = 5;

            if(g) {
                let l = true;
            }

            // this should cause an error message because l is only visible to the local block its in , l = l++;
        }
    }
   // so since g is not a global variable its only visible throughout the function its in so this, g = g++; , statement should cause error.
}


// the following code demonstrates closure in a way
function multiply(factor) {
    return factor2 => factor * factor2;
}

// here we define the function double by passing 2 for multiply
let double = multiply(2)
console.log(double(3))

// arrow functions are those taking in arguments of type function adn although not specially different from funtion decalaration
// they are especially helpfull in certain cituationn
// heree's an example



