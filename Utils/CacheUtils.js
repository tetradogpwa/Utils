Import(ROOT + "Utils/ArrayUtils.js");
Import(ROOT + "Utils/ByteArrayUtils.js");

function Import(file) {

    //source:http://www.forosdelweb.com/f13/importar-archivo-js-dentro-javascript-387358/
    if (!document.contains(file))
        document.write('<script language=\"JavaScript\" type=\"text/JavaScript\" src=' + file + '></script>');

}
class CacheUtils {

    static Set(nombreCache, key, value) {
        return CacheUtils.Remove(nombreCache, key).finally(() => {
            return caches.open(nombreCache).then((cache) => {

                return cache.put((key instanceof Request) ? key : new Request(key), (value instanceof Response) ? value : new Response(value));


            });
        });
    }
    static SetByteArray(nombreCache, key, arrayBytes) {
        return CacheUtils.SetString(nombreCache, key, (arrayBytes instanceof Response) ? arrayBytes : ByteArrayUtils.ToHex(arrayBytes), "text/plain");
    }
    static SetCss(nombreCache, key, strCss) {
        return CacheUtils.SetString(nombreCache, key, strCss, "text/css");
    }
    static SetJson(nombreCache, key, strCss) {
        return CacheUtils.SetString(nombreCache, key, strCss, "application/json");
    }

    static SetString(nombreCache, key, string, typeData = "text/plain") {
            return CacheUtils.Set(nombreCache, key, string instanceof Response ? string : new Response(string, { headers: { "Content-Type": typeData } }));
        }
        //hacer m�s tipos :D
    static Get(nombreCache, key) {

        return caches.open(nombreCache).then(cache => {

            return cache.match((key instanceof Request) ? key : new Request(key));
        });


    }
    static GetJson(nombreCache, key) {
        return CacheUtils.Get(nombreCache, key).then((j) => j.json());
    }
    static GetCss(nombreCache, key) {
        return CacheUtils.GetString(nombreCache, key);
    }
    static GetString(nombreCache, key) {
        return CacheUtils.Get(nombreCache, key).then((result) => result.text());
    }

    static GetByteArray(nombreCache, key) {
        return CacheUtils.GetString(nombreCache, key).then((str) => ByteArrayUtils.ToByteArray(str));

    }

    static Remove(nombreCache, key) {
        return CacheUtils.Delete(nombreCache, key);
    }
    static Delete(nombreCache, key) {
        return caches.open(nombreCache).then((cache) => cache.delete((key instanceof Request) ? key : new Request(key)));
    }

    static GetKeysRequest(nombreCache, toInclude = "") {
        return caches.open(nombreCache).then((cache) => cache.keys()).then((keys) => {
            for (var i = keys.length - 1; i >= 0; i--) {
                if (!String(keys[i].url).includes(toInclude)) {
                    ArrayUtils.RemoveAt(keys, i);
                }
            }
            return keys;
        });
    }
    static GetKeys(nombreCache, toInclude = "") {
        return CacheUtils.GetKeysRequest(nombreCache, toInclude).then((keys) => {
            var keysEnLimpio = [];
            var camposKey;
            for (var i = 0; i < keys.length; i++) {
                camposKey = String(keys[i].url).split('/');
                ArrayUtils.Add(keysEnLimpio, camposKey[camposKey.length - 1]);
            }
            return keysEnLimpio;
        });
    }




}