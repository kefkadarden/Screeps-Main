var config = require('config');
var Role = require('Roles');

module.exports = {

    calcCost: function (body) {
        var cost = 0;
        var bodyCost = {
            "move": 50,
            "carry": 50,
            "work": 100,
            "heal": 250,
            "tough": 10,
            "attack": 80,
            "ranged_attack": 150,
            "claim": 600
        };
        var cost = 0;

        _.forEach(body, function (part) { cost += bodyCost[part]; });
        return cost;
    },

    getKeyAsString: function (obj, key) {
        for (var k in obj) {
            if (obj[k] == key) {
                return k;
            }
        }
    },

    isOfUnitType: function (unitTypeName) {
        return function (creep) {
            return creep.memory.role == unitTypeName;
        };
    },

    isStructure: function (structureType) {
        return function (structure) {
            return structure.structureType == structureType;
        };
    }
};