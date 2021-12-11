document.addEventListener(`DOMContentLoaded`, () => {

    const width = 10
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartButton = document.querySelector('#start-button')


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

    console.log(current)

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
    timerID = setInterval(moveDown, 1000)

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
        }
    }

    document.addEventListener('keyup', control)

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
            random = Math.floor(Math.random() * theTetraminoes.length)
            current = theTetraminoes[random][currentRotation]
            currentPosition = 4
            draw()
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
            currentPoistion -= 1
        }

        draw()
    }

    //rotate the tetromino

    function rotate() {
        undraw()
        currentRotation ++ 
        if(currentRotation === current.length) {
            currentRotation = 0
        }

        current = theTetraminoes[random][currentRotation]
        draw()
    }

    
})