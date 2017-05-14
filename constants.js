const define = (name, val) => {
    Object.defineProperty(exports, name, {
        value: val,
        enumerable: true
    });
}

// db
define("DB_USER", "root");
define("DB_PWD", "sandwhich");
define("DB_PROTOCOL", "mongodb://");
define("DB_INSTANCE", "@ds139801.mlab.com:39801/mini-pastebin-db");