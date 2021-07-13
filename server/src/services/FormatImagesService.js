module.exports = {
  async getImage(page){
    const image = await page.evaluate(() => {
      const allImagesFromDOM = document.querySelectorAll(".rg_i");
      let arrayOfAllImages = [...allImagesFromDOM];

      arrayOfAllImages = arrayOfAllImages.slice(0, 6);

      const generateIndexAleatory = Math.floor( Math.random() * arrayOfAllImages.length );
      
      const imageReturned = {
        src: arrayOfAllImages[generateIndexAleatory].src,
      };

      return imageReturned;
    });

    return image;
  }
}