export default async function resizeImage(file, width = 1024, height = 1024) {
    const image = new Image();
    image.src = URL.createObjectURL(file);
  
    const blob = await new Promise((resolve, reject) => {
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
  
        // Set the canvas dimensions to the target dimensions
        canvas.width = width;
        canvas.height = height;
  
        // Calculate the position and size of the image on the canvas
        const widthRatio = width / image.width;
        const heightRatio = height / image.height;
        const ratio = Math.min(widthRatio, heightRatio);
  
        const drawWidth = image.width * ratio;
        const drawHeight = image.height * ratio;
  
        const drawX = (width - drawWidth) / 2;
        const drawY = (height - drawHeight) / 2;
  
        // Clear the canvas and draw the image centered on the canvas
        context.clearRect(0, 0, width, height);
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  
        canvas.toBlob((blob) => {
          blob.name = file.name;
          resolve(blob);
        }, file.type);
      };
      image.onerror = reject;
    });
  
    return blob;
  }