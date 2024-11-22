const colorThief = new ColorThief();
const img = document.querySelector('.img-content img');

function change_palette() {
  var palette = colorThief.getPalette(img, 2);
  console.log(palette);
  document.documentElement.style.setProperty("--primary-accent", "rgb(" + palette[0] +")");

}

// Make sure image is finished loading
if (img.complete) {
  change_palette();
}

else {
  img.addEventListener('load', () => {
    change_palette();
  });
}