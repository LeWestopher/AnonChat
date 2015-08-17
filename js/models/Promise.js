/**
 * Created by Westopher on 8/13/2015.
 */

(function (exports) {

    function WrappedPromise (fn, args) {
        console.log(args);
        this.fn = fn;
        this.args = args;
        this.before_fn = function(args){return arguments;};
        this.after_fn = function(result){return result;};
    }

    WrappedPromise.prototype.before = function (fn) {
        this.before_fn = fn;
        return this;
    };

    WrappedPromise.prototype.after = function (fn) {
        this.after_fn = fn;
        return this;
    };

    WrappedPromise.prototype.execute = function (return_object) {
        console.log(this.args);
        this.args = this.before_fn.apply(this, this.args);
        this.result = this.fn.apply(this, this.args);
        this.mutated = this.after_fn.apply(this, [this.result].concat(this.args));
        if (return_object) {
            return this;
        }
        var returned = this.mutated ? this.mutated : this.result;
        return returned;
    };

    function cloneArguments (args) {
        var clone = [];
        var index = 0;
        var length = args.length;
        while(index < length) {
            clone[index] = args[index];
            index++;
        }
        return clone;
    }

    function testArgs () {
        var a = arguments;
        (function (a) {
            (function(a) {
                (function (a) {
                    console.log(a);
                })(a);
            })(a);
        })(a)
    }

    window.WrappedPromise = WrappedPromise;

})( window );