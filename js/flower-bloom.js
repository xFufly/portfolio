/**
 * FlowerBloom - Module for creating beautiful flower animations on scroll
 * Adds blooming flowers at the sides of the page while scrolling
 * with direction awareness - flowers rewind when scrolling up!
 */
class FlowerBloom {
    constructor(options = {}) {
        // Configuration with defaults
        this.config = {
            throttleMs: options.throttleMs || 200,
            flowerLifespan: options.flowerLifespan || 4500,
            maxFlowersPerBurst: options.maxFlowersPerBurst || 3,
            leftContainer: options.leftContainer || '.flower-container.left',
            rightContainer: options.rightContainer || '.flower-container.right',
            reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            debug: options.debug || false
        };
        
        // State
        this.lastSpawnTime = 0;
        this.lastScrollY = window.scrollY;
        this.scrollDirection = 'down';
        this.activeFlowers = new Map(); // Track active flowers by ID
        this.flowerIdCounter = 0;
        
        // Initialize the flower containers
        this.setupContainers();
        
        // Setup scroll and wheel listeners
        this.setupEventListeners();
        
        if (this.config.debug) {
            console.log('🌸 FlowerBloom initialized', this.config);
        }
    }
    
    /**
     * Creates and adds the flower containers to the body
     */
    setupContainers() {
        // Create left container if it doesn't exist
        if (!document.querySelector(this.config.leftContainer)) {
            const leftContainer = document.createElement('div');
            leftContainer.className = 'flower-container left';
            document.body.appendChild(leftContainer);
            
            if (this.config.debug) {
                console.log('🌸 Created left container');
            }
        }
        
        // Create right container if it doesn't exist
        if (!document.querySelector(this.config.rightContainer)) {
            const rightContainer = document.createElement('div');
            rightContainer.className = 'flower-container right';
            document.body.appendChild(rightContainer);
            
            if (this.config.debug) {
                console.log('🌸 Created right container');
            }
        }
        
        // Store container references
        this.leftContainer = document.querySelector(this.config.leftContainer);
        this.rightContainer = document.querySelector(this.config.rightContainer);
    }
    
    /**
     * Add scroll and wheel event listeners
     */
    setupEventListeners() {
        // Skip if reduced motion is preferred
        if (this.config.reduceMotion) {
            if (this.config.debug) {
                console.log('🌸 Reduced motion enabled - animations disabled');
            }
            return;
        }
        
        // Add scroll listener
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        
        // Also listen to wheel for more immediate feedback
        window.addEventListener('wheel', this.handleWheel.bind(this), { passive: true });
        
        // Create an initial burst after a slight delay for initial impact
        setTimeout(() => {
            this.createFlowerBurst('left', 'down');
            this.createFlowerBurst('right', 'down');
        }, 800);
    }
    
    /**
     * Detect scroll direction and handle scroll events with throttling
     */
    handleScroll(event) {
        const now = Date.now();
        if (now - this.lastSpawnTime < this.config.throttleMs) {
            // Still throttle creation but always update direction
            this.updateScrollDirection();
            return;
        }
        
        this.lastSpawnTime = now;
        
        // Update direction first
        const direction = this.updateScrollDirection();
        
        // Create new flowers in the appropriate direction
        this.createFlowerBurst('left', direction);
        this.createFlowerBurst('right', direction);
        
        // Update existing flowers animation based on direction
        this.updateExistingFlowers(direction);
    }
    
    /**
     * Detect wheel direction and handle wheel events with throttling
     */
    handleWheel(event) {
        const now = Date.now();
        if (now - this.lastSpawnTime < this.config.throttleMs) {
            // Update direction even when throttled
            const direction = event.deltaY > 0 ? 'down' : 'up';
            this.scrollDirection = direction;
            return;
        }
        
        this.lastSpawnTime = now;
        
        // Detect wheel direction directly from the event
        const direction = event.deltaY > 0 ? 'down' : 'up';
        this.scrollDirection = direction;
        
        // Create new flowers with the wheel direction
        this.createFlowerBurst('left', direction);
        this.createFlowerBurst('right', direction);
        
        // Update existing flowers
        this.updateExistingFlowers(direction);
    }
    
    /**
     * Update scroll direction based on current and last scroll position
     * @returns {string} 'up' or 'down'
     */
    updateScrollDirection() {
        const currentScrollY = window.scrollY;
        
        // Determine direction
        if (currentScrollY > this.lastScrollY) {
            this.scrollDirection = 'down';
        } else if (currentScrollY < this.lastScrollY) {
            this.scrollDirection = 'up';
        }
        
        // Update state
        this.lastScrollY = currentScrollY;
        
        return this.scrollDirection;
    }
    
