
function DownloadFile(name, data, typeData) {
    var blob = new Blob([data], { type: typeData });
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = name;
    link.click();
}
//https://stackoverflow.com/questions/332422/get-the-name-of-an-objects-type
Object.prototype.getClassName = function() {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec((this).constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};

//https://stackoverflow.com/questions/3199588/fastest-way-to-convert-javascript-nodelist-to-array
NodeList.prototype.forEach = Array.prototype.forEach;
//https://stackoverflow.com/questions/3387427/remove-element-by-id
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}