// settings
const sass = require("eleventy-plugin-sass");

module.exports = function (eleventyConfig) {

    // copy assets
    eleventyConfig.addPassthroughCopy("assets");
    // add scss support
    eleventyConfig.addPlugin(sass, {
        watch: ['styles/*.scss', '!node_modules/**']
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
    };
};