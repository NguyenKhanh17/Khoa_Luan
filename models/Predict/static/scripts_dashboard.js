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
    const firstDay = globalInputs.first_day;
    const lastDay = globalInputs.last_day;
    const id = globalInputs.id;
    const selectedAlgorithm = globalInputs.algorithm;

    fetch('/get_all_summaries')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Dữ liệu từ các bảng:", data);

             // Truy cập dữ liệu từ "tables"
            const dfiData = data.tables["output_summary_all_default_dfi"];
            const weightData = data.tables["output_summary_all_default_weight"];
            const meanDfiData = data.tables["output_summary_mean_default_dfi"].map(item => ({
                min: item.min,
                max: item.max,
                mean: item.mean,
                sd: item.sd
            }));
            
            const meanWeightData = data.tables["output_summary_mean_default_weight"].map(item => ({
                min: item.min,
                max: item.max,
                mean: item.mean,
                sd: item.sd
            }));

            // Kiểm tra kiểu dữ liệu của id
            const idNumber = parseInt(id); // Chuyển đổi id thành số nguyên
            const dfi_Data_single = dfiData.find(item => item.id === idNumber);
            const weight_Data_single = weightData.find(item => item.id === idNumber);

            console.log("DFI Data Single received:", dfi_Data_single);
            console.log("Weight Data Single received:", weight_Data_single);

            console.log({
                selectedAlgorithm_data_received: selectedAlgorithm
            });

            // Truy cập dữ liệu lỗi (error metrics)
            const metrics_dfi_data = data.dfi_error[selectedAlgorithm]?.[0] || { error: "Không tìm thấy dữ liệu metrics DFI" };
            const metrics_weight_data = data.weight_error[selectedAlgorithm]?.[0] || { error: "Không tìm thấy dữ liệu metrics Weight" };
            
            console.log("Metrics DFI:", metrics_dfi_data);
            console.log("Metrics Weight:", metrics_weight_data);

            addDataToPDF(doc, firstDay, lastDay, id, selectedAlgorithm, dfi_Data_single, weight_Data_single, meanDfiData, meanWeightData, metrics_dfi_data, metrics_weight_data);
            doc.save("SmartSwine_Prediction_Report.pdf");
        })
        .catch(error => {
            console.error("Lỗi khi lấy dữ liệu:", error);
        });

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
            metrics_weight_data
        ) {
            const pageHeight = doc.internal.pageSize.height;
            const pageWidth = doc.internal.pageSize.width;
            const margin = 10;
            const lineSpacing = 8; // Khoảng cách giữa các dòng
            let yPosition = margin + 10;

            // Function to print a long text with automatic page break
            function addMultiLineText(text, x, options) {
                const lines = doc.splitTextToSize(text, options.maxWidth || (pageWidth - 2 * margin));
                lines.forEach(line => {
                    doc.text(line, x, yPosition);
                    yPosition += lineSpacing;
                });
            }
    
            // Tiêu đề lớn cho dòng đầu tiên của bản báo cáo, căn giữa
            doc.setFont("helvetica", "bold");
            doc.setFontSize(24);
            doc.text("SMART SWINE PREDICTION REPORT", pageWidth / 2, yPosition, "center");
            yPosition += lineSpacing * 2; // Tăng khoảng cách giữa tiêu đề và nội dung

            // Part 1: General Information
            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);
            doc.text("General Information", pageWidth / 2, yPosition, "center");
            doc.setFontSize(14);
            yPosition += lineSpacing * 2; // Increase space between title and content

            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.text(`- Start Date: ${firstDay}`, margin, yPosition);
            yPosition += lineSpacing;

            doc.text(`- End Date: ${lastDay}`, margin, yPosition);
            yPosition += lineSpacing;

            doc.text(`- Pig ID: ${id}`, margin, yPosition);
            yPosition += lineSpacing;

            // Selected Algorithm
            let name_algorithm = getAlgorithmName(selectedAlgorithm);
            doc.text(`- Selected Algorithm: ${name_algorithm}`, margin, yPosition);
            yPosition += lineSpacing * 2;

            // Part 2: Overview
            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);
            doc.text("Overview and Objectives", pageWidth / 2, yPosition, "center");
            doc.setFontSize(14);
            yPosition += lineSpacing * 2;

            doc.setFont("helvetica", "normal");
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
                    "The accuracy result is good." : 
                    metrics_dfi_data.r2 > 0.5 ? 
                    "The accuracy result is average, with room for improvement." : 
                    "The accuracy result is not good.";
                    
                
                // Ghi chú thêm về độ chính xác
                const detailedComment = metrics_dfi_data.r2 > 0.8 ? 
                    "The model is working very efficiently and can be trusted." : 
                    metrics_dfi_data.r2 > 0.5 ? 
                    "The model requires further refinement to enhance prediction accuracy." : 
                    "The model needs to be reviewed and adjusted to improve accuracy.";
                
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

            if (selectedAlgorithm === "algorithm1") { // If Linear Regression
                dfiComment = `The Linear Regression model achieved an average accuracy with R² = ${dfiAccuracy.toFixed(6)}, indicating limited predictive ability and a need for improvement to better reflect the relationship between input factors and DFI.`;
                weightComment = `The model achieved very high accuracy with R² = ${weightAccuracy.toFixed(6)}, demonstrating the effectiveness of Linear Regression in predicting pig weight based on the available data.`;
            }
            else if (selectedAlgorithm === "algorithm2") { // If Gradient Boosting
                dfiComment = `The Gradient Boosting model achieved an average accuracy with R² = ${dfiAccuracy.toFixed(6)}, indicating limited predictive ability and a need for improvement to better reflect the relationship between input factors and DFI.`;
                weightComment = `The model achieved very high accuracy with R² = ${weightAccuracy.toFixed(6)}, demonstrating the effectiveness of Gradient Boosting in predicting pig weight based on the available data.`;
            }
            else if (selectedAlgorithm === "algorithm3") { // If K-Nearest Neighbors
                dfiComment = `The K-Nearest Neighbors model achieved an average accuracy with R² = ${dfiAccuracy.toFixed(6)}, indicating limited predictive ability and a need for improvement to better reflect the relationship between input factors and DFI.`;
                weightComment = `The model achieved very high accuracy with R² = ${weightAccuracy.toFixed(6)}, demonstrating the effectiveness of K-Nearest Neighbors in predicting pig weight based on the available data.`;
            }
            else if (selectedAlgorithm === "algorithm4") { // If Multilayer Perceptron
                dfiComment = `The Multilayer Perceptron model achieved an average accuracy with R² = ${dfiAccuracy.toFixed(6)}, indicating limited predictive ability and a need for improvement to better reflect the relationship between input factors and DFI.`;
                weightComment = `The model achieved very high accuracy with R² = ${weightAccuracy.toFixed(6)}, demonstrating the effectiveness of Multilayer Perceptron in predicting pig weight based on the available data.`;
            }
            else if (selectedAlgorithm === "algorithm5") { // If Support Vector Regression
                dfiComment = `The Support Vector Regression model achieved an average accuracy with R² = ${dfiAccuracy.toFixed(6)}, indicating limited predictive ability and a need for improvement to better reflect the relationship between input factors and DFI.`;
                weightComment = `The model achieved very high accuracy with R² = ${weightAccuracy.toFixed(6)}, demonstrating the effectiveness of Support Vector Regression in predicting pig weight based on the available data.`;
            }
            else if (selectedAlgorithm === "algorithm6") { // If Random Forest
                dfiComment = `The Random Forest model achieved an average accuracy with R² = ${dfiAccuracy.toFixed(6)}, indicating limited predictive ability and a need for improvement to better reflect the relationship between input factors and DFI.`;
                weightComment = `The model achieved very high accuracy with R² = ${weightAccuracy.toFixed(6)}, demonstrating the effectiveness of Random Forest in predicting pig weight based on the available data.`;
            }
            else if (selectedAlgorithm === "algorithm7") { // If Long Short Term Memory
                dfiComment = `The Long Short Term Memory model achieved an average accuracy with R² = ${dfiAccuracy.toFixed(6)}, indicating limited predictive ability and a need for improvement to better reflect the relationship between input factors and DFI.`;
                weightComment = `The model achieved very high accuracy with R² = ${weightAccuracy.toFixed(6)}, demonstrating the effectiveness of Long Short Term Memory in predicting pig weight based on the available data.`;
            }
            else if (selectedAlgorithm === "algorithm8") { // If LSTM (Custom Implementation)
                dfiComment = `The LSTM (Custom Implementation) model achieved an average accuracy with R² = ${dfiAccuracy.toFixed(6)}, indicating limited predictive ability and a need for improvement to better reflect the relationship between input factors and DFI.`;
                weightComment = `The model achieved very high accuracy with R² = ${weightAccuracy.toFixed(6)}, demonstrating the effectiveness of LSTM (Custom Implementation) in predicting pig weight based on the available data.`;
            }

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
    
        function getAlgorithmName(selectedAlgorithm) {
            switch (selectedAlgorithm) {
                case "algorithm1": return "Linear Regression";
                case "algorithm2": return "Gradient Boosting";
                case "algorithm3": return "K-Nearest Neighbors";
                case "algorithm4": return "Multilayer Perceptron";
                case "algorithm5": return "Support Vector Regression";
                case "algorithm6": return "Random Forest";
                case "algorithm7": return "Long Short Term Memory";
                case "algorithm8": return "LSTM (Custom Implementation)";
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
            doc.setFont("helvetica", "bolditalic");
            doc.text(`Below are the average prediction results for the entire pig herd during this period:`, margin, yPosition);
            doc.setFont("helvetica", "normal");
            yPosition += 8;
            doc.setFont("helvetica", "italic");
            doc.text(`Average DFI:`, margin, yPosition);
            yPosition += 8;
            doc.setFont("helvetica", "normal");
            doc.text(`   - Minimum DFI: ${meanDfiData[0].min}`, margin + 10, yPosition);
            yPosition += 8;
            doc.text(`   - Maximum DFI: ${meanDfiData[0].max}`, margin + 10, yPosition);
            yPosition += 8;
            doc.text(`   - Average DFI: ${meanDfiData[0].mean}`, margin + 10, yPosition);
            yPosition += 8;
            doc.text(`   - Standard Deviation DFI: ${meanDfiData[0].sd}`, margin + 10, yPosition);
            yPosition += 10;
            
            doc.setFont("helvetica", "italic");
            doc.text(`Average Weight:`, margin, yPosition);
            yPosition += 8;
            doc.setFont("helvetica", "normal");
            doc.text(`   - Minimum Weight: ${meanWeightData[0].min}`, margin + 10, yPosition);
            yPosition += 8;
            doc.text(`   - Maximum Weight: ${meanWeightData[0].max}`, margin + 10, yPosition);
            yPosition += 8;
            doc.text(`   - Average Weight: ${meanWeightData[0].mean}`, margin + 10, yPosition);
            yPosition += 8;
            doc.text(`   - Standard Deviation Weight: ${meanWeightData[0].sd}`, margin + 10, yPosition);
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
