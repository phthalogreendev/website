document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const img = new Image();
    img.onload = function() {
        const canvas = document.getElementById('imageCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the uploaded image onto the canvas
        ctx.drawImage(img, 0, 0);

        // Get the image data from the canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Apply green filter
        for (let i = 0; i < data.length; i += 4) {
            // data[i] is the red channel
            // data[i + 1] is the green channel
            // data[i + 2] is the blue channel
            // data[i + 3] is the alpha channel
            data[i] = 0; // Set red channel to 0
            data[i + 2] = 0; // Set blue channel to 0
        }

        // Put the modified image data back on the canvas
        ctx.putImageData(imageData, 0, 0);
    };

    const reader = new FileReader();
    reader.onload = function(e) {
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});
