const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

const width = 9  
let currentIndex = 76  
let timerId
let outcomeTimerId
let currentTime = 20  
timeLeftDisplay.textContent = currentTime

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')

    switch(e.key) {
        case 'ArrowLeft' :
            if (currentIndex % width !== 0) currentIndex -= 1
            break
        case 'ArrowRight' :
            if (currentIndex % width < width - 1) currentIndex += 1
            break
        case 'ArrowUp' :
            if (currentIndex - width >= 0) currentIndex -= width
            break
        case 'ArrowDown' :
            if (currentIndex + width < width * width) currentIndex += width
            break
    }

    squares[currentIndex].classList.add('frog')
}

function autoMoveElements() {
    currentTime--
    timeLeftDisplay.textContent = currentTime
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
}

function checkOutComes() {
    lose()
    win()
}

function moveLogLeft(logLeft) {
    switch(true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.replace('l1', 'l2')
            break
        case logLeft.classList.contains('l2'):
            logLeft.classList.replace('l2', 'l3')
            break
        case logLeft.classList.contains('l3'):
            logLeft.classList.replace('l3', 'l4')
            break
        case logLeft.classList.contains('l4'):
            logLeft.classList.replace('l4', 'l5')
            break
        case logLeft.classList.contains('l5'):
            logLeft.classList.replace('l5', 'l1')
            break
    }
}

function moveLogRight(logRight) {
    switch(true) {
        case logRight.classList.contains('l1'):
            logRight.classList.replace('l1', 'l5')
            break
        case logRight.classList.contains('l2'):
            logRight.classList.replace('l2', 'l1')
            break
        case logRight.classList.contains('l3'):
            logRight.classList.replace('l3', 'l2')
            break
        case logRight.classList.contains('l4'):
            logRight.classList.replace('l4', 'l3')
            break
        case logRight.classList.contains('l5'):
            logRight.classList.replace('l5', 'l4')
            break
    }
}

function moveCarLeft(carLeft) {
    switch(true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.replace('c1', 'c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.replace('c2', 'c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.replace('c3', 'c1')
            break
    }
}

function moveCarRight(carRight) {
    switch(true) {
        case carRight.classList.contains('c1'):
            carRight.classList.replace('c1', 'c3')
            break
        case carRight.classList.contains('c2'):
            carRight.classList.replace('c2', 'c1')
            break
        case carRight.classList.contains('c3'):
            carRight.classList.replace('c3', 'c2')
            break
    }
}

function lose() {
    if (
        squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0
    ) {
        resultDisplay.textContent = 'You lose!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
    }
}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = 'You Win!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        document.removeEventListener('keyup', moveFrog)
    }
}

startPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        outcomeTimerId = null
        timerId = null
        document.removeEventListener('keyup', moveFrog)
    } else {
        timerId = setInterval(autoMoveElements, 1000)
        outcomeTimerId = setInterval(checkOutComes, 50)
        document.addEventListener('keyup', moveFrog)
    }
})
