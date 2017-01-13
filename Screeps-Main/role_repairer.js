var Role = require('Roles');
var utils = require('utils');
var config = require('config');


var roleRepairer = {
    memory: {
        'role': Role.repairer,
        'room': ""
    },

    getBodyParts: function (maxEnergy) {
        var levels = config.unitConfig['repairer'].levels;
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

        if (creep.carry.energy == 0) {
            var nearestSpawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);

            if (nearestSpawn.energy > 199) {
                creep.withdraw(nearestSpawn, RESOURCE_ENERGY);
            }
        }
        else {
            var repairStruct = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (object) {
                    if (object.hits > object.hitsMax / 3) {
                        return false;
                    }
                    else if (object.hits == undefined) {
                        return false;

                    } else {
                        return true;
                    }
                }
            });
            if (repairStruct) {
                creep.moveTo(repairStruct);
                creep.repair(repairStruct);
            }
        }
    }
};

module.exports = roleRepairer;
