$(document).ready(function() {
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Fetch Daily Fact from Numbers API
    $.ajax({
        url: 'http://numbersapi.com/1/30/date?json',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#fact-content').html('<p>' + data.text + '</p>');
            $('#fact-content').append('<small class="text-muted">Powered by numbersapi.com</small>');
        },
        error: function(xhr, status, error) {
            $('#fact-content').html('<p>Could not load today\'s fact. Please try again later.</p>');
            console.error('Error fetching from numbersapi.com:', error);
        }
    });

    // Initialize animation for sections
    function animateSections() {
        $('.animate-on-scroll').each(function() {
            var position = $(this).offset().top;
            var scrollPosition = $(window).scrollTop() + $(window).height() - 100;
            
            if (position < scrollPosition) {
                $(this).addClass('visible');
            }
        });
    }
    
    // Add animate-on-scroll class to elements
    $('section:not(.hero-section)').addClass('animate-on-scroll');
    
    // Run on page load and scroll
    animateSections();
    $(window).scroll(animateSections);

    // Image Upload Functionality
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const progressBar = document.querySelector('.progress-bar');
    const progressDiv = document.getElementById('uploadProgress');
    const imageGallery = document.getElementById('imageGallery');
    const uploadedImagesSection = document.getElementById('uploadedImages');

    // Click to select files
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', handleFiles);

    // Drag and drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('dragover');
        }, false);
    });

    uploadArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (!files || files.length === 0) return;
        
        if (typeof files === 'object' && files.target) {
            files = files.target.files;
        }
        
        // Show progress
        progressDiv.classList.remove('d-none');
        progressBar.style.width = '0%';
        
        // Upload each file
        for (let i = 0; i < files.length; i++) {
            uploadFile(files[i]);
        }
    }

    function uploadFile(file) {
        // Check if it's an image
        if (!file.type.match('image.*')) {
            alert('Only image files are allowed');
            progressDiv.classList.add('d-none');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        // Update progress indicator
        progressBar.style.width = '50%';

        // Send the file to the server
        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            progressBar.style.width = '100%';
            
            // Display the uploaded image
            displayImage(data.filePath, file.name);
            
            // Hide progress after a delay
            setTimeout(() => {
                progressDiv.classList.add('d-none');
            }, 1000);
        })
        .catch(error => {
            console.error('Error:', error);
            progressDiv.classList.add('d-none');
            alert('Error uploading file: ' + error.message);
        });
    }

    function displayImage(filePath, fileName) {
        // Show uploaded images section
        uploadedImagesSection.style.display = 'block';
        
        // Create image item
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';
        
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        
        const img = document.createElement('img');
        img.src = filePath;
        img.alt = fileName;
        
        imageItem.appendChild(img);
        col.appendChild(imageItem);
        imageGallery.appendChild(col);
    }

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 70
        }, 500, 'linear');
    });
}); 