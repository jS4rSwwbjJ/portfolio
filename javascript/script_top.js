//------youtubeモーダルウィンドウ------
// 参考:https://tedate.jp/javascript/to-automatically-play-videos-when-opening-the-modal
// ローカル環境だとエラーになる。サーバー経由(vscode go live)で確認できる。

// [1]. Youtube IFrame Player APIの読込_ページ内のscriptタグの前に動的に読込ませる仕様
let makeScriptTag = document.createElement('script');
makeScriptTag.src = "https://www.youtube.com/iframe_api";
let asyncScriptTag = document.getElementsByTagName('script')[0];
asyncScriptTag.parentNode.insertBefore(makeScriptTag, asyncScriptTag);

// [2]. Youtube IFrame Player APIが実行してくれる関数の定義_ここで動画に関する情報を設定する
let targetPlayer;
function onYouTubeIframeAPIReady() {
  targetPlayer = new YT.Player('targetPlayer', {
    height: '380px',
    width: '676px',
    videoId: 'M7lc1UVf-VE', // 再生したい動画のID11桁
    playerVars: {
    rel: 0,
    origin: window.location.origin
  },
    events: {
      'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    }
  });
}
// [3]. 再生準備ができたら再生ボタンを活性化する
function onPlayerReady(event) {
  movieTrigger.classList.add('is-ready');
  // event.target.playVideo();
}

// [4]. ページ内の各要素をquerySelectorで指定して変数に格納
const movieTrigger = document.querySelector('#movie-trigger');
const movieDialog = document.querySelector('.movie-dialog');
const movieDialogBackground = document.querySelector('.movie-dialog-background');
const movieClose = document.querySelector('#js-play_movC');


// [5]. モーダルを開くボタンを押した時の挙動を定義
if (movieTrigger !== null) // 要素が存在するなら
movieTrigger.addEventListener('click', (e) => {
  movieDialog.classList.add('is-show');
  movieDialogBackground.classList.add('is-show');
  targetPlayer.mute();
  targetPlayer.playVideo();
});
// [6]. モーダルを閉じる挙動を定義
if (movieDialogBackground !== null) // 要素が存在するなら
movieDialogBackground.addEventListener('click', (e) => {
  movieDialog.classList.remove('is-show');
  movieDialogBackground.classList.remove('is-show');
  targetPlayer.stopVideo();
});
if (movieClose !== null) // 要素が存在するなら
movieClose.addEventListener('click', (e) => {
  movieDialog.classList.remove('is-show');
  movieDialogBackground.classList.remove('is-show');
  targetPlayer.stopVideo();
});


//------mail copy button------
// 複数の同じクラス名要素(copy_btnは2か所)に同じ処理
const copy_buttons = document.getElementsByClassName('copy_btn');
const copy_txt = document.getElementById('js-copy-txt'); 
let Ctimer;

Array.from(copy_buttons).forEach( copy_button => {
  copy_button.addEventListener('click', (event) => {
    try {
      navigator.clipboard.writeText("tokotokopent@gmail.com");
      copy_txt.innerHTML = "<p>メールアドレスをコピーしました</p>";
    } catch(err) {
      copy_txt.innerHTML = "<p>この環境はコピーに対応していません</p>";
    }
    copy_txt.classList.add('active');
    Ctimer = setTimeout(() => copy_txt.classList.remove("active"), 950);
  });
});

//------mail list copy button------
const copy_list_button = document.querySelector('.contact_list_copy');
copy_list_button.addEventListener('click', (event) => {
  try {
    navigator.clipboard.writeText(
       `■制作内容（媒体や使用期間など）
■使用目的
■仕様、納品形態
■納期までのスケジュール
■ご予算（ご予算に合った最適な内容をこちらからご提案もできるため、ぜひご連絡ください）
■ご連絡先（会社名、住所、ご担当者のお名前）` 
      );
      copy_txt.innerHTML = "<p>概要リストをコピーしました</p>";
  } catch(err) {
    copy_txt.innerHTML = "<p>この環境はコピーに対応していません</p>";
  }
  copy_txt.classList.add('active');
  Ctimer = setTimeout(() => copy_txt.classList.remove("active"), 950);
});

// clearTimeout(Ctimer);

//   nav.classList.add('active');
//   nav_cover.classList.add('active');
// });
// // closeボタン
// hamC.addEventListener('click', function () { 
//   // ham.classList.remove('active');// ハンバーガーメニューにactiveクラスを付け外し
//   nav.classList.remove('active');
//   nav_cover.classList.remove('active');
// });


