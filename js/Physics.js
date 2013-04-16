// The Physics class for an entity
(function() {
    var Physics = function(entity) {
        Physics.G = 10;   // The gravity constant

        this.entity        = entity;
        this.mass          = 1;
        this.jumpHeight    = 20;
        this.drag          = 1;     // Friction
        this.useGravity    = true;
        this.useCollisions = true;
        this.onFloor       = false;

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
        this.v.x = 0;
        this.a = {
            x: 0,
            y: 0
        };
        // Applying all the forces
        this.applyForces();

        // Resetting the forces
        this.forces = [];

        // Affeting the velocity with the acceleration
        this.v.x += this.a.x * 0.1;     // 0.1 instead of deltaTime for now
        this.v.y += this.a.y * 0.1;

        // Friction application
        this.v.x *= this.drag;
        this.v.y *= this.drag;

        if (this.v.x > 0 && this.v.x >= this.entity.maxSpeed.x) {
            this.v.x = this.entity.maxSpeed.x;
        } else if (this.v.x < 0 && this.v.x <= -this.entity.maxSpeed.x) {
            this.v.x = -this.entity.maxSpeed.x;
        }
        if (this.v.y > 0 && this.v.y >= this.entity.maxSpeed.y) {
            this.v.y = this.entity.maxSpeed.y;
        } else if (this.v.y < 0 && this.v.y <= -this.entity.maxSpeed.y) {
            this.v.y = -this.entity.maxSpeed.y;
        }

        var newX = null, newY = null;

        // If there is a collision with an obstacle, we don't apply the velocity on the entity
        this.onFloor = false;
        if (this.useCollisions) {
            if ( (newX = this.hCollisions(v0)) ) {
                this.addForce(-(this.v.x + v0.x) / 2 * 0.1, 0);
                this.v.x = 0;
            } else {
                this.entity.realX += (this.v.x + v0.x) / 2 * 0.1;
            }
            if ( (newY = this.vCollisions(v0)) ) {
                this.addForce(0, -(this.v.y + v0.y) / 2 * 0.1);
                this.v.y = 0;
            } else {
                this.entity.realY += (this.v.y + v0.y) / 2 * 0.1;
            }

            if (newX != false && newY != false) {
                this.entity.realY = newY;
                this.entity.realX = newX;
            }
        } else {
            this.entity.realX += (this.v.x + v0.x) / 2 * 0.1;
            this.entity.realY += (this.v.y + v0.y) / 2 * 0.1;
        }

        // if (!this.useCollisions || !this.hCollisions(v0)) {
        // this.entity.x += (this.v.x + v0.x) / 2 * 0.1;
        // }

        // If there is a collision with an obstacle, we don't apply the velocity on the entity
        // if (!this.useCollisions || !this.vCollisions(v0)) {
        // this.entity.y += (this.v.y + v0.y) / 2 * 0.1;
        // }
    };

    /**
     * Applies all the forces on the entity at the current frame
     */
    Physics.prototype.applyForces = function() {
        if (this.useGravity && !this.onFloor) {
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
     * @param  {Object} v0 The entitye
     * @return {boolean}
     */
    Physics.prototype.hCollisions = function(v0) {
        var futureX = this.entity.realX + (this.v.x + v0.x) / 2 * 0.1;

        var hittingEdge = futureX + (this.v.x < 0 ? 0 : (this.entity.body.t_width * Game.map.TS)),   // If the velocity is positive, the edge hitting will be the right edge, otherwise, the left edge
            yMin = ( (this.entity.realY/ Game.map.TS) ) | 0,
            yMax = ( (this.entity.realY / Game.map.TS) + this.entity.body.t_height ) | 0,
            newX = 0;

        futureX = (hittingEdge / Game.map.TS) | 0;
        // Parsing the rows containing the entity
        for (var i = yMin; i <= yMax; i++) {
            // If the entity collides with an obstacle
            if (Game.map.obstacles.indexOf(Game.map.tilemap[i][futureX]) != -1) {
                // We replace the entity right on the edge of the obstacle, to end the movement
                newX = futureX * Game.map.TS + Game.map.TS * (this.v.x < 0 ? 1 : -this.entity.body.t_width);
                return newX;
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
        var futureY = this.entity.realY + (this.v.y + v0.y) / 2 * 0.1;

        var hittingEdge = futureY + (this.v.y < 0 ? 0 : (this.entity.body.t_height * Game.map.TS)),   // If the velocity is positive, the edge hitting will be the right edge, otherwise, the left edge
            xMin = ( (this.entity.realX / Game.map.TS) ) | 0,
            xMax = ( (this.entity.realX / Game.map.TS) + this.entity.body.t_width ) | 0,
            newY = 0;

        futureY = (hittingEdge / Game.map.TS) | 0;
        // Parsing the columns containing the entity
        for (var j = xMin; j <= xMax; j++) {
            // If the entity collides with an obstacle
            if (Game.map.obstacles.indexOf(Game.map.tilemap[futureY][j]) != -1) {
                // We replace the entity right on the edge of the obstacle, to end the movement
                if (futureY * Game.map.TS > this.entity.y) {
                    this.onFloor = true;
                }
                newY = futureY * Game.map.TS + Game.map.TS * (this.v.y < 0 ? 1 : -this.entity.body.t_height);
                return newY;
            }
        }
        return false;
    };

    Game.Physics = Physics;
})();