//
//  venvan.js
//
//  Created by Gregory Sitnin on 8/28/16.
//  Copyright (c) Gregory Sitnin, 2016. All rights reserved.
//

"use strict";

const TRIGRAMS = [7, 3, 5, 1, 6, 2, 4, 0];

const VANVEN_ORDER = [
    0x3F, 0x00, 0x11, 0x22, 0x17, 0x3A, 0x02, 0x10,
    0x37, 0x3B, 0x07, 0x38, 0x3D, 0x2F, 0x04, 0x08,
    0x19, 0x26, 0x03, 0x30, 0x29, 0x25, 0x20, 0x01,
    0x39, 0x27, 0x21, 0x1E, 0x12, 0x2D, 0x1C, 0x0E,
    0x3C, 0x0F, 0x28, 0x05, 0x35, 0x2B, 0x14, 0x0A,
    0x23, 0x31, 0x1F, 0x3E, 0x18, 0x06, 0x1A, 0x16,
    0x1D, 0x2E, 0x09, 0x24, 0x34, 0x0B, 0x0D, 0x2C,
    0x36, 0x1B, 0x32, 0x13, 0x33, 0x0C, 0x15, 0x2A
];

function day_num(year, month, day) {
    return ((year % 12) == 0 ? 12 : year % 12) + month + day;
}

function outer_trigram_no(year, month, day) {
    var result = day_num(year, month, day) % 8;
    return result != 0 ? result : 8;
}

function inner_trigram_no(year, month, day, hour) {
    var result = (day_num(year, month, day) + hour) % 8;
    return result != 0 ? result : 8;
}

function trigram(no) {
    return TRIGRAMS[no-1];
}

function hexagram_no(bitmask) {
    for (var i = 0; i < 64; i++) {
        if (bitmask == VANVEN_ORDER[i])
            return i+1;
    }
    return -1;
}

function mutable_line(year, month, day, hour) {
    var result = (day_num(year, month, day) + hour) % 6;
    return result != 0 ? result : 6;
}

function birth_hexagram(outer, inner) {
    return (outer << 3) | inner;
}

function core_hexagram(bhex) {
    var lo = bhex >>> 1;
    var cl = (lo >>> 3) << 3;
    lo = lo ^ cl;

    var hi = bhex >>> 2;
    cl = (hi >>> 3) << 3;
    hi = hi ^ cl;

    var res = (hi << 3) | lo;
    return res;
}

function end_hexagram(bhex, mline) {
    return bhex ^ (1 << (mline - 1));
}

function make_hexagrams(year, month, day, hour) {
    const outer_no = outer_trigram_no(year, month, day);
    const outer = trigram(outer_no);

    const inner_no = inner_trigram_no(year, month, day, hour);
    const inner = trigram(inner_no);

    const bhex_mask = birth_hexagram(outer, inner);
    const bhex_no = hexagram_no(bhex_mask);
    if (bhex_no < 0) throw new Error("Invalid bhex_no");

    const chex_mask = core_hexagram(bhex_mask);
    const chex_no = hexagram_no(chex_mask);
    if (chex_no < 0) throw new Error("Invalid chex_no");

    const mline = mutable_line(year, month, day, hour);
    const ehex_mask = end_hexagram(bhex_mask, mline);
    const ehex_no = hexagram_no(ehex_mask);
    if (ehex_no < 0) throw new Error("Invalid ehex_no");

    return {
        bits: {
            hex: [bhex_mask, chex_mask, ehex_mask],
            trg: [outer, inner]
        },
        nums: {
            hex: [bhex_no, chex_no, ehex_no],
            trg: [outer_no, inner_no]
        },
        mline: mline
    }
}

module.exports = make_hexagrams;
