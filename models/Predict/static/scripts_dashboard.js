// Toggle menu
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.navbar-menu').classList.toggle('show');
});

// Biến toàn cục để lưu dữ liệu từ /run-dashboard và /run
let globalInputs = {
    id: null,
    first_day: null,
    last_day: null,
    algorithm: null
};

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

// Dữ liệu ngôn ngữ
const translations = {
    en: {
        navOverview: "Overview",
        navSolutions: "Solutions",
        navDashboard: "Dashboard",
        navResources: "Resources",
        navContact: "Contact Us",
        navDocs: "Docs",
        navSupport: "Support",
        headerTitle: "Welcome to Your Dashboard",
        inputTitle: "Input Data",
        inputFirstDay: "First Day",
        inputLastDay: "Last Day",
        inputID: "ID",
        inputPlaceholder: "Enter value",
        controlsTitle: "Controls",
        selectAlgorithm: "Select Algorithm:",
        algorithms: [
            "Linear Regression",
            "Gradient Boosting Regressor",
            "K Neighbors Regressor",
            "MLP Regressor",
            "SVR",
            "Random Forest Regressor",
            "Long Short Term Memory",
            "XGBoost Regressor"
        ],
        runModel: "Run Model",
        exportPDF: "Export PDF"
    },
    vi: {
        navOverview: "Tổng Quan",
        navSolutions: "Giải Pháp",
        navDashboard: "Bảng Điều Khiển",
        navResources: "Tài Nguyên",
        navContact: "Liên Hệ",
        navDocs: "Tài Liệu",
        navSupport: "Hỗ Trợ",
        headerTitle: "Chào Mừng Bạn Đến Với Bảng Điều Khiển",
        inputTitle: "Nhập Dữ Liệu",
        inputFirstDay: "Ngày đầu tiên",
        inputLastDay: "Ngày cuối cùng",
        inputID: "ID",
        inputPlaceholder: "Nhập giá trị",
        controlsTitle: "Điều Khiển",
        selectAlgorithm: "Chọn Thuật Toán:",
        algorithms: [
            "Hồi Quy Tuyến Tính",
            "Thuật Toán Tăng Cường Dần Dần",
            "Thuật Toán K Hàng Xóm Gần Nhất",
            "Thuật Toán Mạng Nơron",
            "Thuật Toán SVR",
            "Thuật Toán Rừng Ngẫu Nhiên",
            "LSTM (Bộ Nhớ Ngắn-Dài)",
            "Thuật Toán XGBoost"
        ],
        runModel: "Chạy Mô Hình",
        exportPDF: "Xuất PDF"
    },
    zh: {
        navOverview: "概述",
        navSolutions: "解决方案",
        navDashboard: "仪表板",
        navResources: "资源",
        navContact: "联系我们",
        navDocs: "文档",
        navSupport: "支持",
        headerTitle: "欢迎来到您的仪表板",
        inputTitle: "输入数据",
        inputFirstDay: "第一天",
        inputLastDay: "最后一天",
        inputID: "ID",
        inputPlaceholder: "输入值",
        controlsTitle: "控制",
        selectAlgorithm: "选择算法：",
        algorithms: [
            "线性回归",
            "梯度提升回归",
            "K近邻回归",
            "多层感知器回归",
            "支持向量回归",
            "随机森林回归",
            "长短期记忆",
            "XGBoost回归"
        ],
        runModel: "运行模型",
        exportPDF: "导出PDF"
    }
};


// Hàm thay đổi nội dung dựa trên ngôn ngữ
function changeLanguage(language) {
    const elements = {
        navOverview: document.querySelector(".nav-overview"),
        navSolutions: document.querySelector(".nav-solutions"),
        navDashboard: document.querySelector(".nav-dashboard"),
        navResources: document.querySelector(".nav-resources"),
        navContact: document.querySelector(".nav-contact"),
        navDocs: document.querySelector(".nav-docs"),
        navSupport: document.querySelector(".nav-support"),
        headerTitle: document.querySelector("header h1"),
        inputTitle: document.querySelector(".input-section h3"),
        inputFirstDay: document.querySelector('label[for="input-first-day"]'),
        inputLastDay: document.querySelector('label[for="input-last-day"]'),
        inputID: document.querySelector('label[for="input-id"]'),
        controlsTitle: document.querySelector(".controls h3"),
        selectAlgorithm: document.querySelector(".algorithm-label"),
        runModel: document.getElementById("runModel_dashboard"),
        exportPDF: document.getElementById("exportPDF")
    };

    // Cập nhật textContent
    for (const key in elements) {
        if (elements[key]) {
            elements[key].textContent = translations[language][key] || elements[key].textContent;
        }
    }

    // Cập nhật placeholder
    const inputFields = document.querySelectorAll(".input-field");
    inputFields.forEach((input) => {
        input.placeholder = translations[language].inputPlaceholder;
    });

    // Cập nhật nội dung của danh sách chọn thuật toán mà không thay đổi giá trị value
    const algorithmSelect = document.getElementById("algorithm");
    if (algorithmSelect) {
        const algorithms = translations[language].algorithms;
        const options = algorithmSelect.options;

        for (let i = 0; i < options.length; i++) {
            // Thay đổi nội dung hiển thị (text) mà không ảnh hưởng đến value
            options[i].textContent = algorithms[i];
        }
    }
}



