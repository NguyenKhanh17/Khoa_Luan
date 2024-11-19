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
        changeLanguage(savedLanguage);
    }

    // Lắng nghe sự kiện khi người dùng thay đổi ngôn ngữ
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = languageSelect.value;
        localStorage.setItem('selectedLanguage', selectedLanguage);
        changeLanguage(selectedLanguage);
        // Chỉ tải lại trang nếu ngôn ngữ thay đổi
        if (savedLanguage !== selectedLanguage) {
            // location.reload();
        }
    });
}

// scripts_solution.js

// Đối tượng chứa các bản dịch cho tiếng Anh và tiếng Việt
const translations = {
    en: {
        title: "Predictive Solutions for DFI and Weight for Pigs",
        nav: {
            overview: "Overview",
            solutions: "Solutions",
            dashboard: "Dashboard",
            resources: "Resources",
            contact: "Contact Us",
            docs: "Docs",
            support: "Support"
        },
        header: "Predictive Solutions for DFI and Weight for Pigs",
        sections: {
            userInterface: "1. User Interface (UI)",
            inputDataProcessing: "2. Input Data Processing and Algorithm Selection",
            userDatabase: "3. Connection to User Database",
            implementation: "4. Implementation of Prediction Algorithms and Models",
            resultsVisualization: "5. Results and Data Visualization",
            maintenance: "6. Maintenance and Upgrades"
        },
        content: {
            userInterface: "The main interface of the page will include the following input fields:",
            userInterfaceList: [
                "ID: Enter the ID of the pig you want to predict.",
                "Start Date and End Date: Select the prediction period.",
                "Prediction Algorithm Selection:",
                "Run Prediction Button: When the user clicks, the system sends a prediction request to the backend.",
                "Result Display Section: Includes charts and statistical data."
            ],
            predictionAlgorithm: [
                "Linear Regression: Simple and effective for linear predictions.",
                "Random Forest: Suitable when data has non-linear factors.",
                "Gradient Boosting: Provides accurate predictions by optimizing multiple decision trees.",
                "Neural Network: Suitable for large and complex datasets with non-linear prediction capabilities."
            ],
            inputDataProcessing: "Backend processes input data from UI as follows:",
            inputDataProcessingList: [
                "Validates the ID, Start Date, and End Date.",
                "Standardizes input data and checks the format for consistency with the model.",
                "Backend runs the algorithm based on the user's selection to make predictions."
            ],
            userDatabase: "Supports users to upload and view personal databases:",
            userDatabaseList: [
                "Users can upload a CSV file containing their personal data.",
                "The system checks the format and stores the data in a separate table to avoid affecting the main data.",
                "Users can select their database for prediction."
            ],
            implementation: "The API for prediction processing will perform the following steps:",
            implementationList: [
                "Receives requests from the frontend, runs the prediction model for each selected algorithm.",
                "Displays the prediction results by day, in a time series chart.",
                "Allows comparison of prediction results from different algorithms within the same time period."
            ],
            resultsVisualization: "Results and Data Visualization:",
            resultsVisualizationList: [
                "Time Series Prediction Chart: Displays the growth trend of DFI and weight over time.",
                "Prediction Data Table: Details the prediction results for each day.",
                "Data Export: Allows users to download the results into a CSV file."
            ],
            maintenance: "Maintenance and Upgrades:",
            maintenanceList: [
                "Ensures the security of user data and manages personal databases separately from the main data.",
                "Updates the prediction model when new data is available.",
                "Upgrades the UI based on user feedback to improve the experience."
            ]
        }
    },
    vi: {
        title: "Giải pháp dự đoán cho DFI và trọng lượng của lợn",
        nav: {
            overview: "Tổng quan",
            solutions: "Giải pháp",
            dashboard: "Bảng điều khiển",
            resources: "Tài nguyên",
            contact: "Liên hệ",
            docs: "Tài liệu",
            support: "Hỗ trợ"
        },
        header: "Giải pháp dự đoán cho DFI và trọng lượng của lợn",
        sections: {
            userInterface: "1. Giao diện người dùng (UI)",
            inputDataProcessing: "2. Xử lý dữ liệu đầu vào và lựa chọn thuật toán",
            userDatabase: "3. Kết nối với cơ sở dữ liệu người dùng",
            implementation: "4. Triển khai các thuật toán và mô hình dự đoán",
            resultsVisualization: "5. Kết quả và hiển thị dữ liệu",
            maintenance: "6. Bảo trì và nâng cấp"
        },
        content: {
            userInterface: "Giao diện chính của trang bao gồm các trường đầu vào sau:",
            userInterfaceList: [
                "ID: Nhập ID của lợn bạn muốn dự đoán.",
                "Ngày bắt đầu và Ngày kết thúc: Chọn thời gian dự đoán.",
                "Lựa chọn Thuật toán Dự đoán:",
                "Nút chạy Dự đoán: Khi người dùng nhấn, hệ thống gửi yêu cầu dự đoán tới backend.",
                "Phần hiển thị Kết quả: Bao gồm biểu đồ và dữ liệu thống kê."
            ],
            predictionAlgorithm: [
                "Hồi quy tuyến tính: Đơn giản và hiệu quả cho các dự đoán tuyến tính.",
                "Rừng ngẫu nhiên: Phù hợp khi dữ liệu có các yếu tố không tuyến tính.",
                "Gradient Boosting: Đưa ra các dự đoán chính xác bằng cách tối ưu hóa nhiều cây quyết định.",
                "Mạng nơ-ron: Phù hợp cho các tập dữ liệu lớn và phức tạp với khả năng dự đoán không tuyến tính."
            ],
            inputDataProcessing: "Backend xử lý dữ liệu đầu vào từ UI như sau:",
            inputDataProcessingList: [
                "Xác minh ID, Ngày bắt đầu và Ngày kết thúc.",
                "Chuẩn hóa dữ liệu đầu vào và kiểm tra định dạng phù hợp với mô hình.",
                "Backend chạy thuật toán dựa trên lựa chọn của người dùng để đưa ra dự đoán."
            ],
            userDatabase: "Hỗ trợ người dùng tải lên và xem cơ sở dữ liệu cá nhân:",
            userDatabaseList: [
                "Người dùng có thể tải lên tệp CSV chứa dữ liệu cá nhân của mình.",
                "Hệ thống kiểm tra định dạng và lưu dữ liệu vào bảng riêng để tránh ảnh hưởng dữ liệu chính.",
                "Người dùng có thể chọn cơ sở dữ liệu của mình để dự đoán."
            ],
            implementation: "API xử lý dự đoán sẽ thực hiện các bước sau:",
            implementationList: [
                "Nhận yêu cầu từ frontend, chạy mô hình dự đoán cho mỗi thuật toán đã chọn.",
                "Hiển thị kết quả dự đoán theo ngày dưới dạng biểu đồ chuỗi thời gian.",
                "Cho phép so sánh kết quả dự đoán của các thuật toán trong cùng khoảng thời gian."
            ],
            resultsVisualization: "Kết quả và Hiển thị Dữ liệu:",
            resultsVisualizationList: [
                "Biểu đồ dự đoán chuỗi thời gian: Hiển thị xu hướng tăng trưởng của DFI và trọng lượng theo thời gian.",
                "Bảng dữ liệu dự đoán: Chi tiết kết quả dự đoán cho mỗi ngày.",
                "Xuất dữ liệu: Cho phép người dùng tải kết quả xuống dưới dạng tệp CSV."
            ],
            maintenance: "Bảo trì và Nâng cấp:",
            maintenanceList: [
                "Đảm bảo bảo mật dữ liệu người dùng và quản lý cơ sở dữ liệu cá nhân riêng biệt với dữ liệu chính.",
                "Cập nhật mô hình dự đoán khi có dữ liệu mới.",
                "Nâng cấp UI dựa trên phản hồi của người dùng để cải thiện trải nghiệm."
            ]
        }
    }
};

