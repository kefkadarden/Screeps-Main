var HarvesterState = require('HarvesterState');
var utils = require('utils');
var Role = require('Roles');
var config = require('config');

var roleHarvester = {
    memory: {
        'role': Role.harvester,
        'room': ""
    },

    getBodyParts: function (maxEnergy) {
        var levels = config.unitConfig['harvester'].levels;
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

        if (creep.memory.state === undefined) {
            creep.memory.state = HarvesterState.IDLE;
        }

        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
                creep.memory.state = HarvesterState.HARVESTING;
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
                    creep.memory.state = HarvesterState.TRANSFERRING;
                }
            } else {
                creep.memory.state = HarvesterState.IDLE;
            }
        }

        if (creep.memory.state && creep.memory.state == HarvesterState.IDLE) {
            if (creep.moveTo(Game.flags[creep.room.name + '_IdleFlag']) == ERR_INVALID_TARGET) {
                creep.say("No Idle Flag for room: " + creep.room.name);
            }
        }
    }
};

module.exports = roleHarvester;