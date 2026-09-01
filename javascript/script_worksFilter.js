

// ------works filter------
// fetchがローカル環境だとエラーになるため一時的に非表示

const checkboxes = document.querySelectorAll('.tag_list input');
const allCheckbox = document.querySelector('#js-filter-all');
const items = document.querySelectorAll('.works_item');
const noResults = document.querySelector('#js-no-results');

const loadMoreBtn = document.querySelector('#js-load-more');

let filteredItems = [];
let currentCount = 4;
const STEP = 4;



// フィルター本体
function filterItems() {

  const selected = [...checkboxes]
    .filter(cb => cb !== allCheckbox && cb.checked)
    .map(cb => cb.value);

  if (selected.length === 0) {
    allCheckbox.checked = true;
    filteredItems = [...items];
  } else {
    allCheckbox.checked = false;

    filteredItems = [...items].filter(item => {
      const tags = item.dataset.tags.trim().split(/\s+/);
      return selected.every(tag => tags.includes(tag));
    });
  }

  currentCount = 4;
  render();

  // スクロールtopへ
  window.scrollTo({ top: 0, behavior: 'smooth' });
}



// 表示制御
function render() {

  items.forEach(i => i.style.display = 'none');

  filteredItems.forEach((item, i) => {
    if (i < currentCount) item.style.display = '';
  });

  noResults.style.display = filteredItems.length ? 'none' : 'flex';

  loadMoreBtn.style.display =
    currentCount >= filteredItems.length ? 'none' : 'flex';
}

// checkboxイベント
checkboxes.forEach(cb => {

  cb.addEventListener('change', () => {

    if (cb === allCheckbox) {

      if (allCheckbox.checked) {
        checkboxes.forEach(c => {
          if (c !== allCheckbox) c.checked = false;
        });
      } else {
        allCheckbox.checked = true;
      }

    }

    filterItems();
  });
});

// Load More
loadMoreBtn.addEventListener('click', () => {
  currentCount += STEP;
  render();
});



// 初期表示
filterItems();

// カード内tag
const worksTags = document.querySelectorAll('.tag');

worksTags.forEach(tag => {
  tag.addEventListener('click', () => {

    const value = tag.dataset.tag;

    const target = [...checkboxes]
      .find(cb => cb.value === value);
    if (!target) return;

    // ALL解除
    allCheckbox.checked = false;

    // 全チェックOFF
    checkboxes.forEach(cb => {
      if (cb !== allCheckbox) cb.checked = false;
    });

    // 該当タグだけON
    target.checked = true;

    filterItems();
  });
});

// topページからタグクリック遷移
const params = new URLSearchParams(window.location.search);
const urlTag = params.get('tag');

if (urlTag) {

  const target = [...checkboxes]
    .find(cb => cb.value === urlTag);

  if (target) {

    // ALL解除
    allCheckbox.checked = false;

    // 全OFF
    checkboxes.forEach(cb => {
      if (cb !== allCheckbox) cb.checked = false;
    });

    // 対象ON
    target.checked = true;
  }
}
