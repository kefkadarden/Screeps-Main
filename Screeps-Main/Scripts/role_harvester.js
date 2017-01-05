var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        /*Need to figure out how to use state array with creep currentState instead of string*/
        var state = [
            'HARVESTING',
            'TRANFERRING',
            'IDLE'
        ];

        var currentState = [];

        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
                currentState = 'HARVESTING';
                creep.say("Harvesting");
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                    currentState = 'TRANSFERRING';
                    creep.say("Transferring");
                }
            } else {
                currentState = 'IDLE'; //state['IDLE'];
                creep.say("Idle");
            }
        }

        if (currentState && currentState == 'IDLE') {
            creep.moveTo(Game.flags['IdleFlag']);
        }
    }
};

module.exports = roleHarvester;