function changeLanguage(selectedLanguage) {
    const translation = translations[selectedLanguage];

    // Cập nhật title
    document.title = translation.title;

    // Cập nhật navbar
    document.querySelector(".nav-overview").textContent = translation.nav.overview;
    document.querySelector(".nav-solutions").textContent = translation.nav.solutions;
    document.querySelector(".nav-dashboard").textContent = translation.nav.dashboard;
    document.querySelector(".nav-resources").textContent = translation.nav.resources;
    document.querySelector(".nav-contact").textContent = translation.nav.contact;
    document.querySelector(".nav-docs").textContent = translation.nav.docs;
    document.querySelector(".nav-support").textContent = translation.nav.support;

    // Cập nhật header
    document.querySelector("header h1").textContent = translation.header;

    // Cập nhật các tiêu đề section
    document.getElementById("user-interface").textContent = translation.sections.userInterface;
    document.getElementById("input-data-processing").textContent = translation.sections.inputDataProcessing;
    document.getElementById("user-database").textContent = translation.sections.userDatabase;
    document.getElementById("implementation").textContent = translation.sections.implementation;
    document.getElementById("results-visualization").textContent = translation.sections.resultsVisualization;
    document.getElementById("maintenance").textContent = translation.sections.maintenance;

    // Cập nhật nội dung các phần tử chính
    document.querySelector("#user-interface-content p").textContent = translation.content.userInterface;
    document.querySelectorAll("#user-interface-content ul li").forEach((item, index) => {
        item.textContent = translation.content.userInterfaceList[index];
    });

    document.querySelectorAll("#prediction-algorithm-content ul li").forEach((item, index) => {
        item.textContent = translation.content.predictionAlgorithm[index];
    });

    document.querySelector("#input-data-processing-content p").textContent = translation.content.inputDataProcessing;
    document.querySelectorAll("#input-data-processing-content ul li").forEach((item, index) => {
        item.textContent = translation.content.inputDataProcessingList[index];
    });

    document.querySelector("#user-database-content p").textContent = translation.content.userDatabase;
    document.querySelectorAll("#user-database-content ul li").forEach((item, index) => {
        item.textContent = translation.content.userDatabaseList[index];
    });

    document.querySelector("#implementation-content p").textContent = translation.content.implementation;
    document.querySelectorAll("#implementation-content ul li").forEach((item, index) => {
        item.textContent = translation.content.implementationList[index];
    });

    document.querySelector("#results-visualization-content p").textContent = translation.content.resultsVisualization;
    document.querySelectorAll("#results-visualization-content ul li").forEach((item, index) => {
        item.textContent = translation.content.resultsVisualizationList[index];
    });

    document.querySelector("#maintenance-content p").textContent = translation.content.maintenance;
    document.querySelectorAll("#maintenance-content ul li").forEach((item, index) => {
        item.textContent = translation.content.maintenanceList[index];
    });
}