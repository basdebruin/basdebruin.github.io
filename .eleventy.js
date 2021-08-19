// settings
const sass = require("eleventy-plugin-sass");
const esbuild = require("esbuild");

module.exports = function (eleventyConfig) {

    // copy assets
    eleventyConfig.addPassthroughCopy("assets");
    // add scss support
    eleventyConfig.addPlugin(sass, {
        watch: ['styles/*.scss', '!node_modules/**']
    });

    console.log('Enviroment: ', process.env.NODE_ENV);

    // add esbuild for javascript bundling
    esbuild.build({
        entryPoints: {
            main: "./scripts/main.js"
        },
        outdir: "./_site/js",
        target: ['es2016', 'safari11'],
        bundle: true,
        minify: true,
        watch: process.env.NODE_ENV == 'development'
    });

    // sort portfolio by index
    eleventyConfig.addCollection("portfolioItems", function(collect) {
        return collect.getFilteredByTag('portfolio').sort(
            (a, b) => a.data.index - b.data.index
        );

    });

    return {
        dir: {
            templateFormats: ["pug"],
            input: "src",
            output: "_site",
            
            includes: "_includes",
        }
    }
}