const imageContainer = document.getElementById("image-container"),
      loader = document.getElementById("loader"),
      apiKey = "G2ioxrCszfRyJ9JTc_Ui13TBJlvHChS-kVf51fwBSwE";
 
let photosArray = [];
let ready = false,
    imagesLoaded = 0,
    totalImages = 0,
    initialLoad = true,
    count,
    apiUrl;
    

//
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
       
    }
}

// Helper Function to set attributes on DOM Element

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}


// Create elements for links and photos and add it to the DOM
function displayPhotos(){
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement("a");
  
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        });

        // Create <img> for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Event listener for loaded images
        img.addEventListener("load", imageLoaded);


        // Put <img> inside <a> then both inside imageContainer Element:
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

// Get Photos from Unsplash API
async function getPhotos() {
    try {
        if (initialLoad) {
            count = 5;
        } else {
            count = 10;
        }

        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

        initialLoad = false;
        const res = await fetch(apiUrl);
        photosArray = await res.json();
        displayPhotos();
    } catch(error){

    }
}

getPhotos();

// Check if scroll is near and so load new photos

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        imagesLoaded = 0;
        
        getPhotos();
    }
});