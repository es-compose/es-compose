let expect = require('chai').expect;
const Utils = require('../../lib/Utils');

describe("Utils.js", () => {
    it("#values", () => {
        let obj = {
            a: 'value 1',
            b: '',
            c: undefined,
            d: null,
            e: 1,
            f: 'x'
        }

        expect(Utils.values(obj)).to.be.eqls([
            'value 1',
            1,
            'x'
        ])
    })
})