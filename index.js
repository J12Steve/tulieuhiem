// Danh sách video, sửa lại nếu bạn thêm file mới (chỉ cần thay đổi mảng này)
const videos = [
  { name: "vd2", title: "Gay cả đám 2", date: "2025-09-29T20:06:00", size: 1644 },
  { name: "7055881323875", title: "Gay cả đám 1", date: "2025-09-29T20:06:00", size: 1468 },
  { name: "7055904370012", title: "Em Ý bị cưỡng hiếp ở khách sạn đà lạt", date: "2025-09-29T20:04:00", size: 415 },
  { name: "vd1", title: "vd1", date: "2025-09-29T19:44:00", size: 22197 }
];

// Lấy lượt xem từ localStorage (vĩnh viễn)
function getViews(name) {
  return +(localStorage.getItem('views_' + name) || 0);
}

function renderList() {
  const search = document.getElementById('search').value.toLowerCase();
  const filter = document.getElementById('filter').value;
  let filtered = videos.filter(v =>
    v.title.toLowerCase().includes(search)
  );
  if (filter === "date") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (filter === "views") {
    filtered.sort((a, b) => getViews(b.name) - getViews(a.name));
  } else if (filter === "name") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }
  const container = document.getElementById('video-list');
  container.innerHTML = "";
  if (filtered.length === 0) {
    container.innerHTML = `<div style="color:#1976d2;font-size:1.2em;">Không tìm thấy video nào.</div>`;
    return;
  }
  filtered.forEach(v => {
    const span = document.createElement('div');
    span.className = "video-span";
    span.onclick = () => {
      // Lưu thông tin video vào localStorage cho play.html
      localStorage.setItem('current_video', JSON.stringify(v));
      window.location.href = "play.html";
    };
    span.innerHTML = `
      <div class="video-title">${v.title}</div>
      <div class="video-date">🗓 ${formatDate(v.date)}</div>
      <div class="video-views">👁 ${getViews(v.name)} lượt xem</div>
      <div class="video-size">💾 ${formatSize(v.size)}</div>
    `;
    container.appendChild(span);
  });
}
function formatDate(dt) {
  let d = new Date(dt);
  return d.toLocaleString('vi-VN');
}
function formatSize(kb) {
  if (kb > 1024) return (kb/1024).toFixed(2) + " MB";
  return kb + " KB";
}
document.getElementById('search').oninput = renderList;
document.getElementById('filter').onchange = renderList;
renderList();

// Chặn F12 và chuột phải trên PC
if (!/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent)) {
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.onkeydown = function(e) {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
      e.preventDefault();
      return false;
    }
  };
}