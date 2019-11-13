//https://stackoverflow.com/questions/14603205/how-to-convert-hex-string-into-a-bytes-array-and-a-bytes-array-in-the-hex-strin from crypto-js
class ByteArrayUtils {

    static ToByteArray(hexString) {
        for (var bytes = [], pos = 0; pos < hexString.length; pos += 2)
            bytes.push(parseInt(hexString.substr(pos, 2), 16));
        return bytes;
    }
    static ToHex(byteArray) {
        var current;
        var hex = [];

        for (var i = 0; i < byteArray.length; i++) {
            current = byteArray[i] < 0 ? byteArray[i] + 256 : byteArray[i];
            hex.push((current >>> 4).toString(16));
            hex.push((current & 0xF).toString(16));
        }
        return hex.join("");
    }
}
