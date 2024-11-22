// // Tăng dần % và chiều rộng của thanh tiến trình
// const loader = document.querySelector('.loader');
// const progress = loader.querySelector('.progress');
// const percentage = loader.querySelector('.percentage');

// let progressValue = 0; // Giá trị ban đầu
// const duration = 6000; // Thời gian hoàn thành (ms)
// const interval = 100; // Cập nhật mỗi 100ms
// const step = (interval / duration) * 100; // % tăng mỗi lần cập nhật

// const intervalId = setInterval(() => {
//   progressValue = Math.min(progressValue + step, 100); // Tăng % nhưng không vượt quá 100
//   progress.style.width = `${progressValue}%`; // Cập nhật chiều rộng
//   percentage.textContent = `${Math.floor(progressValue)}%`; // Cập nhật text
//   if (progressValue >= 100) clearInterval(intervalId); // Dừng khi đạt 100%
// }, interval);

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

// Upload file
document.getElementById("upload-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    fetch('/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include' // Để gửi cookie
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Upload successful!") {
            // Display successful pop-up message
            showPopup("Upload successful!", () => showAlgorithmPopup());
            // Change the "Default Data" button color to gray
            const defaultDataButton = document.getElementById("default-data-button");
            defaultDataButton.style.backgroundColor = "gray";
            defaultDataButton.disabled = false; // Bật lại nút sau khi tải lên
            defaultDataButton.setAttribute("data-state", "uploaded");
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

// Xử lý sự kiện nhấn nút "Default Data"
document.getElementById("default-data-button").addEventListener("click", function() {
    const buttonState = this.getAttribute("data-state");

    if (buttonState === "uploaded") {
        fetch('/set_default_data', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Chuyển sang database mặc định") {
                showPopup("Chuyển sang database mặc định");
                
                // Chuyển nút sang màu xanh và reset trạng thái
                this.style.backgroundColor = "green";
                this.setAttribute("data-state", "default");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            showPopup("An error occurred while switching to default data.");
        });
    }
});

// Hàm hiển thị pop-up
function showPopup(message, onClose = null) {
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
        if (onClose) onClose();
    });
}


// Hàm hiển thị popup chọn thuật toán
function showAlgorithmPopup() {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `<div class="popup-content">
                       <span class="close-btn">&times;</span>
                       <h3>Select algorithms to train the model</h3>
                       <form id="algorithm-form">
                           <label>
                               <input type="checkbox" name="algorithm" value="Algorithm1">
                               Linear Regression
                           </label>
                           <label>
                               <input type="checkbox" name="algorithm" value="Algorithm2">
                               Decision Tree
                           </label>
                           <label>
                               <input type="checkbox" name="algorithm" value="Algorithm3">
                               Random Forest
                           </label>
                           <label>
                               <input type="checkbox" name="algorithm" value="Algorithm4">
                               Gradient Boosting
                           </label>
                           <label>
                               <input type="checkbox" name="algorithm" value="Algorithm5">
                               Support Vector Machine
                           </label>
                           <label>
                               <input type="checkbox" name="algorithm" value="Algorithm6">
                               Neural Network
                           </label>
                           <button type="button" id="confirm-algorithm-btn">Confirm</button>
                       </form>
                   </div>`;

    document.body.appendChild(popup);

    // Đóng popup
    popup.querySelector(".close-btn").addEventListener("click", function() {
        popup.remove();
    });

    // Xử lý xác nhận
    document.getElementById("confirm-algorithm-btn").addEventListener("click", function() {
        const selectedAlgorithms = Array.from(document.querySelectorAll("input[name='algorithm']:checked"))
                                        .map(input => input.value);
        if (selectedAlgorithms.length === 0) {
            alert("Please select at least one algorithm.");
            return;
        }
        popup.remove();
        showLoading(selectedAlgorithms);
    });
}

