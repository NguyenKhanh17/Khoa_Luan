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

                // Hiển thị nút "Export PDF" nếu tải thành công
                $('#exportPDF').show();
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

document.getElementById("exportPDF").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const firstDay = document.getElementById("input1").value;
    const lastDay = document.getElementById("input2").value;
    const id = document.getElementById("input3").value;
    const selectedAlgorithm = document.getElementById("algorithm").value;
    const link_metrics_weight_pdf = `./includes/data/output_data_user/${selectedAlgorithm}/PDF/weight_summary.csv`;
    const link_metrics_dfi_pdf = `./includes/data/output_data_user/${selectedAlgorithm}/PDF/dfi_summary.csv`;

    let metrics_weight_data;
    let metrics_dfi_data;

    function parseCSV(data) {
        const lines = data.trim().split("\n");
        const headers = lines[0].split(",");
        const values = lines[1].split(",");
    
        let result = {};
        headers.forEach((header, i) => {
            result[header.trim()] = parseFloat(values[i]);
        });
        
        return result;
    }

    // Sử dụng fetch để lấy dữ liệu từ file CSV
    fetch(link_metrics_weight_pdf)
        .then(response => response.text())
        .then(data => {
            metrics_weight_data = parseCSV(data);
        })
        .catch(error => {
            console.error("Error fetching weight summary:", error);
        });

    fetch(link_metrics_dfi_pdf)
        .then(response => response.text())
        .then(data => {
            metrics_dfi_data = parseCSV(data);
        })
        .catch(error => {
            console.error("Error fetching DFI summary:", error);
        })
        .finally(() => {
            addDataToPDF(doc, firstDay, lastDay, id, selectedAlgorithm);
            doc.save("SmartSwine_Prediction_Report.pdf");
        });

    function addDataToPDF(doc, firstDay, lastDay, id, selectedAlgorithm) {
        doc.setFontSize(20);
        doc.text("SmartSwine Prediction Report", 10, 20);
        doc.setFontSize(12);
        doc.text(`First Day: ${firstDay}`, 10, 40);
        doc.text(`Last Day: ${lastDay}`, 10, 50);
        doc.text(`ID: ${id}`, 10, 60);
        doc.text(`Selected Algorithm: ${selectedAlgorithm}`, 10, 70);
        doc.text(`Report Summary:`, 10, 80);
        doc.text(`This report includes predictions about the weight and DFI index of piglets from ${firstDay} to ${lastDay}.`, 10, 90);
        doc.text(`The results are calculated based on the ${selectedAlgorithm} algorithm and input data.`, 10, 100);
        doc.text(`Algorithm Accuracy:`, 10, 110);

        if (metrics_weight_data && metrics_dfi_data) {
            // Kiểm tra nếu metrics_weight_data và metrics_dfi_data có dữ liệu hợp lệ
            doc.text(`Weight: MAE=${metrics_weight_data.mae}, MSE=${metrics_weight_data.mse}, RMSE=${metrics_weight_data.rmse}, R2=${metrics_weight_data.r2}`, 10, 120);
            doc.text(`DFI: MAE=${metrics_dfi_data.mae}, MSE=${metrics_dfi_data.mse}, RMSE=${metrics_dfi_data.rmse}, R2=${metrics_dfi_data.r2}`, 10, 130);
        } else {
            // Nếu không có dữ liệu, hiển thị thông báo
            doc.text(`Weight and DFI data are not available.`, 10, 120);
        }
    }
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
