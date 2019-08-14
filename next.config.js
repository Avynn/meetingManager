const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    weback(config, options){
        return config;
    }
})