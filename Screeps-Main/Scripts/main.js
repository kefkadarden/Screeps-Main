var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var creepFactory = require('creepFactory');

module.exports.loop = function () {
    
    //testexport.run();
    
    var tower = Game.getObjectById('179b01f1ae0e444509804e39');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
    var builders = _.filter(Game.creeps,(creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps,(creep) => creep.memory.role == 'upgrader');
    var harvesters = _.filter(Game.creeps,(creep) => creep.memory.role == 'harvester');
    
    if (Game.rooms['sim'].energyAvailable >= creepFactory.calcCost([MOVE,WORK,CARRY]) && builders.length < 2){
        Game.spawns['Spawn1'].createCreep([MOVE,WORK,CARRY],"Builder_"+(builders.length+1).toString(),{role:'builder'});
    }
    
    if (Game.rooms['sim'].energyAvailable >= creepFactory.calcCost([MOVE,WORK,CARRY]) && upgraders.length < 1){
        Game.spawns['Spawn1'].createCreep([MOVE,WORK,CARRY],"Upgrader_"+(upgraders.length+1).toString(),{role:'upgrader'});
    }
    
     if (Game.rooms['sim'].energyAvailable >= creepFactory.calcCost([MOVE,WORK,CARRY]) && harvesters.length < 2){
        Game.spawns['Spawn1'].createCreep([MOVE,WORK,CARRY],"Harvester_"+(harvesters.length+1).toString(),{role:'harvester'});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}