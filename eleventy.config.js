
module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");

    return {
        templateFormats: ["html", "svg"],
// This sets the default formats
        dir: {
            input: ".",
            output: "_site"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "pug"
    };
};