var config = require('config');
var utils = require('utils');
var Role = require('Roles');

module.exports = function () {

    Spawn.prototype.getEnergyTotal = function () {
        var extensionsTotal = 0;
        var roomExtensions = this.room.find(FIND_MY_STRUCTURES, { filter: utils.isStructure(STRUCTURE_EXTENSION) });
        var roomExtensionIndex;
        var roomExtensionsCount = roomExtensions.length;
        for (roomExtensionIndex = 0; roomExtensionIndex < roomExtensionsCount; roomExtensionIndex++) {
            extensionsTotal += roomExtensions[roomExtensionIndex].energy;
        }
        return extensionsTotal + this.energy;
    },

        Spawn.prototype.getEnergyCapacityTotal = function () {
            var extensionsTotal = 0;
            var roomExtensions = this.room.find(FIND_MY_STRUCTURES, { filter: utils.isStructure(STRUCTURE_EXTENSION) });
            var roomExtensionIndex;
            var roomExtensionsCount = roomExtensions.length;
            for (roomExtensionIndex = 0; roomExtensionIndex < roomExtensionsCount; roomExtensionIndex++) {
                extensionsTotal += roomExtensions[roomExtensionIndex].energyCapacity;
            }
            return extensionsTotal + this.energyCapacity;
        },

        Room.prototype.initStats = function () {

            var room = this;
            var harvesters = room.find(FIND_MY_CREEPS, { filter: utils.isOfUnitType(Role.harvester) });
            var guards = room.find(FIND_MY_CREEPS, { filter: utils.isOfUnitType(Role.guard) });
            var builders = room.find(FIND_MY_CREEPS, { filter: utils.isOfUnitType(Role.builder) });
            var repairers = room.find(FIND_MY_CREEPS, { filter: utils.isOfUnitType(Role.repairer) });
            var transporters = room.find(FIND_MY_CREEPS, { filter: utils.isOfUnitType(Role.transporter) });
            var upgraders = room.find(FIND_MY_CREEPS, { filter: utils.isOfUnitType(Role.upgrader) });
            var roomStructures = room.find(FIND_STRUCTURES, {
                filter: function (st) {
                    return st.my || st.structureType == STRUCTURE_ROAD;
                }
            });
            var resourcePoints = room.find(FIND_SOURCES_ACTIVE);

            // Collect room stats
            room.memory.unitCount = {
                'harvester': harvesters.length,
                'guard': guards.length,
                'builder': builders.length,
                'repairer': repairers.length,
                'transporter': transporters.length,
                'upgrader': upgraders.length
            };

            // Collect resource point stats
            var resourceTargetedStat = {};

            var resourcePointIndex;
            var resourcePointsCount = resourcePoints.length;
            for (resourcePointIndex = 0; resourcePointIndex < resourcePointsCount; resourcePointIndex++) {
                resourceTargetedStat[resourcePoints[resourcePointIndex].id] = [];
            }

            var harvesterIndex;
            var harvestersCount = harvesters.length;
            for (harvesterIndex = 0; harvesterIndex < harvestersCount; harvesterIndex++) {
                var harvesterCreep = harvesters[harvesterIndex];
                if (harvesterCreep.memory.target && harvesterCreep.memory.target.length > 0 && harvesterCreep.memory.target in resourceTargetedStat) {
                    resourceTargetedStat[harvesterCreep.memory.target].push(harvesterCreep);
                }
            }
            room.memory.resourcePointsCount = resourcePoints.length;
            room.memory.resourceTargeted = resourceTargetedStat;
            var maxResourceWorkersCount = resourcePointsCount * config.MaxHarvestersCountPerResourcePoint;
            room.memory.harvestersFull = harvestersCount >= maxResourceWorkersCount;

            room.memory.repairersNeeded = 0;
            var roomStructureIndex;
            var roomStructuresCount = roomStructures.length;

            for (roomStructureIndex = 0; roomStructureIndex < roomStructuresCount; roomStructureIndex++) {
                var roomStructure = roomStructures[roomStructureIndex];
                room.memory.repairersNeeded += config.getRepairerRatioForStructureType(roomStructure.structureType);
            }
            room.memory.repairersNeeded = parseInt(room.memory.repairersNeeded);

            room.memory.transporterFull = transporters.length > 4;

            var spawnsInRoom = room.find(FIND_MY_SPAWNS);
            //if (Game.flags[room.name + '_IdleFlag'] == undefined) {
            //    var terrain = Game.map.getTerrainAt(spawnsInRoom[0].pos.x - 5, spawnsInRoom[0].pos.y, room);
            //    if (OBSTACLE_OBJECT_TYPES.indexOf(terrain) === -1) {
            //        roomObj.createFlag(spawnsInRoom[0].pos.x - 5, spawnsInRoom[0].pos.y, room + '_IdleFlag', COLOR_YELLOW, COLOR_ORANGE);
            //    }
            //}
        };
}