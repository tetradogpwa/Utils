Import(ROOT + "Utils/ArrayUtils.js");

function Import(file) {
    var scriptNode = document.createElement("script");
    scriptNode.setAttribute("language", "JavaScript");
    scriptNode.setAttribute("type", "text/JavaScript");
    scriptNode.setAttribute("src", file);

    //source:http://www.forosdelweb.com/f13/importar-archivo-js-dentro-javascript-387358/
    if (!document.head.outerHTML.includes(scriptNode.outerHTML))
        document.write(scriptNode.outerHTML);

}

class IndexedDBUtils {


    static get IsCompatible() {
        var compatible;
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        if (indexedDB) {
            compatible = true;
            window.indexedDB = indexedDB;
        } else compatible = false;

        return compatible;
    }

    static Open(ObjToSaveObj, SaveObjToObj, GetAuxObj, OldToNewObj, nameBD = "BD") {
        return new Promise((okey, error) => {
            var aux = GetAuxObj();
            var nameCollection = aux.getClassName();
            var keyCollection = nameBD + nameCollection;
            var request;
            IndexedDBUtils._Init();
            //si existiese la cierro
            if (IndexedDBUtils._ObjInit.has(keyCollection)) {
                IndexedDBUtils._ObjInit.remove(keyCollection);
                if (IndexedDBUtils._bds.has(keyCollection)) {
                    IndexedDBUtils._bds.get(keyCollection).close();
                    IndexedDBUtils._bds.remove(keyCollection);
                }
            }

            IndexedBDUtils._GetVersion(aux, nameBD).then((version) => {

                IndexedDBUtils._ObjInit.add(keyCollection, {
                    ObjToSaveObj: ObjToSaveObj,
                    SaveObjToObj: SaveObjToObj,
                    GetAuxObj: GetAuxObj,
                    OldToNewObj,
                    OldToNewObj,
                    NameBD: nameBD,
                    Collection: nameCollection,
                    Version: version

                });
                request = window.indexedBD.open(name, version);
                request.onupdateneeded = (bd) => {
                    if (!bd._key)
                        bd._key = keyCollection;
                    try {
                        IndexedDBUtils._bds.add(keyCollection, bd);
                        //realizo la actualizacion tengo en cuenta el nombre de la propiedad porque alli vienen las opciones
                        okey([nameBD, nameCollection]);
                    } catch (ex) {
                        error(ex);
                    }
                };
            });


            if (IndexedDBUtils._bdsInit.has(keyCollection))
                IndexedDBUtils._bdsInit.remove(keyCollection);
            //mirar la forma de hacerlo :)    
            //  IndexedDBUtils._bdsInit.add(keyCollection, openPromise);


        });


    }
    static _Init() {
        if (!IndexedDBUtils._ObjInit) {
            IndexedDBUtils._ObjInit = new Map();

            IndexedDBUtils._bdsInit = new Map();

            IndexedDBUtils._bds = new Map();
            //Open TableName NameBD
        }
    }
    static _GetVersion(objAux, nameBD = "BD") {
        return new Promise((okey, error) => {
            var nameCollection = objAux.getClassName();
            var keyCollection = nameBD + nameCollection;
        });
    }
    static Get(idOrKeyPath, GetAuxObj, nameBD = "BD") {
        //devuelvo el objeto ya convertido :)
    }
    static GetAll(GetAuxObj, nameBD = "BD") {

    }
    static GetByIdOrKeyPath(idOrKeyPath, nameBD = "BD") {
        return IndexedDBUtils.Get(idOrKeyPath, "TableName", "NameBD").then((nameSaved) => IndexedDBUtils.Get(idOrKeyPath, nameSaved.Name, nameBD));
    }

    static Add(obj, nameBD = "BD") {
        return IndexedDBUtils._ComunAddRemove(obj, nameBD, IndexedDBUtils.Add, (objToSave, tableName) => {

        });



    }
    static Remove(obj, nameBD = "BD") {
        return IndexedDBUtils._ComunAddRemove(obj, nameBD, IndexedDBUtils.Remove, (objToSave, tableName) => {

        });

    }
    static _ComunAddRemove(obj, nameBD, metodoTableName, metodoAddOrRemove) {
        return new Promise((okey, error) => {
            var nameCollection = obj.getClassName();
            var keyCollection = nameBD + nameCollection;
            var open;

            if (!IndexedDBUtils._ObjInit && !IndexedDBUtils._ObjInit.has(keyCollection)) {
                if (!IndexedDBUtils._bds && !IndexedDBUtils._bds.has(keyCollection))
                    error("First at all you need to Open BD");
                else {
                    bd = IndexedDBUtils._bds.get(keyCollection);
                    open = IndexedDBUtils.Open(bd.ObjToSaveObj, bd.SaveObjToObj, bd.GetAuxObj, bd.OldToNewObj, bd.NameBD);
                }
            } else {
                bd = IndexedDBUtils._bds.get(keyCollection);
                open = IndexedDBUtils._bdsInit.get(keyCollection);
            }
            open.then(() => {

                objToSave = bd.ObjToSaveObj(obj);
                if (collectionName != "TableName")
                    promesa = metodoTableName(new TableName(
                        objToSave.Id,
                        collectionName

                    ), "NameBD");
                else {
                    promesa = new Promise((okey, error) => okey());
                }
                promesa.then(() => {
                    //a�ado o elimino
                    metodoAddOrRemove(objToSave, nameBD);
                    okey([obj, nameBD]);
                }).catch(error);
            });
            //a�ado la promsea a la lista de promesas
            if (!bd._promises)
                bd._promises = [];

            //mirar forma de a�adir objeto
            //ArrayUtils.Add(bd._promises,this);  



        });

    }
    static AddRange(arrayObj, nameBD = "BD") {
        return IndexedDBUtils._ComunRemoveOrAddRange(IndexedDBUtils.Add, arrayObj, nameBD);
    }
    static RemoveRange(arrayObj, nameBD = "BD") {
        return IndexedDBUtils._ComunRemoveOrAddRange(IndexedDBUtils.Remove, arrayObj, nameBD);
    }
    static _ComunRemoveOrAddRange(metodoAddORemove, arrayObj, nameBD) {
        var promises = [];
        for (var i = 0; i < arrayOBj.length; i++)
            ArrayUtils(promises, metodoAddORemove(arrayObj[i], nameBD));
        return Promise.all(promises);
    }

    static Clear(GetAuxObj, nameBD = "BD") {

    }
    static ClearAll(nameBD = "BD") {

    }

    static Close(GetAuxObj, nameBD = "BD") {

    }
    static CloseAll() {

    }
    static _CloseBD(bd) {
        return Promise.all(bd._promises).then(() => {

            IndexedDBUtils._ObjInit.remove(bd._key);
            IndexedDBUtils._bds.remove(bd._key);
            IndexedDBUtils._bdsInit.remove(bd._key);
            bd._promises = [];
            //cierro la BD
            bd.close();

        });
    }


}
class TableName {
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }
    get Name() {
        return this._name;
    }
    get Id() {
        return this._id;
    }
}
