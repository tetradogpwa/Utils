//import
window.Import(window._ROOTUTILS + "Utils/CacheUtils.js");
window.Import(window._ROOTUTILS + "Utils/StringUtils.js");
window.Import(window._ROOTUTILS + "Utils/ArrayUtils.js");
window.Import(window._ROOTUTILS + "BDSql/sql-wasm.js");
window.Import(window._ROOTUTILS + "Utils/ZipUtils.js");




class BD {


    //constructores

    constructor(idBD = "") {

        this.IdBD = idBD;

        if (this.IdBD != "") {
            this.Init = this.Load(this.IdBD);
        } else {
            this.Init = initSqlJs().then(SQL => {
                this._bd = new SQL.Database();
                this.IdBD = BD.Header + new Date().getTime();
            });
        }
    }
    //static properties
    static get Header() {
        if (!BD._Header)
            BD._Header = "BDSQL";
        return BD._Header;
    }
    static set Header(header) {
        BD._Header = header;
    }


    static get CacheName() {
        return "BD.Name";
    }

    static get CacheData() {
        return "BD.Data";
    }


    //property
    get Name() {
        if (!this._name)
            this._name = "BD" + new Date().getTime();
        return this._name;
    }
    set Name(name) {
        this._name = name;

    }
    GetColumns(table) {
        return this.Execute('select * from ' + table).then((result) => result.columns);
    }
    GetDescTable(table) {
        return this.Execute('SELECT name, sql FROM sqlite_master WHERE type="table" and name="' + table + '"').then((result) => result.values[1]);
    }
    GetDescTables() {
        return this.Execute('SELECT name, sql FROM sqlite_master WHERE type="table"').then((result) => result.values);
    }
    GetTables() {
        return this.GetDescTables().then((result) => {
            var tablas = [];
            for (var i = 0; i < result.length; i++)
                tablas.push(result[0][i]);//tiene una columna
            return tablas;
        });
    }



    //metodos cargar/guardar
    Load(idBD) {
        return CacheUtils.GetByteArray(BD.CacheData, idBD)
            .then(this.Import)
            .then(() => CacheUtils.GetString(BD.CacheName, idBD))
            .then((name) => {
                this.Name = name;
            })

            .catch(() => new Error("imposible load id='" + this.IdBD + "' not found."));





    }

    Save() {
        return new Promise((okey, error) => {
            this.Export()
                .then(data => {
                    //set data
                    CacheUtils.SetByteArray(BD.CacheData, this.IdBD, data).then(() => {
                        //set name
                        CacheUtils.SetString(BD.CacheName, this.IdBD, this.Name).then(() => {

                            okey(this);
                        })

                    });
                }).catch(error);
        });
    }
    Export() {
        return Promise.resolve(this._bd.export());
    }
    ImportUrl(urlBD) {
        return fetch(urlBD).then(d => d.blob()).then(this.Import);
    }
    Import(dataBD) {
        return initSqlJs().then(SQL => {
            this._bd = new SQL.Database(dataBD);
        });
    }

    ExecuteURL(url, args, tratarRespuestaFetch = (r) => r.text()) {
        return fetch(url).then((result) => {
            if (result.ok)
                return tratarRespuestaFetch(result);
            else throw "No se puede obtener url=" + url;
        }).then((data) => this.Execute(data, args));
    }
    //SQL
    Execute(strSQL, ...args) {
        return new Promise((okey, error) => okey(this._bd.exec(StringUtils.Format(strSQL, args))).catch(error));
    }

    Run(strSQL, ...args) {
        return new Promise((okey, error) => {

            try {
                this._bd.run(StringUtils.Format(strSQL, args));
                okey();
            } catch (ex) {
                error(ex);
            }
        });

    }
    Delete(tableName) {
        return this.Run("delete table " + tableName + ";");
    }
    Drop(tableName) {
        return this.Run("drop table " + tableName + ";");
    }
    Clone() {
        return new Promise((okey, error) => {
            var clon = new BD();
            clon.Init.then(() => this.Export().then((data) => clon.Import(data))
                .then(() => {
                    clon.Name = this.Name + "_Clon";
                    okey(clon);
                })).catch(error);

        });
    }
    //cargar/guardar
    static LoadAll() {
        return new Promise((okey, error) => {
            CacheUtils.GetKeys(BD.CacheData, BD.Header).then((keysFiltradas) => {
                var bds = [];
                var initBDS = [];
                var bd;

                for (var i = 0; i < keysFiltradas.length; i++) {

                    bd = new BD(keysFiltradas[i]);
                    ArrayUtils.Add(bds, bd);
                    ArrayUtils.Add(initBDS, bd.Init);

                }
                return Promise.all(initBDS).then(() => { return bds; });

            }).then(okey).catch(error);
        });



    }

    static SaveAll(...bds) {
        var savs = [];
        bds = ArrayUtils.Root(bds);
        for (var i = 0; i < bds.length; i++) {
            savs.push(bds[i].Save());
        }
        return Promise.all(savs);


    }
    static BDsToZip(...bds) {
        var bdFiles = ArrayUtils.Root(bds).map((bd) => new FileZip(bd.Name + ".sqlite", bd.Export()));
        return ZipUtils.FileToZip(bdFiles);
    }
    static ZipToBDs(zipData) {
        return ZipUtils.ZipToFiles(zipData).then((files) => files.map((file) => BD.FromData(file.FileName, file.Data)));

    }
    static BDFromData(name, dataSQLite) {
        var bd = new BD();
        bd.Init = bd.Init.then(() => {
            bd.Name = name;
            bd.Import(dataSQLite);
        });
        return bd;
    }
    static BDFromURL(name, urlBD) {
        var bd = new BD();
        bd.Init = bd.Init.then(() => {
            bd.Name = name;
            return bd.ImportURL(urlBD);
        });
        return bd;
    }
    static DeleteFromCache(...bds) {
        bds = ArrayUtils.Root(bds);
        var promesas = [];
        for (var i = 0; i < bds.length; i++) {
            promesas.push(CacheUtils.Delete(BD.CacheData, bds[i].IdBD));
            promesas.push(CacheUtils.Delete(BD.CacheName, bds[i].IdBD));
        }
        return Promise.all(promesas);


    }


    //string result part
    static ResultToString(result) {
        var text = "\n";
        if (result.length != 0) {
            for (var j = 0; j < result.length; j++) {
                text += j + ":" + BD._filaToString(result[j].columns);
                for (var i = 0; i < result[j].values.length; i++)
                    text += BD._filaToString(result[j].values[i]);
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
