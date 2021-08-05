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
    // add esbuild
    esbuild.build({
        entryPoints: {
            main: "./scripts/main.js"
        },
        outdir: "./_site/js",
        target: ['es2016', 'safari11'],
        bundle: true,
        minify: true,
        watch: true
    });
    eleventyConfig.addWatchTarget('scripts');

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
    };
};