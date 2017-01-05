var _ = require("lodash");

var creepFactory = {
    cost: 0,
    calcCost: function (body) {
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

    countType: function (type) {
        return _.size(_.filter(Game.creeps, function (creep, creepName) {
            return creep.memory.role === type;
        }));
    },

    countTypeByRoom: function (type, room) {
        return _.size(_.filter(Game.creeps, function (creep, creepName) {
            return creep.memory.role === type && creep.memory.room === room;
        }));
    },

    create: function (spawn, body, type, memory) {
        var id = this.countType(type) + 1;
        return spawn.createCreep(body, type + '_' + id, memory);
    }
};

module.exports = creepFactory;