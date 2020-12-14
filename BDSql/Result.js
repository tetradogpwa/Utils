class Result{

 construct(result){

 this._columns=result.columns;
this._values=result.values;
this._index=-1;


}
get function Count(){

return this._values.length;


}
function FetchArray(index = -1){

var array=undefinded;
if(index<0){

index=++this._index;

}
if(index<this.Count){

array=this._values[index];

}
return array;

}
function FetchAssoc(index = -1){
var array=this.FetchArray(index);
var dic=undefinded;
if(array != undefinded){
dic={};
for(var i=0,f=this._columns.length;i<f;i++){
dic[this._columns[i]]=array[i];
}

}
return dic;

}
function Reset(){
this._index=-1;

}


}
