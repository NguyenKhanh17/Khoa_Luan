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

//************************************************************************************************************** */
// Hàm show đồ thị
$(document).ready(function() {
    $('#dataTable').DataTable({
        data: [
            [1, 'Data 1', 10],
            [2, 'Data 2', 15],
            [3, 'Data 3', 25],
        ],
        columns: [
            { title: "ID" },
            { title: "Name" },
            { title: "Value" }
        ]
    });

    // Lấy giá trị từ các trường input và thuật toán khi nhấn nút "Run Model Dashboard"
    $('#runModel_dashboard').on('click', function() {
        const firstDay = $('#input1').val();
        const lastDay = $('#input2').val();
        const id = $('#input3').val();
        const algorithm = $('#algorithm').val();

        console.log({
            id: id,
            first_day: firstDay,
            last_day: lastDay,
            algorithm: algorithm
        });

        // Ẩn thông báo lỗi trước khi gửi yêu cầu
        $('#error-message').hide();

        // Kiểm tra xem tất cả các trường có được điền đầy đủ không
        if (!firstDay || !lastDay || !id) {
            showPopup("Please fill in all the information.");
            return;
        }

        // Hiển thị hiệu ứng loading
        $('#loading-container').show();

        // Gửi yêu cầu đến API
        $.ajax({
            url: '/run_dashboard',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                id: id,
                first_day: firstDay,
                last_day: lastDay,
                algorithm: algorithm
            }),
            success: function(response) {
                // Thêm tham số ngẫu nhiên vào URL để tải lại hình ảnh
                const timestamp = new Date().getTime(); // Lấy thời gian hiện tại
                $('#donutImage').attr('src', response.donut_image + '?t=' + timestamp);
                $('#barchartImage').attr('src', response.barchart_image + '?t=' + timestamp);
                $('#dfiImage').attr('src', response.dfi_image + '?t=' + timestamp);
                $('#weightImage').attr('src', response.weight_image + '?t=' + timestamp);
            },
            error: function(xhr) {
                // Ẩn hiệu ứng loading khi có lỗi
                $('#loading-container').hide();

                const errorMessage = xhr.responseJSON ? xhr.responseJSON.error : "An error occurred.";
                console.error("Error:", xhr);

                // Hiển thị lỗi trong pop-up
                showPopup(errorMessage);
            },
            complete: function() {
                // Ẩn hiệu ứng loading khi hoàn tất
                $('#loading-container').hide();
            }
        });
    });
});


function showPopup(message) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `<div class="popup-content">
                        <span class="close-btn">&times;</span>
                        <p>${message}</p>
                    </div>`;
    document.body.appendChild(popup);

    // Close pop-up when clicking "X"
    popup.querySelector(".close-btn").addEventListener("click", function() {
        popup.remove();
    });
}


//************************************************************************************************************** */
// //Chuyển input
function fetchDataAndRenderChart() {
    fetch('/run')  // Gọi đến route /run với phương thức GET
        .then(response => response.json())
        .then(data => {
            console.log('Received data:', data);
            // Chỉnh sửa để lấy dữ liệu từ mảng data
            const first_day = parseInt(data[0][0]);  // Lấy first_day từ mảng
            const last_day = parseInt(data[0][1]);   // Lấy last_day từ mảng
            const id = parseInt(data[0][2]);          // Lấy id từ mảng
            const algorithm = data[0][3];             // Lấy algorithm từ mảng

            console.log({
                id: id,
                first_day: first_day,
                last_day: last_day,
                algorithm: algorithm
            });
    
            // Ẩn thông báo lỗi trước khi gửi yêu cầu
            $('#error-message').hide();
    
            // Kiểm tra xem tất cả các trường có được điền đầy đủ không
            if (!first_day || !last_day || !id) {
                showPopup("Please fill in all the information.");
                return;
            }
    
            // Hiển thị hiệu ứng loading
            $('#loading-container').show();
    
            $.ajax({
                url: '/run_dashboard',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: id,
                    first_day: first_day,
                    last_day: last_day,
                    algorithm: algorithm
                }),
                success: function(response) {
                    // Thêm tham số ngẫu nhiên vào URL để tải lại hình ảnh
                    const timestamp = new Date().getTime(); // Lấy thời gian hiện tại
                    $('#donutImage').attr('src', response.donut_image + '?t=' + timestamp);
                    $('#barchartImage').attr('src', response.barchart_image + '?t=' + timestamp);
                    $('#dfiImage').attr('src', response.dfi_image + '?t=' + timestamp);
                    $('#weightImage').attr('src', response.weight_image + '?t=' + timestamp);
                },
                error: function(xhr) {
                    // Ẩn hiệu ứng loading khi có lỗi
                    $('#loading-container').hide();
    
                    const errorMessage = xhr.responseJSON ? xhr.responseJSON.error : "An error occurred.";
                    console.error("Error:", xhr);
    
                    // Hiển thị lỗi trong pop-up
                    showPopup(errorMessage);
                },
                complete: function() {
                    // Ẩn hiệu ứng loading khi hoàn tất
                    $('#loading-container').hide();
                }
            });
        })
        .catch(error => console.error("Error:", error));
}

$(document).ready(function() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('runModel')) {
        console.log("Running fetchDataAndRenderChart on dashboard page load");
        fetchDataAndRenderChart();
    }
});
