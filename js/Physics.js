// The Physics class for an entity
(function() {
    var Physics = function(entity) {
        Physics.G = 100;   // The gravity constant

        this.entity        = entity;
        this.mass          = 1;
        this.drag          = 1;     // Friction
        this.useGravity    = true;
        this.useCollisions = true;

        this.v = {  // Velocity
            x: 0,
            y: 0
        };
        this.a = {  // Acceleration
            x: 0,
            y: 0
        };

        this.forces = [];
    };

    /**
     * Called on each frame
     */
    Physics.prototype.update = function() {
        var v0 = this.v;

        // Calculating acceleration
        this.v = {
            x: 0,
            y: 0
        };
        this.a = {
            x: 0,
            y: 0
        };
        // Applying all the forces
        this.applyForces();

        // Resetting the forces
        this.forces = [];

        // Affeting the velocity with the acceleration
        this.v.x += this.a.x * Time.deltaTime;
        this.v.y += this.a.y * Time.deltaTime;

        // Friction application
        this.v.x *= this.drag;
        this.v.y *= this.drag;

        if (this.useCollisions && !this.hCollisions(v0)) {
            this.entity.x += (this.v.x + v0.x) / 2 * Time.deltaTime;
        }
        if (this.useCollisions && !this.vCollisions(v0)) {
            this.entity.y += (this.v.y + v0.y) / 2 * Time.deltaTime;
        }
    };

    /**
     * Applies all the forces on the entity at the current frame
     */
    Physics.prototype.applyForces = function() {
        if (this.useGravity) {
            this.applyGravity();
        }

        for (var i = 0; i < this.forces.length; i++) {
            this.a.x += this.forces[i][0];
            this.a.y += this.forces[i][1];
        }

        this.a.x /= this.mass;
        this.a.y /= this.mass;
    };

    /**
     * Applies the gravity to the entity
     */
    Physics.prototype.applyGravity = function() {
        this.a.y += this.mass * Physics.G;
    };

    /**
     * Adds a force at the current moment
     */
    Physics.prototype.addForce = function(x, y) {
        this.forces.push([x, y]);
    };

    /**
     * Detects if the entity has a collision in the horizontal axis with an obstacle in the map
     * @param  {Object} v0 The entity's velocity in the previous frame
     * @return {boolean}
     */
    Physics.prototype.hCollisions = function(v0) {
        var futureX = this.entity.x + (this.v.x + v0.x) / 2 * Time.deltaTime;

        var hittingEdge = futureX + (this.v.x < 0 ? 0 : (this.entity.t_width * Game.map.TS)),   // If the velocity is positive, the edge hitting will be the right edge, otherwise, the left edge
            yMin = ( (this.entity.y/ Game.map.TS) ) | 0,
            yMax = ( (this.entity.y / Game.map.TS) + this.entity.t_height ) | 0,
            newX = 0;

        futureX = (hittingEdge / Game.map.TS) | 0;
        // Parsing the rows containing the entity
        for (var i = yMin; i <= yMax; i++) {
            // If the entity collides with an obstacle
            if (Game.map.obstacles.indexOf(Game.map.tilemap[i][futureX]) != -1) {
                // We replace the entity right on the edge of the obstacle, to end the movement
                newX = futureX * Game.map.TS + Game.map.TS * (this.v.x < 0 ? 1 : -this.entity.t_width);
                this.entity.x = newX + (this.v.x < 0 ? this.entity.t_width : -this.entity.t_width);
                return true;
            }
        }
        return false;
    };

    /**
     * Detects if the entity has a collision in the vertical axis with an obstacle in the map
     * @param  {Object} v0 The entity's velocity in the previous frame
     * @return {boolean}
     */
    Physics.prototype.vCollisions = function(v0) {
        var futureY = this.entity.y + (this.v.y + v0.y) / 2 * Time.deltaTime;

        var hittingEdge = futureY + (this.v.y < 0 ? 0 : (this.entity.t_height * Game.map.TS)),   // If the velocity is positive, the edge hitting will be the right edge, otherwise, the left edge
            xMin = ( (this.entity.x / Game.map.TS) ) | 0,
            xMax = ( (this.entity.x / Game.map.TS) + this.entity.t_width ) | 0,
            newY = 0;

        futureY = (hittingEdge / Game.map.TS) | 0;
        // Parsing the columns containing the entity
        for (var j = xMin; j <= xMax; j++) {
            // If the entity collides with an obstacle
            // console.log('futureY, j: ', futureY, j);
            if (Game.map.obstacles.indexOf(Game.map.tilemap[futureY][j]) != -1) {
                // We replace the entity right on the edge of the obstacle, to end the movement
                newY = futureY * Game.map.TS + Game.map.TS * (this.v.y < 0 ? 1 : -this.entity.t_height);
                this.entity.y = newY + (this.v.y < 0 ? this.entity.t_height : -this.entity.t_height);
                return true;
            }
        }
        return false;
    };

    Game.Physics = Physics;
})();