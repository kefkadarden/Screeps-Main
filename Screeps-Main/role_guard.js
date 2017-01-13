var Role = require('Roles');
var utils = require('utils');
var config = require('config');


var roleGuard = {
    memory: {
        'role': Role.guard,
        'room': ""
    },

    getBodyParts: function (maxEnergy) {
        var levels = config.unitConfig['guard'].levels;
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
        var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function (object) {
                if (object.room === creep.room)
                    return true;
                else
                    return false;
            }
        });

        if (enemy) {
            creep.moveTo(enemy);

            if (creep.pos.getRangeTo(enemy) > 1 && creep.pos.getRangeTo(enemy) <= 3) {
                creep.rangeAttack(enemy);
            } else if (creep.pos.getRangeTo(enemy) == 1) {
                creep.attack(enemy);
            }
        }

        return enemy;
    }
};

module.exports = roleGuard;