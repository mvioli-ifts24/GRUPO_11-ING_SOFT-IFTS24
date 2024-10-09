document.querySelector('form').addEventListener('submit', submitReview)

function fetchReviews () {
    const JSON_Reviews = localStorage.getItem('reviews')
    const Reviews = JSON.parse(JSON_Reviews)
    return Reviews ?? []
}

function generateActionButton(label, action) {
    const button = document.createElement('button')
    button.textContent = label
    button.onclick = action
    return button
}

function generateActionsTD (review) {
    const td = document.createElement('td')
    const removeButton = generateActionButton("❌", () => removeReview(review))
    const editButton = generateActionButton("📝", () => editReview(review))
    const statusButton = generateActionButton("👁️", () => handleReviewStatus(review))
    td.append(removeButton, editButton, statusButton)
    return td
}

function refreshRenderReviews() {
    const tBody = document.querySelector('tbody')
    while (tBody.hasChildNodes()) tBody.removeChild(tBody.firstChild)
    const reviews = fetchReviews()
    for(review of reviews){
        const tr = document.createElement('tr')
        for(key in review){
            if(key === 'status') {
                review['status'] ? tr.classList.remove('disabledRow') : tr.classList.add('disabledRow')
                continue
            }
            const td = document.createElement('td')
            td.textContent = review[key]
            tr.appendChild(td)
        }
        tr.appendChild(generateActionsTD(review))
        tBody.appendChild(tr)
    }
}

function submitReview (event) {
    const formData = new FormData(event.target)
    const fieldValueDictionary = Object.fromEntries([...formData.entries()])
    const review = fieldValueDictionary.uuid.length ? updateReview(fieldValueDictionary) : insertReview(fieldValueDictionary)
    return review
}

function insertReview (review) {
    const savedReviews = fetchReviews()
    const uuidRandomlyGenerated = crypto.randomUUID()
    review.uuid = uuidRandomlyGenerated
    savedReviews.push({...review, status: true})
    localStorage.setItem('reviews', JSON.stringify(savedReviews))
    return review
}

function removeReview (review) {
    let savedReviews = fetchReviews()
    savedReviews = savedReviews.filter(savedReview => savedReview.uuid !== review.uuid)
    localStorage.setItem('reviews', JSON.stringify(savedReviews))
    return refreshRenderReviews()
}

function loadInputs (review) {
    const formInputs = [...document.querySelectorAll('input'), document.querySelector('textarea'), document.querySelector('select')]
    formInputs.forEach(formInput => formInput.value = review[formInput.name])
}

function updateReview (review) {
    const savedReviews = fetchReviews()
    const updatingReview = savedReviews.find(savedReview => savedReview.uuid === review.uuid)
    const indexOfReview = savedReviews.indexOf(updatingReview)
    savedReviews[indexOfReview] = {...review, status: updatingReview.status}
    localStorage.setItem('reviews', JSON.stringify(savedReviews))
    return refreshRenderReviews()
}

function editReview (review) {
    loadInputs(review)
    const form = document.querySelector('form')
    const formLegend = form.querySelector('legend')
    formLegend.textContent = `Editar registro (${review.uuid})`
}

function handleReviewStatus (review) {
    let savedReviews = fetchReviews()
    const updatingReview = savedReviews.find(savedReview => savedReview.uuid === review.uuid)
    const indexOfReview = savedReviews.indexOf(updatingReview)
    savedReviews[indexOfReview] = {...review, status: !review.status}
    localStorage.setItem('reviews', JSON.stringify(savedReviews))
    return refreshRenderReviews()
}

refreshRenderReviews()