// Áp dụng ngôn ngữ khi trang tải
window.onload = function () {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    const languageSelect = document.getElementById("language-select");

    languageSelect.value = savedLanguage;
    changeLanguage(savedLanguage);

    languageSelect.addEventListener("change", function () {
        const selectedLanguage = languageSelect.value;
        localStorage.setItem("selectedLanguage", selectedLanguage);
        changeLanguage(selectedLanguage);
    });
};


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
        const firstDay = $('#input-first-day').val();
        const lastDay = $('#input-last-day').val();
        const id = $('#input-id').val();
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
        document.getElementById('overlay').style.display = 'flex';
        $('#loading-container').show();


        globalInputs.first_day = $('#input-first-day').val();
        globalInputs.last_day = $('#input-last-day').val();
        globalInputs.id = $('#input-id').val();
        globalInputs.algorithm = $('#algorithm').val();
        console.log("Dashboard Inputs:", globalInputs);

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
                $('#metricsImage').attr('src', response.metrics_image + '?t=' + timestamp);

                // Hiển thị nút "Export PDF" nếu tải thành công
                $('#exportPDF').show();
            },
            error: function(xhr) {
                // Ẩn hiệu ứng loading khi có lỗi
                $('#loading-container').hide();
                document.getElementById('overlay').style.display = 'none';

                const errorMessage = xhr.responseJSON ? xhr.responseJSON.error : "An error occurred.";
                console.error("Error:", xhr);

                // Hiển thị lỗi trong pop-up
                showPopup(errorMessage);
            },
            complete: function() {
                // Ẩn hiệu ứng loading khi hoàn tất
                $('#loading-container').hide();
                document.getElementById('overlay').style.display = 'none';
            }
        });
    });
});

