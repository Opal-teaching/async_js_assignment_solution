let async_api = require('./async_api'); // Async API
const process = require('process');	// Used to pass command-line arguments to this file
let q = require('q'); // Promise library for Node.js

// List of exercises that can be run
let exercises = [
	exercise1,
	exercise2,
	exercise3,
	exercise4,
	exercise5,
	exercise6,
	exercise7,
	exercise8,
];

// Strings
let runningExercise = "Running exercise "; // String printed when running an exercise.
let notImplemented = "Exercise not implemented."; // String printed for unimplemented exercises.

////////

// Validate the number of command-line arguments passed when running this file
if (process.argv.length < 3)
{
	console.log("Please provide one argument, the number of the exercise to run (there are "+exercises.length
		+" exercises).");
	process.exit(0);
}

// Extract the number of the exercise to run from the arguments
let n = parseInt(process.argv[2]);	// The 0th and 1st arguments are paths to node.exe and to this file

// Validate the exercise number
if (!Number.isInteger(n))
{
	console.error("The provided argument isn't an integer.");
	process.exit(1);
}

let i = n-1; // The index of the exercise to run in the exercises array

if (i < 0 || i > exercises.length - 1)
{
	console.error("Exercise "+n+" doesn't exist.");
	process.exit(1);
}

console.log(runningExercise + n);

// Run the right exercise
exercises[i]();

////////

/* Exercise 1:
 *     Execute all the functions offered by the 'async_api' module.
 *     The order is irrelevant, and we don't care about control over them at the moment.
 */
function exercise1()
{
	async_api.async1();
	async_api.async2();
	async_api.async3();
	async_api.async4();
	async_api.async5();
}

/*
 * Exercise 2:
 *     'Promisify' the API functions offered by async_api to create your own API with promises instead.
 *     i.e. open 'async_api.js' and add 5 functions to the module.exports interface: 'async1promisified' to
 *     'async5promisified'. Each of these X promises should behave similarly to its non-promisified version
 *     (printing asyncX), and should resolve to asyncX, i.e. deferred.resolve('async1'), for instance.
 *     Each promisified function should stand alone (e.g. async1promisified shouldn't call async1).
 */
function exercise2()
{
	console.log("No execution required.");
}

/*
 * Exercise 3:
 *     Call all of your promisified API functions from Exercise 2, in a way that enforces their order.
 *     Concatenate the result from each to 'result_str', which is defined below.
 *     At the end, print "done", then print the resulting string in the last promise callback.
 *     Expected Output: "async1, async2, async3, async4, async5".
 *     Note: To catch the error with only one catch clause at the end, return the next promise as you
 *     progress through the promises.
 */
function exercise3()
{
	let result_str = "";

	async_api.async1promisified()
	.then(function (value) {
		result_str += value + ", ";
		return async_api.async2promisified();

	}).then(function (value) {
		result_str += value + ", ";
		return async_api.async3promisified();

	}).then(function (value) {
		result_str += value + ", ";
		return async_api.async4promisified();

	}).then(function (value) {
		result_str += value + ", ";
		return async_api.async5promisified();

	}).then(function (value) {
		result_str += value;

		console.log("done");
		console.log(result_str);

	}).catch(function (error) {
		console.error(error);
	});
}

/*
 * Exercise 4:
 *     Execute all the asyncXpromisified functions at the same time using 'q.all'.
 *     When the results are back, print "done", then print the results of all the promises.
 *     Expected Output: "async1, async2, async3, async4, async5".
 */
function exercise4()
{
	let promiseArray = [];
	let result_str = "";

	promiseArray.push(async_api.async1promisified());
	promiseArray.push(async_api.async2promisified());
	promiseArray.push(async_api.async3promisified());
	promiseArray.push(async_api.async4promisified());
	promiseArray.push(async_api.async5promisified());

	q.all(promiseArray)
	.then(function (values) {
		values.forEach(function (value, index) {
			if (index === 0) result_str += value;
			else result_str += (", " + value);
		});

		console.log("done");
		console.log(result_str);

	}).catch(function (error) {
		console.error(error);
	});
}

/*
 * Exercise 5:
 *     Execute async1promisified first, then all other asyncXpromisified functions in any order.
 *     Print "done" to the console after they're all finished.
 */
function exercise5()
{
	let promiseArray = [];
	let result_str = "";

	async_api.async1promisified()
	.then(function (value) {
		result_str += value;

		promiseArray.push(async_api.async2promisified());
		promiseArray.push(async_api.async3promisified());
		promiseArray.push(async_api.async4promisified());
		promiseArray.push(async_api.async5promisified());

		return q.all(promiseArray);

	}).then(function (values) {
		values.forEach(function (value, index) {
			result_str += (", " + value);
		});

		console.log("done");
		console.log(result_str);

	}).catch(function (error) {
		console.error(error);
	});
}

/*
 * Exercise 6:
 *     Call the promisified function below twice, using appropriate parameters to produce one success case and one
 *     error case. Use .then and .catch clauses to capture the results, and print each result to the console with the
 *     parameter that produced it, indicating whether it's a success or an error.
 */
