function openModal(modalId, contentType) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
    document.querySelector('.container').classList.add('modal-open');
    fetchContent(modalId, contentType);
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
    document.body.classList.remove('modal-open');
    document.querySelector('.container').classList.remove('modal-open');
}

function fetchContent(modalId, contentType) {
    var contentId = modalId + '-content';
    var contentElement = document.getElementById(contentId);
    var filePath = `../reflections/${contentType}/${modalId}.md`;

    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            // Parse the markdown content into semantic HTML
            const htmlContent = marked.parse(data);

            // Optional: sanitize the content to prevent XSS
            // contentElement.innerHTML = DOMPurify.sanitize(htmlContent);
            
            // Render the semantic HTML inside the container
            contentElement.innerHTML = htmlContent;
        })
        .catch(error => {
            contentElement.innerHTML = 'Error loading content.';
            console.error('Error fetching content:', error);
        });
}

