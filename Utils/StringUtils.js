Import(ROOT + "Utils/ArrayUtils.js");

function Import(file) {
    try {
        //source:http://www.forosdelweb.com/f13/importar-archivo-js-dentro-javascript-387358/
        document.write('<script language=\"JavaScript\" type=\"text/JavaScript\" src=' + file + '></script>');
    } catch {} //ya se ha importado
}

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