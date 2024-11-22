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


// Cập nhật nội dung dịch
const translations = {
    en: {
        navOverview: "Overview",
        navSolutions: "Solutions",
        navDashboard: "Dashboard",
        navResources: "Resources",
        navContact: "Contact Us",
        navDocs: "Docs",
        navSupport: "Support",
        headerTitle: "Predictive Solutions for DFI and Weight for Pigs",
        sectionUI: `
            <h2>1. User Interface (UI)</h2>
        `,
        contentUI: `
            <p>The main interface of the page will include the following input fields:</p>
            <ul>
                <li><strong>ID</strong>: Enter the ID of the pig you want to predict.</li>
                <li><strong>Start Date</strong> and <strong>End Date</strong>: Select the prediction period.</li>
                <li><strong>Prediction Algorithm Selection</strong>:
                    <ul>
                        <li>Linear Regression: Simple and effective for linear predictions.</li>
                        <li>Random Forest: Suitable when data has non-linear factors.</li>
                        <li>Gradient Boosting: Provides accurate predictions by optimizing multiple decision trees.</li>
                        <li>Neural Network: Suitable for large and complex datasets with non-linear prediction capabilities.</li>
                    </ul>
                </li>
                <li><strong>Run Prediction Button</strong>: When the user clicks, the system sends a prediction request to the backend.</li>
                <li><strong>Result Display Section</strong>: Includes charts and statistical data.</li>
            </ul>
            <img class="content-image" src="/static/front_end_images/donut_en.png" alt="Donut Chart" style="display: block; margin: 20px auto; max-width: 80%;">
        `,
        sectionInput: `
            <h2>2. Input Data Processing and Algorithm Selection</h2>
        `,
        contentInput: `
            <p>Backend processes input data from UI as follows:</p>
            <ul>
                <li>Validates the <strong>ID</strong>, <strong>Start Date</strong>, and <strong>End Date</strong>.</li>
                <li>Standardizes input data and checks the format for consistency with the model.</li>
                <li>Backend runs the algorithm based on the user's selection to make predictions.</li>
            </ul>
            <img class="content-image" id="prediction-image" src="/static/front_end_images/predict_en.png" alt="Prediction Chart" style="display: block; margin: 20px auto; max-width: 80%;">
        `,
        sectionDatabase: `
            <h2>3. Connection to User Database</h2>
        `,
        contentDatabase: `
            <p>Supports users to upload and view personal databases:</p>
            <ul>
                <li>Users can upload a CSV file containing their personal data.</li>
                <li>The system checks the format and stores the data in a separate table to avoid affecting the main data.</li>
                <li>Users can select their database for prediction.</li>
            </ul>
            <img class="content-image" src="/static/front_end_images/upload2.png" alt="Data Upload" style="display: block; margin: 20px auto; max-width: 80%;">
        `,
        sectionImplementation: `
            <h2>4. Implementation of Prediction Algorithms and Models</h2>
        `,
        contentImplementation: `
            <p>The API for prediction processing will perform the following steps:</p>
            <ul>
                <li>Receives requests from the frontend, runs the prediction model for each selected algorithm.</li>
                <li>Displays the prediction results by day, in a time series chart.</li>
                <li>Allows comparison of prediction results from different algorithms within the same time period.</li>
            </ul>
        `,
        sectionResults: `
            <h2>5. Results and Data Visualization</h2>
        `,
        contentResults: `
            <ul>
                <li><strong>Time Series Prediction Chart</strong>: Displays the growth trend of DFI and weight over time.</li>
                <li><strong>Prediction Data Table</strong>: Details the prediction results for each day.</li>
                <li><strong>Data Export</strong>: Allows users to download the results into a CSV file.</li>
            </ul>
            <img class="content-image" src="/static/front_end_images/dfi_en.png" alt="DFI Chart" style="display: block; margin: 20px auto; max-width: 80%;">
            <img class="content-image" src="/static/front_end_images/weight_en.png" alt="Weight Chart" style="display: block; margin: 20px auto; max-width: 80%;">
        `,
        sectionMaintenance: `
            <h2>6. Maintenance and Upgrades</h2>
        `,
        contentMaintenance: `
            <ul>
                <li>Ensures the security of user data and manages personal databases separately from the main data.</li>
                <li>Updates the prediction model when new data is available.</li>
                <li>Upgrades the UI based on user feedback to improve the experience.</li>
            </ul>
        `
    },
    vi: {
        navOverview: "Tổng quan",
        navSolutions: "Giải pháp",
        navDashboard: "Bảng điều khiển",
        navResources: "Tài nguyên",
        navContact: "Liên hệ với chúng tôi",
        navDocs: "Tài liệu",
        navSupport: "Hỗ trợ",
        headerTitle: "Giải pháp dự đoán cho DFI và trọng lượng heo",
        sectionUI: `
            <h2>1. Giao diện người dùng (UI)</h2>
        `,
        contentUI: `
            <p>Giao diện chính của trang sẽ bao gồm các trường nhập liệu sau:</p>
            <ul>
                <li><strong>ID</strong>: Nhập ID của con heo mà bạn muốn dự đoán.</li>
                <li><strong>Ngày bắt đầu</strong> và <strong>Ngày kết thúc</strong>: Chọn khoảng thời gian dự đoán.</li>
                <li><strong>Chọn thuật toán dự đoán</strong>: 
                    <ul>
                        <li>Hồi quy tuyến tính: Đơn giản và hiệu quả cho các dự đoán tuyến tính.</li>
                        <li>Rừng ngẫu nhiên: Phù hợp khi dữ liệu có các yếu tố phi tuyến.</li>
                        <li>Tăng cường gradient: Cung cấp dự đoán chính xác bằng cách tối ưu hóa nhiều cây quyết định.</li>
                        <li>Mạng nơ-ron: Phù hợp cho các tập dữ liệu lớn và phức tạp với khả năng dự đoán phi tuyến.</li>
                    </ul>
                </li>
                <li><strong>Nút chạy dự đoán</strong>: Khi người dùng nhấp, hệ thống sẽ gửi yêu cầu dự đoán đến backend.</li>
                <li><strong>Phần hiển thị kết quả</strong>: Bao gồm biểu đồ và dữ liệu thống kê.</li>
            </ul>
            <img class="content-image" src="/static/front_end_images/donut_vi.png" alt="Donut Chart" style="display: block; margin: 20px auto; max-width: 80%;">
        `,
        sectionInput: `
            <h2>2. Xử lý dữ liệu đầu vào và chọn thuật toán</h2>
        `,
        contentInput: `
            <p>Backend xử lý dữ liệu đầu vào từ UI như sau:</p>
            <ul>
                <li>Xác thực <strong>ID</strong>, <strong>Ngày bắt đầu</strong>, và <strong>Ngày kết thúc</strong>.</li>
                <li>Chuẩn hóa dữ liệu đầu vào và kiểm tra định dạng để đảm bảo tính nhất quán với mô hình.</li>
                <li>Backend chạy thuật toán dựa trên lựa chọn của người dùng để thực hiện dự đoán.</li>
            </ul>
            <img class="content-image" id="prediction-image" src="/static/front_end_images/predict_vi.png" alt="Prediction Chart" style="display: block; margin: 20px auto; max-width: 80%;">
        `,
        sectionDatabase: `
            <h2>3. Kết nối với cơ sở dữ liệu người dùng</h2>
        `,
        contentDatabase: `
            <p>Hỗ trợ người dùng tải lên và xem cơ sở dữ liệu cá nhân:</p>
            <ul>
                <li>Người dùng có thể tải lên tệp CSV chứa dữ liệu cá nhân của họ.</li>
                <li>Hệ thống kiểm tra định dạng và lưu trữ dữ liệu trong một bảng riêng để tránh ảnh hưởng đến dữ liệu chính.</li>
                <li>Người dùng có thể chọn cơ sở dữ liệu của họ để dự đoán.</li>
            </ul>
            <img class="content-image" src="/static/front_end_images/upload2.png" alt="Data Upload" style="display: block; margin: 20px auto; max-width: 80%;">
        `,
        sectionImplementation: `
            <h2>4. Triển khai các thuật toán và mô hình dự đoán</h2>
        `,
        contentImplementation: `
            <p>API cho xử lý dự đoán sẽ thực hiện các bước sau:</p>
            <ul>
                <li>Nhận yêu cầu từ frontend, chạy mô hình dự đoán cho mỗi thuật toán đã chọn.</li>
                <li>Hiển thị kết quả dự đoán theo ngày, trong biểu đồ chuỗi thời gian.</li>
                <li>Cho phép so sánh kết quả dự đoán từ các thuật toán khác nhau trong cùng một khoảng thời gian.</li>
            </ul>
        `,
        sectionResults: `
            <h2>5. Kết quả và trực quan hóa dữ liệu</h2>
        `,
        contentResults: `
            <ul>
                <li><strong>Biểu đồ dự đoán chuỗi thời gian</strong>: Hiển thị xu hướng tăng trưởng của DFI và trọng lượng theo thời gian.</li>
                <li><strong>Bảng dữ liệu dự đoán</strong>: Chi tiết kết quả dự đoán cho mỗi ngày.</li>
                <li><strong>Xuất dữ liệu</strong>: Cho phép người dùng tải kết quả về tệp CSV.</li>
            </ul>
            <img class="content-image" src="/static/front_end_images/dfi_vi.png" alt="DFI Chart" style="display: block; margin: 20px auto; max-width: 80%;">
            <img class="content-image" src="/static/front_end_images/weight_vi.png" alt="Weight Chart" style="display: block; margin: 20px auto; max-width: 80%;">
        `,
        sectionMaintenance: `
            <h2>6. Bảo trì và nâng cấp</h2>
        `,
        contentMaintenance: `
            <ul>
                <li>Đảm bảo an ninh cho dữ liệu người dùng và quản lý cơ sở dữ liệu cá nhân riêng biệt với dữ liệu chính.</li>
                <li>Cập nhật mô hình dự đoán khi có dữ liệu mới.</li>
                <li>Nâng cấp UI dựa trên phản hồi của người dùng để cải thiện trải nghiệm.</li>
            </ul>
        `
    },
    zh: {
        navOverview: "概述",
        navSolutions: "解决方案",
        navDashboard: "仪表板",
        navResources: "资源",
        navContact: "联系我们",
        navDocs: "文档",
        navSupport: "支持",
        headerTitle: "DFI和猪的体重预测解决方案",
        sectionUI: `
            <h2>1. 用户界面 (UI)</h2>
        `,
        contentUI: `
            <p>页面的主要界面将包括以下输入字段：</p>
            <ul>
                <li><strong>ID</strong>: 输入您想要预测的猪的ID。</li>
                <li><strong>开始日期</strong>和<strong>结束日期</strong>: 选择预测周期。</li>
                <li><strong>预测算法选择</strong>:
                    <ul>
                        <li>线性回归: 简单有效的线性预测。</li>
                        <li>随机森林: 适合数据具有非线性因素时。</li>
                        <li>梯度提升: 通过优化多个决策树提供准确的预测。</li>
                        <li>神经网络: 适合具有非线性预测能力的大型复杂数据集。</li>
                    </ul>
                </li>
                <li><strong>运行预测按钮</strong>: 当用户点击时，系统将向后端发送预测请求。</li>
                <li><strong>结果显示部分</strong>: 包括图表和统计数据。</li>
            </ul>
            <img class="content-image" src="/static/front_end_images/donut_zh.png" alt="Donut Chart" style="display: block; margin: 20px auto; max-width: 80%;">
        `,
        sectionInput: `
            <h2>2. 输入数据处理和算法选择</h2>
        `,
        contentInput: `
            <p>后端处理来自UI的输入数据如下：</p>
            <ul>
                <li>验证<strong>ID</strong>、<strong>开始日期</strong>和<strong>结束日期</strong>。</li>
                <li>标准化输入数据并检查格式以确保与模型的一致性。</li>
                <li>后端根据用户的选择运行算法进行预测。</li>
            </ul>
            <img class="content-image" id="prediction-image" src="/static/front_end_images/predict_zh.png" alt="Prediction Chart" style="display: block; margin: 20px auto; max-width: 80%;">
        `,
        sectionDatabase: `
            <h2>3. 连接到用户数据库</h2>
        `,
        contentDatabase: `
            <p>支持用户上传和查看个人数据库：</p>
            <ul>
                <li>用户可以上传包含个人数据的CSV文件。</li>
                <li>系统检查格式并将数据存储在单独的表中，以避免影响主数据。</li>
                <li>用户可以选择他们的数据库进行预测。</li>
            </ul>
            <img class="content-image" src="/static/front_end_images/upload2.png" alt="Data Upload" style="display: block; margin: 20px auto; max-width: 80%;">
        `,
        sectionImplementation: `
            <h2>4. 预测算法和模型的实施</h2>
        `,
        contentImplementation: `
            <p>预测处理的API将执行以下步骤：</p>
            <ul>
                <li>接收来自前端的请求，为每个选择的算法运行预测模型。</li>
                <li>按天显示预测结果，以时间序列图表的形式。</li>
                <li>允许在同一时间段内比较不同算法的预测结果。</li>
            </ul>
        `,
        sectionResults: `
            <h2>5. 结果和数据可视化</h2>
        `,
        contentResults: `
            <ul>
                <li><strong>时间序列预测图</strong>: 显示DFI和体重随时间的增长趋势。</li>
                <li><strong>预测数据表</strong>: 详细列出每天的预测结果。</li>
                <li><strong>数据导出</strong>: 允许用户将结果下载为CSV文件。</li>
            </ul>
            <img class="content-image" src="/static/front_end_images/dfi_zh.png" alt="DFI Chart" style="display: block; margin: 20px auto; max-width: 80%;">
            <img class="content-image" src="/static/front_end_images/weight_zh.png" alt="Weight Chart" style="display: block; margin: 20px auto; max-width: 80%;">
        `,
        sectionMaintenance: `
            <h2>6. 维护和升级</h2>
        `,
        contentMaintenance: `
            <ul>
                <li>确保用户数据的安全，并将个人数据库与主数据分开管理。</li>
                <li>在有新数据时更新预测模型。</li>
                <li>根据用户反馈升级UI以改善体验。</li>
            </ul>
        `
    }
};

