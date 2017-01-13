module.exports = {
        "undefined": -1,
        "harvester": 0,     //Harvests goods/energy from nodes
        "builder":   1,     //Builds any construction sites
        "upgrader":  2,     //Upgrades controller
        "repairer":  3,     //Repairs any damaged buildings in room
        "soldier": 4,       //Will migrate between rooms to combat enemies. (Necessary?)
        "guard": 5,         //Will remain stationary within assigned room to defend.
        "transporter": 6    //Transport goods/energy harvested by harvesters
}