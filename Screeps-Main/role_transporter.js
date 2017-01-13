var Role = require('Roles');
var utils = require('utils');
var config = require('config');


var roleTransporter = {
    memory: {
        'role': Role.transporter,
        'room': ""
    },

    getBodyParts: function (maxEnergy) {
        var levels = config.unitConfig['transporter'].levels;
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

    run: function (creep) {

        if (creep.carry.energy < creep.carryCapacity) {
            var roomHarvesters = creep.room.find(FIND_MY_CREEPS, {
                filter: function (object) {
                    if (object.memory.role === Role.harvester && object.carry.energy > 50) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            );



            var nearestHarvester = {};
            var minDist = 99999;

            for (var i = 0; i < roomHarvesters.length; i++) {

                if (creep.pos.getRangeTo(roomHarvesters[i]) < minDist) {
                    minDist = creep.pos.getRangeTo(roomHarvesters[i]);
                    nearestHarvester = roomHarvesters[i];
                }
            }


            if (!creep.pos.inRangeTo(nearestHarvester, 1)) {
                creep.moveTo(nearestHarvester);
            } else {
                var results = nearestHarvester.drop(RESOURCE_ENERGY, nearestHarvester.carry.energy || (creep.carryCapacity - creep.carry.energy));

                var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);
                if (energy.length > 0) {
                    creep.pickup(energy[0]);
                }
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                            ((structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity)
                            ||
                            (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy < structure.storeCapacity)
                           );
                }
            });

            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleTransporter;