const lib = require('./lib.js')
// This function already exists. Feel free to use.
const isEqual = (a = [], b = []) => a.length === b.length && a.every((v, i) => v === b[i]);

const testMap = (input, callback, expected) => {
    const actual = lib.map(input, callback);
    console.log(`
    Inputs: ${input}
    Actual: ${actual}
    Expected: ${expected}
    Assess: ${isEqual(actual, expected)}
  `);
};

console.log('[map]: Testing started');
testMap([1, 2, 3, 4], v => v * 2, [2, 4, 6, 8]);
testMap([1, 2, 3, 4], v => v + 2, [3, 4, 5, 6]);
testMap([1, 2, 3, 4], v => v, [1, 2, 3, 4]);
console.log('[map]: Testing done');

const testReduce = (input, callback, initialValue, expected) => {
    const actual = lib.reduce(input, callback, initialValue);
    console.log(`
    Inputs: ${input}
    Actual: ${actual}
    Expected: ${expected}
    Assess: ${actual === expected}
  `);
};

console.log('[reduce]: Testing started');
testReduce([1, 2, 3, 4], (v, accumulator) => v + accumulator, 0, 10);
testReduce([1, 2, 3, 4], (v, accumulator) => v * accumulator, 1, 24);
testReduce([1, 2, 3, 4], (v, accumulator) => accumulator, 1, 4);
console.log('[reduce]: Testing done');

const testFilter = (input, callback, expected) => {
    const actual = lib.filter(input, callback);
    console.log(`
    Inputs: ${input}
    Actual: ${actual}
    Expected: ${expected}
    Assess: ${isEqual(actual, expected)}
  `);
};

console.log('[filter]: Testing started');
testFilter([1, 2, 3, 4], v => typeof v === 'string', []);
testFilter([1, 2, 3, 4], v => v > 2, [3, 4]);
testFilter([1, 2, 3, 4], v => v, [1, 2, 3, 4]);
console.log('[filter]: Testing done');

const testTake = (input, count, expected) => {
    const actual = lib.take(input, count);
    console.log(`
    Inputs: ${input}
    Actual: ${actual}
    Expected: ${expected}
    Assess: ${isEqual(actual, expected)}
  `);
};

console.log('[take]: Testing started');
testTake([1, 2, 3], 5, [1, 2, 3]);
testTake([1, 2, 3], 'abc', []);
testTake([1, 2, 3], 1, [1]);
console.log('[take]: Testing done');

const testSkip = (input, count, expected) => {
    const actual = lib.skip(input, count);
    console.log(`
    Inputs: ${input}
    Actual: ${actual}
    Expected: ${expected}
    Assess: ${isEqual(actual, expected)}
  `);
};

console.log('[skip]: Testing started');
testSkip([1, 2, 3, 4, 5], 2, [3, 4, 5]);
testSkip([1, 2, 3], 'abc', [1, 2, 3]);
testSkip([1, 2, 3], 5, []);
console.log('[skip]: Testing done');

const testSome = (input, callback, expected) => {
    const actual = lib.some(input, callback);
    console.log(`
    Inputs: ${input}
    Actual: ${actual}
    Expected: ${expected}
    Assess: ${actual === expected}
  `);
};

console.log('[some]: Testing started');
testSome([1, 2, 3, 4, 5, 6, 7], v => v === 1, true);
testSome([1, 2, 3], v => v === 0, false);
testSome(['abc', 'ba', 1], v => typeof v === 'string', true);
console.log('[some]: Testing done');

const testEvery = (input, callback, expected) => {
    const actual = lib.every(input, callback);
    console.log(`
    Inputs: ${input}
    Actual: ${actual}
    Expected: ${expected}
    Assess: ${actual === expected}
  `);
};

console.log('[every]: Testing started');
testEvery([1, 2, 3, 4, 5, 6, 7], v => v === 1, false);
testEvery([1, 2, 3], v => v > 0, true);
testEvery(['abc', 'ba', 1], v => typeof v === 'string', false);
console.log('[every]: Testing done');

const testMin = (input, expected) => {
    const actual = lib.min(input);
    console.log(`
    Inputs: ${input}
    Actual: ${actual}
    Expected: ${expected}
    Assess: ${actual === expected}
  `);
};

console.log('[min]: Testing started');
testMin([100, 999, 18, 35, 3], 3);
testMin([1, 1, -1, 1], -1);
testMin([-100, 100, 50, 0], -100);
console.log('[min]: Testing done');

const testMax = (input, expected) => {
    const actual = lib.max(input);
    console.log(`
    Inputs: ${input}
    Actual: ${actual}
    Expected: ${expected}
    Assess: ${actual === expected}
  `);
};

