// The Physics class for an entity
define(function() {
    var map = [];

    var Physics = function(entity) {
        Physics.G = 10;   // The gravity constant

        this.entity        = entity;
        this.mass          = 15;
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
        this.jumpForces = [];
    };

    /**
     * Calle on each frame
     * @param  {Map} gameMap The map to interact with for collisions
     */
    Physics.prototype.update = function(gameMap) {
        map = gameMap;

        var v0 = this.v;

        // Calculating acceleration
        this.v.x = 0;
        this.v.y = 0;

        // Applying all the forces
        this.applyForces();
        this.updateJump();

        // Resetting the forces
        this.forces = [];

        // Friction application
        this.v.x *= this.drag;
        this.v.y *= this.drag;

        // Velocity cap
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
                this.v.x = 0;
                this.entity.realX = newX;
            } else if (this.v.x != 0) {
                this.entity.realX += (this.v.x + v0.x) / 2 * Time.deltaTime;
            }

            if ( (newY = this.vCollisions(v0)) ) {
                this.v.y = 0;
                this.entity.realY = newY;
            } else if (this.v.y != 0) {
                this.entity.realY += (this.v.y + v0.y) / 2 * Time.deltaTime;
            }
        } else {
            if (this.v.x != 0) {
                this.entity.realX += (this.v.x + v0.x) / 2 * Time.deltaTime;
            }
            if (this.v.y != 0) {
                this.entity.realY += (this.v.y + v0.y) / 2 * Time.deltaTime;
            }
        }
    };

    /**
     * Applies all the forces on the entity at the current frame
     */
    Physics.prototype.applyForces = function() {
        if (this.useGravity && !this.onFloor) {
            this.applyGravity();
        }

        for (var i = 0; i < this.forces.length; i++) {
            this.v.x += this.forces[i][0];
            this.v.y += this.forces[i][1];
        }
        for (var i = 0; i < this.jumpForces.length; i++) {
            this.v.y += this.jumpForces[i];
        }
    };

    /**
     * Applies the gravity to the entity
     */
    Physics.prototype.applyGravity = function() {
        this.v.y += this.mass * Physics.G * Time.deltaTime;
    };

    /**
     * Adds a force at the current moment
     */
    Physics.prototype.addForce = function(x, y) {
        this.forces.push([x, y]);
    };

    /**
     * Adds a force at the current moment
     */
    Physics.prototype.addJumpForce = function(y) {
        this.jumpForces.push(y);
    };

    /**
     * Updates the jump forces
     */
    Physics.prototype.updateJump = function() {
        for (var i = 0; i < this.jumpForces.length; i++) {
            if (this.jumpForces[i] < this.entity.speed.y) {
                this.jumpForces[i]++;
            }
        }
    };

    /**
     * Detects if the entity has a collision in the horizontal axis with an obstacle in the map
     * @param  {Object} v0 The previous velocity
     * @return {boolean}
     */
    Physics.prototype.hCollisions = function(v0) {
        var futureX = this.entity.realX + (this.v.x + v0.x) / 2 * Time.deltaTime;
        var hittingEdge = futureX + (this.v.x < 0 ? 0 : this.entity.body.width),   // If the velocity is positive, the edge hitting will be the right edge, otherwise, the left edge
            yMin = ( ((this.entity.realY + 1) / map.TS) ) | 0,
            yMax = ( ((this.entity.realY - 1) / map.TS) + this.entity.body.t_height ) | 0,
            newX = 0;

        futureX = (hittingEdge / map.TS) | 0;
        // Parsing the rows containing the entity
        for (var i = yMin; i <= yMax; i++) {
            // If the entity collides with an obstacle
            if (map.obstacles.indexOf(map.tilemap[i][futureX]) != -1) {
                // We replace the entity right on the edge of the obstacle, to end the movement
                newX = futureX * map.TS + map.TS * (this.v.x < 0 ? 1 : -this.entity.body.t_width);
                return newX;
            }
            // if (map.items.indexOf(map.tilemap[i][futureX]) != -1) {
            //     Game.Item.pickUp(futureX, i);
            //     break;
            // }
        }
        return false;
    };

    /**
     * Detects if the entity has a collision in the vertical axis with an obstacle in the map
     * @param  {Object} v0 The entity's velocity in the previous frame
     * @return {boolean}
     */
    Physics.prototype.vCollisions = function(v0) {
        var futureY = this.entity.realY + (this.v.y + v0.y) / 2 * Time.deltaTime;
        var hittingEdge = futureY + (this.v.y < 0 ? 0 : (this.entity.body.height)),   // If the velocity is positive, the edge hitting will be the right edge, otherwise, the left edge
            xMin = ( ((this.entity.realX + 5) / map.TS) ) | 0,
            xMax = ( ((this.entity.realX - 5) / map.TS) + this.entity.body.t_width ) | 0,
            newY = 0,
            head = (hittingEdge <= futureY);

        futureY = (hittingEdge / map.TS) | 0;
        // Parsing the columns containing the entity
        for (var j = xMin; j <= xMax; j++) {
            // If the entity collides with an obstacle
            if (map.obstacles.indexOf(map.tilemap[futureY][j]) != -1) {
                // We replace the entity right on the edge of the obstacle, to end the movement
                if (((this.v.y + v0.y) / 2 * Time.deltaTime) >= 0 && !head) {
                    this.onFloor = true;
                }
                this.jumpForces = [];
                newY = futureY * map.TS + map.TS * (this.v.y < 0 ? 1 : -this.entity.body.t_height) - (this.v.y < 0 ? 0 : 0);
                return newY;
            }
            // if (map.items.indexOf(map.tilemap[futureY][j]) != -1) {
            //     if (map.tilemap[futureY][j] == 1000 && Game.player instanceof Game.Colombe) {
            //         Game.isOver = true;
            //         Game.context.globalAlpha = 0.1;
            //     }
            //     Game.Item.pickUp(j, futureY);
            //     break;
            // }
        }
        return false;
    };

    return Physics;
});