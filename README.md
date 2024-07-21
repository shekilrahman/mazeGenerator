# Maze Generator

This project is a simple maze generator implemented using the recursive backtracking algorithm. The maze is visualized using the `p5.js` library. The project includes an HTML file for setting up the canvas and a JavaScript file for the logic of the maze generation.

## Technologies Used

- **HTML**: Used for setting up the structure of the web page.
- **CSS**: Used for styling the web page and centering the canvas.
- **JavaScript**: Used for implementing the maze generation algorithm and visualizing it.
- **p5.js**: A JavaScript library used for creative coding, specifically for drawing the canvas and handling animations.

## How It Works

1. **Setup**:
   - The `setup` function initializes the canvas and creates a grid of cells.
   - Each cell is represented by an instance of the `Cell` class.

2. **Index Calculation**:
   - The `index` function calculates the position of a cell in the grid array based on its coordinates.

3. **Maze Generation**:
   - The `draw` function runs in a loop, continuously updating the canvas to visualize the maze generation.
   - The algorithm starts with the first cell and marks it as visited.
   - It checks for unvisited neighbors. If a neighbor is found, the current cell is pushed onto a stack, and walls between the current cell and the neighbor are removed. The neighbor becomes the new current cell.
   - If no unvisited neighbors are found, the algorithm backtracks by popping a cell from the stack.
   - The process continues until all cells have been visited.

4. **Visualization**:
   - The `show` method in the `Cell` class is used to draw the cells and their walls.
   - The `highlight` method is used to highlight the current cell being processed.

## File Structure

- `index.html`: The HTML file that sets up the canvas and includes the necessary scripts.
- `main.js`: The JavaScript file that contains the maze generation logic and the `Cell` class.
- `styles.css`: (Optional) CSS file for additional styling if needed.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/maze-generator.git
