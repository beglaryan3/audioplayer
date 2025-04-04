const audioImage = document.querySelector(".audio_image")
const audioName = document.querySelector(".audio_name")
const audioVolumeIcon = document.querySelector(".audio_volume")
const allAudioIcon = document.querySelector(".all_audio")
const randomAudioIcon = document.querySelector(".random_audio")
const repeatAudioIcon = document.querySelector(".audio_repeat")
const favoriteAudioIcon = document.querySelector(".favorite_audio")
const audioInput = document.querySelector(".audio_input")
const audioCurrentTime = document.querySelector(".current_time")
const audioDurationTime = document.querySelector(".duration")
const nextAudioBtn = document.querySelector(".next_btn")
const prevAudioBtn = document.querySelector(".prev_btn")
const playAudioBtn = document.querySelector(".play_btn")
const playAudioIcon = playAudioBtn.querySelector("i")
const audio = document.getElementById("audio")
const heartIcon = favoriteAudioIcon.querySelector("i")
const audioContainer = document.querySelector(".audio_container")
const allAudioList = document.querySelector(".audio_list")
const volumeIcon = audioVolumeIcon.querySelector("i")

const favoriteAudioBtn = document.querySelector(".favoriteMusic_btn")
const allAudioBtn = document.querySelector(".allMusic_btn")


const audioList = [
    {
        audioSrc: "Rosa Linn - Snap.mp3",
        audioImage: "Rosa Linn - Snap.jpg",
        audioName: "Rosa Linn - Snap",
        isFavorite: false,
    },
    {
        audioSrc: "Christina Perri - A Thousand Years.mp3",
        audioImage: "Christina Perri - a thousand years.jpg",
        audioName: "Christina Perri - a thousand years",
        isFavorite: false,
    },
    {
        audioSrc: "Emin & JONY - Камин.mp3",
        audioImage: "Jony - Kamin.jpg",
        audioName: "Emin & JONY - Камин",
        isFavorite: false,
    },
    {
        audioSrc: "Indila - Derniere Danse.mp3",
        audioImage: "Indila - Love Story.jpg",
        audioName: "Indila - Derniere Danse",
        isFavorite: false,
    },
    {
        audioSrc: "Loreen_-_Tattoo.mp3",
        audioImage: "Loreen - Tattoo.jpg",
        audioName: "Loreen - Tattoo",
        isFavorite: false,
    },
    {
        audioSrc: "natalie-taylor-surrender.mp3",
        audioImage: "Natalie Taylor - Surrender.jpg",
        audioName: "Natalie Taylor - Surrender",
        isFavorite: false,
    },
    {
        audioSrc: "Passenger - Let Her Go.mp3",
        audioImage: "Passenger - Let Her Go.jpg",
        audioName: "Passenger - Let Her Go",
        isFavorite: false,
    },
    {
        audioSrc: "Sia - Unstoppable.mp3",
        audioImage: "Sia - Unstoppable.jpg",
        audioName: "Sia - Unstoppable",
        isFavorite: false,
    },
    {
        audioSrc: "The Irrepressibles - In This Shirt.mp3",
        audioImage: "The Irrepressibles - In This Shirt.jpg",
        audioName: "The Irrepressibles - In This Shirt",
        isFavorite: false,
    },
    {
        audioSrc: "Tom Odell - Another Love.mp3",
        audioImage: "Tom Odel - Another Love.jpg",
        audioName: "Tom Odell - Another Love",
        isFavorite: false,
    },
]



let favoriteAudioList = []
let audioIndex = 0

function loadAudio(index) {
    const myAudio = audioList[index]
    audioImage.src = `images/${myAudio.audioImage}`
    audioName.textContent = myAudio.audioName
    audio.src = `audio/${myAudio.audioSrc}`

    heartIcon.style.color = myAudio.isFavorite === true ? "red" : "white"
}
loadAudio(audioIndex)

function playAudio() {
    audio.play()
    audio.classList.add("isPlay")
    playAudioIcon.className = "fa fa-pause"
}

function pauseAudio() {
    audio.pause()
    audio.classList.remove("isPlay")
    playAudioIcon.className = "fa fa-play"
}

function timeUpdate(time) {
    let minut = Math.floor(time / 60)
    let second = Math.floor(time % 60)
    return `${minut < 10 ? "0" + minut : minut}:${second < 10 ? "0" + second : second}`
}

playAudioBtn.addEventListener("click", function () {
    if (audio.classList.contains("isPlay")) pauseAudio()
    else playAudio()
})

