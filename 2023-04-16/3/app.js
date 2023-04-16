const slug = require("slugify");
const lod = require("lodash");

const adiSoyadi = "Osman Yildiz";

console.log(lod.last([1, 2, 3]));

console.log(slug(adiSoyadi));

const array = [1, 2, 3, 4];

console.log(lod.reverse(array));
