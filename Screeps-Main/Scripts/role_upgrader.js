var Role = require('Roles');
var utils = require('utils');
var config = require('config');

var roleUpgrader = {
    memory: {
        'role': Role.upgrader,
        'room': ""
    },

    getBodyParts: function (maxEnergy) {
        var levels = config.unitConfig['upgrader'].levels;
        var levelIndex = levels.length - 1;
        for (levelIndex = levels.length - 1; levelIndex >= 0; levelIndex--) {
            var levelConfig = levels[levelIndex];
            var levelCost = utils.calcCost(levelConfig.parts);
            if (levelCost <= maxEnergy) {
                return levelConfig.parts;
            }
        }

        return levels[0].parts;
    },
    getCost: function (maxEnergy) {
        return utils.calcCost(this.getBodyParts(maxEnergy));
    },


    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};

module.exports = roleUpgrader;