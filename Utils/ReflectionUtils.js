class ReflectionUtils {


    /*source: https://es.stackoverflow.com/questions/197658/llamar-a-funcion-javascript-desde-un-string */
    static ExecuteFunction(functionName, context, args) {
        var args = Array.prototype.slice.call(arguments, 2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, args);
    }

    static ExistFunction(clase, method) {
        return clase[method] !== undefined;

    }

    static GetFunctionName(func) {
        // Match:
        // - ^          the beginning of the string
        // - function   the word 'function'
        // - \s+        at least some white space
        // - ([\w\$]+)  capture one or more valid JavaScript identifier characters
        // - \s*        optionally followed by white space (in theory there won't be any here,
        //              so if performance is an issue this can be omitted[1]
        // - \(         followed by an opening brace
        //
        var result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString())

        return result ? result[1] : ''; // for an anonymous function there won't be a match
    }

}