// Hàm hiển thị thanh loading
function showLoading(algorithms) {
    const overlay = document.querySelector(".overlay");
    const loadingContainer = document.querySelector(".loader_upload");
    const progressBar = document.querySelector(".progress_upload");
    const percentageText = document.querySelector(".percentage_upload");
    const stopButton = document.querySelector(".stop-btn");

    // Hiển thị overlay và loader
    overlay.style.display = "block";
    loadingContainer.style.display = "block";

    let progress = 0;
    let isStopped = false; // Cờ kiểm tra nếu người dùng nhấn "Stop"

    const interval = setInterval(() => {
        if (isStopped) {
            clearInterval(interval);
            overlay.style.display = "none";
            loadingContainer.style.display = "none";
            showCompletionPopup("The process has been cancelled.");
            return;
        }

        progress += 10;
        progressBar.style.width = `${progress}%`;
        percentageText.textContent = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            overlay.style.display = "none";
            loadingContainer.style.display = "none";
            const algorithmNames = {
                Algorithm1: "Linear Regression",
                Algorithm2: "Decision Tree",
                Algorithm3: "Random Forest",
                Algorithm4: "Gradient Boosting",
                Algorithm5: "Support Vector Machine",
                Algorithm6: "Neural Network"
            };

            showCompletionPopup("Training completed with algorithms: " + algorithms.map(algo => algorithmNames[algo]).join(", "));
        }
    }, 500);

    // Xử lý khi nhấn nút "Stop"
    stopButton.addEventListener("click", function () {
        isStopped = true;
    });
}



function showCompletionPopup(message) {
    const completionPopup = document.createElement("div");
    completionPopup.classList.add("popup");
    completionPopup.innerHTML = `
        <div class="popup-content">
            <span class="close-btn">&times;</span>
            <h3>${message}</h3>
            <button class="close-popup-btn">Đóng</button>
        </div>`;
    document.body.appendChild(completionPopup);

    // Đóng popup khi nhấn nút X hoặc nút "Đóng"
    completionPopup.querySelector(".close-btn").addEventListener("click", function() {
        completionPopup.remove();
    });
    completionPopup.querySelector(".close-popup-btn").addEventListener("click", function() {
        completionPopup.remove();
    });
}


