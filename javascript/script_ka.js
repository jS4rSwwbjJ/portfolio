//------ka------

const SIZE = 200;
const gallery = document.getElementById("js-ka");
const Kmodal = document.getElementById("js-Kmodal");
const modalImage = document.getElementById("Kmodal_img");
const WmodalClose = document.querySelector('#js-WmodalC');
const targetModalBackground = document.getElementById("js-cover");


// ------------------

let images = [];
fetch('http://127.0.0.1:5500/javascript/modal_data_ka.json')
  .then(response => response.json())
  .then(data => {
    images = data;
    images.forEach(file => {

    const img = new Image();
    img.src = `images/ka_images/${file}`;
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");

    gallery.appendChild(canvas);

    img.onload = () => {
      const fileName = file.replace(/\.[^.]+$/, "");
      console.log(fileName);
      
      // アスペクト比を維持した中央トリミング
      const scale = Math.max(
        SIZE / img.width,
        SIZE / img.height
      );

      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;

      // デフォルトは中央を基準にトリミング
      let x = (SIZE - drawWidth) / 2;
      let y = (SIZE - drawHeight) / 2;
      if (fileName.includes("_TOP")) {
        y = 0;
      } else if (fileName.includes("_BOTTOM")) {
        y = SIZE - drawHeight;
      }

      if (fileName.includes("_LEFT")) {
        x = 0;
      } else if (fileName.includes("_RIGHT")) {
        x = SIZE - drawWidth;
      }

      ctx.drawImage(
        img,
        x,
        y,
        drawWidth,
        drawHeight
      );

      canvas.addEventListener("click", () => {
        modalImage.src = img.src;
        Kmodal.classList.add("active");
        targetModalBackground.classList.add("active");
      });

      

    };
  });

  // [3]. のモーダル背景がクリックされた場合に is-active をはずしてモーダルをとじる
  targetModalBackground.addEventListener('click', (event) => {
    
    if(event.target.closest('.WModal') === null) {
      Kmodal.classList.remove("active");
      targetModalBackground.classList.remove("active");
    }
  });

  WmodalClose.addEventListener('click', (e) => {
    Kmodal.classList.remove("active");
    targetModalBackground.classList.remove("active");
  });

  })
  .catch(error => {
    console.error('エラー:', error);
  });