nextAudioBtn.addEventListener("click", function () {
    audioIndex++
    audioIndex > audioList.length - 1 ? audioIndex = 0 : ""       
    loadAudio(audioIndex)
    audio.classList.contains("isPlay") ? audio.play() : ""
})

prevAudioBtn.addEventListener("click", function () {
    audioIndex--
    audioIndex < 0 ? audioIndex = audioList.length - 1 : ""
    loadAudio(audioIndex)
    audio.classList.contains("isPlay") ? audio.play() : ""
})

audio.addEventListener("timeupdate", function () {
    let duration = Math.floor(audio.duration)
    let currentTime = Math.floor(audio.currentTime)
    if (duration > 0) {
        audioCurrentTime.textContent = timeUpdate(currentTime)
        audioDurationTime.textContent = timeUpdate(duration)
        let progress = (currentTime * 100) / duration
        audioInput.value = progress

    }
})

audio.addEventListener("ended", function () {
    if (repeatAudioIcon.classList.contains("active")) {
        loadAudio(audioIndex)
        playAudio()
    } else if (randomAudioIcon.classList.contains("active")) {
        let randomIndex = Math.floor(Math.random() * audioList.length)
        loadAudio(randomIndex)
        playAudio()
    } else {
        audioIndex++
        if (audioIndex >= audioList.length) {
            audioIndex = 0
        }
        loadAudio(audioIndex)
        playAudio()
    }
})


audioInput.addEventListener("input", function () {
    let duration = Math.round(audio.duration)
    audio.currentTime = (audioInput.value * duration) / 100
})


repeatAudioIcon.addEventListener("click", function () {
    repeatAudioIcon.classList.toggle("active")
    if (randomAudioIcon.classList.contains("active")) {
        randomAudioIcon.classList.remove("active")
    }
})
randomAudioIcon.addEventListener("click", function () {
    randomAudioIcon.classList.toggle("active")
    if (repeatAudioIcon.classList.contains("active")) {
        repeatAudioIcon.classList.remove("active")
    }
})


audioVolumeIcon.addEventListener("click", function () {
    if (audio.volume > 0) {
        audio.volume = 0
        volumeIcon.className = "fa fa-volume-off"
    } else {
        audio.volume = 1
        volumeIcon.className = "fa fa-volume-up"
    }
})


favoriteAudioIcon.addEventListener("click", function () {
    let currentAudio = audioList[audioIndex]
    if (currentAudio.isFavorite === false) {
        currentAudio.isFavorite = true
        favoriteAudioList.push(currentAudio)
        heartIcon.style.color = "red"
    } else {
        currentAudio.isFavorite = false
        favoriteAudioList = favoriteAudioList.filter(song => song.isFavorite === true)
        heartIcon.style.color = "white"
    }
    console.log((favoriteAudioList));

})

allAudioIcon.onclick = () => audioContainer.classList.add("show")


function showAllAudio(category) {
    allAudioList.innerHTML = category.map(song => {
        return `
        <li class="audio_item">
            <img src="images/${song.audioImage}" alt="" class="audio_img"></img>
            <h3 class="audio_title">${song.audioName}</h3>
        </li>
        `
    }).join("")
}


allAudioBtn.addEventListener("click", function () {
    showAllAudio(audioList)
    const allItems = document.querySelectorAll(".audio_item")
    allItems.forEach(item => {
        item.addEventListener("click", function () {
            let songName = item.querySelector(".audio_title").textContent
            let newIndex = audioList.findIndex(obj => obj.audioName === songName)
            loadAudio(newIndex)
            audioIndex=newIndex

            playAudio()
            audioContainer.classList.remove("show")
        })
    })
})

favoriteAudioBtn.addEventListener("click", function () {
    allAudioList.innerHTML = favoriteAudioList.map(song => {
        return `
        <li class="audio_item">
            <img src="images/${song.audioImage}" alt="" class="audio_img"></img>
            <h3 class="audio_title">${song.audioName}</h3>
        </li>
        `
    }).join("")
    const allFavoriteItems = document.querySelectorAll(".audio_item")
    allFavoriteItems.forEach(item => {
        item.addEventListener("click", function () {
            let songName = item.querySelector(".audio_title").textContent
            let newIndex = audioList.findIndex(obj => obj.audioName === songName)
            loadAudio(newIndex)
            playAudio()
            audioContainer.classList.remove("show")
            audioIndex=newIndex
        })
    })
})