    /**
     * Update animation state of existing flowers based on scroll direction
     */
    updateExistingFlowers(direction) {
        this.activeFlowers.forEach((flowerState, id) => {
            const flower = document.getElementById(`flower-${id}`);
            if (!flower) {
                // Clean up map if flower no longer exists
                this.activeFlowers.delete(id);
                return;
            }
            
            // Calculate how to adjust the animation stage
            if (direction === 'up' && flowerState.stage > 0) {
                // Move backward in animation when scrolling up
                // this.rewindFlower(flower, flowerState);
            } else if (direction === 'down' && flowerState.stage < 3) {
                // Move forward in animation when scrolling down
                this.advanceFlower(flower, flowerState);
            }
        });
    }
    
    /**
     * Create a burst of flowers on a side
     * @param {'left'|'right'} side - Which side to create flowers on
     * @param {'up'|'down'} direction - Scroll direction
     */
    createFlowerBurst(side, direction = 'down') {
        // Get the appropriate container
        const container = side === 'left' ? this.leftContainer : this.rightContainer;
        if (!container) return;
        
        // Randomly decide how many flowers to create (1-3)
        const count = Math.floor(Math.random() * this.config.maxFlowersPerBurst) + 1;
        
        if (this.config.debug) {
            console.log(`🌸 Creating ${count} flowers on ${side} with direction ${direction}`);
        }
        
        // Create multiple flowers
        for (let i = 0; i < count; i++) {
            this.createFlower(container, side, direction);
        }
    }
    
    /**
     * Create an individual flower
     * @param {HTMLElement} container - The container to append the flower to
     * @param {'left'|'right'} side - Which side the flower is on
     * @param {'up'|'down'} direction - Scroll direction
     */
    createFlower(container, side, direction = 'down') {
        // Create flower element with ID for tracking
        const flower = document.createElement('div');
        const flowerId = this.flowerIdCounter++;
        flower.id = `flower-${flowerId}`;
        
        // Get random flower type
        const flowerTypes = ['rose', 'daisy', 'tulip'];
        const flowerType = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        flower.className = `flower flower-${flowerType}`;
        
        // Set random position
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const top = Math.floor(Math.random() * (vh - 100)) + 50; // Keep away from edges
        flower.style.top = `${top}px`;
        
        // Set horizontal position based on side
        const offset = 10 + Math.random() * 60; // 10-70px from edge
        if (side === 'left') {
            flower.style.left = `${offset}px`;
        } else {
            flower.style.right = `${offset}px`;
        }
        
        // Set random rotation
        const rotation = (Math.random() - 0.5) * 40; // -20 to 20 degrees
        flower.style.setProperty('--rotate-angle', `${rotation}deg`);
        flower.style.setProperty('--rotate-more', `${(Math.random() - 0.5) * 20}deg`);
        
        // Set float direction (up vs down)
        flower.style.setProperty('--float-direction', Math.random() > 0.5 ? '-1' : '1');
        
        // Set animation-direction based on scroll direction
        flower.style.setProperty('--animation-direction', direction === 'up' ? 'reverse' : 'normal');
        
        // Add flower SVG based on type
        flower.innerHTML = this.getFlowerSVG(flowerType);
        
        // Add to DOM
        container.appendChild(flower);
        
        // Store in active flowers map
        const initialStage = direction === 'up' ? 3 : 0;
        this.activeFlowers.set(flowerId, {
            type: flowerType,
            side: side,
            top: top,
            stage: initialStage,
            direction: direction,
            createdAt: Date.now()
        });
        
        // Force reflow before adding animation class
        // eslint-disable-next-line no-unused-expressions
        void flower.offsetWidth;
        
        // Start bloom sequence
        this.startBloomSequence(flower, direction);
    }
    
    /**
     * Handle the flower lifecycle with CSS animations
     * @param {HTMLElement} flower - The flower element to animate
     * @param {'up'|'down'} direction - Scroll direction
     */
    startBloomSequence(flower, direction = 'down') {
        // Set initial animation stage class based on direction
        if (direction === 'up') {
            // When scrolling up, start at full bloom and go backwards
            flower.classList.add('stage-3');
            flower.style.setProperty('--animation-progress', '1');
        } else {
            // When scrolling down, start at bud and bloom forward
            flower.classList.add('stage-0');
            flower.style.setProperty('--animation-progress', '0');
        }
        
        // Remove after lifespan completes
        setTimeout(() => {
            if (flower.isConnected) { // Check if still in DOM
                flower.classList.add('fading');
                
                // Actually remove after fade animation
                setTimeout(() => {
                    if (flower.isConnected) {
                        flower.remove();
                        
                        // Also remove from tracking map
                        const id = parseInt(flower.id.replace('flower-', ''), 10);
                        this.activeFlowers.delete(id);
                    }
                }, 1000);
            }
        }, this.config.flowerLifespan);
    }
    
