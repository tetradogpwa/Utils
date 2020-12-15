class Result{

 construct(result){

 this._columns=result[0].columns;
this._values=result.map(r=>r.values);
this._index=-1;


}
get Columns(){
return this._columns;
}

get Values(){

return this._values;
}
get Index(){
return this._index;
}
get Count(){

return this.Values.length;


}
FetchArray(index = -1){

var array=undefinded;
if(index<0){

index=++this._index;

}
if(index<this.Count){

array=this.Values[index];

}
return array;

}
FetchAssoc(index = -1){
var array=this.FetchArray(index);
var dic=undefinded;
if(array != undefinded){
dic={};
for(var i=0,f=this.Columns.length;i<f;i++){
dic[this.Columns[i]]=array[i];
}

}
return dic;

}
FetchDic(index = -1){
return this.FetchAssoc(index);
}
Reset(){
this._index=-1;

}

toString(){
var text = "\n";
        if (this.Count != 0) {
            for (var j = 0; j < this.Count; j++) {
                text += j + ":" + Result._filaToString(this.Columns);
                for (var i = 0; i < this.Columns.length; i++)
                    text += Result._filaToString(thia.Values[i]);
            }
        } else text = "No result from SQLite!";

        return text;
}
 

    static _filaToString(array) {
        var fila = "\n";
        for (var i = 0; i < array.length; i++) {
            fila += "\t" + array[i];
        }
        fila += "\n";

        return fila;
    }



}
