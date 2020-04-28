function foo() {
    throw new Error('error');
}

function bar() {
    foo();
}

function baz() {
    bar();
}

baz();

// VM116:2 Uncaught Error: error
//    at foo (<anonymous>:2:11)
//    at bar (<anonymous>:6:5)
//    at baz (<anonymous>:10:5)
//    at <anonymous>:13:1
