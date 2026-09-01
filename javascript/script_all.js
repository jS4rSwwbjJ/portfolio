// loading
let Ltimer;
window.onload = function () {
  const spinner = document.getElementById("js-loading");
  spinner.classList.add("loaded");
  Ltimer = setTimeout(() => spinner.classList.add("end"), 600);
};

// header、footer

//------ハンバーガーメニュー------
const ham = document.querySelector('#js-hamburger'); //js-hamburgerの要素を取得し、変数hamに格納
const hamC = document.querySelector('#js-hamburgerC');
const nav = document.querySelector('#js-nav');
const nav_cover = document.querySelector('#js-cover'); 

ham.addEventListener('click', function () { //ハンバーガーメニューをクリックしたら
  // console.log('ok!'); // コンソール画面でokというメッセージが出る
  // ham.classList.add('active');// ハンバーガーメニューにactiveクラスを付け外し
  nav.classList.add('active');
  nav_cover.classList.add('active');
});
// closeボタン
hamC.addEventListener('click', function () { 
  // ham.classList.remove('active');// ハンバーガーメニューにactiveクラスを付け外し
  nav.classList.remove('active');
  nav_cover.classList.remove('active');
});


//------sp時nav表示中に欄外クリックで閉じる------

nav_cover.addEventListener('click', (event) => {
  // console.log(event.target);
  if(event.target.closest('#js-nav') === null) {
    nav.classList.remove('active');
    nav_cover.classList.remove('active');
  }
});

//------スクロールに応じてhedderデザインを変更------
const header = document.querySelector(".border_wrap");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
