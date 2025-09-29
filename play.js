const videoData = JSON.parse(localStorage.getItem('current_video') || "{}");
if (!videoData || !videoData.name) {
  window.location.href = "index.html";
}
document.getElementById('video-title').textContent = videoData.title;
document.getElementById('video-date').textContent = new Date(videoData.date).toLocaleString('vi-VN');
// Liên kết video CHUẨN theo thư mục videos/
const src = "videos/" + videoData.name + ".mp4";
document.getElementById('video-player').src = src;

// Lưu và tăng view (vĩnh viễn)
const viewKey = "views_" + videoData.name;
let views = +(localStorage.getItem(viewKey) || 0);
views++;
localStorage.setItem(viewKey, views);
document.getElementById('video-views').textContent = views;

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