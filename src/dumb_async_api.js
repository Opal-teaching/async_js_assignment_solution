var q = require("q");

/**
 * @namespace dumb_async_api
 * @type {{async1: async1, async2: async2, async3: async3, async4: async4, async5: async5}}
 */
module.exports = {
	async1:async1,
	async2:async2,
	async3:async3,
	async4:async4,
	async5:async5
};

/**
 * @name async1
 * @desc Dumb async function, prints "async1" randomly
 */
function async1()
{
	setTimeout(function(){
		console.log("async1");
	},5*Math.random());
}
/**
 * @name async2
 * @desc Dumb async function, prints "async2" randomly
 */
function async2()
{
	setTimeout(function(){
		console.log("async2");
	},5*Math.random());
}
/**
 * @name async3
 * @desc Dumb async function, prints "async3" randomly
 */
function async3()
{
	setTimeout(function(){
		console.log("async3");
	},5*Math.random());
}
/**
 * @name async4
 * @desc Dumb async function, prints "async4" randomly
 */
function async4()
{
	setTimeout(function(){
		console.log("async4");
	},5*Math.random());
}
/**
 * @name async5
 * @desc Dumb async function, prints "async5" randomly
 */
function async5()
{
	setTimeout(function(){
		console.log("async5");
	},5*Math.random());
}


