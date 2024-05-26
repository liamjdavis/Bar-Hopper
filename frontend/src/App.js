fetch('http://your-django-backend/api/your-models/')
    .then(response => response.json())
    .then(data => {
        // Handle the data
    })
    .catch(error => {
        // Handle errors
    });