//*************************************************************************************************************************
// Change language
const translations = {
    en: {
        navOverview: "Overview",
        navSolutions: "Solutions",
        navDashboard: "Dashboard",
        navResources: "Resources",
        navContact: "Contact Us",
        navDocs: "Docs",
        navSupport: "Support",
        headerTitle: "Introduction to the Project",
        headerDescription: "The data of this project includes information of 100 pigs of the Piétrain NN Français breed, raised at the AXIOM boar testing station in 2020. At this pig farm, an automatic feeding system has been integrated, helping to accurately record the weight and amount of food consumed by each pig each time they visit. This allows detailed data collection on the development of each individual, which can then be analyzed and optimize the breeding process effectively.",
        contentTitle: "Structure of the Database",
        contentDescription: "This database is designed to store and retrieve important information about each individual pig, including:",
        personalInfo: "Personal information: Each pig has a unique identification code (ID) to track history and behavior.",
        age: "Age: Information about the age of each pig is calculated in days. This data is important because the nutritional needs and growth rate of pigs vary at each stage of development.",
        growthParams: "Growth parameters: The weight of each pig is recorded at specific times, helping to track the growth process.",
        dfi: "Daily Feed Intake (DFI): Automatically recorded each time a pig visits the feeding area, helping to determine the exact amount of food that each pig has consumed.",
        uploadTitle: "Upload to Database",
        fileUploadLabel: "Choose a CSV file to upload (must have at least 4 fields: id, age, dfi, weight):",
        uploadButton: "Upload",
        defaultDataButton: "Default Data",
        errorMessage: "Database is not valid. Please upload again."
    },
    vi: {
        navOverview: "Tổng Quan",
        navSolutions: "Giải Pháp",
        navDashboard: "Bảng Điều Khiển",
        navResources: "Tài Nguyên",
        navContact: "Liên Hệ",
        navDocs: "Tài Liệu",
        navSupport: "Hỗ Trợ",
        headerTitle: "Giới Thiệu Dự Án",
        headerDescription: "Dữ liệu của dự án này bao gồm thông tin của 100 con lợn giống Piétrain NN Français, được nuôi tại trạm thử nghiệm lợn đực AXIOM vào năm 2020. Tại trang trại này, hệ thống cho ăn tự động đã được tích hợp, giúp ghi lại chính xác cân nặng và lượng thức ăn tiêu thụ của từng con mỗi lần chúng ghé thăm. Điều này cho phép thu thập dữ liệu chi tiết về sự phát triển của từng cá thể, từ đó phân tích và tối ưu hóa quá trình chăn nuôi một cách hiệu quả.",
        contentTitle: "Cấu Trúc Cơ Sở Dữ Liệu",
        contentDescription: "Cơ sở dữ liệu này được thiết kế để lưu trữ và truy xuất thông tin quan trọng về từng cá thể lợn, bao gồm:",
        personalInfo: "Thông tin cá nhân: Mỗi con lợn có mã nhận dạng (ID) duy nhất để theo dõi lịch sử và hành vi.",
        age: "Tuổi: Thông tin về tuổi của từng con lợn được tính bằng ngày. Dữ liệu này rất quan trọng vì nhu cầu dinh dưỡng và tốc độ tăng trưởng của lợn thay đổi ở mỗi giai đoạn phát triển.",
        growthParams: "Các thông số tăng trưởng: Cân nặng của từng con lợn được ghi lại vào những thời điểm cụ thể, giúp theo dõi quá trình phát triển.",
        dfi: "Lượng ăn hằng ngày (DFI): Được ghi tự động mỗi lần lợn ghé khu vực cho ăn, giúp xác định chính xác lượng thức ăn mà từng con đã tiêu thụ.",
        uploadTitle: "Tải Lên Cơ Sở Dữ Liệu",
        fileUploadLabel: "Chọn tệp CSV để tải lên (phải có ít nhất 4 trường: id, age, dfi, weight):",
        uploadButton: "Tải Lên",
        defaultDataButton: "Dữ Liệu Mặc Định",
        errorMessage: "Cơ sở dữ liệu không hợp lệ. Vui lòng tải lại."
    },
    zh: {
        navOverview: "概述",
        navSolutions: "解决方案",
        navDashboard: "仪表板",
        navResources: "资源",
        navContact: "联系我们",
        navDocs: "文档",
        navSupport: "支持",
        headerTitle: "项目介绍",
        headerDescription: "该项目的数据包括2020年在AXIOM公猪测试站饲养的100头Piétrain NN Français品种猪的信息。在这个养猪场，集成了自动喂养系统，帮助准确记录每头猪每次访问时的体重和食物消耗量。这使得能够详细收集每个个体的发展数据，从而有效分析和优化育种过程。",
        contentTitle: "数据库结构",
        contentDescription: "该数据库旨在存储和检索有关每头猪的重要信息，包括：",
        personalInfo: "个人信息：每头猪都有一个唯一的识别代码（ID）以跟踪历史和行为。",
        age: "年龄：每头猪的年龄信息以天为单位计算。这个数据很重要，因为猪在每个发展阶段的营养需求和生长速度各不相同。",
        growthParams: "生长参数：每头猪的体重在特定时间记录，帮助跟踪生长过程。",
        dfi: "每日饲料摄入量（DFI）：每次猪访问喂食区时自动记录，帮助确定每头猪消耗的确切食物量。",
        uploadTitle: "上传到数据库",
        fileUploadLabel: "选择要上传的CSV文件（必须至少有4个字段：id，age，dfi，weight）：",
        uploadButton: "上传",
        defaultDataButton: "默认数据",
        errorMessage: "数据库无效。请重新上传。"
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
        headerDescription: document.querySelector("header p"),
        contentTitle: document.querySelector(".content h2"),
        contentDescription: document.querySelector(".content p"),
        personalInfo: document.querySelectorAll(".content ul li")[0],
        age: document.querySelectorAll(".content ul li")[1],
        growthParams: document.querySelectorAll(".content ul li")[2],
        dfi: document.querySelectorAll(".content ul li")[3],
        uploadTitle: document.querySelector("main section h2"),
        fileUploadLabel: document.getElementById("file-upload-label"),
        uploadButton: document.querySelector("#upload-form button"),
        defaultDataButton: document.getElementById("default-data-button"),
        errorMessage: document.getElementById("error-message")
    };

    for (const key in elements) {
        if (elements[key]) {
            elements[key].textContent = translations[language][key] || elements[key].textContent;
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

