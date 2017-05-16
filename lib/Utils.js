
module.exports = class Utils {
    static values(arrayType) {
        let values = Object.values(arrayType || {});
        values = values.filter(Boolean);
        return values;
    }
}