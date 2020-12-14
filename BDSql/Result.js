class Result{

 construct(result){

 this._columns=result.columns;
this._values=result.values;
this._index=-1;


}
get function Columns(){
return this._columns;
}

get function Values(){

return this._values;
}
get function Index(){
return this._index;
}
get function Count(){

return this.Values.length;


}
function FetchArray(index = -1){

var array=undefinded;
if(index<0){

index=++this._index;

}
if(index<this.Count){

array=this.Values[index];

}
return array;

}
function FetchAssoc(index = -1){
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
function FetchDic(index = -1){
return this.FetchAssoc(index);
}
function Reset(){
this._index=-1;

}


}
