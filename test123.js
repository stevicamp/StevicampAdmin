//================IMG-Compression===============================================================================================
let canvas = document.createElement("canvas"); // reusable canvas
let ctx = canvas.getContext("2d");
let rotatedStep = 0; // 0 → 0°, 1 → 90°, 2 → 180°, 3 → 270°

async function compressImage(blobImg, newHeight, format, percent, smoothing, rotate, saturation, contrast, brightness) {
    // Create bitmap from blob
    const bitmap = await createImageBitmap(blobImg);

    // Calculate draw dimensions
    let drawWidth = bitmap.width;
    let drawHeight = bitmap.height;

    if (newHeight && Math.abs(bitmap.height - newHeight) > 1) {
        drawHeight = newHeight;
        drawWidth = Math.round(newHeight * (bitmap.width / bitmap.height));
    }

    // Update rotation step if rotation requested
    if (rotate) {
        rotatedStep = (rotatedStep + 1) % 4; // cycle 0 → 3
    }

    // Determine canvas size after rotation
    let canvasWidth, canvasHeight;
    if (rotatedStep % 2 === 0) { // 0° or 180°
        canvasWidth = drawWidth;
        canvasHeight = drawHeight;
    } else { // 90° or 270°
        canvasWidth = drawHeight;
        canvasHeight = drawWidth;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Reset transforms and set rotation
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Center origin for rotation
    ctx.translate(canvasWidth / 2, canvasHeight / 2);
    ctx.rotate(rotatedStep * Math.PI / 2);

      
    // Draw image centered
    ctx.drawImage(bitmap, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);

    // Export as data URL
    let dataUrl = canvas.toDataURL(`image/${format}`, percent / 100);
    return dataUrl;
}
