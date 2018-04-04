var Role = require('Roles');
var utils = require('utils');
var config = require('config');

var roleBuilder = {
    memory: {
        'role': Role.builder,
        'room': ""
    },
    getBodyParts: function (maxEnergy) {
        var levels = config.unitConfig['builder'].levels;
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
        /*var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });

        if (closestDamagedStructure && creep.carry.energy > creep.carryCapacity / 2) {
            if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestDamagedStructure);
                return;
            }
        }*/

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('resupplying');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length > 0) {
                creep.say('building');
            }
        }

        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                creep.memory.building = false;
            }
        }
        else {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                            ((structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_WALL) && structure.energy == structure.energyCapacity)
                            ||
                            (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy >= structure.storeCapacity * .8)
                            ||
                            (structure.structureType == STRUCTURE_SPAWN && structure.energy >= structure.energyCapacity * .8)
                           );
                }
            });
            //var sources = creep.room.find(FIND_SOURCES_ACTIVE);

            if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};

module.exports = roleBuilder;