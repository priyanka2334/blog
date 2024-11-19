// Event listener for toggling the form visibility
document.getElementById('create-post-btn').addEventListener('click', function() {
    const form = document.getElementById('blog-form');
    form.classList.toggle('hidden');
    
    // Clear form fields when opening the form for a new blog
    if (!form.classList.contains('hidden')) {
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
        document.getElementById('post-image').value = '';  // Reset the file input
    }
});

// Event listener for form submission
document.getElementById('blog-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const image = document.getElementById('post-image').files[0];
    
    if (title && content) {
        const reader = new FileReader();
        reader.onloadend = function () {
            const imageUrl = reader.result;

            const newPost = document.createElement('div');
            newPost.classList.add('blog-post');
            
            newPost.innerHTML = `
                <img src="${imageUrl}" alt="Post Image">
                <h2>${title}</h2>
                <p>${content}</p>
            `;
            
            document.getElementById('blog-posts').appendChild(newPost);

            // After creating the post, hide the form and clear its content
            document.getElementById('blog-form').classList.add('hidden');
            document.getElementById('post-title').value = '';
            document.getElementById('post-content').value = '';
            document.getElementById('post-image').value = '';
        };
        
        if (image) {
            reader.readAsDataURL(image);
        } else {
            alert('Please upload an image.');
        }
    } else {
        alert('Please fill in both the title and content.');
    }
});