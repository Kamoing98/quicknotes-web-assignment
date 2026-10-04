// QuickNotes App - Script

// Select elements using querySelector
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const errorMessage = document.querySelector('#error-message');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const searchInput = document.querySelector('#search-input');
const clearAllBtn = document.querySelector('#clear-all-btn');

// Notes stored as an array of objects
let notes = [];

// Load notes from localStorage on page open
function loadNotes() {
  const stored = localStorage.getItem('quicknotes');
  if (stored) {
    notes = JSON.parse(stored);
  }
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem('quicknotes', JSON.stringify(notes));
}

// Render function - rebuilds the list from the array using createElement and textContent
function render() {
  // Clear the list
  notesList.innerHTML = '';

  // Get search term
  const searchTerm = searchInput.value.toLowerCase().trim();

  // Filter notes based on search
  let filteredNotes = notes;
  if (searchTerm) {
    filteredNotes = notes.filter(function (note) {
      return note.text.toLowerCase().includes(searchTerm);
    });
  }

  // Update count
  updateCount();

  // If no notes at all
  if (notes.length === 0) {
    const noNotesMsg = document.createElement('li');
    noNotesMsg.className = 'no-notes-message';
    noNotesMsg.textContent = 'No notes yet. Add your first note above!';
    notesList.appendChild(noNotesMsg);
    return;
  }

  // If search finds nothing
  if (filteredNotes.length === 0 && searchTerm) {
    const noMatchMsg = document.createElement('li');
    noMatchMsg.className = 'no-notes-message';
    noMatchMsg.textContent = 'No notes match your search.';
    notesList.appendChild(noMatchMsg);
    return;
  }

  // Render each note
  filteredNotes.forEach(function (note) {
    const li = document.createElement('li');
    li.className = 'category-' + note.category;

    // Note text
    const textP = document.createElement('p');
    textP.className = 'note-text';
    textP.textContent = note.text;

    // Meta container
    const metaDiv = document.createElement('div');
    metaDiv.className = 'note-meta';

    // Category label
    const categorySpan = document.createElement('span');
    categorySpan.className = 'note-category-label';
    categorySpan.textContent = note.category.charAt(0).toUpperCase() + note.category.slice(1);

    // Date
    const dateSpan = document.createElement('span');
    dateSpan.className = 'note-date';
    dateSpan.textContent = note.createdAt;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function () {
      deleteNote(note.id);
    });

    metaDiv.appendChild(categorySpan);
    metaDiv.appendChild(dateSpan);
    metaDiv.appendChild(deleteBtn);

    li.appendChild(textP);
    li.appendChild(metaDiv);

    notesList.appendChild(li);
  });
}

// Update the note count message
function updateCount() {
  const count = notes.length;
  if (count === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (count === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = 'You have ' + count + ' notes.';
  }
}

// Add a note
function addNote(text, category) {
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };
  notes.unshift(newNote);
  saveNotes();
  render();
}

// Delete a note by id
function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}

// Clear all notes (bonus feature)
function clearAllNotes() {
  if (confirm('Delete all notes?')) {
    notes = [];
    saveNotes();
    render();
  }
}

// Validation
function validateNote(text) {
  if (!text || text.trim().length === 0) {
    errorMessage.textContent = 'Please type a note first.';
    return false;
  }
  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    return false;
  }
  return true;
}

// Form submit handler
noteForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const text = noteInput.value;
  const category = noteCategory.value;

  // Validate
  if (!validateNote(text)) {
    return;
  }

  // Clear error
  errorMessage.textContent = '';

  // Add the note
  addNote(text, category);

  // Clear input
  noteInput.value = '';
  noteInput.focus();
});

// Search handler
searchInput.addEventListener('input', function () {
  render();
});

// Clear all button handler
clearAllBtn.addEventListener('click', function () {
  clearAllNotes();
});

// Initialize - load notes from localStorage and render
loadNotes();
render();
