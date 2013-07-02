// The Physics class for an entity
define(function() {
    var map = [];

    var Physics = function(entity) {
        Physics.G = 0.981;   // The gravity constant

        this.entity        = entity;
        this.mass          = 25;
        this.jumpHeight    = 20;
        this.drag          = 1;
        this.useGravity    = true;
        this.useCollisions = true;
        this.onFloor       = false;
        this.jumping       = false;

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

        var v0 = {
            x: this.v.x,
            y: this.v.y
        };

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

        var newX = null,
            newY = null,
            dForceX = (this.v.x + v0.x) / 2 * Time.deltaTime,   // The total force that will be applied on the X axis
            dForceY = (this.v.y + v0.y) / 2 * Time.deltaTime;   // The total force that will be applied on the Y axis
        this.onFloor = false;

        if (dForceX < 0) {
            this.entity.body.left = true;
        } else if (dForceX > 0) {
            this.entity.body.left = false;
        }

        // If there is a collision with an obstacle, we don't apply the velocity on the entity
        if (this.useCollisions) {
            if ( (newX = this.hCollisions(dForceX)) ) {
                this.v.x = 0;
                this.entity.realX = newX;

            // Without collisions, we apply the forces normally
            } else if (this.v.x != 0) {
                this.entity.realX += dForceX;
            }

            if ( (newY = this.vCollisions(dForceY)) ) {
                this.v.y = 0;
                this.entity.realY = newY;


            // Without collisions, we apply the forces normally
            } else if (this.v.y != 0) {
                this.entity.realY += dForceY;
            }

        // Without collisions, we apply the forces normally
        } else {
            if (this.v.x != 0) {
                this.entity.realX += dForceX;
            }
            if (this.v.y != 0) {
                this.entity.realY += dForceY;
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
        this.v.y += this.mass * Physics.G;
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
     * @param  {Number} dForceX The total force that will be applied on the X axis
     * @return {boolean}
     */
    Physics.prototype.hCollisions = function(dForceX) {
        var futureX = this.entity.realX + dForceX;
        var hittingEdge = futureX + (this.v.x < 0 ? 0 : (this.entity.body.getTWidth() * map.TS)),   // If the velocity is positive, the edge hitting will be the right edge, otherwise, the left edge
            yMin = ( ((this.entity.realY + 1) / map.TS) ) | 0,
            yMax = ( ((this.entity.realY - 1) / map.TS) + this.entity.body.getTHeight() ) | 0,
            newX = 0;

        futureX = (hittingEdge / map.TS) | 0;
        // Parsing the rows containing the entity
        for (var i = yMin; i <= yMax; i++) {
            // If the entity collides with an obstacle
            if (map.obstacles.indexOf(map.tilemap[i][futureX]) != -1) {
                // We replace the entity right on the edge of the obstacle, to end the movement
                newX = futureX * map.TS + map.TS * (this.v.x < 0 ? 1 : -this.entity.body.getTWidth());
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
     * @param  {Number} dForceY The total force that will be applied on the Y axis
     * @return {boolean}
     */
    Physics.prototype.vCollisions = function(dForceY) {
        var futureY = this.entity.realY + dForceY;
        var hittingEdge = futureY + (this.v.y < 0 ? 0 : (this.entity.body.getTHeight() * map.TS)),   // If the velocity is positive, the edge hitting will be the right edge, otherwise, the left edge
            xMin = ( ((this.entity.realX + 5) / map.TS) ) | 0,
            xMax = ( ((this.entity.realX - 5) / map.TS) + this.entity.body.getTWidth() ) | 0,
            newY = 0,
            head = (hittingEdge <= futureY);

        futureY = (hittingEdge / map.TS) | 0;
        // Parsing the columns containing the entity
        for (var j = xMin; j <= xMax; j++) {
            // If the entity collides with an obstacle
            if (map.obstacles.indexOf(map.tilemap[futureY][j]) != -1) {
                // We replace the entity right on the edge of the obstacle, to end the movement
                if (dForceY >= 0 && !head) {
                    this.onFloor = true;
                }
                this.jumping = false;
                this.jumpForces = [];
                newY = futureY * map.TS + map.TS * (this.v.y < 0 ? 1 : -this.entity.body.getTHeight());
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

        if (dForceY < 0) {
            this.jumping = true;
        } else {
            this.jumping = false;
        }
        return false;
    };

    return Physics;
});