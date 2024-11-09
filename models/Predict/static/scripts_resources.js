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

// Upload file
document.getElementById("upload-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Upload successful!") {
            // Display successful pop-up message
            showPopup("Upload successful!");
        } else {
            // Display error pop-up message
            showPopup(data.error || "An error occurred.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showPopup("An error occurred.");
    });
});

// Hàm hiển thị pop-up
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

//*************************************************************************************************************************
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

// Load default data
document.getElementById('default-data-button').addEventListener('click', function() {
    this.classList.toggle('active'); // Thay đổi trạng thái của nút
});
