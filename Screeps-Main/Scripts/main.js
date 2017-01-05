var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var creepFactory = require('creepFactory');

module.exports.loop = function () {
    
    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    for (var room in Game.rooms) {
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.room == room);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.room == room);
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.room == room);

        if (Game.rooms[room].energyAvailable >= creepFactory.calcCost([MOVE, WORK, CARRY]) && builders.length < 2) {
            Game.spawns['Spawn1'].createCreep([MOVE, WORK, CARRY], "Builder_" + (builders.length + 1).toString(), { role: 'builder', room: room });
        }

        if (Game.rooms[room].energyAvailable >= creepFactory.calcCost([MOVE, WORK, CARRY]) && upgraders.length < 1) {
            Game.spawns['Spawn1'].createCreep([MOVE, WORK, CARRY], "Upgrader_" + (upgraders.length + 1).toString(), { role: 'upgrader', room: room });
        }

        if (Game.rooms[room].energyAvailable >= creepFactory.calcCost([MOVE, WORK, CARRY]) && harvesters.length < 2) {
            Game.spawns['Spawn1'].createCreep([MOVE, WORK, CARRY], "Harvester_" + (harvesters.length + 1).toString(), { role: 'harvester', room: room });
        }

        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
        }
    }
    /*var towers = _.filter(Game.structures,(structure) => structure.type == STRUCTURE_TOWER);
    
    if(towers.length > 0) {
        for (var name in towers){
            var tower = Game.structures[name];
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
               towerGame.structures[tower].repair(closestDamagedStructure);
            }
    
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }*/    
}