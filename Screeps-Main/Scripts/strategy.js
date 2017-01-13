var Role = require('Roles');
var guard = require('role_guard');
var harvester = require('role_harvester');
var upgrader = require('role_upgrader');
var builder = require('role_builder');
var repairer = require('role_repairer');
var transporter = require('role_transporter');
var config = require('config');
var utils = require('utils');

module.exports = {
    getSpawnedCreep: function (spawn) {
        var roomObj = spawn.room;

        var hostileCreeps = roomObj.find(FIND_HOSTILE_CREEPS);

        var unit;

        if (hostileCreeps.length > 0 && roomObj.memory.unitCount[utils.getKeyAsString(Role, Role.guard)] < hostileCreeps.length) {
            unit = guard;
            unit.memory.room = roomObj.name;
            return unit;
        }

        if (!roomObj.memory.harvestersFull) {
            unit = harvester;
            unit.memory.room = roomObj.name;
            return unit;
        }

        //if (!roomObj.memory.transporterFull) {
        //    unit = transporter;
        //    unit.memory.room = roomObj.name;
        //    return unit;
        //}

        var repairerCount = roomObj.memory.unitCount[utils.getKeyAsString(Role, Role.repairer)];

        if (repairerCount < roomObj.memory.repairersNeeded) {
            unit = repairer;
            unit.memory.room = roomObj.name;
            return unit;
        }

        var builderCount = roomObj.memory.unitCount[utils.getKeyAsString(Role, Role.builder)];
        if (builderCount < config.maxBuilders && roomObj.find(FIND_CONSTRUCTION_SITES).length > builderCount) {
            unit = builder;
            unit.memory.room = roomObj.name;
            return unit;
        }

        var upgraderCount = roomObj.memory.unitCount[utils.getKeyAsString(Role, Role.upgrader)];

        if (roomObj.controller.level < 8) {

            if (upgraderCount < config.maxUpgraders) {
                unit = upgrader;
                unit.memory.room = roomObj.name;
                return unit;
            }
        }

        return null;
    }

};