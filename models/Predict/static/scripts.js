// Toggle menu
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.navbar-menu').classList.toggle('show');
});

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

//Chuyển input
function runModelData() {
    const first_day_input = document.getElementById('input-first-day').value;
    const last_day_input = document.getElementById('input-last-day').value;
    const id_input = document.getElementById('input-id').value;
    const algorithm = document.getElementById('algorithm-select').value;

    // Kiểm tra điều kiện input
    if (!first_day_input || !last_day_input || !id_input || !algorithm) {
        showPopup("Please fill in all the information."); // Hiển thị popup nếu có trường trống
        return; // Dừng hàm nếu có trường trống
    }
    console.log("first_day: ", first_day_input, "last_day: ", last_day_input, "id: ", id_input, "algorithm: ", algorithm);
    let first_day = parseInt(first_day_input);
    let last_day = parseInt(last_day_input);
    let id = parseInt(id_input);

    if (first_day > last_day) {
        showPopup("Start date must be earlier than end date.");
        return;
    }
    else if (first_day < 0 || last_day < 0) {
        showPopup("Age must be greater than 0.");
        return;
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
        showPopup('An error occurred. Please try again.');
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

//************************************************************************************************************** */
// Thay đổi ngôn ngữ
// Dữ liệu chứa các nội dung dịch
const translations = {
    en: {
        navOverview: "Overview",
        navSolutions: "Solutions",
        navDashboard: "Dashboard",
        navResources: "Resources",
        navContact: "Contact Us",
        navDocs: "Docs",
        navSupport: "Support",
        headerTitle: "Predicting DFI and Weight for Pigs",
        headerDescription: "We offer solutions for predicting DFI (Daily Feed Intake) and the weight of pigs based on precise feeding technology. <br> Utilizing advanced AI models to optimize the farming process and enhance production efficiency.",
        inputId: "ID",
        inputFirstDay: "First day",
        inputLastDay: "Last day",
        runModelButton: "Run Model",
        algorithm1: "Linear Regression",
        algorithm2: "Gradient Boosting Regressor",
        algorithm3: "K Neighbors Regressor",
        algorithm4: "MLP Regressor",
        algorithm5: "SVR",
        algorithm6: "Random Forest Regressor",
        algorithm7: "Long Short Term Memory",
        algorithm8: "XGBoost Regressor",
        product1Title: "Intelligent DFI Solution",
        product1Description: "Implementing DFI prediction solutions for pigs, helping to monitor and optimize daily feed intake, thereby enhancing farming efficiency.",
        product2Title: "Accurate Weight Prediction",
        product2Description: "Using machine learning models to predict the weight of pigs based on historical data, helping farmers make more accurate decisions.",
        product3Title: "Farming Data Analysis",
        product3Description: "Providing data analysis tools to monitor the growth and health of pigs, thereby improving farming processes."
    },
    vi: {
        navOverview: "Tổng Quan",
        navSolutions: "Giải Pháp",
        navDashboard: "Bảng Điều Khiển",
        navResources: "Tài Nguyên",
        navContact: "Liên Hệ",
        navDocs: "Tài Liệu",
        navSupport: "Hỗ Trợ",
        headerTitle: "Dự Đoán DFI và Cân Nặng Cho Lợn",
        headerDescription: "Chúng tôi cung cấp các giải pháp dự đoán DFI (Lượng ăn hằng ngày) và cân nặng của lợn dựa trên công nghệ cho ăn chính xác. <br> Ứng dụng mô hình AI tiên tiến để tối ưu hóa quá trình chăn nuôi và nâng cao hiệu quả sản xuất.",
        inputId: "ID",
        inputFirstDay: "Ngày bắt đầu",
        inputLastDay: "Ngày kết thúc",
        runModelButton: "Chạy Mô Hình",
        algorithm1: "Hồi Quy Tuyến Tính",
        algorithm2: "Thuật Toán Tăng Cường Dần Dần",
        algorithm3: "Thuật Toán K Hàng Xóm Gần Nhất",
        algorithm4: "Thuật Toán Mạng Nơron",
        algorithm5: "Thuật Toán SVR",
        algorithm6: "Thuật Toán Rừng Ngẫu Nhiên",
        algorithm7: "LSTM (Bộ Nhớ Ngắn-Dài)",
        algorithm8: "Bộ Đánh Giá XGBoost",
        product1Title: "Giải Pháp DFI Thông Minh",
        product1Description: "Triển khai giải pháp dự đoán DFI cho lợn, giúp theo dõi và tối ưu hóa lượng ăn hằng ngày, từ đó nâng cao hiệu quả chăn nuôi.",
        product2Title: "Dự Đoán Cân Nặng Chính Xác",
        product2Description: "Sử dụng mô hình học máy để dự đoán cân nặng của lợn dựa trên dữ liệu lịch sử, giúp nông dân ra quyết định chính xác hơn.",
        product3Title: "Phân Tích Dữ Liệu Chăn Nuôi",
        product3Description: "Cung cấp các công cụ phân tích dữ liệu để theo dõi sự phát triển và sức khỏe của lợn, qua đó cải thiện quy trình chăn nuôi."
    },
    zh: {
        navOverview: "概述",
        navSolutions: "解决方案",
        navDashboard: "控制面板",
        navResources: "资源",
        navContact: "联系我们",
        navDocs: "文档",
        navSupport: "支持",
        headerTitle: "预测猪的DFI和体重",
        headerDescription: "我们提供基于精准饲喂技术的DFI（每日饲料摄入量）和猪体重预测解决方案。<br>应用先进的AI模型来优化饲养过程，提高生产效率。",
        inputId: "ID",
        inputFirstDay: "开始日期",
        inputLastDay: "结束日期",
        runModelButton: "运行模型",
        algorithm1: "线性回归",
        algorithm2: "梯度提升回归器",
        algorithm3: "K邻近回归器",
        algorithm4: "多层感知器回归器",
        algorithm5: "支持向量回归",
        algorithm6: "随机森林回归器",
        algorithm7: "长短期记忆网络",
        algorithm8: "XGBoost评估器",
        product1Title: "智能DFI解决方案",
        product1Description: "为猪实施DFI预测解决方案，帮助监控和优化每日饲料摄入量，从而提高饲养效率。",
        product2Title: "准确的体重预测",
        product2Description: "使用机器学习模型根据历史数据预测猪的体重，帮助农民作出更准确的决定。",
        product3Title: "饲养数据分析",
        product3Description: "提供数据分析工具来监控猪的生长和健康，从而改进饲养过程。"
    }
};

// Hàm thay đổi nội dung trang dựa trên ngôn ngữ
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
        headerDescription: document.querySelector("header p"),
        inputId: document.getElementById("input-id"),
        inputFirstDay: document.getElementById("input-first-day"),
        inputLastDay: document.getElementById("input-last-day"),
        runModelButton: document.querySelector(".buttons button"),
        algorithmSelect: document.getElementById("algorithm-select"),
        product1Title: document.querySelector(".product-card:nth-child(1) h2"),
        product1Description: document.querySelector(".product-card:nth-child(1) p"),
        product2Title: document.querySelector(".product-card:nth-child(2) h2"),
        product2Description: document.querySelector(".product-card:nth-child(2) p"),
        product3Title: document.querySelector(".product-card:nth-child(3) h2"),
        product3Description: document.querySelector(".product-card:nth-child(3) p"),
    };

    // Cập nhật nội dung dựa trên ngôn ngữ
    for (const key in elements) {
        if (elements[key]) {
            if (key === "algorithmSelect") {
                const options = elements[key].querySelectorAll("option");
                options.forEach((option, index) => {
                    option.textContent = translations[language][`algorithm${index + 1}`];
                });
            } else if (key === "headerDescription") {
                elements[key].innerHTML = translations[language][key];
            } else if (key === "inputId" || key === "inputFirstDay" || key === "inputLastDay") {
                elements[key].setAttribute("placeholder", translations[language][key]);
            } else if (key === "runModelButton") {
                elements[key].textContent = translations[language][key];
            } else {
                elements[key].textContent = translations[language][key];
            }
        }
    }
}

// Tải và áp dụng ngôn ngữ khi trang được load
window.onload = function() {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en"; // Mặc định là tiếng Anh
    const languageSelect = document.getElementById("language-select");

    // Đặt giá trị cho dropdown và áp dụng ngôn ngữ
    languageSelect.value = savedLanguage;
    changeLanguage(savedLanguage);

    // Lắng nghe sự kiện thay đổi ngôn ngữ
    languageSelect.addEventListener("change", function () {
        const selectedLanguage = languageSelect.value;
        localStorage.setItem("selectedLanguage", selectedLanguage);
        changeLanguage(selectedLanguage); // Thay đổi nội dung ngay lập tức
    });
};