    /**
     * Advance a flower to the next animation stage
     * @param {HTMLElement} flower DOM element of the flower
     * @param {Object} flowerState State object from activeFlowers
     */
    advanceFlower(flower, flowerState) {
        // Only advance if not already at max stage
        if (flowerState.stage < 3) {
            // Remove current stage class
            flower.classList.remove(`stage-${flowerState.stage}`);
            
            // Increment stage
            flowerState.stage += 1;
            
            // Add new stage class
            flower.classList.add(`stage-${flowerState.stage}`);
            
            // Update animation progress CSS variable (0 to 1)
            flower.style.setProperty('--animation-progress', flowerState.stage / 3);
            
            // If we reached the full bloom stage, trigger burst effect
            if (flowerState.stage >= 2) {
                flower.classList.add('bursting');
                
                // Remove burst class after animation completes
                setTimeout(() => {
                    if (flower.isConnected) {
                        flower.classList.remove('bursting');
                    }
                }, 1000);
            }
        }
    }
    
    /**
     * Rewind a flower to the previous animation stage
     * @param {HTMLElement} flower DOM element of the flower
     * @param {Object} flowerState State object from activeFlowers
     */
    rewindFlower(flower, flowerState) {
        // Only rewind if not already at min stage
        if (flowerState.stage > 0) {
            // Remove current stage class
            flower.classList.remove(`stage-${flowerState.stage}`);
            
            // Remove burst effect if present
            flower.classList.remove('bursting');
            
            // Decrement stage
            flowerState.stage -= 1;
            
            // Add new stage class
            flower.classList.add(`stage-${flowerState.stage}`);
            
            // Update animation progress CSS variable (0 to 1)
            flower.style.setProperty('--animation-progress', flowerState.stage / 3);
        }
    }
    
    /**
     * Get SVG markup for the different flower types
     * @param {string} type - Flower type: rose, daisy, or tulip
     * @returns {string} SVG markup
     */
    getFlowerSVG(type) {
        switch (type) {
            case 'rose':
                return `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <path class="petal" d="M25,10 C30,15 40,15 40,25 C40,35 30,40 25,40 C20,40 10,35 10,25 C10,15 20,15 25,10 Z" />
                    <path class="petal" d="M25,5 C32,15 45,15 45,25 C45,35 32,45 25,45 C18,45 5,35 5,25 C5,15 18,5 25,5 Z" opacity="0.8" />
                    <path class="center" d="M25,20 C27.5,20 30,22.5 30,25 C30,27.5 27.5,30 25,30 C22.5,30 20,27.5 20,25 C20,22.5 22.5,20 25,20 Z" />
                </svg>`;
                
            case 'daisy':
                return `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(25, 25)">
                        <circle class="center" r="6" cx="0" cy="0" />
                        <path class="petal" d="M0,-6 C3,-10 3,-15 0,-20 C-3,-15 -3,-10 0,-6 Z" />
                        <path class="petal" d="M0,-6 C3,-10 3,-15 0,-20 C-3,-15 -3,-10 0,-6 Z" transform="rotate(45)" />
                        <path class="petal" d="M0,-6 C3,-10 3,-15 0,-20 C-3,-15 -3,-10 0,-6 Z" transform="rotate(90)" />
                        <path class="petal" d="M0,-6 C3,-10 3,-15 0,-20 C-3,-15 -3,-10 0,-6 Z" transform="rotate(135)" />
                        <path class="petal" d="M0,-6 C3,-10 3,-15 0,-20 C-3,-15 -3,-10 0,-6 Z" transform="rotate(180)" />
                        <path class="petal" d="M0,-6 C3,-10 3,-15 0,-20 C-3,-15 -3,-10 0,-6 Z" transform="rotate(225)" />
                        <path class="petal" d="M0,-6 C3,-10 3,-15 0,-20 C-3,-15 -3,-10 0,-6 Z" transform="rotate(270)" />
                        <path class="petal" d="M0,-6 C3,-10 3,-15 0,-20 C-3,-15 -3,-10 0,-6 Z" transform="rotate(315)" />
                    </g>
                </svg>`;
                
            case 'tulip':
                return `<svg viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
                    <path class="stem" d="M20,35 C20,50 20,55 20,60" stroke="currentColor" stroke-width="2" />
                    <path class="leaf" d="M20,45 C25,48 35,45 30,40 C25,35 20,45 20,45" fill="rgba(144, 238, 144, 0.8)" />
                    <path class="petal" d="M10,5 C15,0 25,0 30,5 C35,15 35,25 20,35 C5,25 5,15 10,5 Z" />
                    <path class="petal" d="M15,10 C17,7 23,7 25,10 C25,20 25,30 20,30 C15,30 15,20 15,10 Z" opacity="0.6" />
                </svg>`;
                
            default:
                return `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <circle class="petal" cx="25" cy="25" r="20" />
                    <circle class="center" cx="25" cy="25" r="6" />
                </svg>`;
        }
    }
}

// Initialize FlowerBloom when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.flowerBloom = new FlowerBloom({
        debug: false,
        flowerLifespan: 5000,
        throttleMs: 180
    });
});