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

document.addEventListener("DOMContentLoaded", () => {
    const productLinks = document.querySelectorAll(".product-card a");
    productLinks.forEach((link, index) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Ngăn tải lại trang
            console.log(`Link ${index} clicked`);
            // Hiển thị pop-up dựa trên nội dung của từng card
            changeContentLanguagePopup(index);
        });
    });
});

function showDetailedPopup(content) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close-btn">&times;</span>
            ${content}
        </div>
    `;
    document.body.appendChild(popup);

    // Đóng pop-up khi nhấn nút "X"
    popup.querySelector(".close-btn").addEventListener("click", function () {
        popup.remove();
    });
}


function changeContentLanguagePopup(index) {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en"; // Mặc định tiếng Anh
    const languageSelect = document.getElementById("language-select");
    languageSelect.value = savedLanguage;

    const selectedLanguage = languageSelect.value;
    let language = selectedLanguage;

    console.log(language);
    const ContentPopup = (lang) => {
        switch (lang) {
            case "vi":

                if (index === 0) {
                    showDetailedPopup(`
                        <h2>Giải pháp DFI Thông minh</h2>
                        <p>Lượng thức ăn tiêu thụ hằng ngày (Daily Feed Intake - DFI) là yếu tố quan trọng ảnh hưởng trực tiếp đến tốc độ tăng trưởng và sức khỏe của lợn. Tuy nhiên, việc theo dõi và quản lý DFI thủ công thường không hiệu quả, đặc biệt trong các trang trại quy mô lớn.</p>
                        <p>Giải pháp DFI thông minh ra đời nhằm giúp người chăn nuôi:</p>
                        <ul>
                            <li>Theo dõi chính xác lượng thức ăn tiêu thụ: Hệ thống cảm biến IoT được lắp đặt tại máng ăn ghi nhận chính xác lượng thức ăn mỗi con lợn tiêu thụ mỗi ngày.</li>
                            <li>Phát hiện bất thường: Thay đổi trong DFI có thể là dấu hiệu sớm của các vấn đề sức khỏe như stress, bệnh tật hoặc điều kiện môi trường không phù hợp.</li>
                            <li>Tối ưu hóa khẩu phần ăn: Hệ thống đưa ra khuyến nghị khẩu phần ăn phù hợp theo từng giai đoạn phát triển của lợn, giúp giảm lãng phí và tăng năng suất.</li>
                        </ul>
                    `);
                } else if (index === 1) {
                    showDetailedPopup(`
                        <h2>Dự đoán Cân nặng Chính xác</h2>
                        <p>Cân nặng của lợn là chỉ số then chốt để đánh giá hiệu quả chăn nuôi và xác định thời điểm xuất chuồng. Sự kết hợp giữa dữ liệu lịch sử và mô hình học máy (Machine Learning) giúp người chăn nuôi dự đoán chính xác cân nặng tương lai của từng con lợn.</p>
                        <p>Lợi ích của mô hình dự đoán cân nặng:</p>
                        <ul>
                            <li>Ra quyết định kịp thời: Dự đoán chính xác cân nặng giúp người chăn nuôi biết được thời điểm tối ưu để xuất chuồng, đảm bảo lợi nhuận tối đa.</li>
                            <li>Cá nhân hóa quy trình nuôi dưỡng: Hệ thống có thể đưa ra các gợi ý điều chỉnh chế độ ăn phù hợp nhằm đạt trọng lượng mục tiêu trong thời gian ngắn nhất.</li>
                            <li> Tiết kiệm chi phí: Việc dự đoán chính xác giảm thiểu các vấn đề lãng phí thức ăn hoặc tăng trưởng không đạt yêu cầu.</li>
                            <li>Các thử nghiệm thực tế tại trang trại đã cho thấy độ chính xác cao của hệ thống khi dự đoán cân nặng lợn, với sai số trung bình thấp hơn so với các phương pháp truyền thống.</li>
                        </ul>
                    `);
                } else if (index === 2) {
                    showDetailedPopup(`
                        <h2>Phân tích Dữ liệu Chăn Nuôi</h2>
                        <p>Dữ liệu là tài sản quý giá trong quản lý chăn nuôi. Hệ thống phân tích dữ liệu cung cấp một góc nhìn toàn diện về sự phát triển, sức khỏe và môi trường sống của lợn.</p>
                        <p>Các công cụ phân tích dữ liệu nổi bật:</p>
                        <ul>
                            <li>Theo dõi sự phát triển: Biểu đồ và báo cáo chi tiết về cân nặng, tốc độ tăng trưởng, và lượng ăn hàng ngày của từng con lợn hoặc từng đàn.</li>
                            <li>Giám sát sức khỏe: Hệ thống sử dụng dữ liệu DFI và cân nặng để phát hiện sớm các dấu hiệu bất thường, giúp người chăn nuôi kịp thời xử lý.</li>
                            <li>Đánh giá hiệu quả: Phân tích năng suất từng giai đoạn để cải thiện quy trình quản lý và xây dựng chiến lược chăn nuôi dài hạn.</li>
                        </ul>
                        <p>Ứng dụng thực tế:</p>
                        <p>Một trang trại áp dụng hệ thống phân tích dữ liệu đã ghi nhận sự cải thiện đáng kể trong việc theo dõi sức khỏe đàn lợn. Hệ thống không chỉ giúp giảm thiểu thiệt hại do bệnh tật mà còn cải thiện tốc độ tăng trưởng đồng đều, nâng cao chất lượng thịt.</p>
                    `);
                }
                break;
            case "en":
                if (index === 0) {
                    showDetailedPopup(`
                        <h2>Intelligent DFI Solution</h2>
                        <p>Daily Feed Intake (DFI) is a critical factor directly affecting the growth rate and health of pigs. However, manual monitoring and management of DFI are often ineffective, especially in large-scale farms.</p>
                        <p>The intelligent DFI solution aims to help farmers:</p>
                        <ul>
                            <li>Accurately monitor feed consumption: IoT sensor systems installed at feeding troughs record the exact amount of feed each pig consumes daily.</li>
                            <li>Detect anomalies: Changes in DFI can be an early sign of health issues such as stress, disease, or environmental unsuitability.</li>
                            <li>Optimize feed rations: The system provides recommendations for suitable feed rations based on each pig's development stage, reducing waste and increasing productivity.</li>
                        </ul>
                    `);
                } else if (index === 1) {
                    showDetailedPopup(`
                        <h2>Accurate Weight Prediction</h2>
                        <p>Pig weight is a key indicator for evaluating farming efficiency and determining the optimal time for slaughter. The combination of historical data and machine learning models enables farmers to accurately predict the future weight of each pig.</p>
                        <p>Benefits of weight prediction models:</p>
                        <ul>
                            <li>Timely decision-making: Accurate weight prediction helps farmers know the optimal time for slaughter, ensuring maximum profit.</li>
                            <li>Personalized nutrition planning: The system can provide suggestions for adjusting feed regimens to achieve target weights in the shortest time.</li>
                            <li>Cost savings: Accurate prediction reduces waste and ensures optimal growth.</li>
                            <li>Real-world trials on farms have shown the high accuracy of the system in predicting pig weights, with lower average errors compared to traditional methods.</li>
                        </ul>
                    `);
                } else if (index === 2) {
                    showDetailedPopup(`
                        <h2>Swine Farming Data Analysis</h2>
                        <p>Data is a valuable asset in swine farming management. The data analysis system provides a comprehensive view of pig development, health, and living environment.</p>
                        <p>Notable data analysis tools:</p>
                        <ul>
                            <li>Development tracking: Detailed charts and reports on weight, growth rate, and daily feed consumption for each pig or group.</li>
                            <li>Health monitoring: The system uses DFI and weight data to detect early signs of anomalies, enabling farmers to take prompt action.</li>
                            <li>Performance evaluation: Analysis of productivity at each stage to improve management processes and develop long-term farming strategies.</li>
                        </ul>
                        <p>Practical application:</p>
                        <p>A farm that implemented the data analysis system recorded significant improvements in monitoring pig health. The system not only reduced losses due to disease but also improved uniform growth, enhancing meat quality.</p>
                    `);
                }
                break;
            case "zh":
                if (index === 0) {
                    showDetailedPopup(`
                        <h2>智能DFI解决方案</h2>
                        <p>每日饲料摄入量（Daily Feed Intake - DFI）是直接影响猪的生长速度和健康的重要因素。然而，手动监测和管理DFI往往效率低下，特别是在大规模养殖场中。</p>
                        <p>智能DFI解决方案旨在帮助农民：</p>
                        <ul>
                            <li>准确监测饲料消耗：安装在饲喂槽的物联网传感器系统记录每头猪每日消耗的确切饲料量。</li>
                            <li>检测异常：DFI的变化可能是健康问题的早期迹象，如压力、疾病或环境不适。</li>
                            <li>优化饲料配方：系统根据每头猪的生长阶段提供适合的饲料配方建议，减少浪费，提高生产力。</li>
                        </ul>
                    `);
                } else if (index === 1) {
                    showDetailedPopup(`
                        <h2>准确的体重预测</h2>
                        <p>猪的体重是评估养殖效率和确定最佳出栏时间的关键指标。历史数据与机器学习模型的结合使农民能够准确预测每头猪的未来体重。</p>
                        <p>体重预测模型的好处：</p>
                        <ul>
                            <li>及时决策：准确的体重预测帮助农民了解最佳出栏时间，确保最大利润。</li>
                            <li>个性化营养规划：系统可以提供调整饲喂方案的建议，以在最短时间内达到目标体重。</li>
                            <li>节省成本：准确的预测减少了浪费和确保最佳生长。</li>
                            <li>在农场进行的实际试验显示，系统在预测猪体重方面的高准确性，平均误差低于传统方法。</li>
                        </ul>
                    `);
                } else if (index === 2) {
                    showDetailedPopup(`
                        <h2>养猪数据分析</h2>
                        <p>数据是养猪管理中的宝贵资产。数据分析系统提供了对猪的生长、健康和生活环境的全面视角。</p>
                        <p>突出的数据分析工具：</p>
                        <ul>
                            <li>发展跟踪：关于每头猪或每群猪的体重、增长速度和每日饲料消耗的详细图表和报告。</li>
                            <li>健康监测：系统利用DFI和体重数据检测早期异常迹象，使农民能够及时采取措施。</li>
                            <li>绩效评估：分析每个阶段的生产力，以改善管理流程并制定长期养殖战略。</li>
                        </ul>
                        <p>实际应用：</p>
                        <p>实施数据分析系统的农场在监测猪的健康方面显著改善。该系统不仅减少了因疾病造成的损失，还改善了均匀生长，提高了肉质。</p>
                    `);
                }
                break;
            default:
                break;
        }
    };
    ContentPopup(language);
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



