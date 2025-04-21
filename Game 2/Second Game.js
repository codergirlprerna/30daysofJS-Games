const squares = document.querySelectorAll('.square')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const highScoreDisplay = document.querySelector('#high-score')
highScoreDisplay.textContent = localStorage.getItem('highScore') || 0
 
let result = 0
let hitPosition
let currentTime = 60
let timerId = null

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole')
  })

  const random = Math.floor(Math.random() * 9)
  const randomSquare = squares[random]
  randomSquare.classList.add('mole')
  hitPosition = randomSquare.id
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id === hitPosition) {
      result++
      score.textContent = result
      hitPosition = null
    }
  })
})

function moveMole() {
  timerId = setInterval(randomSquare, 500)
}

function countDown() {
  currentTime--
  timeLeft.textContent = currentTime

  if (currentTime === 0) {
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    const previousScore = localStorage.getItem('highScore') || 0
    if (result > previousScore) {
      localStorage.setItem('highScore', result)
      alert(` New High Score! You scored ${result} (Previous: ${previousScore})`)
    } else {
      alert(`Game Over! Your score: ${result}. Best score: ${previousScore}`)
    }
  }
}

moveMole()
const countDownTimerId = setInterval(countDown, 1000)
