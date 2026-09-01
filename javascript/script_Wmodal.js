//------works モーダル表示------

// 参考:https://tedate.jp/javascript/to-change-content-when-opening-a-modal-by-the-clicked-element
// [1].ページ内のクリック元の要素をすべて取得
const targetModalTrigger = document.querySelectorAll(".WModal_trigger");// [2].モーダル本体を取得
const targetModalElement = document.querySelector(".WModal");
const targetModalBackground = document.getElementById("js-cover");
const targetModalHeading = document.querySelector(".WModal_title");
const targetModalmainMedia = document.querySelector(".WModal_mainMedia");
const targetModalDescription = document.querySelector(".WModal_tag_items");
const targetModalTxt = document.querySelector(".WModal_txt");
const targetModalNote = document.querySelector(".WModal_note");
const targetModalNoteY = document.querySelector(".WModal_note_year");
const targetModalsubImgs = document.querySelector(".WModal_subImgs");
const WmodalClose = document.querySelector('#js-WmodalC');


// json(外部)データ取得
// javascript/works_modal_data.json　ローカルだとブラウザのセキュリティ的にエラーになる。live serverでjsonのアドレスを取得↓　htmlもjsonと同じブラウザで開く
let targetModalArray = [];
fetch('http://127.0.0.1:5500/javascript/modal_data_works.json')
  .then(response => response.json())
  .then(data => {
    targetModalArray = data;
    /**
     * NOTE: 上記[1].で取得したクリック元に対してclickイベント監視。data属性と照合してコンテンツ用の配列から値を取得する
     */
    targetModalTrigger.forEach((element) => {
      element.addEventListener("click", (event) => {
        // スクロールリセット
        targetModalElement.scrollTop = 0;
        const nowClickedElement = event.target;
        const nowClickedKey = Number(element.dataset.key);
        // [5].関数を定義。クリックされた対象のデータ属性data-keyの値を比較する。その判定結果をreturn。
        // この関数をfindに与えてあげれば、判定結果により、コンテンツ用の配列内で一致したところの値を取得できると言う仕組み
        function getModalContent(clicked) {
          return clicked.id == nowClickedKey;
        }
        // 上記の関数を find() に渡す。クリック元のdata属性と一致したidをもつコンテンツが取得できる。
        const resultModalContent = targetModalArray.find(item => item.id === nowClickedKey);
        // 取得したコンテンツを、[4].で取得したモーダル内の各要素に代入する
        targetModalHeading.textContent = resultModalContent.title;
        //main media
        switch (resultModalContent.mediaType) {
          // 画像
          case "image":
            targetModalmainMedia.innerHTML = `
              <img
                src="${resultModalContent.mediaSrc}"
                alt="${resultModalContent.title}">
            `;
            break;

          // YouTube
          case "youtube":
            targetModalmainMedia.innerHTML = `
              <iframe
                src="https://www.youtube.com/embed/${resultModalContent.mediaSrc}"
                allowfullscreen frameborder="0" >
              </iframe>
            `;
            break;
            // case "youtube":
            // targetModalmainMedia.innerHTML = `
            //   <iframe
            //     src="https://www.youtube.com/embed/${resultModalContent.videoId}"
            //     title="${resultModalContent.title}"
            //     allowfullscreen>
            //   </iframe>
            // `;
            // break;

          // 自前動画
          case "video":
            targetModalmainMedia.innerHTML = `
              <video
                controls
                playsinline
                poster="${resultModalContent.poster || ''}"
              >
                <source
                  src="${resultModalContent.mediaSrc}"
                  type="video/mp4">
              </video>
            `;
            break;
        }
        // 配列の個数分pタグを作成
        targetModalDescription.innerHTML = resultModalContent.Wtag
          .map(tag => `<p>${tag}</p>`)
          .join("");
        targetModalTxt.textContent = resultModalContent.Wtxt;
        targetModalNote.innerHTML = resultModalContent.Wnote
          .map(note => `<p>${note}</p>`)
          .join("");
        targetModalNoteY.textContent = resultModalContent.WnoteY;
        targetModalsubImgs.innerHTML = resultModalContent.WsubImg
          .map(src => `<img src="${src}" alt="">`)
          .join("");
        // [2]. と [3]. で取得しておいたモーダル本体と背景に is-active を付与して表示する
        targetModalElement.classList.add("active");
        targetModalBackground.classList.add("active");
        
      });
    });
  })
  .catch(error => {
    console.error('エラー:', error);
  });



// [3]. のモーダル背景がクリックされた場合に is-active をはずしてモーダルをとじる
targetModalBackground.addEventListener('click', (event) => {
  
  if(event.target.closest('.WModal') === null) {
    targetModalElement.classList.remove("active");
    targetModalBackground.classList.remove("active");
    // yotuube再生停止
    targetModalmainMedia.innerHTML = "";
  }
});

WmodalClose.addEventListener('click', (e) => {
  targetModalElement.classList.remove("active");
  targetModalBackground.classList.remove("active");
  // yotuube再生停止
  targetModalmainMedia.innerHTML = "";
});
