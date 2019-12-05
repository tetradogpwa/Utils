window.Import(window._ROOTUTILS + "Utils/ArrayUtils.js");
window.Import(window._ROOTUTILS + "Utils/ByteArrayUtils.js");


class CacheUtils {

    static Set(nombreCache, key, value) {
        return CacheUtils.Remove(nombreCache, key).finally(() => {
            return caches.open(nombreCache).then((cache) => {
                if (!(value instanceof Promise))
                    value = Promise.resolve(value);
                return value.then((v) => {
                    return cache.put((key instanceof Request) ? key : new Request(key), (v instanceof Response) ? v : new Response(v));
                });

            });
        });
    }
    static SetByteArray(nombreCache, key, arrayBytes) {
        return CacheUtils.SetString(nombreCache, key, (arrayBytes instanceof Response) ? arrayBytes : ByteArrayUtils.ToHex(arrayBytes), "text/plain");
    }
    static SetCss(nombreCache, key, strCss) {
        return CacheUtils.SetString(nombreCache, key, strCss, "text/css");
    }
    static SetJson(nombreCache, key, strJson) {
        return CacheUtils.SetString(nombreCache, key, strJson, "application/json");
    }

    static SetString(nombreCache, key, string, typeData = "text/plain") {
            return CacheUtils.Set(nombreCache, key, string instanceof Response ? string : new Response(string, { headers: { "Content-Type": typeData } }));
        }
        //hacer m�s tipos :D
    static Get(nombreCache, key) {

        return caches.open(nombreCache).then(cache => {
            if (!(key instanceof Promise))
                key = Promise.resolve(key);
            return key.then((k) => {
                return cache.match((k instanceof Request) ? k : new Request(k));
            });
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

    static GetAllJson(nombreCache, toInclude = '') {
        return CacheUtils.GetKeys(nombreCache, toInclude).then((keys) => keys.map((k) => k.json()));
    }
    static GetAllCss(nombreCache, toInclude = '') {
        return CacheUtils.GetAllString(nombreCache, toInclude);
    }
    static GetAllString(nombreCache, toInclude = '') {
        return CacheUtils.GetKeys(nombreCache, toInclude).then((keys) => keys.map((k) => k.text()));
    }

    static GetAllByteArray(nombreCache, toInclude = '') {
        return CacheUtils.GetAllString(nombreCache, toInclude).then((strs) => strs.map((str) => ByteArrayUtils.ToByteArray(str)));

    }

    static Remove(nombreCache, key) {
        return CacheUtils.Delete(nombreCache, key);
    }
    static Delete(nombreCache, key) {
        if (!(key instanceof Promise))
            key = Promise.resolve(key);
        return key.then((k) => {
            return caches.open(nombreCache).then((cache) => cache.delete((k instanceof Request) ? k : new Request(k)));
        });

    }
    static Clear(nombreCache, toInclude = '') {
        return Promise.all(CacheUtils.GetKeys(nombreCache, toInclude)
            .then((keys) => keys.map((k) => CacheUtils.Remove(nombreCache, k))));
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