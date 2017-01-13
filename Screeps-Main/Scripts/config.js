var config = {};

config.maxBuilders = 4;
config.maxUpgraders = 4;
config.MaxHarvestersCountPerResourcePoint = 4;
config.maxExtensions = 10;
config.RepairerRatio = {
    'rampart': 0.1
};
config.RepairerRatioDefault = 0.025;
config.getRepairerRatioForStructureType = function (st) {
    if (st in config.RepairerRatio) {
        return config.RepairerRatio[st];
    }
    return config.RepairerRatioDefault;
};
// Units
config.unitConfig = {};

config.unitConfig.harvester = {
    levels: [
        {
            level: 1,
            parts: [WORK, CARRY, MOVE, MOVE]
        },
        {
            level: 2,
            parts: [WORK, WORK, CARRY, MOVE, MOVE, MOVE]
        },
        {
            level: 3,
            parts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        {
            level: 4,
            parts: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        {
            level: 5,
            parts: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
    ]
};

config.unitConfig.upgrader = {
    levels: [
        {
            level: 1,
            parts: [WORK, CARRY, MOVE, MOVE]
        },
        {
            level: 2,
            parts: [WORK, WORK, CARRY, MOVE, MOVE, MOVE]
        },
        {
            level: 3,
            parts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        {
            level: 4,
            parts: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        {
            level: 5,
            parts: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
    ]
};

config.unitConfig.transporter = {
    levels: [
        {
            level: 1,
            parts: [CARRY, MOVE, MOVE]
        },
        {
            level: 2,
            parts: [CARRY, CARRY, MOVE, MOVE, MOVE]
        },
        {
            level: 3,
            parts: [CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        {
            level: 4,
            parts: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        {
            level: 5,
            parts: [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
    ]
};

config.unitConfig.builder = {
    levels: [
        {
            level: 1,
            parts: [WORK, CARRY, MOVE, MOVE]
        },
        {
            level: 2,
            parts: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
        },
        {
            level: 3,
            parts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        {
            level: 4,
            parts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        {
            level: 5,
            parts: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
    ]
};

config.unitConfig.repairer = {
    levels: [
        {
            level: 1,
            parts: [WORK, CARRY, MOVE, MOVE]
        },
        {
            level: 2,
            parts: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
        },
        {
            level: 3,
            parts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        {
            level: 4,
            parts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        {
            level: 5,
            parts: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
    ]
};

config.unitConfig.guard = {
    levels: [
        {
            level: 1,
            parts: [MOVE, ATTACK]
        },
        {
            level: 2,
            parts: [TOUGH, MOVE, MOVE, ATTACK]
        },
        {
            level: 3,
            parts: [TOUGH, TOUGH, MOVE, MOVE, MOVE, ATTACK]
        },
    ]
};

module.exports = config;