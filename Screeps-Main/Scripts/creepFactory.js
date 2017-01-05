 var _ = require("lodash");
 
 var creepFactory = {
     cost:0,
     calcCost: function(body) {
        var bodyCost = {
          "move": 50,
          "carry": 50,
          "work": 100,
          "heal": 250,
          "tough": 10,
          "attack": 80,
          "ranged_attack": 150,
          "claim": 600
            };
        var cost = 0;
        
        _.forEach(body, function(part) { cost += bodyCost[part]; }); 
        return cost;
     }
 };

module.exports = creepFactory;