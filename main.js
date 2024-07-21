let cols, rows;
const cellSize = 40;
let grid = [];
let stack = [];
let current;

// p5.js setup function to initialize the canvas and create the grid
function setup() {
    createCanvas(800, 800);
    cols = floor(width / cellSize);
    rows = floor(height / cellSize);

    // Create the grid of cells
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    // Start with the first cell
    current = grid[0];
}

// Function to get the index of the cell in the grid array based on its coordinates
function index(i, j) {
    if (i < 0 || j < 0 || i >= cols || j >= rows) {
        return -1;
    }
    return i + j * cols;
}

// p5.js draw function to continuously execute the maze generation process
function draw() {
    background(51);

    // Display all cells
    for (let cell of grid) {
        cell.show();
    }

    // Mark the current cell as visited
    current.visited = true;
    let next = current.checkNeighbors();

    // If the current cell has unvisited neighbors
    if (next) {
        stack.push(current); // Push the current cell to the stack
        next.cell.visited = true; // Mark the neighbor as visited
        current.removeWallsBetween(next.cell, next.from, next.to); // Remove walls between current cell and neighbor
        current = next.cell; // Move to the neighbor
    } else if (stack.length > 0) {
        current = stack.pop(); // Backtrack to the previous cell
    } else {
        noLoop(); // Stop the draw loop if all cells have been visited
    }

    // Highlight the current cell
    current.highlight();
}

// Cell class representing each cell in the maze grid
class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.visited = false;
        this.walls = { top: true, right: true, bottom: true, left: true };
    }

    // Remove walls between current cell and neighbor cell
    removeWallsBetween(neighbor, from, to) {
        this.walls[from] = false;
        neighbor.walls[to] = false;
    }

    // Check unvisited neighbors and return one randomly if any exist
    checkNeighbors() {
        const neighbors = [];
        const directions = {
            top: grid[index(this.i, this.j - 1)],
            right: grid[index(this.i + 1, this.j)],
            bottom: grid[index(this.i, this.j + 1)],
            left: grid[index(this.i - 1, this.j)]
        };

        for (let dir in directions) {
            let neighbor = directions[dir];
            if (neighbor && !neighbor.visited) {
                neighbors.push({ from: dir, to: this.opposite(dir), cell: neighbor });
            }
        }

        if (neighbors.length > 0) {
            return neighbors[floor(random(0, neighbors.length))];
        } else {
            return undefined;
        }
    }

    // Show the cell and its walls
    show() {
        const x = this.i * cellSize;
        const y = this.j * cellSize;
        stroke(255);
        strokeWeight(2);

        if (this.walls.top) line(x, y, x + cellSize, y);
        if (this.walls.right) line(x + cellSize, y, x + cellSize, y + cellSize);
        if (this.walls.bottom) line(x + cellSize, y + cellSize, x, y + cellSize);
        if (this.walls.left) line(x, y + cellSize, x, y);

        if (this.visited) {
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, cellSize, cellSize);
        }
    }

    // Highlight the current cell
    highlight() {
        const x = this.i * cellSize;
        const y = this.j * cellSize;
        noStroke();
        fill(0, 255, 0, 150);
        rect(x, y, cellSize, cellSize);
    }

    // Helper function to get the opposite direction
    opposite(direction) {
        const opposites = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right'
        };
        return opposites[direction];
    }
}