document.getElementById("exportPDF").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const firstDay = globalInputs.first_day;
    const lastDay = globalInputs.last_day;
    const id = globalInputs.id;
    const selectedAlgorithm = globalInputs.algorithm;
    const languageSelect_document = document.getElementById("language-select").value;
    
    // Xóa popup cũ nếu tồn tại
    removeExistingPopups();

    // Tạo lớp phủ
    const overlay_pdf = document.createElement("div");
    overlay_pdf.id = "overlay";
    document.body.appendChild(overlay_pdf);

    const popupFile = document.createElement("div");
    popupFile.id = "popup_file"; // Sử dụng CSS đã định nghĩa
    popupFile.innerHTML = `
        <h3>Select the type of PDF file</h3>
        <button id="trainProcess" class="btn">Training Process</button>
        <button id="compareAlgorithms" class="btn">Compare Algorithms</button>
        <button class="popup-close">&times;</button> <!-- Nút đóng -->
    `;
    document.body.appendChild(popupFile);
    popupFile.style.display = "block";
    overlay_pdf.style.display = "block";

    // Đóng popup khi nhấn nút đóng
    document.querySelectorAll('.popup-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('div').style.display = "none";
            overlay_pdf.style.display = "none"; // Ẩn lớp phủ khi đóng popup
        });
    });

    document.getElementById("trainProcess").addEventListener("click", () => {
        popupFile.style.display = "none"; // Ẩn popup
        fetch('/get_all_summaries')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Dữ liệu từ các bảng:", data);
    
                // Kiểm tra dữ liệu từ các bảng
                const dfiData = data.tables?.["output_summary_all_default_dfi"] || null;
                const weightData = data.tables?.["output_summary_all_default_weight"] || null;
    
                const meanDfiData = Array.isArray(data.tables?.["output_summary_mean_default_dfi"]) 
                    ? data.tables["output_summary_mean_default_dfi"].map(item => ({
                        min: item?.min ?? "Không xác định",
                        max: item?.max ?? "Không xác định",
                        mean: item?.mean ?? "Không xác định",
                        sd: item?.sd ?? "Không xác định"
                    }))
                    : null;
    
                const meanWeightData = Array.isArray(data.tables?.["output_summary_mean_default_weight"]) 
                    ? data.tables["output_summary_mean_default_weight"].map(item => ({
                        min: item?.min ?? "Không xác định",
                        max: item?.max ?? "Không xác định",
                        mean: item?.mean ?? "Không xác định",
                        sd: item?.sd ?? "Không xác định"
                    }))
                    : null;
    
                // Kiểm tra kiểu dữ liệu của id
                const idNumber = parseInt(id); // Chuyển đổi id thành số nguyên
                const dfi_Data_single = Array.isArray(dfiData) 
                    ? dfiData.find(item => item?.id === idNumber) || "Không có thông tin về DFI"
                    : "Không có thông tin về DFI";
    
                const weight_Data_single = Array.isArray(weightData) 
                    ? weightData.find(item => item?.id === idNumber) || "Không có thông tin về Weight"
                    : "Không có thông tin về Weight";
    
                console.log("DFI Data Single received:", dfi_Data_single);
                console.log("Weight Data Single received:", weight_Data_single);
    
                console.log({
                    selectedAlgorithm_data_received: selectedAlgorithm
                });
    
                // Truy cập dữ liệu lỗi (error metrics)
                const metrics_dfi_data = data?.dfi_error?.[selectedAlgorithm]?.[0] ?? "Không có thông tin về lỗi DFI";
                const metrics_weight_data = data?.weight_error?.[selectedAlgorithm]?.[0] ?? "Không có thông tin về lỗi Weight";
    
                console.log("Metrics DFI:", metrics_dfi_data);
                console.log("Metrics Weight:", metrics_weight_data);
    
                addDataToPDF(
                    doc, firstDay, lastDay, id, selectedAlgorithm, 
                    dfi_Data_single, weight_Data_single, meanDfiData, meanWeightData, 
                    metrics_dfi_data, metrics_weight_data, languageSelect_document
                );
                doc.save("SmartSwine_Prediction_Report.pdf");
                overlay_pdf.style.display = "none"; // Ẩn lớp phủ khi đóng popup
            })
            .catch(error => {
                console.error("Lỗi khi lấy dữ liệu:", error);
            });
    });

     // Khi chọn "So sánh thuật toán"
    document.getElementById("compareAlgorithms").addEventListener("click", () => {
        popupFile.style.display = "none"; // Ẩn popup loại file
        const popupAlgorithm = document.createElement("div");
        popupAlgorithm.id = "popup_algorithm"; // Sử dụng CSS đã định nghĩa
        popupAlgorithm.innerHTML = `
            <h3>Select the algorithm to compare</h3>

            <form id="algorithmForm">
                ${Array.from({ length: 8 }, (_, i) => `

                    <label>

                        <input type="checkbox" name="algorithm" value="algorithm${i + 1}"> ${getAlgorithmName(`algorithm${i + 1}`)}

                    </label><br>

                `).join('')}
                <button type="button" id="confirmAlgorithms" class="btn">Confirm</button>

            </form>

            <button class="popup-close">&times;</button> <!-- Nút đóng -->

        `;

        document.body.appendChild(popupAlgorithm);
        popupAlgorithm.style.display = "block";

        // Đóng popup khi nhấn nút đóng
        document.querySelectorAll('.popup-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                closeBtn.closest('div').style.display = "none";
                overlay_pdf.style.display = "none"; // Ẩn lớp phủ khi đóng popup
            });
        });

        document.getElementById("confirmAlgorithms").addEventListener("click", () => {
            const selectedAlgorithms = Array.from(document.querySelectorAll('input[name="algorithm"]:checked')).map(input => input.value);
            popupAlgorithm.style.display = "none"; // Ẩn popup so sánh thuật toán
            overlay_pdf.style.display = "none"; // Ẩn lớp phủ khi đóng popup

            fetch('/get_all_summaries')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Dữ liệu từ các bảng:", data);
                // Truy cập dữ liệu lỗi (error metrics)
                const metrics_dfi_data = selectedAlgorithms.map(algorithm => {
                    const metrics = data?.dfi_error?.[algorithm]?.[0];
                    return metrics ? {
                        r2: metrics.r2 ?? 0,
                        mae: metrics.mae ?? 0,
                        mse: metrics.mse ?? 0,
                        rmse: metrics.rmse ?? 0
                    } : { r2: 0, mae: 0, mse: 0, rmse: 0 };
                });
            
                const metrics_weight_data = selectedAlgorithms.map(algorithm => {
                    const metrics = data?.weight_error?.[algorithm]?.[0];
                    return metrics ? {
                        r2: metrics.r2 ?? 0,
                        mae: metrics.mae ?? 0,
                        mse: metrics.mse ?? 0,
                        rmse: metrics.rmse ?? 0
                    } : { r2: 0, mae: 0, mse: 0, rmse: 0 };
                });
                // Gọi hàm tạo PDF so sánh với dữ liệu lỗi
                generateComparisonPDF(selectedAlgorithms, metrics_dfi_data, metrics_weight_data);
            })
            .catch(error => {
                console.error("Lỗi khi lấy dữ liệu:", error);
            });
        });

        // Đóng popup khi nhấp vào lớp phủ
        overlay_pdf.addEventListener('click', () => {
            popupFile.style.display = "none";
            popupAlgorithm.style.display = "none";
            overlay_pdf.style.display = "none";
        });
    });

        // Hàm tạo file PDF so sánh các thuật toán
        function generateComparisonPDF(selectedAlgorithms, metrics_dfi_data, metrics_weight_data) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.width;
            const margin = 15;
            const lineSpacing = 10;
            let yPosition = margin;
            let lang = "en"
            let fontDocument = "helvetica";

            if (lang === "en") {
                font_document = "helvetica";
            }
            else if (lang === "vi") {
                font_document = "Times New Roman";
            }
            else if (lang === "zh") {
                font_document = "SimSun";
            }
        
            // Font selection
            doc.setFont(fontDocument);
        
            // Helper to split and print multi-line text
            function addMultiLineText(text, x, options) {
                const lines = doc.splitTextToSize(text, options.maxWidth || (pageWidth - 2 * margin));
                lines.forEach(line => {
                    doc.text(line, x, yPosition);
                    yPosition += lineSpacing;
                });
            }
        
            // Title
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.text("Algorithm Comparison Report Used in the Project", pageWidth / 2, yPosition, "center");
            yPosition += lineSpacing * 2;
        
            // Introduction Section
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            addMultiLineText(
                "This report provides a detailed analysis of algorithms used for predicting daily feed intake (DFI) and weight in pigs. The aim is to evaluate their performance and identify the most suitable algorithm for this project.",
                margin,
                { maxWidth: pageWidth - 2 * margin }
            );
            
        
            // Section: Metrics for DFI
            yPosition += lineSpacing * 2;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text("Metrics for Daily Feed Intake (DFI) Prediction", margin, yPosition);
            yPosition += lineSpacing;
        
            const dfiMetricsTable = [
                ['Algorithm', 'R²', 'MAE', 'MSE', 'RMSE'],
                ...selectedAlgorithms.map((algorithm, index) => {
                    const metrics = metrics_dfi_data[index];
                    return [
                        getAlgorithmName(algorithm, lang) || "Unknown Algorithm",
                        metrics?.r2?.toFixed(4) || "N/A",
                        metrics?.mae?.toFixed(4) || "N/A",
                        metrics?.mse?.toFixed(4) || "N/A",
                        metrics?.rmse?.toFixed(4) || "N/A",
                    ];
                }),
            ];
            doc.autoTable({
                head: [dfiMetricsTable[0]],
                body: dfiMetricsTable.slice(1),
                startY: yPosition,
                theme: 'grid',
                headStyles: { fillColor: [41, 128, 185] },
                styles: { cellPadding: 5, fontSize: 10 },
            });
            yPosition = doc.autoTable.previous.finalY + lineSpacing * 2;
            doc.addPage();
            yPosition = margin + 10;
            // Section: Metrics for Weight
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text("Metrics for Weight Prediction", margin, yPosition);
            yPosition += lineSpacing;
        
            const weightMetricsTable = [
                ['Algorithm', 'R²', 'MAE', 'MSE', 'RMSE'],
                ...selectedAlgorithms.map((algorithm, index) => {
                    const metrics = metrics_weight_data[index];
                    return [
                        getAlgorithmName(algorithm, lang) || "Unknown Algorithm",
                        metrics?.r2?.toFixed(4) || "N/A",
                        metrics?.mae?.toFixed(4) || "N/A",
                        metrics?.mse?.toFixed(4) || "N/A",
                        metrics?.rmse?.toFixed(4) || "N/A",
                    ];
                }),
            ];
            doc.autoTable({
                head: [weightMetricsTable[0]],
                body: weightMetricsTable.slice(1),
                startY: yPosition,
                theme: 'grid',
                headStyles: { fillColor: [39, 174, 96] },
                styles: { cellPadding: 5, fontSize: 10 },
            });
            yPosition = doc.autoTable.previous.finalY + lineSpacing;
        
            // Section: Analysis and Comparison
            if (selectedAlgorithms.length < 5) {
                doc.addPage();
                yPosition = margin + 10;
            }
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text("Analysis and Comparison", margin, yPosition);
            yPosition += lineSpacing;
            doc.setFont("helvetica", "normal");

            let index_addPage = 0;

            selectedAlgorithms.forEach((algorithm, index) => {
                const dfiMetrics = metrics_dfi_data[index];
                const weightMetrics = metrics_weight_data[index];
                index_addPage += 1;
        
                // Add algorithm title
                doc.setFontSize(12);
                doc.setFont("helvetica", "bolditalic");
                doc.text(`${getAlgorithmName(algorithm, lang) || "Unknown Algorithm"} Analysis`, margin, yPosition);
                yPosition += lineSpacing;

                if (!dfiMetrics && !weightMetrics) {
                    // Không có dữ liệu cho thuật toán
                    doc.setFont("helvetica", "italic");
                    doc.text("Không có dữ liệu cho thuật toán này.", margin, yPosition);
                    yPosition += lineSpacing;
                    return; // Bỏ qua các xử lý tiếp theo
                }

                if (dfiMetrics) {
                    // Add details for DFI
                    doc.setFont("helvetica", "italic");
                    addMultiLineText(`For Daily Feed Intake (DFI):`, margin, { maxWidth: pageWidth - 2 * margin });
                    doc.setFont("helvetica", "normal");
                    addMultiLineText(
                        `- R²: ${dfiMetrics.r2.toFixed(4)} (${dfiMetrics.r2 > 0.8 ? "Excellent" : dfiMetrics.r2 > 0.6 ? "Moderate" : "Poor"} accuracy)\n- RMSE: ${dfiMetrics.rmse.toFixed(4)} (lower is better)\n- Additional Comments: ${
                            dfiMetrics.r2 > 0.8
                                ? "This algorithm shows great potential for accurate DFI predictions."
                                : "Improvements may be needed for better performance in DFI predictions."
                        }`,
                        margin + 10,
                        { maxWidth: pageWidth - 2 * margin }
                    );

                    if (index_addPage === 3 || index_addPage === 8) {
                        doc.addPage();
                        yPosition = margin + 10;
                    }
                } else {
                    doc.setFont("helvetica", "italic");
                    doc.text("No data for this algorithm.", margin, yPosition);
                    yPosition += lineSpacing;
                }
        
                if (weightMetrics) {
                    // Add details for Weight
                    doc.setFont("helvetica", "italic");
                    addMultiLineText(`For Weight Prediction:`, margin, { maxWidth: pageWidth - 2 * margin });
                    doc.setFont("helvetica", "normal");
                    addMultiLineText(
                        `- R²: ${weightMetrics.r2.toFixed(4)} (${weightMetrics.r2 > 0.8 ? "Excellent" : weightMetrics.r2 > 0.6 ? "Moderate" : "Poor"} accuracy)\n- RMSE: ${weightMetrics.rmse.toFixed(4)} (lower is better)\n- Additional Comments: ${
                            weightMetrics.r2 > 0.8
                                ? "This algorithm is highly reliable for weight prediction."
                                : "Consider tuning the model for improved weight prediction performance."
                        }`,
                        margin + 10,
                        { maxWidth: pageWidth - 2 * margin }
                    );
                    if (index_addPage === 5) {
                        doc.addPage();
                        yPosition = margin + 10;
                    }
                    if (selectedAlgorithms.length > 6 && index_addPage === 1) {
                        doc.addPage();
                        yPosition = margin + 10;
                    }
                } else {
                    doc.setFont("helvetica", "italic");
                    doc.text("No data for this algorithm.", margin, yPosition);
                    yPosition += lineSpacing;
                }
            });
                
        
            // Highlight Best Algorithm
            const bestAlgorithmIndex = metrics_dfi_data.findIndex(metrics => metrics.r2 === Math.max(...metrics_dfi_data.map(m => m.r2)));
            const bestAlgorithm = selectedAlgorithms[bestAlgorithmIndex];
            
            if (index_addPage != 5) {
                yPosition += lineSpacing;
            }
            if (selectedAlgorithms.length === 2) {
                doc.addPage();
                yPosition = margin + 10;
            }
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text("Best Algorithm", margin, yPosition);
            yPosition += lineSpacing;
        
            doc.setFont("helvetica", "normal");
            addMultiLineText(
                `The algorithm "${getAlgorithmName(bestAlgorithm, lang)}" stands out as the most effective, achieving the highest R² and lowest RMSE for both DFI and weight prediction. It is strongly recommended for deployment in this context.`,
                margin,
                { maxWidth: pageWidth - 2 * margin }
            );

            yPosition += lineSpacing;

            // Highlight Bad Algorithm
            const worstAlgorithmIndex = metrics_dfi_data.findIndex(metrics => metrics.r2 === Math.min(...metrics_dfi_data.map(m => m.r2)));
            const worstAlgorithm = selectedAlgorithms[worstAlgorithmIndex];

            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text("Bad Algorithm", margin, yPosition);
            yPosition += lineSpacing;
            
            doc.setFont("helvetica", "normal");
            addMultiLineText(
                `The "${getAlgorithmName(worstAlgorithm, lang)}" algorithm has the lowest R² and highest RMSE for both DFI and weight predictions. This indicates that this algorithm does not meet the accuracy requirements and is not recommended for use in this context. To improve performance, it may be considered to optimize the model parameters, experiment with other algorithms, or collect additional data to enhance predictive capabilities.`,
                margin,
                { maxWidth: pageWidth - 2 * margin }
            );
            // Save PDF
            doc.save("Algorithm_Comparison_Report.pdf");
        }
        
        
        

        // Hàm xóa popup cũ nếu tồn tại
        function removeExistingPopups() {
            const existingPopupFile = document.getElementById("popup_file");
            const existingPopupAlgorithm = document.getElementById("popup_algorithm");
            if (existingPopupFile) {
                existingPopupFile.remove();
            }
            if (existingPopupAlgorithm) {
                existingPopupAlgorithm.remove();
            }
        }

        function addDataToPDF(
            doc,
            firstDay,
            lastDay,
            id,
            selectedAlgorithm,
            dfi_Data_single,
            weight_Data_single,
            meanDfiData,
            meanWeightData,
            metrics_dfi_data,
            metrics_weight_data,
            languageSelect_document
        ) {
            const pageHeight = doc.internal.pageSize.height;
            const pageWidth = doc.internal.pageSize.width;
            const margin = 10;
            const lineSpacing = 8; // Khoảng cách giữa các dòng
            let yPosition = margin + 10;
            let font_document = "helvetica";
            let lang = "en"
            if (lang === "en") {
                font_document = "helvetica";
            }
            else if (lang === "vi") {
                font_document = "Times New Roman";
            }
            else if (lang === "zh") {
                font_document = "SimSun";
            }

            // Function to print a long text with automatic page break
            function addMultiLineText(text, x, options) {
                const lines = doc.splitTextToSize(text, options.maxWidth || (pageWidth - 2 * margin));
                lines.forEach(line => {
                    doc.text(line, x, yPosition);
                    yPosition += lineSpacing;
                });
            }
    
            // Tiêu đề lớn cho dòng đầu tiên của bản báo cáo, căn giữa
            doc.setFont(font_document, "bold");
            doc.setFontSize(24);
            doc.text(translate("reportTitle", lang), pageWidth / 2, yPosition, "center");
            yPosition += lineSpacing * 2; // Tăng khoảng cách giữa tiêu đề và nội dung

            // Part 1: General Information
            doc.setFont(font_document, "bold");
            doc.setFontSize(20);
            doc.text(translate("generalInfo", lang), pageWidth / 2, yPosition, "center");
            doc.setFontSize(14);
            yPosition += lineSpacing * 2; // Increase space between title and content

            doc.setFont(font_document, "normal");
            doc.setFontSize(12);
            doc.text(translate("startDate", lang) + " " + firstDay, margin, yPosition);
            yPosition += lineSpacing;

            doc.text(translate("endDate", lang) + " " + lastDay, margin, yPosition);
            yPosition += lineSpacing;

            doc.text(`- Pig ID: ${id}`, margin, yPosition);
            yPosition += lineSpacing;

            // Selected Algorithm
            let name_algorithm = getAlgorithmName(selectedAlgorithm);
            doc.text(translate("selectedAlgorithm_translate", lang) + " " + name_algorithm, margin, yPosition);
            yPosition += lineSpacing * 2;

            // Part 2: Overview
            doc.setFont(font_document, "bold");
            doc.setFontSize(20);
            doc.text(translate("overview", lang), pageWidth / 2, yPosition, "center");
            doc.setFontSize(14);
            yPosition += lineSpacing * 2;

            doc.setFont(font_document, "normal");
            doc.setFontSize(12);
            addMultiLineText("This report provides a scientific evaluation of the predictive performance for Daily Feed Intake (DFI) and weight metrics of pigs within the specified timeframe. By leveraging data-driven insights, this analysis aims to: ", margin, { maxWidth: pageWidth - 2 * margin });
            addMultiLineText("1. Assess the accuracy and reliability of the Linear Regression model in predicting DFI and weight. ", margin + 10, { maxWidth: pageWidth - 2 * margin });
            addMultiLineText("2. Identify growth patterns and feeding behavior through statistical metrics, enabling precision in dietary planning and farm management. ", margin + 10, { maxWidth: pageWidth - 2 * margin });
            addMultiLineText("3. Explore algorithm performance to recommend improvements for future predictive tasks. ", margin + 10, { maxWidth: pageWidth - 2 * margin });
            addMultiLineText("This study contributes to the optimization of feeding strategies and the development of precision farming practices.", margin, { maxWidth: pageWidth - 2 * margin });
            yPosition += lineSpacing;

            // Part 3: Metrics
            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);
            yPosition += lineSpacing * 2;
            doc.text("Algorithm Performance Metrics", pageWidth / 2, yPosition, "center");
            doc.setFontSize(14);
            yPosition += lineSpacing * 2;

            if (metrics_dfi_data && metrics_weight_data) {
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);
                
                // Nhận xét về kết quả độ chính xác
                const accuracyComment = metrics_dfi_data.r2 > 0.8 ? 
                    translate("accuracyCommentGood", lang) : 
                    metrics_dfi_data.r2 > 0.5 ? 
                    translate("accuracyCommentAverage", lang) : 
                    translate("accuracyCommentBad", lang);
                    
                
                // Ghi chú thêm về độ chính xác
                const detailedComment = metrics_dfi_data.r2 > 0.8 ? 
                    translate("detailedCommentGood", lang) : 
                    metrics_dfi_data.r2 > 0.5 ? 
                    translate("detailedCommentAverage", lang) : 
                    translate("detailedCommentBad", lang);
                
                doc.text(`- Accuracy Comment: ${accuracyComment}`, margin, yPosition);
                yPosition += lineSpacing; // Tăng vị trí y cho dòng tiếp theo
                doc.text(`- Detailed Comment: ${detailedComment}`, margin, yPosition);
                yPosition += lineSpacing;
                addMetricsSection(doc, metrics_dfi_data, metrics_weight_data, margin, yPosition, pageWidth);

            } else {
                addMultiLineText("Performance metrics are not available.", margin, { maxWidth: pageWidth - 2 * margin });
            }

            // Part 4: DFI and Weight for Single Pig
            doc.addPage(); // Thêm trang mới cho phần này
            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);
            yPosition = lineSpacing * 2;
            doc.text(`DFI and Weight Data for Pig ID ${id} in the entire period`, pageWidth / 2, yPosition, "center");
            doc.setFontSize(14);
            yPosition += lineSpacing * 2;
            doc.setFont("helvetica", "normal");

            if (dfi_Data_single && weight_Data_single) {
                addSinglePigData(doc, dfi_Data_single, weight_Data_single, margin, yPosition);
            } else {
                addMultiLineText("DFI and Weight data are not available.", margin, { maxWidth: pageWidth - 2 * margin });
            }

            // Part 5: DFI and Weight for All Pigs
            yPosition += lineSpacing * 9 + 30;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);
            doc.text("DFI and Weight for the Entire Herd in the Entire Period", pageWidth / 2, yPosition, "center");
            doc.setFontSize(14);
            yPosition += lineSpacing * 2;
            doc.setFont("helvetica", "normal");

            if (meanDfiData && meanWeightData) {
                addAllPigsData(doc, meanDfiData, meanWeightData, margin, yPosition);
            } else {
                addMultiLineText("DFI and Weight data are not available.", margin, { maxWidth: pageWidth - 2 * margin });
            }

            // Part 6: Conclusion
            doc.addPage(); // Add a new page for this section
            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);
            yPosition = lineSpacing * 2;
            doc.text("Conclusion", pageWidth / 2, yPosition, "center");
            doc.setFontSize(14);
            yPosition += lineSpacing * 2;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);    
            addMultiLineText(
                "The prediction results in this report provide important information about the feeding behavior (DFI) and growth (weight) of pigs during the study period.",
                margin, { maxWidth: pageWidth - 2 * margin }
            );

            // Comments on DFI
            const dfiAccuracy = metrics_dfi_data.r2; // Get DFI accuracy
            const weightAccuracy = metrics_weight_data.r2; // Get Weight accuracy
            let dfiComment = "";
            let weightComment = "";

            dfiComment = `The ${getAlgorithmName(selectedAlgorithm, lang)} model achieved an average accuracy with R² = ${dfiAccuracy.toFixed(6)}, indicating limited predictive ability and a need for improvement to better reflect the relationship between input factors and DFI.`;
            weightComment = `The model achieved very high accuracy with R² = ${weightAccuracy.toFixed(6)}, demonstrating the effectiveness of ${getAlgorithmName(selectedAlgorithm, lang)} in predicting pig weight based on the available data.`;

            addMultiLineText(dfiComment, margin, { maxWidth: pageWidth - 2 * margin });
            addMultiLineText(weightComment, margin, { maxWidth: pageWidth - 2 * margin });

            // General Conclusion
            addMultiLineText(
                `In conclusion, the report has shown the potential of the ${name_algorithm} model in predicting pig growth indicators, particularly weight. For DFI, optimizing input factors or improving model construction will help enhance predictive quality, thereby supporting the development of more effective nutrition management strategies.`,
                margin, { maxWidth: pageWidth - 2 * margin }
            );

            // Nhận xét về các thông số dựa trên độ chính xác từng trường hợp
            yPosition += lineSpacing; // Tăng khoảng cách cho phần nhận xét
            doc.setFont("helvetica", "bolditalic");
            doc.text("Comments on Metrics", margin, yPosition);
            yPosition += lineSpacing;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            addMultiLineText(
                "The accuracy of the algorithms used in this report varies by case. " +
                "For instance, if the accuracy for DFI is above 0.8, it indicates a strong model performance, " +
                "while an accuracy below 0.5 suggests the need for significant improvements. " +
                "Each algorithm's performance should be evaluated individually to ensure the best outcomes.",
                margin, { maxWidth: pageWidth - 2 * margin }
            );
        }
    
        function getAlgorithmName(selectedAlgorithm, languageSelect_document) {
            switch (selectedAlgorithm) {
                case "algorithm1": return "Linear Regression";
                case "algorithm2": return "Gradient Boosting";
                case "algorithm3": return "K-Nearest Neighbors";
                case "algorithm4": return "Multilayer Perceptron";
                case "algorithm5": return "Support Vector Regression";
                case "algorithm6": return "Random Forest Regressor";
                case "algorithm7": return "Long Short Term Memory";
                case "algorithm8": return "XGBoost Regressor";
                default: return "Unknown";
            }
        }
    
        function addMetricsSection(doc, metrics_dfi_data, metrics_weight_data, margin, yPosition, pageWidth) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.text(`- DFI Metric:`, margin, yPosition);
            doc.text(`- Weight Metric:`, pageWidth / 2, yPosition);
            yPosition += 8; // Space between title and content
            doc.text(`   - R²: ${metrics_dfi_data.r2}`, margin + 5, yPosition);
            doc.text(`   - R²: ${metrics_weight_data.r2}`, pageWidth / 2 + 5, yPosition);
            yPosition += 8;
            doc.text(`   - MAE: ${metrics_dfi_data.mae}`, margin + 5, yPosition);
            doc.text(`   - MAE: ${metrics_weight_data.mae}`, pageWidth / 2 + 5, yPosition);
            yPosition += 8;
            doc.text(`   - MSE: ${metrics_dfi_data.mse}`, margin + 5, yPosition);
            doc.text(`   - MSE: ${metrics_weight_data.mse}`, pageWidth / 2 + 5, yPosition);
            yPosition += 8;
            doc.text(`   - RMSE: ${metrics_dfi_data.rmse}`, margin + 5, yPosition);
            doc.text(`   - RMSE: ${metrics_weight_data.rmse}`, pageWidth / 2 + 5, yPosition);
            yPosition += 10; // Space between sections
        }
    
        function addSinglePigData(doc, dfi_Data_single, weight_Data_single, margin, yPosition) {
            doc.setFont("helvetica", "bolditalic");
            doc.text(`Below are the prediction results for Pig ID ${id} during this period:`, margin, yPosition);
            yPosition += 8;
            doc.setFont("helvetica", "italic");
            doc.text(`Average DFI:`, margin, yPosition);
            yPosition += 8;
            doc.setFont("helvetica", "normal");
            doc.text(`   - Minimum DFI: ${dfi_Data_single.min}`, margin + 10, yPosition);
            yPosition += 8;
            doc.text(`   - Maximum DFI: ${dfi_Data_single.max}`, margin + 10, yPosition);
            yPosition += 8;
            doc.text(`   - Average DFI: ${dfi_Data_single.mean}`, margin + 10, yPosition);
            yPosition += 8;
            doc.text(`   - Standard Deviation DFI: ${dfi_Data_single.sd}`, margin + 10, yPosition);
            yPosition += 10;
            
            doc.setFont("helvetica", "italic");
            doc.text(`Average Weight:`, margin, yPosition);
            yPosition += 8;
            doc.setFont("helvetica", "normal");
            doc.text(`   - Minimum Weight: ${weight_Data_single.min}`, margin + 10, yPosition);
            yPosition += 8;
            doc.text(`   - Maximum Weight: ${weight_Data_single.max}`, margin + 10, yPosition);
            yPosition += 8;
            doc.text(`   - Average Weight: ${weight_Data_single.mean}`, margin + 10, yPosition);
            yPosition += 8;
            doc.text(`   - Standard Deviation Weight: ${weight_Data_single.sd}`, margin + 10, yPosition);
        }
    
        function addAllPigsData(doc, meanDfiData, meanWeightData, margin, yPosition) {
            let status_null = false;
        
            // Kiểm tra dữ liệu đầu vào
            console.log("meanDfiData:", meanDfiData);
            console.log("meanWeightData:", meanWeightData);
        
            if (!Array.isArray(meanDfiData) || meanDfiData.length === 0 || 
                !Array.isArray(meanWeightData) || meanWeightData.length === 0) {
                console.error("Invalid data for all pigs:", { meanDfiData, meanWeightData });
                status_null = true;
            }
        
            if (status_null === false) {
                doc.setFont("helvetica", "bolditalic");
                doc.text("Below are the average prediction results for the entire pig herd during this period:", margin, yPosition);
                yPosition += 8;
        
                // Phần DFI
                if (meanDfiData[0] && typeof meanDfiData[0] === "object") {
                    doc.setFont("helvetica", "italic");
                    doc.text("Average DFI:", margin, yPosition);
                    yPosition += 8;
        
                    doc.setFont("helvetica", "normal");
                    doc.text(`   - Minimum DFI: ${meanDfiData[0].min || "Not available"}`, margin + 10, yPosition);
                    yPosition += 8;
                    doc.text(`   - Maximum DFI: ${meanDfiData[0].max || "Not available"}`, margin + 10, yPosition);
                    yPosition += 8;
                    doc.text(`   - Average DFI: ${meanDfiData[0].mean || "Not available"}`, margin + 10, yPosition);
                    yPosition += 8;
                    doc.text(`   - Standard Deviation DFI: ${meanDfiData[0].sd || "Not available"}`, margin + 10, yPosition);
                    yPosition += 10;
                } else {
                    doc.text("DFI data is not available.", margin, yPosition);
                    yPosition += 10;
                }
        
                // Phần Weight
                if (meanWeightData[0] && typeof meanWeightData[0] === "object") {
                    doc.setFont("helvetica", "italic");
                    doc.text("Average Weight:", margin, yPosition);
                    yPosition += 8;
        
                    doc.setFont("helvetica", "normal");
                    doc.text(`   - Minimum Weight: ${meanWeightData[0].min || "Not available"}`, margin + 10, yPosition);
                    yPosition += 8;
                    doc.text(`   - Maximum Weight: ${meanWeightData[0].max || "Not available"}`, margin + 10, yPosition);
                    yPosition += 8;
                    doc.text(`   - Average Weight: ${meanWeightData[0].mean || "Not available"}`, margin + 10, yPosition);
                    yPosition += 8;
                    doc.text(`   - Standard Deviation Weight: ${meanWeightData[0].sd || "Not available"}`, margin + 10, yPosition);
                } else {
                    doc.text("Weight data is not available.", margin, yPosition);
                    yPosition += 10;
                }
            } else {
                // Thông báo chung nếu toàn bộ dữ liệu không khả dụng
                doc.text("DFI and Weight data are not available.", margin, yPosition);
            }
        }     
        
        function translate(text, language) {
            const translations = {
                en: {
                    reportTitle: "SMART SWINE PREDICTION REPORT",
                    generalInfo: "General Information",
                    startDate: "- Start Date:",
                    endDate: "- End Date:",
                    pigId: "- Pig ID:",
                    selectedAlgorithm_translate: "- Selected Algorithm:",
                    overview: "Overview and Objectives",
                    performanceMetrics: "Algorithm Performance Metrics",
                    conclusion: "Conclusion",
                    noMetrics: "Performance metrics are not available.",
                    accuracyCommentGood: "The accuracy result is good.",
                    accuracyCommentAverage: "The accuracy result is average, with room for improvement.",
                    accuracyCommentBad: "The accuracy result is not good.",
                    detailedCommentGood: "The model is working very efficiently and can be trusted.",
                    detailedCommentAverage: "The model requires further refinement to enhance prediction accuracy.",
                    detailedCommentBad: "The model needs to be reviewed and adjusted to improve accuracy.",
                    averageDFI: "Average DFI:",
                    averageWeight: "Average Weight:",
                    minimumDFI: "Minimum DFI:",
                    maximumDFI: "Maximum DFI:",
                    standardDeviationDFI: "Standard Deviation DFI:",
                    minimumWeight: "Minimum Weight:",
                    maximumWeight: "Maximum Weight:",
                    standardDeviationWeight: "Standard Deviation Weight:",
                    commentsOnMetrics: "Comments on Metrics",
                    algorithmPerformance: "The accuracy of the algorithms used in this report varies by case. " +
                        "For instance, if the accuracy for DFI is above 0.8, it indicates a strong model performance, " +
                        "while an accuracy below 0.5 suggests the need for significant improvements. " +
                        "Each algorithm's performance should be evaluated individually to ensure the best outcomes."
                },
                vi: {
                    reportTitle: "BÁO CÁO DỰ ĐOÁN HEO THÔNG MINH",
                    generalInfo: "Thông Tin Chung",
                    startDate: "- Ngày Bắt Đầu:",
                    endDate: "- Ngày Kết Thúc:",
                    pigId: "- Mã Số Heo:",
                    selectedAlgorithm_translate: "- Thuật Toán Được Chọn:",
                    overview: "Tổng Quan và Mục Tiêu",
                    performanceMetrics: "Các Thông Số Hiệu Suất Thuật Toán",
                    conclusion: "Kết Luận",
                    noMetrics: "Không có thông số hiệu suất.",
                    accuracyCommentGood: "Kết quả chính xác tốt.",
                    accuracyCommentAverage: "Kết quả chính xác trung bình, cần cải thiện.",
                    accuracyCommentBad: "Kết quả chính xác chưa tốt.",
                    detailedCommentGood: "Mô hình hoạt động rất hiệu quả và có thể được tin tưởng.",
                    detailedCommentAverage: "Mô hình cần được điều chỉnh thêm để cải thiện độ chính xác dự đoán.",
                    detailedCommentBad: "Mô hình cần được kiểm tra và điều chỉnh để cải thiện độ chính xác.",
                    averageDFI: "Trung Bình DFI:",
                    averageWeight: "Trung Bình Cân Nặng:",
                    minimumDFI: "Giá Trị DFI Thấp Nhất:",
                    maximumDFI: "Giá Trị DFI Cao Nhất:",
                    standardDeviationDFI: "Độ Lệch Chuẩn DFI:",
                    minimumWeight: "Giá Trị Cân Nặng Thấp Nhất:",
                    maximumWeight: "Giá Trị Cân Nặng Cao Nhất:",
                    standardDeviationWeight: "Độ Lệch Chuẩn Cân Nặng:",
                    commentsOnMetrics: "Nhận xét về các thông số",
                    algorithmPerformance: "Độ chính xác của các thuật toán được sử dụng trong báo cáo này thay ��ổi theo từng trường hợp. " +
                        "Ví dụ, nếu độ chính xác cho DFI trên 0.8, điều đó cho thấy hiệu suất mô hình mạnh mẽ, " +
                        "trong khi độ chính xác dưới 0.5 cho thấy cần cải thiện đáng kể. " +
                        "Hiệu suất của từng thuật toán nên được đánh giá riêng lẻ để đảm bảo kết quả tốt nhất."
                },
                zh: {
                    reportTitle: "智能猪预测报告",
                    generalInfo: "一般信息",
                    startDate: "- 开始日期：",
                    endDate: "- 结束日期：",
                    pigId: "- 猪只ID：",
                    selectedAlgorithm_translate: "- 选择的算法：",
                    overview: "概述和目标",
                    performanceMetrics: "算法性能指标",
                    conclusion: "结论",
                    noMetrics: "没有可用的性能指标。",
                    accuracyCommentGood: "准确性结果良好。",
                    accuracyCommentAverage: "准确性结果一般，需要改进。",
                    accuracyCommentBad: "准确性结果不佳。",
                    detailedCommentGood: "模型运行非常高效，可以信赖。",
                    detailedCommentAverage: "模型需要进一步改进以提高预测准确性。",
                    detailedCommentBad: "模型需要审查和调整以提高准确性。",
                    averageDFI: "平均DFI：",
                    averageWeight: "平均体重：",
                    minimumDFI: "最低DFI：",
                    maximumDFI: "最高DFI：",
                    standardDeviationDFI: "DFI标准差：",
                    minimumWeight: "最低体重：",
                    maximumWeight: "最高体重：",
                    standardDeviationWeight: "体重标准差：",
                    commentsOnMetrics: "关于指标的评论",
                    algorithmPerformance: "本报告中使用的算法的准确性因情况而异。" +
                        "例如，如果DFI的准确性超过0.8，则表明模型性能强劲，" +
                        "而准确性低于0.5则表明需要显著改进。" +
                        "每个算法的性能应单独评估，以确保最佳结果。"
                }
            };
            return translations[language][text] || text;
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

            globalInputs.first_day = parseInt(data[0][0]);
            globalInputs.last_day = parseInt(data[0][1]);
            globalInputs.id = parseInt(data[0][2]);
            globalInputs.algorithm = data[0][3];
            console.log("Run Inputs:", globalInputs);
    
            // Hiển thị hiệu ứng loading
            document.getElementById('overlay').style.display = 'flex';
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
                    $('#metricsImage').attr('src', response.metrics_image + '?t=' + timestamp);

                    $('#exportPDF').show();
                },
                error: function(xhr) {
                    // Ẩn hiệu ứng loading khi có lỗi
                    $('#loading-container').hide();
                    document.getElementById('overlay').style.display = 'none';
    
                    const errorMessage = xhr.responseJSON ? xhr.responseJSON.error : "An error occurred.";
                    console.error("Error:", xhr);
    
                    // Hiển thị lỗi trong pop-up
                    showPopup(errorMessage);
                },
                complete: function() {
                    // Ẩn hiệu ứng loading khi hoàn tất
                    $('#loading-container').hide();
                    document.getElementById('overlay').style.display = 'none';
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
