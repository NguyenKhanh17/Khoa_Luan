//Chuyển input
function runModelData() {
    const first_day = document.getElementById('input-first-day').value;
    const last_day = document.getElementById('input-last-day').value;
    const id = document.getElementById('input-id').value;
    const algorithm = document.getElementById('algorithm-select').value;

    // Kiểm tra điều kiện input
    if (!first_day || !last_day || !id || !algorithm) {
        showPopup("Vui lòng điền đầy đủ thông tin."); // Hiển thị popup nếu có trường trống
        return; // Dừng hàm nếu có trường trống
    }

    fetch('/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_day, last_day, id, algorithm })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // Chuyển hướng sang trang dashboard
        window.location.href = '/dashboard?runModel=true';
    })
    .catch(error => {
        console.error('Error:', error);
        showPopup('Có lỗi xảy ra. Vui lòng thử lại.');
    });
}

// Hàm hiển thị popup
function showPopup(message) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `<div class="popup-content">
                           <span class="close-btn">&times;</span>
                           <p>${message}</p>
                       </div>`;
    document.body.appendChild(popup);

    // Đóng pop-up khi nhấn nút "X"
    popup.querySelector(".close-btn").addEventListener("click", function() {
        popup.remove();
    });
}

// JavaScript để thêm class 'active' cho mục hiện tại
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.navbar-menu a');

    menuItems.forEach((item) => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
        }
    });
});


//************************************************************************************************************** */
// Thay đổi ngôn ngữ
// Kiểm tra Local Storage để xem ngôn ngữ đã được lưu chưa
window.onload = function() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const languageSelect = document.getElementById('language-select');
    
    // Nếu có ngôn ngữ đã lưu, cập nhật thanh chọn ngôn ngữ mà không tải lại trang
    if (savedLanguage && savedLanguage !== languageSelect.value) {
        languageSelect.value = savedLanguage;
    }

    // Lắng nghe sự kiện khi người dùng thay đổi ngôn ngữ
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = languageSelect.value;
        localStorage.setItem('selectedLanguage', selectedLanguage);

        // Chỉ tải lại trang nếu ngôn ngữ thay đổi
        if (savedLanguage !== selectedLanguage) {
            updateLanguage(selectedLanguage);
        }
    });
}

// Hàm cập nhật giao diện dựa trên ngôn ngữ đã chọn
function updateLanguage(language) {
    // Tải lại trang để áp dụng ngôn ngữ mới
    location.reload();
}





