class ArrayUtils {

    //sirve para obtener la array original de un ...args pasado por argumento a un metodo
    static Root(args) {
        while (args instanceof Array && args.length == 1 && args[0] instanceof Array)
            args = args[0];
        return args;
    }

    static IndexOf(array, value) {
        return array.indexOf(value);
    }

    static Remove(array, value) {
        ArrayUtils.RemoveAt(array, ArrayUtils.IndexOf(array, value));
    }
    static RemoveAt(array, index) {
        array.splice(index, 1);
    }

    static InsertAt(array, index, value) {
        array.splice(index, 0, value);
    }
    static Add(array, value) {
        ArrayUtils.InsertAt(array, array.length - 1, value);
    }
    static Push(array, value) {
        ArrayUtils.InsertAt(array, 0, value);
    }
    static Peek(array) {
        var value = null;
        if (array.length > 0) {
            value = array[0];
        }
        return value;
    }
    static Pop(array) {
        var value = ArrayUtils.Peek(array);

        if (array.length > 0) {
            ArrayUtils.RemoveAt(array, 0);
        }
        return value;
    }
    static Filter(array, methodFilterSync) {
        var filter = [];
        for (var i = 0; i < array.length; i++)
            if (methodFilterSync(array[i]))
                ArrayUtils.Add(filter, array[i]);
        return filter;
    }

}