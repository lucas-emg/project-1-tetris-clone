document.addEventListener(`DOMContentLoaded`, () => {

    const width = 10
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startButton = document.querySelector('#start-button')
    const resetButton = document.querySelector('#reset-button')
    const gameOverDisplay = document.querySelector('#game-over')
    let nextRandom = 0
    let timerID
    let score = 0


    //The Tetrominoes

    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2, width*2+1],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [width*2, width*2+1, width+1, width+2],
        [0, width, width+1, width*2+1],
        [width*2, width*2+1, width+1, width+2],
        [0, width, width+1, width*2+1]
    ]

    const tTetromino = [
        [width, width+1, width+2, width*2+1],
        [1, width+1, width+2, width*2+1],
        [1, width, width+1, width+2],
        [1, width, width+1, width*2+1]
    ]

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iTetronimo = [
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1]
    ]

    const theTetraminoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetronimo]

    let currentPosition = 4
    let currentRotation = 0

    //randomly select a tetromino
    let random = Math.floor(Math.random() * theTetraminoes.length);
    let current = theTetraminoes[random][currentRotation]

    

    //draw the Tetromino

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }


    //undraw the Tetromino

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    //make the tetromino move down every second
    // timerID = setInterval(moveDown, 1000)

    //assign functions to keycodes
    function control(e) {
        if(e.key === 'ArrowLeft') {
            moveLeft()
        } else if (e.key === 'ArrowRight') {
            moveRight()
        } else if (e.key === 'ArrowDown') {
            moveDown()
        } else if (e.key === 'ArrowUp') {
            rotate()
        } else if (e.code === 'Space') {
            if (timerID) {
                clearInterval(timerID)
                timerID = null
            } else {
                draw()
                timerID = setInterval(moveDown, 1000)
                // nextRandom = Math.floor(Math.random()*theTetraminoes.length)
                // displayShape()
            }
        } else if (e.code === 'Enter') {
            reset()
        }


        
    }

    document.addEventListener('keydown', control)

    //move down function
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()

    
    }

    //stop on the bottom of the page function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))

            //start a new falling tetromino
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetraminoes.length)
            current = theTetraminoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }

    //move the tetromino left, unless it is on the edge or there is any blockage
    
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % 10 === 0)

        if(!isAtLeftEdge) currentPosition -= 1

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1
        }

        draw()
    }

    //move the tetromino right, unless it is on the edge or there is any blockage

    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => ((currentPosition + index) - 9) % 10 === 0)

        if(!isAtRightEdge) currentPosition += 1

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }

        draw()
    }

    //rotate the tetromino

    function rotate() {
        undraw()
        const isAtRightEdge = current.some(index => ((currentPosition + index) - 9) % 10 === 0)
        const isAtSecondToRightEdge = current.some(index => ((currentPosition + index) - 8) % 10 === 0)
        const isAtLeftEdge = current.some(index => (currentPosition + index) % 10 === 0)
        const lTetrominoStanding = [1, 11, 21, 31]
        const lTetrominoLayingdown = [10, 11, 12, 13]

        currentRotation ++ 
            if(currentRotation === current.length) {
            currentRotation = 0
        }
        

        current = theTetraminoes[random][currentRotation]

        let isLTetromino = current.reduce((sum, a) => sum + a, 0)
        console.log(isLTetromino)

        if(isAtRightEdge && isLTetromino === 46) {
            currentPosition -= 2
            timerID
        }
        if(isAtSecondToRightEdge && isLTetromino === 46) {
            currentPosition -= 2
            timerID
        }

        if(isAtRightEdge) {
            currentPosition -= 1
        }

        if(current === lTetrominoStanding) {
            console.log('true')
        }

        if(isAtLeftEdge) {
            currentPosition += 1
        }

        draw()
    }

    //show up-next tetromino in mini-grid

    const displaySquares =  document.querySelectorAll('.mini-grid div')
    const displayWidth = 5
    let displayIndex = 0

    const upNextTetrominos = [
        [2, displayWidth+2, displayWidth*2+2, 3], //lTetromino
        [displayWidth*2+1, displayWidth*2+2, displayWidth+2, displayWidth+3], //zTetromino
        [displayWidth+1, displayWidth+2, displayWidth+3, displayWidth*2+2], //tTetromino
        [displayWidth+1, displayWidth+2, displayWidth*2+1, displayWidth*2+2], //o tetromino
        [displayWidth+2, displayWidth*2+2, displayWidth*3+2, displayWidth*4+2] //lTetromino
        
    ]

    //display the shape in the mini-grid

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })

        upNextTetrominos[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    }

    //add a function to the button
    startButton.addEventListener('click', () => {
        if (timerID) {
            clearInterval(timerID)
            timerID = null
        } else {
            draw()
            timerID = setInterval(moveDown, 1000)
            // nextRandom = Math.floor(Math.random()*theTetraminoes.length)
            // displayShape()
        }
    })


    //reset button
    resetButton.addEventListener('click', () => {
        reset()
    })

    //adding score
    function addScore() {
        for(let i = 0; i <  199; i +=width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                })
                const squaresRemoved = squares.splice(i, width);
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
                clearInterval(timerID)
                timerID = setInterval(moveDown, 1000)
                
            }
        }
    }
    
    //game over
    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            gameOverDisplay.innerHTML = 'Game Over'
            clearInterval(timerID)
        }

        return true
    }

    function reset() {
        squares.forEach(square =>{
            square.classList.remove('tetromino')
            })
            for (let i = 0; i < 200; i++) {
                squares[i].classList.remove('taken')
            }
            clearInterval(timerID)
            score = 0
            scoreDisplay.innerHTML = score
            currentPosition = 4
            currentRotation = 0
            let newRandom = Math.floor(Math.random() * theTetraminoes.length);
            random = newRandom
            current = theTetraminoes[random][currentRotation]
            timerID = setInterval(moveDown, 1000)
            gameOverDisplay.innerHTML = ''

    }

    
    

})