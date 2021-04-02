const form = document.querySelector('form')
const wrapper = document.querySelector('.wrapper')

const tvShows = (films) => {
  for (film of films) {
    const card = document.createElement('section')
    const name = film.show.name
    let summary = film.show.summary
    if (summary === null) {
      summary = 'SORRY, NO DESCRIPTION!'
    }
    const filmName = document.createElement('p')
    const rate = document.createElement('p')
    rate.innerText = 'Average rate: '
    const image = document.createElement('img')
    const posterImage = document.createElement('img')
    filmName.innerHTML = `<p>${name}</p><hr>`
    let rating = film.show.rating.average
    if (rating === null) {
      rate.append('NO RATING')
    } else {
      rate.append(film.show.rating.average)
    }
    let img = film.show.image
    image.title = name
    if (img === null) {
      image.src = 'noimage.jpg'
    } else {
      image.src = film.show.image.medium
      posterImage.src = film.show.image.original
      image.append(img)
    }
    card.append(filmName, rate, image)
    wrapper.prepend(card)

    image.addEventListener('click', () => {
      const modal = document.querySelector('.main_modal')
      modal.style.display = 'block'
      modal.innerHTML = `<div class="modal"><h2>${name}</h2>
        <hr>
        <div class="summary">
        <div class="sum">
        ${summary}
        </div>
        <div class="poster"></div>
        </div>
        <button class="back">&larr; Go back</button>
        </div>`
      const poster = document.querySelector('.poster')
      poster.append(posterImage)
      const backBtn = document.querySelector('.back')
      backBtn.addEventListener('click', () => {
        modal.style.display = 'none'
      })
    })
  }
}

const searchTv = async () => {
  try {
    const title = form.elements.title.value
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${title}`)
    const datas = await res.json()
    console.log(datas)
    tvShows(datas)
  } catch (err) {
    console.log('SOMETHING WENT WRONG!')
  }
}

form.addEventListener('submit', (e) => {
  // wrapper.innerHTML = `<div class="main_modal"></div>`
  e.preventDefault()
  searchTv()
  form.elements.title.value = ''
})
