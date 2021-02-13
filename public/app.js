
//function to add a note with fetch
async function addANote(noteTitle, noteBody) {
  const data = { title: noteTitle, note: noteBody }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const response = await fetch('/newNote', options)
  const json = await response.json()
  console.log(json)
}

//function to get all of the notes with fetch
async function getAllNotes() {
  const response = await fetch('/allNotes')
  const json = await response.json()
  console.log(json)
  return await json
}

//function to get one note using a query string
async function getOneNote(noteTitle) {
  const response = await fetch(`/oneNote/?note=${noteTitle}`)
  const json = await response.json()
  console.log(json)
  return await json
}

// .............................................................

const newNote = document.querySelector('#newNote')
const txtDiv = document.querySelector('.createNotes')
const notes = document.querySelector('.notesList')
const noteDiv = document.querySelector('.displayNote')
const save = document.querySelector('#save')
const openMenu = document.querySelector('.openMenu')
const closeMenu = document.querySelector('.closeMenu')
const sideMenu = document.querySelector('.notesMenu')
const dark = document.querySelector('#darkBtn')
const main = document.querySelector('.main')




notes.addEventListener('click', ev => {
  
  const theTitle = ev.target.innerText
  getOneNote(theTitle)
  createPTag(theTitle)

}) 


async function createPTag(noteTitle) {
  const note = await getOneNote(noteTitle)
  const newNote = `<p>${note[0].note}</p>`
  noteDiv.innerHTML = newNote
  txtDiv.style.display = 'none'
}



function saveNote() {
    const body = document.querySelector('#txt').value
    const title = body.split('\n')[0]
    const text = document.createTextNode(title)
    const newItem = document.createElement('li')
    
    newItem.appendChild(text)
    document.querySelector('.notesList').appendChild(newItem)

    document.querySelector('#txt').value = ''

    addANote(title, body)
}

save.addEventListener('click', saveNote)



openMenu.addEventListener('click', () => {
  
  sideMenu.style.width= '300px'
  openMenu.innerText = ''

})

closeMenu.addEventListener('click', () => {

  sideMenu.style.width = '0px'
  openMenu.innerText = '►'

})



dark.addEventListener('click', () => {

  main.classList.toggle('darkTheme')

  sideMenu.classList.toggle('darkTheme-sidebar')

  dark.classList.toggle('darkTheme-dark')

})



function hideTextArea() {

  if (txtDiv.style.display === 'block') {
    txtDiv.style.display = 'none'
  } else {
    txtDiv.style.display = 'block'
  }
}

newNote.addEventListener('click', hideTextArea)



const cancel = document.querySelector('#cancel')
function cancelNote() {
     document.querySelector('#txt').value = ''

}

cancel.addEventListener('click', cancelNote)