console.log('[max]: Testing started');
testMax([1, 2, 3, 4, 5, 6, 7], 7);
testMax([1, 2, 3, 4, 4, 4, 4], 4);
testMax([-1, 100, 99, 18, 35, 3], 100);
console.log('[max]: Testing done');

const testForeach = (input, callback, expected) => {
    const clonedInput = JSON.stringify(input)
    lib.forEach(input, callback)
    console.log(`
    Inputs: ${JSON.parse(clonedInput)}
    Actual: ${input}
    Expected: ${expected}
    Assess: ${isEqual(input, expected)}
  `);
};

console.log('[forEach]: Testing started');
let array = [1, 2, 3, 4, 5, 6, 7];
testForeach(array, (v, i) => array[i] = 'a', ['a', 'a', 'a', 'a', 'a', 'a', 'a']);
array = [1, 2, 3, 4, 5, 6, 7];
testForeach(array, (v, i) => array[i] = ++v, [2, 3, 4, 5, 6, 7, 8]);
console.log('[forEach]: Testing done');

const testKeys = (input, expected) => {
    const actual = lib.keys(input);
    console.log(`
    Inputs: ${JSON.stringify(input)}
    Actual: ${actual}
    Expected: ${expected}
    Assess: ${isEqual(actual, expected)}
  `);
};

console.log('[keys]: Testing started');
testKeys({a: 'somestring', b: 42, c: false}, ['a', 'b', 'c']);
testKeys({0: "a", 1: "b", 2: "c"}, ['0', '1', '2']);
testKeys({100: "a", 2: "b", 7: "c"}, ['2', '7', '100']);
console.log('[keys]: Testing done');

const testValues = (input, expected) => {
    const actual = lib.values(input);
    console.log(`
    Inputs: ${JSON.stringify(input)}
    Actual: ${actual}
    Expected: ${expected}
    Assess: ${isEqual(actual, expected)}
  `);
};

console.log('[values]: Testing started');
testValues({a: 'somestring', b: 42, c: false}, ['somestring', 42, false]);
testValues({0: "a", 1: "b", 2: "c"}, ['a', 'b', 'c']);
testValues({100: "a", 2: "b", 7: "c"}, ['b', 'c', 'a']);
console.log('[values]: Testing done');

const testPairs = (input, expected) => {
    const actual = lib.pairs(input);
    console.log(`
    Inputs: ${JSON.stringify(input)}
    Actual: ${actual}
    Expected: ${expected}
    Assess: ${JSON.stringify(actual) === JSON.stringify(expected)}
  `);
};

console.log('[pairs]: Testing started');
testPairs({a: 'somestring', b: 42}, [['a', 'somestring'], ['b', 42]]);
testPairs({0: "a", 1: "b", 2: "c"}, [['0', 'a'], ['1', 'b'], ['2', 'c']]);
testPairs({100: "a", 2: "b", 7: "c"}, [['2', 'b'], ['7', 'c'], ['100', 'a']]);
console.log('[pairs]: Testing done');

const testFromPairs = (input, expected) => {
    const actual = lib.fromPairs(input);
    console.log(`
    Inputs: ${JSON.stringify(input)}
    Actual: ${JSON.stringify(actual)}
    Expected: ${JSON.stringify(expected)}
    Assess: ${JSON.stringify(actual) === JSON.stringify(expected)}
  `);
};

console.log('[fromPairs]: Testing started');
testFromPairs([['foo', 'bar'], ['baz', 42]], {foo: 'bar', baz: 42});
testFromPairs([['1', 'b'], ['0', 'a'], ['2', 'c']], {0: "a", 1: "b", 2: "c"});
testFromPairs([['1', 'b'], ['0', 'a'], ['2']], {0: "a", 1: "b"});
testFromPairs([], {undefined: undefined});
console.log('[fromPairs]: Testing done');

const testChain = (input, callback, expected) => {
    const actual = callback
    console.log(`
    Inputs: ${JSON.stringify(input)}
    Actual: ${JSON.stringify(actual)}
    Expected: ${JSON.stringify(expected)}
    Assess: ${JSON.stringify(actual) === JSON.stringify(expected)}
  `);
};

console.log('[chain]: Testing started');
testChain(
    [1, 2, 3, 4, 5],
    lib.chain([1, 2, 3, 4, 5]).take(2).skip(1).value(),
    [2]
);
testChain(
    [1, 2, 3, 4, 5],
    lib.chain(['ab', 10, 'sed', 4, 99])
        .filter(item => typeof item !== "string")
        .map(number => ++number)
        .every(number => number > 1)
        .value(),
    true
);
testChain(
    [1, 2, 3, 4, 5],
    lib.chain(['ab', 10, 'sed', 4, 99])
        .filter(item => typeof item !== "string")
        .reduce((number, a) => a + number)
        .value(),
    113
);
console.log('[chain]: Testing done');

