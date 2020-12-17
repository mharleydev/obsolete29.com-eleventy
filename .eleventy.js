var moment = require('moment-timezone');
const Image = require("@11ty/eleventy-img");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const localDir = "../obsolete29.com"

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter("jsonTitle", (str) => {
    let title = str.replace(/((.*)\s(.*)\s(.*))$/g, "$2&nbsp;$3&nbsp;$4");
    title = title.replace(/"(.*)"/g, '\\"$1\\"');
    return title;
  });
  

  // eleventy-img
  eleventyConfig.addAsyncShortcode("myImage", async (src, alt) => {
    if (!alt) {
      throw new Error(`Missing \`alt\` on Image from: ${src}`);
    }

    let stats = await Image(src, {
      widths: [350, 808],
      formats: ["jpeg", "webp"],
      urlPath: "/assets/img/blog/",
      outputDir: localDir + "/assets/img/blog/",
    });

    let lowestSrc = stats["jpeg"][0];
    let highResJpeg = stats["jpeg"][1];
    let lowReswebp = stats["webp"][0];
    let highReswebp = stats["webp"][1];
  

    const srcset = Object.keys(stats).reduce(
      (acc, format) => ({
        ...acc,
        [format]: stats[format].reduce(
          (_acc, curr) => `${_acc} ${curr.srcset} ,`,
          ""
        ),
      }),
      {}
    );

    const source = `<source type="image/webp" media="(max-width: 629px)" srcset="${lowReswebp.url}" >
                    <source type="image/webp" media="(min-width: 630px)" srcset="${highReswebp.url}" >
                    <source type="image/jpeg" media="(max-width: 529px)" srcset="${lowestSrc.url}" >
                    <source type="image/jpeg" media="(min-width: 630px)" srcset="${highResJpeg.url}" >`;

    const img = `<img 
                loading="lazy" 
                alt="${alt}" 
                width="${highResJpeg.width}"
                height="${highResJpeg.height}"
                src="${lowestSrc.url}">`;

    return `<picture>${source}${img}</picture>`;
  });
  // end

  eleventyConfig.addFilter("dateformat", function(dateIn) {
    return moment(dateIn).tz('GMT').format('YYYY-MM-DD');
});

  return {
    dir: {
      input: "src",
      output: localDir,
    },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};