var gulp = require("gulp");
var del  = require("del");
var watch = require("gulp-watch");
var sequence = require("gulp-sequence");
var typescript = require("gulp-typescript");
var tsConfig   = require("./tsconfig.json");
var webserver = require("gulp-webserver");

var path = {
   ts : 'src/**/*.ts',,
   
};
