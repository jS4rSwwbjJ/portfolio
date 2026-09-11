

// header、footer

//------ハンバーガーメニュー------
const ham = document.querySelector('#js-hamburger'); //js-hamburgerの要素を取得し、変数hamに格納
const hamC = document.querySelector('#js-hamburgerC');
const nav = document.querySelector('#js-nav');
const nav_cover = document.querySelector('#js-cover'); 
// ka
const Kbuttonsp = document.querySelector('.target-button');
const video1SP = document.querySelector('.Kvideo-1SP');
const video2SP = document.querySelector('.Kvideo-2SP');
let nav_timer = null;

ham.addEventListener('click', function () { //ハンバーガーメニューをクリックしたら
  // console.log('ok!'); // コンソール画面でokというメッセージが出る
  // ham.classList.add('active');// ハンバーガーメニューにactiveクラスを付け外し
  nav.classList.add('active');
  nav_cover.classList.add('active');
  // ka
  nav_timer = setTimeout(() => {
      video1SP.style.display = 'block';
      video1SP.currentTime = 0;
      video1SP.play();
  }, 2000);
});
// closeボタン
hamC.addEventListener('click', function () { 
  // ham.classList.remove('active');// ハンバーガーメニューにactiveクラスを付け外し
  nav.classList.remove('active');
  nav_cover.classList.remove('active');
  // ka
  clearTimeout(timer);
  timer = null;
  video1SP.style.display = 'none';
  video2SP.style.display = 'none';
});


//------sp時nav表示中に欄外クリックで閉じる------

nav_cover.addEventListener('click', (event) => {
  // console.log(event.target);
  if(event.target.closest('#js-nav') === null) {
    nav.classList.remove('active');
    nav_cover.classList.remove('active');
    // ka
    clearTimeout(timer);
    timer = null;
    video1SP.style.display = 'none';
    video2SP.style.display = 'none';
  }
});

//------スクロールに応じてhedderデザインを変更------
// const header = document.querySelector(".border_wrap");
// window.addEventListener("scroll", () => {
//   if (window.scrollY > 50) {
//     header.classList.add("scrolled");
//   } else {
//     header.classList.remove("scrolled");
//   }
// });

// ======================= ka PC =======================

const Kbuttonpc = document.querySelector('#js-KbtnPC');
const video1PC = document.querySelector('.Kvideo-1PC');
const video2PC = document.querySelector('.Kvideo-2PC');

let timer = null;

// video1PCを一度表示したかどうか
let video1PCShown = false;

// ボタンにホバー
Kbuttonpc.addEventListener('mouseenter', () => {
    // 10秒後にvideo1PCを表示
    timer = setTimeout(() => {
        video1PC.style.display = 'block';
        video1PC.currentTime = 0;
        video1PC.play();

        // flagを立てる
        video1PCShown = true;
        // video2PCを表示
        video2PC.style.display = 'block';
        video2PC.style.opacity = '0';

    }, 1000);

});

// ボタンからマウスを離す
Kbuttonpc.addEventListener('mouseleave', () => {
    clearTimeout(timer);
    timer = null;
});

// video1PCの再生終了
video1PC.addEventListener('ended', () => {
    // video1PCを非表示
    video1PC.style.display = 'none';
});

// video2PCにマウスが入った
video2PC.addEventListener('mouseenter', () => {
    // flagが立っていなければ何もしない
    if (!video1PCShown) {
        return;
    }

    video2PC.currentTime = 0;
    video2PC.style.opacity = '1';
    video2PC.play();
});

// video2PCからマウスが出た
video2PC.addEventListener('mouseleave', () => {
    video2PC.pause();
    video2PC.style.opacity = '0';
    video2PC.currentTime = 0;
});



// ======================= ka SP =======================

video1SP.addEventListener('ended', () => {
    // video1を非表示
    video1SP.style.display = 'none';
    video2SP.style.display = 'block';
});