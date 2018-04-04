var roleHarvester = require('role_harvester');
var roleUpgrader = require('role_upgrader');
var roleBuilder = require('role_builder');
var roleGuard = require('role_guard');
var roleRepairer = require('role_repairer');
var roleTransporter = require('role_transporter');
var creepFactory = require('creepFactory');
var Role = require('Roles');
var StaticInit = require('StaticInit');
var config = require('config');

StaticInit();

OBSTACLE_OBJECT_TYPES: ["spawn", "creep", "wall", "source", "constructedWall", "extension", "link", "storage", "tower", "observer", "powerSpawn", "powerBank", "lab", "terminal", "nuker"];
module.exports.loop = function () {

    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    for (var room in Game.rooms) {
        var roomObj = Game.rooms[room];
        //var spawnsInRoom = roomObj.find(FIND_MY_SPAWNS);
        roomObj.initStats();

        var spawns = roomObj.find(FIND_MY_SPAWNS);

        for (var i = 0; i < spawns.length; i++) {
            var curSpawn = spawns[i];
            creepFactory.spawn(curSpawn);
        }

        if (spawns[0].getEnergyTotal() == spawns[0].getEnergyCapacityTotal() && roomObj.find(FIND_MY_STRUCTURES, { filter: (struct) => struct.structureType == STRUCTURE_EXTENSION }).length < config.maxExtensions) {
            var firstCont = roomObj.find(FIND_MY_STRUCTURES, { filter: (struct) => struct.structureType == STRUCTURE_EXTENSION });
            console.log(firstCont[0]);
            //if (firstCont[0] == null || firstCont[0] == nil || firstCont == {} || firstCont == "") {
            //    roomObj.createConstructionSite(spawns[0].pos.x + 5, spawns[0].pos.y, STRUCTURE_EXTENSION);
            //    firstCont = roomObj.find(FIND_MY_STRUCTURES, { filter: (struct) => struct.structureType == STRUCTURE_EXTENSION });
            //}
           // roomObj.createConstructionSite(firstCont[0].pos.x, firstCont[0].pos.y - 1, STRUCTURE_EXTENSION);
        }

        //var builders = creepFactory.countTypeByRoom(Role.builder, room);
        //var upgraders = creepFactory.countTypeByRoom(Role.upgrader, room);
        //var harvesters = creepFactory.countTypeByRoom(Role.harvester, room);





        //if (Game.rooms[room].energyAvailable >= creepFactory.calcCost([MOVE, WORK, CARRY]) && builders < 2) {
        //    creepFactory.create(spawnsInRoom[0], [MOVE, WORK, CARRY], { role: Role.builder, room: room });
        //}


        //if (Game.rooms[room].energyAvailable >= creepFactory.calcCost([MOVE, WORK, CARRY]) && upgraders < 3) {
        //    creepFactory.create(spawnsInRoom[0], [MOVE, WORK, CARRY], { role: Role.upgrader, room: room });
        //}

        //if (Game.rooms[room].energyAvailable >= creepFactory.calcCost([MOVE, WORK, CARRY]) && harvesters < 2) {
        //    var i = creepFactory.create(spawnsInRoom[0], [MOVE, WORK, CARRY], { role: Role.harvester, room: room });
        //    console.log(i);
        //}

        var creeps = roomObj.find(FIND_MY_CREEPS);

        for (var i = 0; i < creeps.length; i++) {
            var creep = creeps[i];

            if (creep.memory.role == Role.harvester) {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == Role.upgrader) {
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == Role.builder) {
                roleBuilder.run(creep);
            }
            if (creep.memory.role == Role.guard) {
                roleGuard.run(creep);
            }
            if (creep.memory.role == Role.transporter) {
                roleTransporter.run(creep);
            }
            if (creep.memory.role == Role.repairer) {
                roleRepairer.run(creep);
            }
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