function exercise6()
{
	let successParam = 2;
	let failureParam = -2;

	async6promisified(successParam)
	.then(function (value) {
		console.log("Success with parameter " + successParam + ": " + value);
	}).catch(function (error) {
		console.error("Error with parameter " + successParam + ": " + error.message);
	});

	async6promisified(failureParam)
	.then(function (value) {
		console.log("Success with parameter " + failureParam + ": " + value);
	}).catch(function (error) {
		console.error("Error with parameter " + failureParam + ": " + error.message);
	});
}

/**
 * @name async6promisified
 * @desc Async function, rejects error randomly, given a parameter
 */
function async6promisified(param)
{
	let deferred = q.defer();
	if(param > 10 || param < 0)
	{
		deferred.reject(new Error("Error: parameter value is not strictly between 0 and 10."));
	}
	setTimeout(function(){
		deferred.resolve("async6");
	},5*Math.random());

	return deferred.promise;
}

/*
 * Exercise 7 (challenge):
 * Implement the function qAll to act like q.all.
 * Make sure your function runs correctly when called from exercise7.
 */
/**
 * @name qAll
 * @param {Array<Unresolved Promise>} promises
 * @returns {*|PromiseLike<any>}
 */
function qAll(promises)
{
	let deferred = q.defer();

	let numPromises = promises.length;
	let numPromisesComplete = 0;
	let numErrors = 0;
	let errorMessage = "";

	// Initialize an array for the results of the promises
	let values = Array(numPromises);

	// Iterate through all the unresolved promises to set their .then function
	for (let i = 0; i < numPromises; i++){

		// Wrap in a closure to create a new scope for each iteration with a different i
		// This is necessary for a correct execution
		(function(i) {

			promises[i]
			.then(function (value) {
				// Add the value to the return array
				values.splice(i, 1, value);
				numPromisesComplete++;

				// Check if we are done
				if(numPromisesComplete === numPromises) {
					if (numErrors === 0) deferred.resolve(values);
					else deferred.reject(errorMessage);
				}
			}).catch(function (error) {
				// Log the error
				numPromisesComplete++;
				numErrors++;
				errorMessage = "Error: " + error;

				// Check if we are done
				if(numPromisesComplete === numPromises) {
					deferred.reject(errorMessage);
				}
			});

		})(i);
	}
	return deferred.promise;
}

// Function to test qAll
function exercise7()
{
	var promiseArray = [];
	var result_str = "";

	promiseArray.push(async_api.async1promisified());
	promiseArray.push(async_api.async2promisified());
	promiseArray.push(async_api.async3promisified());
	promiseArray.push(async_api.async4promisified());
	promiseArray.push(async_api.async5promisified());

	qAll(promiseArray)
	.then(function (values) {
		for (let i = 0; i < values.length; i++) {
			if (i === 0) {
				result_str += values[i];
			}
			else {
				result_str += (", " + values[i]);
			}
		}
		console.log("done");
		console.log(result_str);

	}).catch(function (error) {
		console.error(error);
	});
}

/*
 * Exercise 8:
 *     Consider the simple function below and explain in terms of the JavaScript
 *     execution stack, event loop, and message queue the order of execution.
 *     Using comments, describe the stack and queue contents at each point of the program.
 */

function exercise8()
{
	// A frame containing the function exercise8() is pushed onto the stack.
	// Stack: exercise8
	// Queue: empty
	// Console: empty

	console.log("a");
	// "a" is printed to the console
	// Stack: exercise8
	// Queue: empty
	// Console: a

	setTimeout(function() {
		console.log("b");
	},2000);
	/* This is recognized as an asynchronous call, so a message is created for the inner
      function. It will be added to the message queue a minimum of 2 seconds later.  */
	// Stack: exercise8
	// Queue: empty (will contain the print-"b" function in 2 seconds)
	// Console: a

	console.log("c");
	// "c" is printed to the console
	// Stack: exercise8
	// Queue: empty (will contain the print-"b" function in 2 seconds)
	// Console: a c
}
// exercise8 is done executing, so it is popped from the stack.
// Stack: empty
// Queue: empty (will contain the print-"b" function in 2 seconds)
// Console: a c

/* Now that the stack is empty, the event loop can process the next message in the queue if there is one.
    However, nothing happens yet because the queue is empty. */
// Stack: empty
// Queue: empty (will contain the print "b" function in 2 seconds)
// Console: a c

// After two seconds have passed, the print-"b" function message is added to the queue.
// Stack: empty
// Queue: print-"b"-function-message
// Console: a c

/* The stack is empty but the queue is not, so the event loop processes the next message in the queue.
    A frame containing the print-"b" function is pushed to the stack. */
// Stack: print-"b"-function
// Queue: empty
// Console: a c

// "b" is printed to the console
// Stack: print-"b"-function
// Queue: empty
// Console: a c b

/* The print-"b" function is done executing, so it is popped from the stack.
    The stack and queue are empty so the program terminates. */
// Stack: empty
// Queue: empty
// Console: a c b
