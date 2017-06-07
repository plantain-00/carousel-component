module.exports = {
    inputFiles: [
        "demo/*.bundle.js",
        "demo/**/index.ejs.html",
        "demo/*.bundle.css",
    ],
    excludeFiles: [
        "demo/*-*.*",
        "demo/*.config.js",
    ],
    outputFiles: file => file.replace(".ejs", ""),
    json: false,
    ejsOptions: {
        rmWhitespace: true
    },
    sha: 256,
    customNewFileName: (filePath, fileString, md5String, baseName, extensionName) => baseName + "-" + md5String + extensionName,
    noOutputFiles: [],
    es6: false,
    less: false,
    scss: false,
};
