// Elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullScreenButton = player.querySelector('[data-fullScreen]')

// Functions
function togglePlay() {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
  video[this.name] = this.value
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(ev) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

function handleFullScreen() {
  if (this.dataset.fullScreen === "normal") {
    video.requestFullscreen().then(resolve => {
      video.fullscreenElement
      this.dataset.fullscreen = "full"
    })
  } else {
    video.exitFullscreen()
  }
}

// Event Listeners
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

fullScreenButton.addEventListener('click', handleFullScreen)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach((button) => {
  button.addEventListener('click', skip)
})

ranges.forEach((slider) => {
  slider.addEventListener('change', handleRangeUpdate)
})

ranges.forEach((slider) => {
  slider.addEventListener('mousemove', handleRangeUpdate)
})

let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (ev) => mousedown && scrub(ev))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
