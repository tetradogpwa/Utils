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

        var exist = clase[method] !== undefined; /*temporal*/


        /*Miro si existe*/

        return exist;

    }



}