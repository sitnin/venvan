//
//  vanven.js tests
//
//  Created by Gregory Sitnin on 8/28/16.
//  Copyright (c) Gregory Sitnin, 2016. All rights reserved.
//

"use strict";

var assert = require("assert");
var vanven = require("./index.js");

describe('VanVen.js', function () {
    describe('known dates', function () {

        // ---  1973-12-3, 0
        // res: 51 - 39 - 54 - 2
        // ref: 51 - 39 - 54 - 2
        it('1973-12-3, 0', function () {
            var test = vanven(1973, 12, 3, 0);
            assert.deepEqual(test.nums.hex, [51, 39, 54]);
            assert.equal(test.mline, 2);
        });

        // ---  1980-11-24, 1
        // res: 23 - 2 - 2 - 6
        // ref: 23 - 2 - 2 - 6
        it('1980-11-24, 1', function () {
            var test = vanven(1980, 11, 24, 1);
            assert.deepEqual(test.nums.hex, [23, 2, 2]);
            assert.equal(test.mline, 6);
        });


    });
});
