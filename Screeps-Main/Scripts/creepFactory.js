var _ = require("lodash");
var strategy = require('strategy');
var Role = require("Roles");
var utils = require('utils');

var creepFactory = {
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

    create: function (spawn, body, memory) {
        var id = this.countType(memory.role) + 1;
        var name = utils.getKeyAsString(Role, memory.role);
        while (spawn.createCreep(body, name + '_' + id, memory) == ERR_NAME_EXISTS) {
            id++;
        }
    },

    spawn: function (spawn) {
        if (spawn.spawning) {
            return;
        }

        var unit = strategy.getSpawnedCreep(spawn);

        if (unit == null) {
            return;
        }

        var totalEnergy = spawn.getEnergyTotal();
        var totalEnergyCapacity = spawn.getEnergyCapacityTotal();
        if (totalEnergy >= unit.getCost(totalEnergyCapacity)) {
            var body = unit.getBodyParts(totalEnergyCapacity);
            this.create(spawn, body, unit.memory);
        }
    },


};

module.exports = creepFactory;