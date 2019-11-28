/*hago los test*/
window._USER = "tetradogpwa";
window._ROOTUTILS = "https://" + window._USER + ".github.io/Utils/";
window._ROOTUNITTESTJS = "https://" + window._USER + ".github.io/UnitTestJS/";
window.Import = (url) => {

    var scriptNode = document.createElement("script");
    scriptNode.setAttribute("language", "JavaScript");
    scriptNode.setAttribute("type", "text/JavaScript");
    scriptNode.setAttribute("src", url);
    if (!window._MapImportScript)
        window._MapImportScript = new Map();
    //source:http://www.forosdelweb.com/f13/importar-archivo-js-dentro-javascript-387358/
    if (!window._MapImportScript.has(url)) {
        document.write(scriptNode.outerHTML);
        window._MapImportScript.set(url, url);
    }


};

window.Import(window._ROOTUNITTESTJS + "Assert.js");
window.Import(window._ROOTUTILS + "Utils/ArrayUtils.js");

window.onload = () => {
    var lstTest = document.getElementById("lstTest");

    Assert.Methods = [

        [ArrayUtils, "Root", TestArrayUtilsRootMethod],
        [ArrayUtils, "IndexOf", TestArrayUtilsIndexOfMethod]




    ];

    Assert.OnSuccess = (clase, func, testMethod, posTest) => {
        var method = new clase().constructor.name + "." + func;
        lstTest.appendChild(GetAssertChildList(method, "success", testMethod));
    };
    Assert.OnError = (clase, func, testMethod, error, posTest) => {
        var method = new clase().constructor.name + "." + func;
        lstTest.appendChild(GetAssertChildList(method, "error", testMethod, error));
    };
    Assert.OnObsolete = (clase, func) => {
        var method = new clase().constructor.name + "." + func;

        if (!window._dicObosolete)
            window._dicObosolete = new Map();
        if (!window._dicObosolete.has(method)) {
            window._dicObosolete.set(method, method);
            lstTest.appendChild(GetAssertChildList(method, "obsolete"));
        }

    };

    Assert.Init();

};

function GetAssertChildList(nameMethod, classType, testMethod = "", error = "") {

    var scriptNode = document.createElement("li");
    scriptNode.setAttribute("class", classType);
    scriptNode.innerText = nameMethod + " " + ReflectionUtils.GetFunctionName(testMethod) + " " + error;
    return scriptNode;
}

function TestArrayUtilsRootMethod() {
    var arrayAnidada = [
        [
            [1]
        ]
    ];
    var rootArrayAnidada = ArrayUtils.Root(arrayAnidada);

    if (arrayAnidada[0][0][0] !== rootArrayAnidada[0])
        throw "No son iguales!";
}

function TestArrayUtilsIndexOfMethod() {
    const VALUETOFIND = 5;
    const INDEX = 4;

    var array = [1, 2, 3, 4, 5, 6];

    if (ArrayUtils.IndexOf(array, VALUETOFIND) !== INDEX)
        throw "No se ha encontrado!";
}