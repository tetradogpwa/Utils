window.Import(window._ROOTUTILS + "Utils/ArrayUtils.js");
window.Import(window._ROOTUTILS + "Zip/zip.js");




class ZipUtils {

    static Compress(progress = (currentIndex, totalIndex) => {}, ...fileZips) {

        fileZips = ArrayUtils.Root(fileZips);
        return new Promise((okey, error) => {
            zip.createWriter(new zip.BlobWriter("application/zip"), (writer) => {
                var promise = Promise.resolve(true);

                for (var i = 0; i < fileZips.length; i++) {
                    promise = promise.then(() => {
                        writer.add(fileZips[i].FileName, zip.BlobReader(new Blob(fileZips[i].Data, "application/octet-stream")), () => {}, progress);
                    });
                }
                promise.then(() => {
                    writer.close(okey);
                });

            }, error);
        });
    }
    static UnCompress(dataZip) {
        return new Promise((okey, error) => {
            zip.createReader(new zip.BlobReader(dataZip), (reader) => {
                reader.getEntries((entries) => {
                    var promesa = Promise.resolve(true);
                    var fileZips = [];
                    var aux;
                    for (var i = 0; i < entries.length; i++) {
                        aux = entries[i];
                        promesa = promesa.then(() => {
                            aux.getData(new zip.BlobWriter("application/octet-stream"), (data) => {
                                ArrayUtils.Add(fileZips, new FileZip(aux.name, data));
                            });
                        });
                    }
                    promesa.then(() => {
                        reader.close();
                        okey(fileZips);
                    });
                });


            });
        });
    }

}
class FileZip {
    constructor(fileName, data) {
        this.FileName = fileName;
        if (!(data instanceof Promise))
            this.Data = data;
        else data.then((d) => this.Data = d);
    }
}