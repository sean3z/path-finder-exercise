/*
Given a maze represented by a grid and a robot. Write code that helps the robot travel from a starting point to the end. The robot has the following API: 

Interface robot
{
CanGo() //checks to see if it can travel in the direction it is facing.
TurnRight() // changes direction
IsAtFinish() //returns true if standing at the end of the maze.
Go() //moves 1 step in the direction it is facing.
}

s - starting point. 
x - blocked area. 
o - unblocked area. 
f - finish. 

Hint: the accesible paths have only a width of 1. 

Can be solved as generic graph traversal problem. But if you take advanage of the hint then you don't need to remember where you have traveled.
*/

var maze = [
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'o', 'o', 'o', 'o', 'o', 'x'],
    ['s', 'o', 'o', 'x', 'o', 'x', 'o', 'x'],
    ['x', 'o', 'x', 'x', 'o', 'x', 'o', 'x'],
    ['x', 'o', 'x', 'x', 'o', 'o', 'o', 'x'],
    ['x', 'o', 'x', 'x', 'x', 'o', 'x', 'x'],
    ['x', 'o', 'x', 'x', 'x', 'f', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']
];

var robot = {
    directions: ['up', 'right', 'down', 'left'],
    direction: 0,
    position: {
        col: 2,
        row: 0
    },
    CanGo: function() {
        var spot;
        switch(this.direction) {
            case 0:
                spot = maze[this.position.col - 1][this.position.row];
            break;
                
            case 1:
                spot = maze[this.position.col][this.position.row + 1];
            break;
                
            case 2:
                spot = maze[this.position.col + 1][this.position.row];
            break;
                
            case 3:
                spot = maze[this.position.col][this.position.row - 1];
            break;
        }
        
        return !!spot && spot != 'x';
    },
    TurnRight: function() {
        if (++this.direction == this.directions.length) {
           this.direction = 0;
        }
        console.log(this.directions[this.direction]);
    },
    IsAtFinish: function() {
        return maze[this.position.col][this.position.row] == 'f';
    },
    Go: function() {
        switch(this.direction) {
            case 0:
                if (this.CanGo()) this.position.col--;
            break;
                
            case 1:
                if (this.CanGo()) this.position.row++;
            break;
                
            case 2:
                if (this.CanGo()) this.position.col++;
            break;
                
            case 3:
                if (this.CanGo()) this.position.row--;
            break;
        }
        
        updateMaze();

        if (this.IsAtFinish()) {
            alert('You Win!');
        } 
        
    }
};

function updateMaze() {
    var div = document.getElementById('maze');
    
    var table = '';
    maze.forEach(function(row, key) {
        table += '<tr>';
        row.forEach(function(col, index) {
            var style;
            switch(col) {
                case 'x':
                    style = 'block';
                break;
                    
                case 'f':
                    style = 'goal';
                break;
                    
                default:
                    style = 'normal';
            }
            
            if (index == robot.position.row && key == robot.position.col) {
                style = 'selected';
            }
            
            table += '<td class="'+ style +'">'+ col +'</td>';
        });;
        table += '</tr>';
    });
    
    div.innerHTML = '<table>'+ table +'</table>';
};

updateMaze();