// Kiểm tra và áp dụng các thay đổi ngôn ngữ
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
        sectionUI: document.getElementById("user-interface-content-title"),
        contentUI: document.getElementById("user-interface-content"),
        sectionInput: document.getElementById("input-data-processing-content-title"),
        contentInput: document.getElementById("input-data-processing-content"),
        sectionDatabase: document.getElementById("user-database-content-title"),
        contentDatabase: document.getElementById("user-database-content"),
        sectionImplementation: document.getElementById("implementation-content-title"),
        contentImplementation: document.getElementById("implementation-content"),
        sectionResults: document.getElementById("results-visualization-content-title"),
        contentResults: document.getElementById("results-visualization-content"),
        sectionMaintenance: document.getElementById("maintenance-content-title"),
        contentMaintenance: document.getElementById("maintenance-content")
    };

    console.log("1: ", document.getElementById("user-interface-content"));

    for (const key in elements) {
        if (elements[key]) {
            const translationContent = translations[language][key];
            // Dùng innerHTML chỉ khi thật sự cần
            if (key.startsWith('content') || key.startsWith('section')) {
                elements[key].innerHTML = translationContent;
            } else {
                elements[key].textContent = translationContent;
            }
        }
    }
    console.log("2: ", document.getElementById("user-interface-content"));
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