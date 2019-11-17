window.Import(ROOT + "Utils/ArrayUtils.js");


class StringUtils {
    //source:https://coderwall.com/p/flonoa/simple-string-format-in-javascript
    static Format(str, ...args) {
            args = ArrayUtils.Root(args);
            for (var k = 0; k < args.length; k++) {
                str = StringUtils.Replace(str, "{" + k + "}", args[k]);
            }
            return str;
        }
        //source:https://coderwall.com/p/flonoa/simple-string-format-in-javascript
    static Replace(str, oldText, newText) {
        while (str.includes(oldText)) {
            str = str.replace(oldText, newText);
        }
        return str;
    }

}