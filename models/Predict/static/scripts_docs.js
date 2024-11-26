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

// Thay đổi ngôn ngữ
const translations = {
    en: {
        navOverview: "Overview",
        navSolutions: "Solutions",
        navDashboard: "Dashboard",
        navResources: "Resources",
        navContact: "Contact Us",
        navDocs: "Docs",
        navSupport: "Support",
        headerTitle: "Documentation",
        introductionTitle: "Introduction",
        introductionText: "This page provides documentation for using our products and services.",
        titleintro: "Prediction Algorithms for DFI and Pig Weight",
        intro: "This page provides detailed information about the prediction algorithms used in the feed intake (DFI) and pig weight prediction system. These algorithms help increase the accuracy of prediction models and support users in selecting the most suitable method.",
        tocTitle: "Table of Contents",
        tocItems: [
            "Linear Regression",
            "Gradient Boosting",
            "K Nearest Neighbors Regression (KNN Regression)",
            "XGBoost Regressor",
            "Support Vector Regression (SVR)",
            "Random Forest Regression",
            "Long Short Term Memory",
            "Multi-Layer Perceptron Regressor (MLP Regressor)"
        ],
        linearRegressionTitle: "Linear Regression",
        linearRegressionDescription: "Simplistic model assuming a linear relationship between variables, making it a baseline for predictive tasks.",
        linearRegressionUse: "Best suited for straightforward relationships like predicting basic feed consumption trends.",
        linearRegressionAdvantages: "Easy to interpret, quick to implement.",
        linearRegressionDisadvantages: "Struggles with complex or non-linear patterns.",
        linearRegressionButton: "View more",

        gradientBoostingTitle: "Gradient Boosting",
        gradientBoostingDescription: "Combines weak learners to enhance prediction accuracy, often used for competitive tasks.",
        gradientBoostingUse: "Ideal for capturing intricate patterns in feed and weight changes.",
        gradientBoostingAdvantages: "High accuracy, robust for complex datasets.",
        gradientBoostingDisadvantages: "Computationally intensive, requires careful tuning.",
        gradientBoostingButton: "View more ",

        knnRegressionTitle: "K Nearest Neighbors Regression (KNN Regression)",
        knnRegressionDescription: "A non-parametric method that predicts outcomes based on the closest training examples in the feature space.",
        knnRegressionUse: "Useful for datasets with complex relationships where linear assumptions do not hold.",
        knnRegressionAdvantages: "Simple to understand and implement, flexible to different data distributions.",
        knnRegressionDisadvantages: "Sensitive to irrelevant features and the choice of distance metric.",
        knnRegressionButton: "View more",

        xgboostRegressorTitle: "XGBoost Regressor",
        xgboostRegressorDescription: "An efficient and scalable implementation of gradient boosting framework, designed for speed and performance.",
        xgboostRegressorUse: "Widely used for structured/tabular data, particularly in competitions and real-world applications.",
        xgboostRegressorAdvantages: "High performance, handles missing values automatically, and includes regularization to prevent overfitting.",
        xgboostRegressorDisadvantages: "Can be complex to tune and may require careful feature engineering.",
        xgboostRegressorButton: "View more",

        supportVectorRegressionTitle: "Support Vector Regression (SVR)",
        supportVectorRegressionDescription: "A type of Support Vector Machine that supports linear and non-linear regression.",
        supportVectorRegressionUse: "Suitable for high-dimensional spaces and when the number of dimensions exceeds the number of samples.",
        supportVectorRegressionAdvantages: "Effective in high-dimensional spaces, robust against overfitting.",
        supportVectorRegressionDisadvantages: "Less effective on very large datasets, requires careful tuning of parameters.",
        supportVectorRegressionButton: "View more",

        randomForestRegressionTitle: "Random Forest Regression",
        randomForestRegressionDescription: "An ensemble method that constructs multiple decision trees and merges them to get a more accurate and stable prediction.",
        randomForestRegressionUse: "Works well for both regression and classification tasks, especially with large datasets.",
        randomForestRegressionAdvantages: "Reduces overfitting, handles missing values well.",
        randomForestRegressionDisadvantages: "Can be less interpretable than single decision trees, requires more computational resources.",
        randomForestRegressionButton: "View more",

        longShortTermMemoryTitle: "Long Short-Term Memory (LSTM)",
        longShortTermMemoryDescription: "A specialized neural network adept at understanding sequential data, such as time-series feed intake.",
        longShortTermMemoryUse: "Excellent for forecasting feed consumption or weight changes based on historical data.",
        longShortTermMemoryAdvantages: "Captures long-term dependencies effectively.",
        longShortTermMemoryDisadvantages: "High data and resource requirements.",
        longShortTermMemoryButton: "View more",

        mlpRegressorTitle: "Multi-Layer Perceptron Regressor (MLP Regressor)",
        mlpRegressorDescription: "A type of neural network that consists of multiple layers of interconnected nodes, allowing for complex nonlinear relationships.",
        mlpRegressorUse: "Suitable for tasks requiring nonlinear relationships, such as predicting feed intake or weight changes.",
        mlpRegressorAdvantages: "Highly flexible, capable of capturing complex patterns.",
        mlpRegressorDisadvantages: "Requires significant data and computational resources, can be prone to overfitting.",
        mlpRegressorButton: "View more"
    },
    vi: {
        navOverview: "Tổng Quan",
        navSolutions: "Giải Pháp",
        navDashboard: "Bảng Điều Khiển",
        navResources: "Tài Nguyên",
        navContact: "Liên Hệ",
        navDocs: "Tài Liệu",
        navSupport: "Hỗ Trợ",
        headerTitle: "Tài Liệu",
        introductionTitle: "Giới Thiệu",
        introductionText: "Trang này cung cấp tài liệu cho việc sử dụng các sản phẩm và dịch vụ của chúng tôi.",
        titleintro: "Các Thuật Toán Dự Đoán cho DFI và Cân Nặng Lợn",
        intro: "Trang này cung cấp thông tin chi tiết về các thuật toán dự đoán được sử dụng trong hệ thống dự đoán lượng thức ăn (DFI) và cân nặng lợn. Các thuật toán này giúp tăng độ chính xác của các mô hình dự đoán và hỗ trợ người dùng trong việc chọn phương pháp phù hợp nhất.",
        tocTitle: "Mục Lục",
        tocItems: [
            "Hồi Quy Tuyến Tính",
            "Nâng Cao Gradient",
            "Hồi Quy K Nearest Neighbors (KNN Regression)",
            "Mạng Nơ-Ron",
            "Hồi Quy Vectơ Hỗ Trợ (SVR)",
            "Hồi Quy Rừng Ngẫu Nhiên",
            "Bộ Nhớ Ngắn Hạn Dài Hạn",
            "Bộ Phân Lớp Perceptron Đa Lớp (MLP Regressor)"
        ],
        linearRegressionTitle: "Hồi Quy Tuyến Tính",
        linearRegressionDescription: "Mô hình đơn giản giả định mối quan hệ tuyến tính giữa các biến, làm cơ sở cho các nhiệm vụ dự đoán.",
        linearRegressionUse: "Tốt nhất cho các mối quan hệ đơn giản như dự đoán xu hướng tiêu thụ thức ăn cơ bản.",
        linearRegressionAdvantages: "Dễ hiểu, nhanh chóng triển khai.",
        linearRegressionDisadvantages: "Khó khăn với các mẫu không tuyến tính hoặc phức tạp.",
        linearRegressionButton: "Xem thêm",

        gradientBoostingTitle: "Nâng Cao Gradient",
        gradientBoostingDescription: "Kết hợp các học viên yếu để tăng độ chính xác của dự đoán, thường được sử dụng cho các nhiệm vụ cạnh tranh.",
        gradientBoostingUse: "Tối ưu cho việc bắt các mẫu phức tạp trong thay đổi thức ăn và cân nặng.",
        gradientBoostingAdvantages: "Độ chính xác cao, vững chắc cho các tập dữ liệu phức tạp.",
        gradientBoostingDisadvantages: "Tốn nhiều tài nguyên tính toán, đòi hỏi điều chỉnh cẩn thận.",
        gradientBoostingButton: "Xem thêm",

        knnRegressionTitle: "Hồi Quy K Nearest Neighbors (KNN Regression)",
        knnRegressionDescription: "Một phương pháp không tham số dự đoán kết quả dựa trên các ví dụ huấn luyện gần nhất trong không gian đặc trưng.",
        knnRegressionUse: "Có ích cho các tập dữ liệu có mối quan hệ phức tạp nơi các giả định tuyến tính không được đáp ứng.",
        knnRegressionAdvantages: "Dễ hiểu và triển khai, linh hoạt với các phân phối dữ liệu khác nhau.",
        knnRegressionDisadvantages: "Nhạy cảm với các đặc trưng không liên quan và sự lựa chọn của metric khoảng cách.",
        knnRegressionButton: "Xem thêm",

        xgboostRegressorTitle: "XGBoost Regressor",
        xgboostRegressorDescription: "Một triển khai hiệu quả và có thể mở rộng của khung nâng cao gradient, thiết kế để tốc độ và hiệu suất.",
        xgboostRegressorUse: "Được sử dụng rộng rãi cho dữ liệu cấu trúc/bảng, đặc biệt trong cuộc thi và ứng dụng thực tế.",
        xgboostRegressorAdvantages: "Hiệu suất cao, xử lý các giá trị thiếu tự động và bao gồm hàm điều chỉnh để ngăn ngừa quá khớp.",
        xgboostRegressorDisadvantages: "Có thể phức tạp để điều chỉnh và có thể đòi hỏi đặc tả tính năng cẩn thận.",
        xgboostRegressorButton: "Xem thêm",

        supportVectorRegressionTitle: "Hồi Quy Vectơ Hỗ Trợ (SVR)",
        supportVectorRegressionDescription: "Một loại Máy Vectơ Hỗ Trợ hỗ trợ hồi quy tuyến tính và không tuyến tính.",
        supportVectorRegressionUse: "Phù hợp cho các không gian có chiều cao và khi số chiều vượt quá số mẫu.",
        supportVectorRegressionAdvantages: "Hiệu quả trong các không gian có chiều cao, vững chắc chống lại quá拟 hợp.",
        supportVectorRegressionDisadvantages: "Ít hiệu quả hơn trên các tập dữ liệu rất lớn, đòi hỏi điều chỉnh cẩn thận các tham số.",
        supportVectorRegressionButton: "Xem thêm",

        randomForestRegressionTitle: "Hồi Quy Rừng Ngẫu Nhiên",
        randomForestRegressionDescription: "Một phương pháp tập hợp xây dựng nhiều cây quyết định và hợp nhất chúng để có được một dự đoán chính xác và ổn định hơn.",
        randomForestRegressionUse: "Làm việc tốt cho cả các nhiệm vụ hồi quy và phân loại, đặc biệt với các tập dữ liệu lớn.",
        randomForestRegressionAdvantages: "Giảm hiện tượng quá khớp, xử lý tốt các giá trị thiếu.",
        randomForestRegressionDisadvantages: "Có thể ít dễ hiểu hơn các cây quyết định đơn lẻ, đòi hỏi nhiều tài nguyên tính toán hơn.",
        randomForestRegressionButton: "Xem thêm",

        longShortTermMemoryTitle: "Bộ Nhớ Ngắn Hạn Dài Hạn (LSTM)",
        longShortTermMemoryDescription: "Một mạng nơ-ron chuyên biệt giỏi trong việc hiểu dữ liệu tuần tự, chẳng hạn như dữ liệu chuỗi thời gian về lượng thức ăn.",
        longShortTermMemoryUse: "Tuyệt vời cho việc dự đoán lượng thức ăn hoặc thay đổi cân nặng dựa trên dữ liệu lịch sử.",
        longShortTermMemoryAdvantages: "Bắt các phụ thuộc dài hạn hiệu quả.",
        longShortTermMemoryDisadvantages: "Yêu cầu nhiều dữ liệu và tài nguyên.",
        longShortTermMemoryButton: "Xem thêm",

        mlpRegressorTitle: "Bộ Phân Lớp Perceptron Đa Lớp (MLP Regressor)",
        mlpRegressorDescription: "Một loại mạng nơ-ron bao gồm nhiều lớp của các nút kết nối, cho phép các mối quan hệ phi tuyến tính phức tạp.",
        mlpRegressorUse: "Phù hợp cho các nhiệm vụ đòi hỏi các mối quan hệ phi tuyến tính, chẳng hạn như dự đoán lượng thức ăn hoặc thay đổi cân nặng.",
        mlpRegressorAdvantages: "Rất linh hoạt, có thể bắt các mẫu phức tạp.",
        mlpRegressorDisadvantages: "Yêu cầu nhiều dữ liệu và tài nguyên tính toán, có thể dễ bị quá khớp.",
        mlpRegressorButton: "Xem thêm"
    },
    zh: {
        navOverview: "概述",
        navSolutions: "解决方案",
        navDashboard: "仪表盘",
        navResources: "资源",
        navContact: "联系我们",
        navDocs: "文档",
        navSupport: "支持",
        headerTitle: "文档",
        introductionTitle: "简介",
        introductionText: "本页面为使用我们的产品和服务提供文档。",
        titleintro: "DFI和猪重预测算法",
        intro: "本页面提供了DFI（饲料摄入量）和猪重预测系统中使用的预测算法的详细信息。这些算法有助于提高预测模型的准确性，并支持用户选择最合适的方法。",
        tocTitle: "目录",
        tocItems: [
            "线性回归",
            "梯度提升",
            "K最近邻回归（KNN回归）",
            "神经网络",
            "支持向量回归（SVR）",
            "随机森林回归",
            "长短期记忆",
            "多层感知器回归器（MLP Regressor）"
        ],
        linearRegressionTitle: "线性回归",
        linearRegressionDescription: "假设变量之间存在线性关系的简单模型，为预测任务提供了基础。",
        linearRegressionUse: "最适合预测基本饲料消费趋势等简单关系。",
        linearRegressionAdvantages: "易于解释，快速实现。",
        linearRegressionDisadvantages: "对复杂或非线性模式的处理能力不足。",
        linearRegressionButton: "查看更多",

        gradientBoostingTitle: "梯度提升",
        gradientBoostingDescription: "通过结合弱学习器来提高预测准确性，常用于竞争性任务。",
        gradientBoostingUse: "捕获饲料和重量变化的复杂模式时最为理想。",
        gradientBoostingAdvantages: "高准确性，对复杂数据集稳定。",
        gradientBoostingDisadvantages: "计算资源需求高，需要仔细调整。",
        gradientBoostingButton: "查看更多",

        knnRegressionTitle: "K最近邻回归（KNN回归）",
        knnRegressionDescription: "基于特征空间中最近的训练示例预测结果的非参数方法。",
        knnRegressionUse: "对线性假设不成立的复杂关系数据集有用。",
        knnRegressionAdvantages: "易于理解和实现，对不同数据分布灵活。",
        knnRegressionDisadvantages: "对无关特征和距离度量的选择敏感。",
        knnRegressionButton: "查看更多",

        xgboostRegressorTitle: "XGBoost回归器",
        xgboostRegressorDescription: "一种高效且可扩展的梯度提升框架实现，旨在提高速度和性能。",
        xgboostRegressorUse: "广泛应用于结构化/表格数据，特别是在竞赛和实际应用中。",
        xgboostRegressorAdvantages: "高性能，自动处理缺失值，并包含正则化以防止过拟合。",
        xgboostRegressorDisadvantages: "可能难以调整，并且可能需要仔细的特征工程。",
        xgboostRegressorButton: "查看更多",

        supportVectorRegressionTitle: "支持向量回归（SVR）",
        supportVectorRegressionDescription: "支持线性和非线性回归的支持向量机类型。",
        supportVectorRegressionUse: "高维空间和维度数超过样本数时最为合适。",
        supportVectorRegressionAdvantages: "高维空间中有效，抗过拟合。",
        supportVectorRegressionDisadvantages: "对非常大的数据集不太有效，需要参数调整。",
        supportVectorRegressionButton: "查看更多",

        randomForestRegressionTitle: "随机森林回归",
        randomForestRegressionDescription: "构建多个决策树并合并以获取更准确和稳定的预测的集成方法。",
        randomForestRegressionUse: "对回归和分类任务都有效，特别是大数据集。",
        randomForestRegressionAdvantages: "减少过拟合，处理缺失值好。",
        randomForestRegressionDisadvantages: "可能比单个决策树更难解释，需要更多计算资源。",
        randomForestRegressionButton: "查看更多",

        longShortTermMemoryTitle: "长短期记忆（LSTM）",
        longShortTermMemoryDescription: "专门用于理解顺序数据，如时间序列饲料摄入的神经网络。",
        longShortTermMemoryUse: "基于历史数据预测饲料消费或重量变化时最为出色。",
        longShortTermMemoryAdvantages: "有效捕获长期依赖。",
        longShortTermMemoryDisadvantages: "数据和资源需求高。",
        longShortTermMemoryButton: "查看更多",

        mlpRegressorTitle: "多层感知器回归器（MLP Regressor）",
        mlpRegressorDescription: "一种神经网络，由多个相互连接的节点层组成，能够捕捉复杂的非线性关系。",
        mlpRegressorUse: "适用于需要非线性关系任务的任务，如预测饲料摄入量或体重变化。",
        mlpRegressorAdvantages: "高度灵活，能够捕捉复杂模式。",
        mlpRegressorDisadvantages: "需要大量数据和计算资源，可能过拟合。",
        mlpRegressorButton: "查看更多"
    }
};

// Hàm thay đổi nội dung trang
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
        introductionTitle: document.querySelector("#introduction h2"),
        introductionText: document.querySelector("#introduction p"),
        titleintro: document.querySelector(".container h1"),    
        intro: document.querySelector(".container p"),
        tocTitle: document.querySelector(".toc h2"),
        tocItems: document.querySelectorAll(".toc ul li a"),

        linearRegressionTitle: document.querySelector("#linear-regression h2"), // Tiêu đề
        linearRegressionDescription: document.querySelector("#linear-regression p:nth-of-type(1)"), // Mô tả
        linearRegressionUse: document.querySelector("#linear-regression p:nth-of-type(2)"), // Sử dụng
        linearRegressionAdvantages: document.querySelector("#linear-regression p:nth-of-type(3)"), // Ưu điểm
        linearRegressionDisadvantages: document.querySelector("#linear-regression p:nth-of-type(4)"), // Nhược điểm
        linearRegressionButton: document.querySelector(".view-more-btn[data-algorithm='linear-regression']"), // Nút View more
    
    // Gradient Boosting Section
        gradientBoostingTitle: document.querySelector("#gradient-boosting h2"),
        gradientBoostingDescription: document.querySelector("#gradient-boosting p:nth-of-type(1)"),
        gradientBoostingUse: document.querySelector("#gradient-boosting p:nth-of-type(2)"),
        gradientBoostingAdvantages: document.querySelector("#gradient-boosting p:nth-of-type(3)"),
        gradientBoostingDisadvantages: document.querySelector("#gradient-boosting p:nth-of-type(4)"),
        gradientBoostingButton: document.querySelector(".view-more-btn[data-algorithm='gradient-boosting']"),
        
        // KNN Regression Section
        knnRegressionTitle: document.querySelector("#knn-regression h2"),
        knnRegressionDescription: document.querySelector("#knn-regression p:nth-of-type(1)"),
        knnRegressionUse: document.querySelector("#knn-regression p:nth-of-type(2)"),
        knnRegressionAdvantages: document.querySelector("#knn-regression p:nth-of-type(3)"),
        knnRegressionDisadvantages: document.querySelector("#knn-regression p:nth-of-type(4)"),
        knnRegressionButton: document.querySelector(".view-more-btn[data-algorithm='knn-regression']"),
        
        // XGBoost Regressor Section
        xgboostRegressorTitle: document.querySelector("#xgboost-regressor h2"),
        xgboostRegressorDescription: document.querySelector("#xgboost-regressor p:nth-of-type(1)"),
        xgboostRegressorUse: document.querySelector("#xgboost-regressor p:nth-of-type(2)"),
        xgboostRegressorAdvantages: document.querySelector("#xgboost-regressor p:nth-of-type(3)"),
        xgboostRegressorDisadvantages: document.querySelector("#xgboost-regressor p:nth-of-type(4)"),
        xgboostRegressorButton: document.querySelector(".view-more-btn[data-algorithm='xgboost-regressor']"),
        
        // Support Vector Regression Section
        supportVectorRegressionTitle: document.querySelector("#support-vector-regression h2"),
        supportVectorRegressionDescription: document.querySelector("#support-vector-regression p:nth-of-type(1)"),
        supportVectorRegressionUse: document.querySelector("#support-vector-regression p:nth-of-type(2)"),
        supportVectorRegressionAdvantages: document.querySelector("#support-vector-regression p:nth-of-type(3)"),
        supportVectorRegressionDisadvantages: document.querySelector("#support-vector-regression p:nth-of-type(4)"),
        supportVectorRegressionButton: document.querySelector(".view-more-btn[data-algorithm='support-vector-regression']"),
        
        // Random Forest Regression Section
        randomForestRegressionTitle: document.querySelector("#random-forest-regression h2"),
        randomForestRegressionDescription: document.querySelector("#random-forest-regression p:nth-of-type(1)"),
        randomForestRegressionUse: document.querySelector("#random-forest-regression p:nth-of-type(2)"),
        randomForestRegressionAdvantages: document.querySelector("#random-forest-regression p:nth-of-type(3)"),
        randomForestRegressionDisadvantages: document.querySelector("#random-forest-regression p:nth-of-type(4)"),
        randomForestRegressionButton: document.querySelector(".view-more-btn[data-algorithm='random-forest-regression']"),
        
        // Long Short Term Memory Section
        longShortTermMemoryTitle: document.querySelector("#long-short-term-memory h2"),
        longShortTermMemoryDescription: document.querySelector("#long-short-term-memory p:nth-of-type(1)"),
        longShortTermMemoryUse: document.querySelector("#long-short-term-memory p:nth-of-type(2)"),
        longShortTermMemoryAdvantages: document.querySelector("#long-short-term-memory p:nth-of-type(3)"),
        longShortTermMemoryDisadvantages: document.querySelector("#long-short-term-memory p:nth-of-type(4)"),
        longShortTermMemoryButton: document.querySelector(".view-more-btn[data-algorithm='long-short-term-memory']"),

        // MLP Regressor Section
        mlpRegressorTitle: document.querySelector("#mlp-regressor h2"),
        mlpRegressorDescription: document.querySelector("#mlp-regressor p:nth-of-type(1)"),
        mlpRegressorUse: document.querySelector("#mlp-regressor p:nth-of-type(2)"),
        mlpRegressorAdvantages: document.querySelector("#mlp-regressor p:nth-of-type(3)"),
        mlpRegressorDisadvantages: document.querySelector("#mlp-regressor p:nth-of-type(4)"),
        mlpRegressorButton: document.querySelector(".view-more-btn[data-algorithm='mlp-regressor']")
        };

    // Cập nhật nội dung
    for (const key in elements) {
        
        if (elements[key]) {
            if (key === "tocItems") {
                elements[key].forEach((item, index) => {
                    item.textContent = translations[language][key][index];
                });
            } else {
                elements[key].textContent = translations[language][key];
            }
        }
    }
}

// Tải và áp dụng ngôn ngữ khi trang được load
window.onload = function() {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en"; // Mặc định tiếng Anh
    const languageSelect = document.getElementById("language-select");

    languageSelect.value = savedLanguage;
    changeLanguage(savedLanguage);

    languageSelect.addEventListener("change", function () {
        const selectedLanguage = languageSelect.value;
        localStorage.setItem("selectedLanguage", selectedLanguage);
        changeLanguage(selectedLanguage);
    });
};


// Hiển thị chi tiết từng thuật toán
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close-btn');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');

    const savedLanguage = localStorage.getItem("selectedLanguage") || "en"; // Mặc định tiếng Anh
    const languageSelect = document.getElementById("language-select");
    languageSelect.value = savedLanguage;

    const selectedLanguage = languageSelect.value;
    let language = selectedLanguage;
    console.log(language);

    let algorithmDetails = {};

    const loadAlgorithmDetails = (lang) => {
        switch (lang) {
            case "en":
                algorithmDetails = {
                    "linear-regression": {
                        "title": "Linear Regression",
                        "description": `
                            <p>
                                Linear Regression is a statistical method used to model the relationship 
                                between a dependent variable (or target variable) and one or more independent variables (input variables). This is a basic and popular algorithm in machine learning and data analysis.
                            </p>
                            <h3>General linear regression equation</h3>
                            <p>The general linear regression equation is:</p>
                            <p style="margin-left: 20px;">
                                \\( Y = \\beta_0 + \\beta_1X_1 + \\beta_2X_2 + \\dots + \\beta_nX_n + \\epsilon \\)
                            </p>
                            <ul>
                                <li><b>\\( Y \\):</b> Dependent variable (value to be predicted).</li>
                                <li><b>\\( X_1, X_2, \\dots, X_n \\):</b> Independent variables (input variables).</li>
                                <li><b>\\( \\beta_0 \\):</b> Intercept.</li>
                                <li><b>\\( \\beta_1, \\beta_2, \\dots, \\beta_n \\):</b> Regression coefficients (slope).</li>
                                <li><b>\\( \\epsilon \\):</b> Error (reflects the difference between the actual value and the predicted value).</li>
                            </ul>
        
                            <h3>Types of linear regression</h3>
                            <ol>
                                <li><b>Simple linear regression:</b> Only one independent variable \\( X \\) and one dependent variable \\( Y \\), the equation is:
                                    <div style="margin-left: 20px;">
                                        \\( Y = \\beta_0 + \\beta_1X + \\epsilon \\)
                                    </div>
                                </li>
                                <li><b>Multiple linear regression:</b> Multiple independent variables, the equation is:
                                    <div style="margin-left: 20px;">
                                        \\( Y = \\beta_0 + \\beta_1X_1 + \\beta_2X_2 + \\dots + \\beta_nX_n + \\epsilon \\)
                                    </div>
                                </li>
                            </ol>
        
                            <h3>Parameter estimation</h3>
                            <p>
                                Linear regression uses the method <b>Ordinary Least Squares (OLS)</b> to estimate the coefficients \\( \\beta \\). 
                                The goal is to minimize the sum of squared errors between the actual value (\\( Y \\)) and the predicted value (\\( \\hat{Y} \\)):
                            </p>
                            <p style="margin-left: 20px;">
                                \\( \\text{Minimize } \\sum_{i=1}^n (Y_i - \\hat{Y}_i)^2 \\)
                            </p>
                            <ul>
                                <li><b>\\( Y_i \\):</b> Actual value of the dependent variable.</li>
                                <li><b>\\( \\hat{Y}_i \\):</b> Predicted value from the model.</li>
                            </ul>
        
                            <h3>Model evaluation</h3>
                            <p>To evaluate the effectiveness of the linear regression model, common indices used include:</p>
                            <ul>
                                <li><b>Coefficient of determination \\( R^2 \\):</b> Measures the degree of explanation of the model for the dependent variable, the value is in the range \\([0, 1]\\).</li>
                                <li><b>Mean Squared Error (MSE):</b> Average of the squared errors, reflecting the degree of deviation of the model.</li>
                                <li><b>Root Mean Squared Error (RMSE):</b> Square root of MSE, easier to understand because it has the same unit as \\( Y \\).</li>
                                <li><b>Mean Absolute Error (MAE):</b> Average absolute value of the error, measures the degree of deviation from reality.</li>
                            </ul>
        
                            <h3>Basic assumptions</h3>
                            <ul>
                                <li><b>Linearity:</b> The relationship between the dependent variable and the independent variable is linear.</li>
                                <li><b>Independence:</b> The observations must be independent of each other.</li>
                                <li><b>Normal distribution of the error:</b> The error must have a normal distribution.</li>
                                <li><b>Homoscedasticity:</b> The variance of the error does not change with the value of the independent variable.</li>
                                <li><b>No multicollinearity:</b> The independent variables are not strongly correlated with each other.</li>
                            </ul>
        
                            <h3>Application in the project</h3>
                            <h4>1. Predicting daily food intake (DFI)</h4>
                            <p>
                                Linear regression can predict the daily food intake (DFI) based on factors such as:
                                <ul>
                                    <li>Age of the pig (age).</li>
                                    <li>DFI in the previous 7 days.</li>
                                </ul>
                            </p>
        
                            <h4>2. Predicting weight</h4>
                            <p>
                                Based on regression, we can estimate the weight of the pig based on:
                                <ul>
                                    <li>Daily food intake (dfi).</li>
                                    <li>Age of the pig (age).</li>
                                    <li>Weight of the previous day (previous weight).</li>
                                </ul>
                            </p>
        
                            <h3>Benefits of linear regression</h3>
                            <ul>
                                <li><b>Understanding the relationship:</b> Identifying the key factors that influence DFI and weight.</li>
                                <li><b>Optimization:</b> Adjusting the diet to reduce costs and maximize growth.</li>
                                <li><b>Simple:</b> Easy to deploy and effective with linear relationships.</li>
                            </ul>
                        `
                    },
                    'gradient-boosting': {
                        title: 'Gradient Boosting',
                        description: `
                            <h3>Introduction</h3>
                            <p>Gradient Boosting is a powerful machine learning method that uses ensemble learning techniques to solve regression and classification problems. This method combines sequential small models (weak learners), usually decision trees, to minimize errors through gradient descent optimization.</p>
                            
                            <h3>Main components</h3>
                            <h4>1. Loss Function</h4>
                            <p>Gradient Boosting optimizes a loss function to minimize prediction errors. Some common loss functions are:</p>
                            <ul>
                                <li>Regression:
                                    <div style="margin-left: 20px;">
                                        \\[ L(y, F(x)) = \\frac{1}{2} (y - F(x))^2 \\]
                                    </div>
                                </li>
                                <li>Binary classification (Log-Loss):
                                    <div style="margin-left: 20px;">
                                        \\[ L(y, F(x)) = - \\big[ y \\log(p(x)) + (1 - y) \\log(1 - p(x)) \\big] \\]
                                        <p>With \\( p(x) = \\frac{1}{1 + e^{-F(x)}} \\) is the probability.</p>
                                    </div>
                                </li>
                            </ul>
                            
                            <h4>2. Weak Learners</h4>
                            <p>Weak learners are usually shallow decision trees, trained to predict the residuals from the previous step.</p>
                            
                            <h4>3. Gradient Descent</h4>
                            <p>Gradient Boosting uses gradient descent to find the direction to adjust the model to minimize the loss function.</p>
                            <div style="margin-left: 20px;">
                                \\[ g_i = \\frac{\\partial L(y_i, F(x_i))}{\\partial F(x_i)} \\]
                            </div>
                            
                            <h3>Gradient Boosting Process</h3>
                            
                            <li><strong>Initialization:</strong> Build the initial model:
                                <div style="margin-left: 20px;">
                                    \\[ F_0(x) = \\arg\\min_c \\sum L(y_i, c) \\]
                                    <p>With Mean Squared Error (MSE): \\( F_0(x) = \\text{mean}(y) \\).</p>
                                </div>
                            </li>
                            <li><strong>Iterate through each step:</strong>
                                <ol>
                                    <li>Calculate gradient (residual):
                                        <div style="margin-left: 20px;">
                                            \\[ g_i^{(m)} = \\frac{\\partial L(y_i, F(x_i))}{\\partial F(x_i)} \\]
                                        </div>
                                    </li>
                                    <li>Train a weak learner:
                                        <div style="margin-left: 20px;">
                                            \\[ h_m(x) \\approx g_i^{(m)} \\]
                                        </div>
                                    </li>
                                    <li>Update the model:
                                        <div style="margin-left: 20px;">
                                            \\[ F_m(x) = F_{m-1}(x) + \\alpha \\cdot h_m(x) \\]
                                        </div>
                                    </li>
                                </ol>
                            </li>
                            <li><strong>Repeat until reaching the maximum number of steps or convergence error.</strong></li>
                            
                            
                            <h3>General formula</h3>
                            <div style="margin-left: 20px;">
                                \\[ F_M(x) = F_0(x) + \\sum_{m=1}^M \\alpha \\cdot h_m(x) \\]
                            </div>
                            
                            <h3>Parameters to adjust</h3>
                            <ul>
                                <li>Learning rate (\\( \\alpha \\)): Adjust the contribution level of each weak learner.</li>
                                <li>Number of trees (M): Determine the number of model iteration steps.</li>
                                <li>Tree depth: Complexity of each weak learner.</li>
                            </ul>
                            
                            <h3>Real-world application in predicting DFI and Weight of Pigs</h3>
                            <p>Gradient Boosting is applied to predict important factors such as DFI (daily food intake of pigs) and weight (Weight) of pigs, thereby optimizing the feeding process and food management.</p>
        
                            <p>In this model, Gradient Boosting helps predict DFI and weight of pigs based on input factors such as pig age, DFI 7 days ago and weight the previous day. The model is built through the following steps:</p>
        
                            <ul>
                                <li><b>Model structure:</b> The Gradient Boosting model works on the principle of combining simple decision trees sequentially. Each tree in the model learns from the errors of the previous model, thereby improving the overall accuracy of the model. Each step updates the model based on the remaining errors of the previous model.</li>
                                <div style="margin-left: 20px;">
                                    <p>Assume the initial model can be initialized with the mean value of DFI or Weight from the training data:</p>
                                    <p>\\( F_0(x) = \\text{mean}(y) \\)</p>
                                </div>
        
                                <li><b>Predict DFI and Weight:</b>
                                    <ul>
                                        <li>For DFI, the model uses factors such as pig age and DFI 7 days ago to predict the daily food intake of pigs. The formula describing the process of predicting DFI is as follows:
                                            <div style="margin-left: 20px;">
                                                <p>\\( \\text{DFI} = f(\text{Age}, \\text{DFI}_{-7}) \\)</p>
                                            </div>
                                        </li>
                                        <li>For weight, the model uses factors such as pig age, DFI on the current day and weight the previous day to predict the weight of pigs on the next day. The formula describing the process of predicting Weight is as follows:
                                            <div style="margin-left: 20px;">
                                                <p>\\( \\text{Weight} = f(\text{Age}, \\text{DFI}, \\text{Weight}_{-1}) \\)</p>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
        
                                <li><b>Real-world application:</b> Using Gradient Boosting to predict DFI and weight helps optimize the food supply for pigs, ensuring their good development without waste. At the same time, it helps farmers manage breeding more effectively, improve the growth rate of pigs and minimize costs. This model can also be extended to predict other factors such as health, reproduction rate, or overall breeding efficiency, thereby improving productivity and product quality.</li>
                            </ul>
        
                            <div style="margin-left: 20px;">
                                <p><b>Model update process:</b></p>
                                <p>Gradient Boosting uses the following formula to update the model at each step:</p>
                                <p>\\[ F_k(x) = F_{k-1}(x) + \\alpha \\cdot h_k(x) \\]</p>
                                <p>Where:</p>
                                <ul>
                                    <li>\\( F_k(x) \\): Model at step \\( k \\).</li>
                                    <li>\\( F_{k-1}(x) \\): Model at step \\( k-1 \\).</li>
                                    <li>\\( \\alpha \\): Learning rate, adjusts the degree of model change after each step.</li>
                                    <li>\\( h_k(x) \\): Decision tree at step \\( k \\).</li>
                                </ul>
                                <p><b>Gradient at each step:</b></p>
                                <p>\\[ g_i = \\nabla L(y_i, F_{k-1}(x_i)) = y_i - F_{k-1}(x_i) \\]</p>
                                <p>Where:</p>
                                <ul>
                                    <li>\\( g_i \\): Residual of observation \\( i \\) at step \\( k \\).</li>
                                    <li>\\( L \\): Loss function.</li>
                                    <li>\\( y_i \\): Actual value of DFI or Weight.</li>
                                    <li>\\( F_{k-1}(x_i) \\): Prediction of the model at step \\( k-1 \\).</li>
                                </ul>
                            </div>
                        `
                    },
                    'knn-regression': {
                        title: 'K Nearest Neighbors Regression (KNN Regression)',
                        description: `
                            <h3>Introduction</h3>
                            <p>KNN Regression is a non-parametric machine learning method that uses the information of the nearest data points to predict the value of a new point. This model does not build a linear regression function like other methods, but instead relies on the available data to make predictions.</p>
                            
                            <p>In KNN Regression, when predicting the value for a new data point, the model searches for the nearest data points in the training set to that point and calculates the predicted value by averaging the values of these points. The number of nearest points is called K, and this is the main parameter in the model.</p>
        
                            <p>The formula for calculating the prediction for a new data point \( x_0 \) is:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( \\hat{y} = \\frac{1}{K} \\sum_{i=1}^K y_i \\)</p>
                                <p>Where:</p>
                                <ul>
                                    <li>\\( \\hat{y} \\): Prediction for the new data point.</li>
                                    <li>\\( K \\): Number of nearest data points.</li>
                                    <li>\\( y_i \\): Actual value of the nearest data points.</li>
                                </ul>
                            </div>
                            
                            <p>KNN Regression is often used in problems such as price prediction, sales prediction, traffic prediction, and other prediction problems when the relationship between variables is not clear or cannot be modeled by simple linear regression methods.</p>
                            
                            <h3>Steps to perform KNN Regression:</h3>
                            <ul>
                                <li><b>Choose the value of K:</b> Choose the number of nearest points (K) to be used in the model. The value of K can affect the accuracy of the model.</li>
                                <li><b>Calculate the distance:</b> Calculate the distance between the new data point and all the data points in the training set. The distance used is usually the Euclidean distance:</li>
                                <div style="margin-left: 20px;">
                                    <p>\\( d(x, x') = \\sqrt{\\sum_{i=1}^n (x_i - x'_i)^2} \\)</p>
                                    <p>Where:</p>
                                    <ul>
                                        <li>\\( d(x, x') \\): Distance between point \\( x \\) and point \\( x' \\) in the feature space.</li>
                                        <li>\\( x_i, x'_i \\): Features of point \\( x \\) and \\( x' \\) at position \\( i \\).</li>
                                    </ul>
                                </div>
                                <li><b>Choose K nearest points:</b> After calculating the distance, choose K nearest data points and use their values to predict the value for the new data point.</li>
                                <li><b>Calculate the predicted value:</b> The predicted value for the new data point is the average of the values of the K nearest data points:</li>
                                <div style="margin-left: 20px;">
                                    <p>\\( \\hat{y} = \\frac{1}{K} \\sum_{i=1}^K y_i \\)</p>
                                </div>
                            </ul>
        
                            <h3>Application in the project</h3>
                            <p>In this project, KNN Regression is used to predict the DFI (daily food intake of pigs) and Weight of pigs based on features such as pig age, DFI 7 days ago and weight the previous day.</p>
                            
                            <p>The formula for predicting DFI and Weight in this project is as follows:</p>
        
                            <ul>
                                <li><b>Predict DFI:</b> The model uses the age of the pig and the DFI 7 days ago to predict the daily food intake of the pig. The formula for predicting DFI can be written as follows:</li>
                                <div style="margin-left: 20px;">
                                    <p>\\( DFI = \\frac{1}{K} \\sum_{i=1}^K DFI_i \\)</p>
                                </div>
                                <p>Where, \\( DFI_i \\) is the actual value of DFI of the nearest data points.</p>
        
                                <li><b>Predict Weight:</b> To predict the weight of the pig, the model uses the age of the pig, the current DFI and the weight the previous day. The formula for predicting weight can be written as follows:</li>
                                <div style="margin-left: 20px;">
                                    <p>\\( Weight = \\frac{1}{K} \\sum_{i=1}^K Weight_i \\)</p>
                                </div>
                                <p>Where, \\( Weight_i \\) is the actual value of the weight of the nearest data points.</p>
                            </ul>
                            
                            <p>Using KNN Regression in predicting DFI and Weight helps optimize the food management and health of the pigs. This model helps farmers accurately predict the necessary food for pigs, optimize costs and growth of pigs, while minimizing waste in breeding. In addition, KNN Regression can be easily extended to predict other factors such as reproduction rate, pig development, or even factors related to disease, helping to improve overall breeding efficiency.</p>
                        `
                    },
                    'xgboost-regressor': {
                        title: 'XGBoost Regressor',
                        description: `
                            <h3>Introduction</h3>
                            <p>XGBoost (Extreme Gradient Boosting) is an advanced machine learning algorithm based on the Gradient Boosting framework. It is widely used for regression and classification problems due to its performance, scalability, and ability to handle complex data relationships.</p>
                            
                            <p>The key components and features of XGBoost include:</p>
                            <ul>
                                <li><b>Boosting Framework:</b> Builds a series of weak learners (usually decision trees), where each learner improves on the errors of the previous ones.</li>
                                <li><b>Regularization:</b> Includes L1 and L2 regularization to prevent overfitting and improve generalization.</li>
                                <li><b>Sparsity Awareness:</b> Efficiently handles missing or sparse data.</li>
                                <li><b>Parallelization:</b> Utilizes parallel computation to speed up model training.</li>
                                <li><b>Custom Loss Functions:</b> Allows flexibility in defining objective functions tailored to specific problems.</li>
                            </ul>

                            <h3>Mathematical Basis</h3>
                            <p>XGBoost minimizes an objective function composed of a loss function and a regularization term:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( Obj = \\sum_{i=1}^n L(y_i, \\hat{y}_i) + \\sum_{k=1}^K \\Omega(f_k) \\)</p>
                            </div>
                            <ul>
                                <li><b>\\(L(y_i, \\hat{y}_i)\\):</b> The loss function measuring the error between true values \\(y_i\\) and predictions \\(\\hat{y}_i\\).</li>
                                <li><b>\\(\\Omega(f_k)\\):</b> The regularization term controlling the complexity of each tree \\(f_k\\).</li>
                            </ul>
                            <p>The trees are built iteratively, optimizing the objective function with gradient descent techniques on the loss function.</p>

                            <h3>Training Process</h3>
                            <p>The training process in XGBoost involves the following steps:</p>
                            <ul>
                                <li><b>Initialization:</b> Start with an initial prediction (e.g., the mean of the target variable).</li>
                                <li><b>Gradient and Hessian Calculation:</b> Compute the gradient and second-order derivative (Hessian) of the loss function for optimization.</li>
                                <li><b>Tree Construction:</b> Build a decision tree by selecting splits that minimize the objective function.</li>
                                <li><b>Regularization:</b> Prune trees or limit tree depth to prevent overfitting.</li>
                                <li><b>Iteration:</b> Repeat the process, adding new trees until the model converges or meets stopping criteria (e.g., a specific number of trees).</li>
                            </ul>

                            <h3>Application in the Project</h3>
                            <p>In this project, XGBoost Regressor is applied to predict the Daily Feed Intake (DFI) and Weight of pigs. Its ability to handle non-linear relationships and complex interactions makes it a suitable choice for this task.</p>
                            <p>Input features include:</p>
                            <ul>
                                <li>Pig age.</li>
                                <li>Historical DFI data (e.g., 7 days ago).</li>
                                <li>Previous day's weight.</li>
                            </ul>
                            
                            <p>Specific applications include:</p>
                            <ul>
                                <li><b>Predicting DFI:</b> XGBoost models the relationship between pig age, historical DFI, and other factors to predict daily food intake.</li>
                                <li><b>Predicting Weight:</b> Uses features like age, current DFI, and historical weight to estimate a pig's weight.</li>
                            </ul>

                            <h3>Advantages of Using XGBoost</h3>
                            <ul>
                                <li><b>Efficiency:</b> Fast training due to parallel processing and optimized algorithms.</li>
                                <li><b>Accuracy:</b> Strong performance in capturing complex patterns and interactions in data.</li>
                                <li><b>Robustness:</b> Built-in handling of missing values and regularization reduces overfitting.</li>
                                <li><b>Customizability:</b> Flexible hyperparameters and custom loss functions allow tuning for specific tasks.</li>
                            </ul>

                            <h3>Structure in the Project</h3>
                            <ol>
                                <li><b>Input:</b> Age, historical DFI, weight history, and other relevant features.</li>
                                <li><b>Processing:</b> Iteratively trains regression trees to minimize the prediction error.</li>
                                <li><b>Output:</b> Predicts DFI and weight for the pigs.</li>
                            </ol>

                            <p>Using XGBoost Regressor enhances prediction accuracy and robustness, making it an ideal choice for managing pig growth and feed efficiency.</p>
                        `
                    },
                    'support-vector-regression': {
                        title: 'Support Vector Regression (SVR)',
                        description: `
                            <h3>Introduction</h3>
                            <p>Support Vector Regression (SVR) is a machine learning algorithm belonging to the Support Vector Machines (SVM) family, designed to solve regression problems. SVR tries to build a linear or non-linear regression model by optimizing the margins.</p>
                            
                            <p>The main goal of SVR is to find a function \\( f(x) \\) such that the errors of the data points are within an acceptable threshold, called epsilon (\\( \\varepsilon \\)). SVR focuses on optimizing to minimize the complexity of the model and maintain a balance between accuracy and generalization ability.</p>
        
                            <h3>Basic formulas</h3>
                            <p>The regression function in SVR is:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( f(x) = w^T x + b \\)</p>
                            </div>
                            <p>Where:</p>
                            <ul>
                                <li>\\( w \\): Weight (vector weights).</li>
                                <li>\\( x \\): Input data.</li>
                                <li>\\( b \\): Bias.</li>
                            </ul>
                            
                            <p>SVR optimizes the following problem:</p>
                            <div style="margin-left: 20px;">
                                <p>Minimize: \\( \\frac{1}{2} ||w||^2 \\)</p>
                                <p>Subject to: \\( |y_i - (w^T x_i + b)| \\leq \\varepsilon + \\xi_i + \\xi_i^* \\)</p>
                            </div>
                            <ul>
                                <li>\\( y_i \\): Actual value.</li>
                                <li>\\( \\varepsilon \\): Acceptable error.</li>
                                <li>\\( \\xi_i, \\xi_i^* \\): Error beyond \\( \\varepsilon \\) (slack variables).</li>
                            </ul>
        
                            <h3>Kernel Function</h3>
                            <p>SVR can apply kernel functions to solve non-linear problems, helping to map the data into a higher feature space. Some popular kernels:</p>
                            <ul>
                                <li><b>Linear Kernel:</b> \\( K(x_i, x_j) = x_i^T x_j \\)</li>
                                <li><b>Polynomial Kernel:</b> \\( K(x_i, x_j) = (x_i^T x_j + c)^d \\)</li>
                                <li><b>RBF Kernel (Radial Basis Function):</b> \\( K(x_i, x_j) = \\exp(-\\gamma ||x_i - x_j||^2) \\)</li>
                            </ul>
        
                            <h3>Application in the project</h3>
                            <p>In this project, to predict the DFI and Weight of pigs, SVR is used to build regression models to predict values based on input features. Specific applications include:</p>
                            <ul>
                                <li><b>Predict DFI:</b> SVR predicts the food consumption (DFI) of pigs based on age and DFI data 7 days ago. Independent decision trees make predictions, and the average value of them is used as the final result.</li>
                                <li><b>Predict Weight:</b> SVR is used to predict the current weight of pigs based on age, current DFI and weight the previous day.</li>
                            </ul>
        
                            <h3>Benefits of using SVR</h3>
                            <p>SVR has several advantages in the project:</p>
                            <ul>
                                <li>Ability to handle non-linear data thanks to the use of kernel functions.</li>
                                <li>Maintain high accuracy without needing too many parameters.</li>
                                <li>Good control of the complexity of the model thanks to optimizing the error within the epsilon range.</li>
                            </ul>
                            
                            <p>Thanks to the above characteristics, SVR has helped increase the accuracy and stability in predicting values related to pig growth.</p>
                        `
                    },
                    'random-forest-regression': {
                        title: 'Random Forest Regression',
                        description: `
                            <h3>Introduction</h3>
                            <p>Random Forest Regression is a machine learning algorithm that belongs to the ensemble learning group. It uses a set of decision trees to make regression predictions. Each decision tree in the forest makes independent predictions, and the final result is the average of the predictions from the trees.</p>
        
                            <p>The goal of Random Forest is to enhance the accuracy and generalization ability of the model by minimizing the overfitting phenomenon that occurs in individual decision trees.</p>
                            
                            <h3>Basic formulas</h3>
                            <p>For regression problems, the model output is the average of the predictions of all trees:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( \\hat{y} = \\frac{1}{T} \\sum_{t=1}^T f_t(x) \\)</p>
                            </div>
                            <ul>
                                <li>\\( T \\): Number of trees in the forest.</li>
                                <li>\\( f_t(x) \\): Prediction of tree \\( t \\) for input \\( x \\).</li>
                                <li>\\( \\hat{y} \\): Final prediction value.</li>
                            </ul>
        
                            <p>Each decision tree is built based on a subset of data (bootstrap sampling), with a random set of features chosen at each split node.</p>
        
                            <h3>Advantages</h3>
                            <ul>
                                <li><b>Ability to handle non-linear data:</b> Random Forest can handle non-linear relationships between input variables.</li>
                                <li><b>Minimize overfitting:</b> Using multiple trees helps reduce overfitting compared to a single decision tree.</li>
                                <li><b>Ability to handle large data:</b> The algorithm can handle data with a large number of features and samples.</li>
                            </ul>
        
                            <h3>Application in the project</h3>
                            <p>In the project to predict the DFI and Weight of pigs, Random Forest Regression is used as follows:</p>
                            <ul>
                                <li><b>Predict DFI:</b> Random Forest is used to predict the food consumption (DFI) of pigs based on age and DFI data 7 days ago. Independent decision trees make predictions, and the average value of them is used as the final result.</li>
                                <li><b>Predict Weight:</b> Random Forest Regression is used to predict the current weight of pigs based on age, current DFI and weight the previous day.</li>
                            </ul>
        
                            <h3>Operation</h3>
                            <p>The main process of Random Forest Regression includes:</p>
                            <ol>
                                <li><b>Bootstrap sampling:</b> Randomly sample from the original data set to create subsets of data.</li>
                                <li><b>Build decision trees:</b> Each tree is trained on a bootstrap subset of data with a random set of features at each split node.</li>
                                <li><b>Prediction:</b> Calculate the average of the predictions from all trees to make the final result.</li>
                            </ol>
                            
                            <h3>Mean Squared Error (MSE) Formula</h3>
                            <div style="margin-left: 20px;">
                                <p>\\( MSE = \\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2 \\)</p>
                            </div>
                            <ul>
                                <li>\\( n \\): Number of samples.</li>
                                <li>\\( y_i \\): Actual value.</li>
                                <li>\\( \\hat{y}_i \\): Prediction value.</li>
                            </ul>
        
                            <h3>Benefits in the project</h3>
                            <p>Using Random Forest Regression helps increase the accuracy of predicting DFI and pig weight thanks to:</p>
                            <ul>
                                <li>Ability to handle non-linear and complex data.</li>
                                <li>Minimize the impact of data noise.</li>
                                <li>Better generalization ability compared to single regression methods.</li>
                            </ul>
                            
                            <p>Thanks to these characteristics, Random Forest Regression has become an important tool in the project to optimize the prediction of pig growth.</p>
                        `
                    },
                    'long-short-term-memory': {
                        title: 'Long Short Term Memory (LSTM)',
                        description: `
                            <h3>Introduction</h3>
                            <p>LSTM (Long Short Term Memory) is a type of recurrent neural network (RNN) designed to remember important information over a long period of time, overcoming the vanishing gradient problem often encountered in traditional RNNs. LSTM is effective in processing time series, sequential data, or problems with long-term dependencies between data elements.</p>
                            
                            <p>LSTM consists of three main mechanisms called gates:</p>
                            <ul>
                                <li><b>Forget Gate:</b> Decides which information from the previous state needs to be discarded.</li>
                                <li><b>Input Gate:</b> Determines which new information will be added to the memory.</li>
                                <li><b>Output Gate:</b> Decides which information from the memory will be output as the output.</li>
                            </ul>
        
                            <h3>LSTM Operation Formula</h3>
                            <p>Below are the main formulas describing the operation of LSTM at each time step:</p>
                            <div style="margin-left: 20px;">
                                <p><b>Forget Gate:</b> \\( f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f) \\)</p>
                                <p><b>Input Gate:</b> \\( i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i) \\)</p>
                                <p><b>Application Update:</b> \\( \tilde{C}_t = \tanh(W_C \cdot [h_{t-1}, x_t] + b_C) \\)</p>
                                <p><b>Memory State Update:</b> \\( C_t = f_t \cdot C_{t-1} + i_t \cdot \tilde{C}_t \\)</p>
                                <p><b>Output Gate:</b> \\( o_t = \sigma(W_o \cdot [h_{t-1}, x_t] + b_o) \\)</p>
                                <p><b>Hidden State:</b> \\( h_t = o_t \cdot \tanh(C_t) \\)</p>
                            </div>
                            <ul>
                                <li>\\( x_t \\): Input data at time \\( t \\).</li>
                                <li>\\( h_{t-1} \\): Hidden state from the previous time step.</li>
                                <li>\\( C_t \\): Memory state at the current time step.</li>
                                <li>\\( W_f, W_i, W_o, W_C \\): Weight matrices of the corresponding gates.</li>
                                <li>\\( b_f, b_i, b_o, b_C \\): Corresponding biases.</li>
                            </ul>
        
                            <h3>Application in the project</h3>
                            <p>In the project to predict the DFI and Weight of pigs:</p>
                            <ul>
                                <li><b>Predict DFI:</b> LSTM is used to process the DFI data from the previous 7 days and predict the food consumption on the next day.</li>
                                <li><b>Predict Weight:</b> The LSTM model predicts the weight of pigs based on data such as the current weight, age, and DFI.</li>
                            </ul>
        
                            <h3>Advantages</h3>
                            <ul>
                                <li><b>Long-term data processing:</b> LSTM can retain information over many time steps, helping to process sequential data better than traditional RNNs.</li>
                                <li><b>Overcome vanishing gradient:</b> The special design helps LSTM maintain a stable gradient signal during training.</li>
                                <li><b>Flexible application:</b> LSTM is widely used in time series prediction, natural language processing (NLP), and speech recognition.</li>
                            </ul>
        
                            <h3>Benefits in the project</h3>
                            <p>LSTM improves the accuracy of predictions thanks to its ability to learn long-term dependencies and patterns in time series data. With LSTM, predictions related to pig growth and food consumption become more reliable and efficient.</p>
                        `
                    },
                    'mlp-regressor': {
                        title: 'Multi-Layer Perceptron Regressor (MLP Regressor)',
                        description: `
                            <h3>Introduction</h3>
                            <p>MLP Regressor (Multi-Layer Perceptron Regressor) is a type of artificial neural network (ANN) designed to solve regression problems. It consists of multiple layers of neurons organized in a feedforward structure, where input data is passed through one or more hidden layers before producing the output.</p>
                            <p>MLP Regressor uses a non-linear activation function (such as ReLU, Tanh) in the hidden layers to learn non-linear relationships between features and target variables, making it more effective in complex regression problems.</p>
        
                            <h3>Basic structure</h3>
                            <p>The MLP network consists of:</p>
                            <ul>
                                <li><b>Input layer:</b> Receives input data, the number of neurons corresponding to the number of features in the data set.</li>
                                <li><b>Hidden layers:</b> Consists of multiple neurons with a non-linear activation function, where data is processed to extract hidden features.</li>
                                <li><b>Output layer:</b> Produces the prediction value, using a linear activation function for regression problems.</li>
                            </ul>
        
                            <h3>Operation Formula</h3>
                            <p>MLP Regressor operates based on the following steps:</p>
        
                            <h4>1. Pass input data through the layers</h4>
                            <p>Each hidden layer performs the calculation:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( z^{(l)} = W^{(l)} \cdot a^{(l-1)} + b^{(l)} \\)</p>
                                <p>\\( a^{(l)} = \phi(z^{(l)}) \\)</p>
                            </div>
                            <ul>
                                <li>\\( l \\): Index of the current layer.</li>
                                <li>\\( W^{(l)} \\): Weight matrix of layer \\( l \\).</li>
                                <li>\\( a^{(l-1)} \\): Output (or activation) from the previous layer.</li>
                                <li>\\( b^{(l)} \\): Bias of layer \\( l \\).</li>
                                <li>\\( \phi \\): Activation function (e.g., ReLU, Tanh).</li>
                            </ul>
        
                            <h4>2. Output layer</h4>
                            <p>For regression problems, the output layer performs the calculation:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( \hat{y} = W^{(out)} \cdot a^{(L)} + b^{(out)} \\)</p>
                            </div>
                            <ul>
                                <li>\\( W^{(out)} \\): Weight of the output layer.</li>
                                <li>\\( a^{(L)} \\): Output from the last hidden layer.</li>
                                <li>\\( \hat{y} \\): Prediction value.</li>
                            </ul>
        
                            <h4>3. Loss function</h4>
                            <p>The common loss function used for regression is Mean Squared Error (MSE):</p>
                            <div style="margin-left: 20px;">
                                <p>\\( MSE = \\frac{1}{n} \sum_{i=1}^n (y_i - \hat{y}_i)^2 \\)</p>
                            </div>
                            <ul>
                                <li>\\( n \\): Number of samples.</li>
                                <li>\\( y_i \\): Actual value of the \\( i \\)-th sample.</li>
                                <li>\\( \hat{y}_i \\): Prediction value of the \\( i \\)-th sample.</li>
                            </ul>
        
                            <h4>4. Update weights</h4>
                            <p>The weights \\( W \\) and bias \\( b \\) are updated through the backpropagation algorithm and optimized by methods like Gradient Descent:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( W \gets W - \eta \cdot \\frac{\partial \text{Loss}}{\partial W} \\)</p>
                                <p>\\( b \gets b - \eta \cdot \\frac{\partial \text{Loss}}{\partial b} \\)</p>
                            </div>
                            <ul>
                                <li>\\( \eta \\): Learning rate.</li>
                                <li>\\( \text{Loss} \\): Loss function value (e.g., MSE).</li>
                            </ul>
        
                            <h3>Advantages</h3>
                            <ul>
                                <li><b>Ability to learn non-linear relationships:</b> Thanks to non-linear activation functions, MLP can learn complex relationships in the data.</li>
                                <li><b>Flexibility:</b> The number of hidden layers and the number of neurons can be adjusted to fit the specific problem.</li>
                                <li><b>Wide application:</b> Suitable for many different types of regression problems.</li>
                            </ul>
        
                            <h3>Application in the project</h3>
                            <p>MLP Regressor is used in the project to predict the growth indicators of pigs:</p>
                            <ul>
                                <li><b>Predict DFI:</b> Based on age and DFI values in the previous days to predict future food consumption.</li>
                                <li><b>Predict Weight:</b> Use factors such as current weight, age, and DFI to predict the next weight of pigs.</li>
                            </ul>
        
                            <h3>Benefits in the project</h3>
                            <p>MLP Regressor provides high accuracy in prediction thanks to its ability to learn non-linear relationships between factors such as age, weight, and DFI. This model contributes to optimizing the management and monitoring of pig growth.</p>
                        `
                    }
                };
                break;
            case "vi":
                algorithmDetails = {
                    "linear-regression": {
                        "title": "Hồi Quy Tuyến Tính",
                        "description": `
                            <p>
                                Hồi quy tuyến tính là một phương pháp thống kê dùng để mô hình hóa mối quan hệ 
                                giữa một biến phụ thuộc (hay biến đích) và một hoặc nhiều biến độc lập (biến đầu vào). Đây là thuật toán cơ bản và phổ biến trong học máy (Machine Learning) và phân tích dữ liệu.
                            </p>
                            <h3>Phương trình hồi quy tuyến tính</h3>
                            <p>Phương trình hồi quy tuyến tính tổng quát có dạng:</p>
                            <p style="margin-left: 20px;">
                                \\( Y = \\beta_0 + \\beta_1X_1 + \\beta_2X_2 + \\dots + \\beta_nX_n + \\epsilon \\)
                            </p>
                            <ul>
                                <li><b>\\( Y \\):</b> Biến phụ thuộc (giá trị cần dự đoán).</li>
                                <li><b>\\( X_1, X_2, \\dots, X_n \\):</b> Các biến độc lập (biến đầu vào).</li>
                                <li><b>\\( \\beta_0 \\):</b> Hệ số chặn (intercept).</li>
                                <li><b>\\( \\beta_1, \\beta_2, \\dots, \\beta_n \\):</b> Hệ số hồi quy (slope).</li>
                                <li><b>\\( \\epsilon \\):</b> Sai số (phản ánh sự khác biệt giữa giá trị thực và giá trị dự đoán).</li>
                            </ul>
        
                            <h3>Các loại hồi quy tuyến tính</h3>
                            <ol>
                                <li><b>Hồi quy tuyến tính đơn:</b> Chỉ có một biến độc lập \\( X \\) và một biến phụ thuộc \\( Y \\), phương trình là:
                                    <div style="margin-left: 20px;">
                                        \\( Y = \\beta_0 + \\beta_1X + \\epsilon \\)
                                    </div>
                                </li>
                                <li><b>Hồi quy tuyến tính đa biến:</b> Có nhiều biến độc lập, phương trình là:
                                    <div style="margin-left: 20px;">
                                        \\( Y = \\beta_0 + \\beta_1X_1 + \\beta_2X_2 + \\dots + \\beta_nX_n + \\epsilon \\)
                                    </div>
                                </li>
                            </ol>
        
                            <h3>Ước lượng tham số</h3>
                            <p>
                                Hồi quy tuyến tính sử dụng phương pháp <b>bình phương tối thiểu (Ordinary Least Squares - OLS)</b> để ước lượng các hệ số \\( \\beta \\). 
                                Mục tiêu là giảm thiểu tổng bình phương sai số giữa giá trị thực (\\( Y \\)) và giá trị dự đoán (\\( \\hat{Y} \\)):
                            </p>
                            <p style="margin-left: 20px;">
                                \\( \\text{Minimize } \\sum_{i=1}^n (Y_i - \\hat{Y}_i)^2 \\)
                            </p>
                            <ul>
                                <li><b>\\( Y_i \\):</b> Giá trị thực của biến phụ thuộc.</li>
                                <li><b>\\( \\hat{Y}_i \\):</b> Giá trị dự đoán từ mô hình.</li>
                            </ul>
        
                            <h3>Đánh giá mô hình</h3>
                            <p>Để đánh giá hiệu quả của mô hình hồi quy tuyến tính, các chỉ số phổ biến được sử dụng bao gồm:</p>
                            <ul>
                                <li><b>Hệ số xác định \\( R^2 \\):</b> Đo lường mức độ giải thích của mô hình đối với biến phụ thuộc, giá trị nằm trong khoảng \\([0, 1]\\).</li>
                                <li><b>Mean Squared Error (MSE):</b> Trung bình bình phương sai số, phản ánh mức độ sai lệch của mô hình.</li>
                                <li><b>Root Mean Squared Error (RMSE):</b> Căn bậc hai của MSE, dễ hiểu hơn vì nó có cùng đơn vị với \\( Y \\).</li>
                                <li><b>Mean Absolute Error (MAE):</b> Trung bình giá trị tuyệt đối của sai số, đo lường mức độ chênh lệch thực tế.</li>
                            </ul>
        
                            <h3>Các giả định cơ bản</h3>
                            <ul>
                                <li><b>Tính tuyến tính:</b> Mối quan hệ giữa biến phụ thuộc và biến độc lập là tuyến tính.</li>
                                <li><b>Độc lập:</b> Các quan sát phải độc lập với nhau.</li>
                                <li><b>Phân phối chuẩn của sai số:</b> Sai số cần có phân phối chuẩn.</li>
                                <li><b>Phương sai đồng nhất:</b> Phương sai của sai số không thay đổi theo giá trị biến độc lập.</li>
                                <li><b>Không có đa cộng tuyến:</b> Các biến độc lập không tương quan mạnh với nhau.</li>
                            </ul>
        
                            <h3>Ứng dụng trong dự án</h3>
                            <h4>1. Dự đoán lượng thức ăn tiêu thụ hàng ngày (DFI)</h4>
                            <p>
                                Hồi quy tuyến tính có thể dự đoán lượng thức ăn tiêu thụ (DFI) dựa trên các yếu tố như:
                                <ul>
                                    <li>Tuổi của heo (age).</li>
                                    <li>DFI trong 7 ngày trước đó.</li>
                                </ul>
                            </p>
        
                            <h4>2. Dự đoán cân nặng</h4>
                            <p>
                                Dựa vào hồi quy, chúng ta có thể ước lượng cân nặng của heo dựa trên:
                                <ul>
                                    <li>Lượng thức ăn tiêu thụ hàng ngày (dfi).</li>
                                    <li>Tuổi của heo (age).</li>
                                    <li>Cân nặng của ngày hôm trước (previous weight).</li>
                                </ul>
                            </p>
        
                            <h3>Lợi ích của hồi quy tuyến tính</h3>
                            <ul>
                                <li><b>Hiểu mối quan hệ:</b> Xác định các yếu tố chính ảnh hưởng đến DFI và cân nặng.</li>
                                <li><b>Tối ưu hóa:</b> Điều chỉnh khẩu phần ăn để giảm chi phí và tối đa hóa tăng trưởng.</li>
                                <li><b>Đơn giản:</b> Dễ dàng triển khai và hiệu quả với mối quan hệ tuyến tính.</li>
                            </ul>
                        `
                    },
                    'gradient-boosting': {
                        title: 'Gradient Boosting',
                        description: `
                            <h3>Giới thiệu</h3>
                            <p>Gradient Boosting là một phương pháp học máy mạnh mẽ, sử dụng kỹ thuật ensemble learning để giải quyết các bài toán hồi quy và phân loại. Phương pháp này kết hợp tuần tự các mô hình nhỏ (weak learners), thường là các cây quyết định, để giảm thiểu sai số thông qua tối ưu hóa gradient descent.</p>
                            
                            <h3>Thành phần chính</h3>
                            <h4>1. Hàm mất mát (Loss Function)</h4>
                            <p>Gradient Boosting tối ưu hóa một hàm mất mát để giảm sai số dự đoán. Một số hàm mất mát phổ biến:</p>
                            <ul>
                                <li>Hồi quy:
                                    <div style="margin-left: 20px;">
                                        \\[ L(y, F(x)) = \\frac{1}{2} (y - F(x))^2 \\]
                                    </div>
                                </li>
                                <li>Phân loại nhị phân (Log-Loss):
                                    <div style="margin-left: 20px;">
                                        \\[ L(y, F(x)) = - \\big[ y \\log(p(x)) + (1 - y) \\log(1 - p(x)) \\big] \\]
                                        <p>Với \\( p(x) = \\frac{1}{1 + e^{-F(x)}} \\) là xác suất.</p>
                                    </div>
                                </li>
                            </ul>
                            
                            <h4>2. Weak Learners</h4>
                            <p>Weak learners thường là các cây quyết định nông (có độ sâu nhỏ), được huấn luyện để dự đoán phần dư (residuals) từ bước trước.</p>
                            
                            <h4>3. Gradient Descent</h4>
                            <p>Gradient Boosting sử dụng gradient descent để tìm hướng điều chỉnh mô hình nhằm giảm hàm mất mát.</p>
                            <div style="margin-left: 20px;">
                                \\[ g_i = \\frac{\\partial L(y_i, F(x_i))}{\\partial F(x_i)} \\]
                            </div>
                            
                            <h3>Quy trình Gradient Boosting</h3>
                            
                            <li><strong>Khởi tạo:</strong> Xây dựng mô hình ban đầu:
                                <div style="margin-left: 20px;">
                                    \\[ F_0(x) = \\arg\\min_c \\sum L(y_i, c) \\]
                                    <p>Với Mean Squared Error (MSE): \\( F_0(x) = \\text{mean}(y) \\).</p>
                                </div>
                            </li>
                            <li><strong>Lặp lại qua từng bước:</strong>
                                <ol>
                                    <li>Tính gradient (phần dư):
                                        <div style="margin-left: 20px;">
                                            \\[ g_i^{(m)} = \\frac{\\partial L(y_i, F(x_i))}{\\partial F(x_i)} \\]
                                        </div>
                                    </li>
                                    <li>Huấn luyện một weak learner:
                                        <div style="margin-left: 20px;">
                                            \\[ h_m(x) \\approx g_i^{(m)} \\]
                                        </div>
                                    </li>
                                    <li>Cập nhật mô hình:
                                        <div style="margin-left: 20px;">
                                            \\[ F_m(x) = F_{m-1}(x) + \\alpha \\cdot h_m(x) \\]
                                        </div>
                                    </li>
                                </ol>
                            </li>
                            <li><strong>Lặp lại cho đến khi đạt số bước tối đa hoặc sai số hội tụ.</strong></li>
                            
                            
                            <h3>Công thức tổng quát</h3>
                            <div style="margin-left: 20px;">
                                \\[ F_M(x) = F_0(x) + \\sum_{m=1}^M \\alpha \\cdot h_m(x) \\]
                            </div>
                            
                            <h3>Tham số cần điều chỉnh</h3>
                            <ul>
                                <li>Learning rate (\\( \\alpha \\)): Điều chỉnh mức đóng góp của mỗi weak learner.</li>
                                <li>Số lượng cây (M): Quyết định số bước lặp của mô hình.</li>
                                <li>Độ sâu cây: Độ phức tạp của mỗi weak learner.</li>
                            </ul>
                            
                            <h3>Ứng dụng thực tế trong dự đoán DFI và Weight của Lợn</h3>
                            <p>Gradient Boosting được ứng dụng trong việc dự đoán các yếu tố quan trọng như DFI (lượng thức ăn lợn ăn vào hàng ngày) và cân nặng (Weight) của lợn, từ đó tối ưu hóa quá trình chăn nuôi và quản lý thức ăn.</p>
        
                            <p>Trong mô hình này, Gradient Boosting giúp dự đoán DFI và cân nặng của lợn dựa trên các yếu tố đầu vào như tuổi của lợn, DFI 7 ngày trước và cân nặng ngày hôm qua. Mô hình được xây dựng qua các bước sau:</p>
        
                            <ul>
                                <li><b>Cấu trúc mô hình:</b> Mô hình Gradient Boosting hoạt động theo nguyên lý kết hợp các cây quyết định đơn giản theo cách tuần tự. Mỗi cây trong mô hình học từ các sai số của mô hình trước đó, từ đó cải thiện độ chính xác của mô hình tổng thể. Mỗi bước đều cập nhật mô hình dựa trên các sai số còn lại của mô hình trước đó.</li>
                                <div style="margin-left: 20px;">
                                    <p>Giả sử mô hình ban đầu có thể được khởi tạo với giá trị trung bình của DFI hoặc Weight từ dữ liệu huấn luyện:</p>
                                    <p>\\( F_0(x) = \\text{mean}(y) \\)</p>
                                </div>
        
                                <li><b>Dự đoán DFI và Weight:</b>
                                    <ul>
                                        <li>Đối với DFI, mô hình sử dụng các yếu tố như tuổi của lợn và DFI 7 ngày trước để dự đoán lượng thức ăn lợn ăn vào trong ngày hiện tại. Công thức mô tả quá trình dự đoán DFI như sau:
                                            <div style="margin-left: 20px;">
                                                <p>\\( \\text{DFI} = f(\text{Age}, \\text{DFI}_{-7}) \\)</p>
                                            </div>
                                        </li>
                                        <li>Đối với cân nặng (Weight), mô hình sử dụng các yếu tố như tuổi của lợn, DFI ngày hiện tại và cân nặng ngày hôm qua để dự đoán cân nặng của lợn vào ngày hôm sau. Công thức mô tả quá trình dự đoán Weight như sau:
                                            <div style="margin-left: 20px;">
                                                <p>\\( \\text{Weight} = f(\text{Age}, \\text{DFI}, \\text{Weight}_{-1}) \\)</p>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
        
                                <li><b>Ứng dụng trong thực tế:</b> Việc sử dụng Gradient Boosting để dự đoán DFI và cân nặng giúp tối ưu hóa lượng thức ăn cung cấp cho lợn, đảm bảo chúng phát triển tốt mà không lãng phí. Đồng thời, giúp nông dân quản lý chăn nuôi hiệu quả hơn, cải thiện tốc độ tăng trưởng của lợn và giảm thiểu chi phí. Mô hình này cũng có thể được mở rộng để dự đoán các yếu tố khác như sức khỏe, tỷ lệ sinh sản, hoặc hiệu quả chăn nuôi tổng thể, từ đó nâng cao năng suất và chất lượng sản phẩm.</li>
                            </ul>
        
                            <div style="margin-left: 20px;">
                                <p><b>Quá trình cập nhật mô hình:</b></p>
                                <p>Gradient Boosting sử dụng công thức sau để cập nhật mô hình qua mỗi bước:</p>
                                <p>\\[ F_k(x) = F_{k-1}(x) + \\alpha \\cdot h_k(x) \\]</p>
                                <p>Trong đó:</p>
                                <ul>
                                    <li>\\( F_k(x) \\): Mô hình tại bước \\( k \\).</li>
                                    <li>\\( F_{k-1}(x) \\): Mô hình tại bước \\( k-1 \\).</li>
                                    <li>\\( \\alpha \\): Hệ số học (learning rate), điều chỉnh mức độ thay đổi của mô hình sau mỗi bước.</li>
                                    <li>\\( h_k(x) \\): Cây quyết định tại bước \\( k \\).</li>
                                </ul>
                                <p><b>Gradient tại mỗi bước:</b></p>
                                <p>\\[ g_i = \\nabla L(y_i, F_{k-1}(x_i)) = y_i - F_{k-1}(x_i) \\]</p>
                                <p>Trong đó:</p>
                                <ul>
                                    <li>\\( g_i \\): Sai số (residual) của quan sát \\( i \\) tại bước \\( k \\).</li>
                                    <li>\\( L \\): Hàm mất mát (loss function).</li>
                                    <li>\\( y_i \\): Giá trị thực tế của DFI hoặc Weight.</li>
                                    <li>\\( F_{k-1}(x_i) \\): Dự đoán của mô hình tại bước \\( k-1 \\).</li>
                                </ul>
                            </div>
                        `
                    },
                    'knn-regression': {
                        title: 'Hồi Quy K Nearest Neighbors (KNN Regression)',
                        description: `
                            <h3>Giới thiệu</h3>
                            <p>KNN Regression là một phương pháp học máy không tham số, dựa trên việc sử dụng thông tin của các điểm dữ liệu gần nhất để dự đoán giá trị của một điểm mới. Mô hình này không xây dựng một hàm hồi quy tuyến tính như các phương pháp khác mà thay vào đó dựa vào các dữ liệu có sẵn để đưa ra dự đoán.</p>
                            
                            <p>Trong KNN Regression, khi dự đoán giá trị cho một điểm dữ liệu mới, mô hình tìm kiếm các điểm dữ liệu trong tập huấn luyện gần nhất với điểm đó và tính toán giá trị dự đoán bằng cách tính trung bình của các giá trị của những điểm này. Số lượng điểm gần nhất được gọi là K, và đây là tham số chính trong mô hình.</p>
        
                            <p>Công thức tính toán dự đoán cho một điểm dữ liệu mới \( x_0 \) là:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( \\hat{y} = \\frac{1}{K} \\sum_{i=1}^K y_i \\)</p>
                                <p>Trong đó:</p>
                                <ul>
                                    <li>\\( \\hat{y} \\): Dự đoán cho điểm dữ liệu mới.</li>
                                    <li>\\( K \\): Số lượng điểm dữ liệu gần nhất.</li>
                                    <li>\\( y_i \\): Giá trị thực tế của các điểm dữ liệu gần nhất.</li>
                                </ul>
                            </div>
                            
                            <p>KNN Regression thường được sử dụng trong các bài toán dự đoán giá cả, dự đoán doanh số, dự đoán lượng truy cập, và các bài toán dự đoán khác khi mối quan hệ giữa các biến không rõ ràng hoặc không thể mô hình hóa bằng các phương pháp hồi quy tuyến tính đơn giản.</p>
                            
                            <h3>Các bước thực hiện KNN Regression:</h3>
                            <ul>
                                <li><b>Chọn giá trị K:</b> Chọn số lượng điểm gần nhất (K) sẽ được sử dụng trong mô hình. Giá trị K có thể ảnh hưởng đến độ chính xác của mô hình.</li>
                                <li><b>Tính khoảng cách:</b> Tính khoảng cách giữa điểm dữ liệu mới và tất cả các điểm dữ liệu trong tập huấn luyện. Khoảng cách thường sử dụng là khoảng cách Euclid:</li>
                                <div style="margin-left: 20px;">
                                    <p>\\( d(x, x') = \\sqrt{\\sum_{i=1}^n (x_i - x'_i)^2} \\)</p>
                                    <p>Trong đó:</p>
                                    <ul>
                                        <li>\\( d(x, x') \\): Khoảng cách giữa điểm \\( x \\) và điểm \\( x' \\) trong không gian đặc trưng.</li>
                                        <li>\\( x_i, x'_i \\): Các đặc trưng của điểm \\( x \\) và \\( x' \\) tại vị trí thứ \\( i \\).</li>
                                    </ul>
                                </div>
                                <li><b>Chọn K điểm gần nhất:</b> Sau khi tính khoảng cách, chọn K điểm dữ liệu gần nhất và sử dụng giá trị của chúng để dự đoán giá trị cho điểm dữ liệu mới.</li>
                                <li><b>Tính giá trị dự đoán:</b> Giá trị dự đoán cho điểm dữ liệu mới là trung bình của các giá trị của K điểm gần nhất:</li>
                                <div style="margin-left: 20px;">
                                    <p>\\( \\hat{y} = \\frac{1}{K} \\sum_{i=1}^K y_i \\)</p>
                                </div>
                            </ul>
        
                            <h3>Ứng dụng trong dự án</h3>
                            <p>Trong dự án này, KNN Regression được sử dụng để dự đoán DFI (lượng thức ăn lợn ăn vào trong ngày) và cân nặng (Weight) của lợn dựa trên các đặc trưng như tuổi lợn, DFI 7 ngày trước và cân nặng ngày hôm qua.</p>
                            
                            <p>Công thức cho việc dự đoán DFI và Weight trong dự án này được xây dựng như sau:</p>
        
                            <ul>
                                <li><b>Dự đoán DFI:</b> Mô hình sử dụng tuổi của lợn và DFI trong 7 ngày trước để dự đoán lượng thức ăn lợn ăn vào trong ngày hôm nay. Công thức dự đoán DFI có thể được viết như sau:</li>
                                <div style="margin-left: 20px;">
                                    <p>\\( DFI = \\frac{1}{K} \\sum_{i=1}^K DFI_i \\)</p>
                                </div>
                                <p>Trong đó, \\( DFI_i \\) là giá trị thực tế của DFI của các điểm dữ liệu gần nhất.</p>
        
                                <li><b>Dự đoán Weight:</b> Để dự đoán cân nặng của lợn, mô hình sử dụng tuổi của lợn, DFI ngày hiện tại và cân nặng ngày hôm qua. Công thức dự đoán cân nặng có thể viết như sau:</li>
                                <div style="margin-left: 20px;">
                                    <p>\\( Weight = \\frac{1}{K} \\sum_{i=1}^K Weight_i \\)</p>
                                </div>
                                <p>Trong đó, \\( Weight_i \\) là giá trị thực tế của cân nặng của các điểm dữ liệu gần nhất.</p>
                            </ul>
                            
                            <p>Việc sử dụng KNN Regression trong dự đoán DFI và cân nặng giúp tối ưu hóa quá trình quản lý thức ăn và sức khỏe của lợn. Mô hình này giúp nông dân dự đoán chính xác lượng thức ăn cần thiết cho lợn, giúp tối ưu hóa chi phí và tăng trưởng lợn, đồng thời giảm thiểu sự lãng phí trong chăn nuôi. Ngoài ra, KNN Regression có thể dễ dàng mở rộng để dự đoán các yếu tố khác như tỷ lệ sinh sản, sự phát triển của lợn, hoặc thậm chí là các yếu tố liên quan đến bệnh tật, giúp cải thiện hiệu quả chăn nuôi tổng thể.</p>
                        `
                    },
                    'xgboost-regressor': {
                        title: 'Bộ Đẩy XGBoost',
                        description: `
                            <h3>Giới thiệu</h3>
                            <p>XGBoost (Bộ Đẩy Gradient Tối Đa) là một thuật toán học máy tiên tiến dựa trên khung Gradient Boosting. Nó được sử dụng rộng rãi cho các vấn đề hồi quy và phân loại do hiệu suất, khả năng mở rộng và khả năng xử lý các mối quan hệ dữ liệu phức tạp.</p>
                            
                            <p>Các thành phần và tính năng chính của XGBoost bao gồm:</p>
                            <ul>
                                <li><b>Khung Đẩy:</b> Xây dựng một loạt các học viên yếu (thường là cây quyết định), mỗi học viên cải thiện trên các lỗi của các học viên trước.</li>
                                <li><b>Điều Chỉnh:</b> Bao gồm điều chỉnh L1 và L2 để ngăn ngừa quá khớp và cải thiện tổng quát hóa.</li>
                                <li><b>Ý Thức Đảm:</b> Xử lý hiệu quả dữ liệu thiếu hoặc thưa thớt.</li>
                                <li><b>Song Song:</b> Sử dụng tính toán song song để tăng tốc độ huấn luyện mô hình.</li>
                                <li><b>Hàm Mất Tùy Chỉnh:</b> Cho phép linh hoạt trong việc định nghĩa các hàm mục tiêu được tùy chỉnh cho các vấn đề cụ thể.</li>
                            </ul>

                            <h3>Cơ Sở Toán Học</h3>
                            <p>XGBoost tối thiểu hóa một hàm mục tiêu bao gồm một hàm mất và một hạng mục điều chỉnh:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( Obj = \\sum_{i=1}^n L(y_i, \\hat{y}_i) + \\sum_{k=1}^K \\Omega(f_k) \\)</p>
                            </div>
                            <ul>
                                <li><b>\\(L(y_i, \\hat{y}_i)\\):</b> Hàm mất đo lường sai số giữa các giá trị thực \\(y_i\\) và các dự đoán \\(\\hat{y}_i\\).</li>
                                <li><b>\\(\\Omega(f_k)\\):</b> Hạng mục điều chỉnh kiểm soát độ phức tạp của mỗi cây \\(f_k\\).</li>
                            </ul>
                            <p>Các cây được xây dựng một cách lặp lại, tối thiểu hóa hàm mục tiêu bằng các kỹ thuật xuống dốc gradient trên hàm mất.</p>

                            <h3>Quá Trình Huấn Luyện</h3>
                            <p>Quá trình huấn luyện trong XGBoost bao gồm các bước sau:</p>
                            <ul>
                                <li><b>Khởi Tạo:</b> Bắt đầu với một dự đoán ban đầu (ví dụ, trung bình của biến mục tiêu).</li>
                                <li><b>Tính Toán Gradient và Hessian:</b> Tính toán gradient và đạo hàm bậc hai (Hessian) của hàm mất cho tối ưu hóa.</li>
                                <li><b>Xây Dựng Cây:</b> Xây dựng một cây quyết định bằng cách chọn các phân chia để tối thiểu hóa hàm mục tiêu.</li>
                                <li><b>Điều Chỉnh:</b> Cắt tỉa các cây hoặc giới hạn độ sâu của cây để ngăn ngừa quá khớp.</li>
                                <li><b>Lặp Lại:</b> Lặp lại quá trình, thêm các cây mới cho đến khi mô hình hội tụ hoặc đáp ứng các tiêu chí dừng (ví dụ, một số cây cụ thể).</li>
                            </ul>

                            <h3>Ứng Dụng trong Dự Án</h3>
                            <p>Trong dự án này, Bộ Đẩy XGBoost được áp dụng để dự đoán Lượng Thức Ăn Hàng Ngày (DFI) và Cân Nặng của lợn. Khả năng xử lý các mối quan hệ phi tuyến và các tương tác phức tạp của nó làm cho nó trở thành một lựa chọn phù hợp cho nhiệm vụ này.</p>
                            <p>Các đặc trưng đầu vào bao gồm:</p>
                            <ul>
                                <li>Tuổi lợn.</li>
                                <li>Dữ liệu DFI lịch sử (ví dụ, 7 ngày trước).</li>
                                <li>Cân nặng của ngày hôm qua.</li>
                            </ul>
                            
                            <p>Các ứng dụng cụ thể bao gồm:</p>
                            <ul>
                                <li><b>Dự Đoán DFI:</b> XGBoost mô hình hóa mối quan hệ giữa tuổi lợn, DFI lịch sử, và các yếu tố khác để dự đoán lượng thức ăn hàng ngày.</li>
                                <li><b>Dự Đoán Cân Nặng:</b> Sử dụng các đặc trưng như tuổi, DFI hiện tại, và cân nặng lịch sử để ước tính cân nặng của một con lợn.</li>
                            </ul>

                            <h3>Lợi Ích của Việc Sử Dụng XGBoost</h3>
                            <ul>
                                <li><b>Hiệu Quả:</b> Huấn luyện nhanh chóng do sử dụng tính toán song song và các thuật toán được tối ưu hóa.</li>
                                <li><b>Độ Chính Xác:</b> Hiệu suất mạnh mẽ trong việc nắm bắt các mẫu và tương tác phức tạp trong dữ liệu.</li>
                                <li><b>Khả Năng Chống Đàn Hồi:</b> Xử lý hiệu quả các giá trị thiếu và điều chỉnh giảm thiểu đàn hồi.</li>
                                <li><b>Tùy Chỉnh:</b> Các siêu tham số và hàm mất tùy chỉnh cho phép điều chỉnh cho các nhiệm vụ cụ thể.</li>
                            </ul>

                            <h3>Cấu Trúc trong Dự Án</h3>
                            <ol>
                                <li><b>Đầu Vào:</b> Tuổi, DFI lịch sử, lịch sử cân nặng, và các đặc trưng khác có liên quan.</li>
                                <li><b>Xử Lý:</b> Huấn luyện các cây hồi quy một cách lặp lại để tối thiểu hóa sai số dự đoán.</li>
                                <li><b>Đầu Ra:</b> Dự đoán DFI và cân nặng cho các con lợn.</li>
                            </ol>

                            <p>Sử dụng Bộ Đẩy XGBoost tăng cường độ chính xác và khả năng chống đàn hồi của dự đoán, làm cho nó trở thành một lựa chọn lý tưởng cho việc quản lý sự phát triển và hiệu suất của lợn.</p>
                        `
                    },
                    'support-vector-regression': {
                        title: 'Support Vector Regression (SVR)',
                        description: `
                            <h3>Giới thiệu</h3>
                            <p>Support Vector Regression (SVR) là một thuật toán học máy thuộc họ Support Vector Machines (SVM), được thiết kế để giải quyết các bài toán hồi quy. SVR tìm cách xây dựng một mô hình hồi quy tuyến tính hoặc phi tuyến thông qua việc tối ưu hóa các đường biên (margins).</p>
                            
                            <p>Mục tiêu chính của SVR là tìm ra một hàm \\( f(x) \\) sao cho sai số của các điểm dữ liệu nằm trong một ngưỡng chấp nhận được, gọi là epsilon (\\( \\varepsilon \\)). SVR tập trung tối ưu hóa để giảm thiểu độ phức tạp của mô hình và duy trì cân bằng giữa độ chính xác và khả năng tổng quát hóa.</p>
        
                            <h3>Các công thức cơ bản</h3>
                            <p>Hàm hồi quy trong SVR có dạng:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( f(x) = w^T x + b \\)</p>
                            </div>
                            <p>Trong đó:</p>
                            <ul>
                                <li>\\( w \\): Trọng số (vector weights).</li>
                                <li>\\( x \\): Dữ liệu đầu vào.</li>
                                <li>\\( b \\): Bias (giá trị bù).</li>
                            </ul>
                            
                            <p>SVR tối ưu hóa bài toán sau:</p>
                            <div style="margin-left: 20px;">
                                <p>Minimize: \\( \\frac{1}{2} ||w||^2 \\)</p>
                                <p>Subject to: \\( |y_i - (w^T x_i + b)| \\leq \\varepsilon + \\xi_i + \\xi_i^* \\)</p>
                            </div>
                            <ul>
                                <li>\\( y_i \\): Giá trị thực tế.</li>
                                <li>\\( \\varepsilon \\): Sai số chấp nhận được.</li>
                                <li>\\( \\xi_i, \\xi_i^* \\): Sai số vượt ngoài \\( \\varepsilon \\) (slack variables).</li>
                            </ul>
        
                            <h3>Hàm Kernel</h3>
                            <p>SVR có thể áp dụng các hàm kernel để giải quyết bài toán phi tuyến, giúp ánh xạ dữ liệu vào không gian đặc trưng cao hơn. Một số kernel phổ biến:</p>
                            <ul>
                                <li><b>Linear Kernel:</b> \\( K(x_i, x_j) = x_i^T x_j \\)</li>
                                <li><b>Polynomial Kernel:</b> \\( K(x_i, x_j) = (x_i^T x_j + c)^d \\)</li>
                                <li><b>RBF Kernel (Radial Basis Function):</b> \\( K(x_i, x_j) = \\exp(-\\gamma ||x_i - x_j||^2) \\)</li>
                            </ul>
        
                            <h3>Ứng dụng trong dự án</h3>
                            <p>Trong dự án dự đoán DFI và Weight của lợn, SVR được sử dụng để xây dựng các mô hình hồi quy nhằm dự đoán các giá trị dựa trên các đặc trưng đầu vào. Các ứng dụng cụ thể bao gồm:</p>
                            <ul>
                                <li><b>Dự đoán DFI:</b> SVR dự đoán lượng thức ăn lợn tiêu thụ dựa trên tuổi và dữ liệu DFI trong 7 ngày trước.</li>
                                <li><b>Dự đoán Weight:</b> Mô hình dự đoán cân nặng dựa trên tuổi, DFI ngày hiện tại và cân nặng ngày hôm qua.</li>
                            </ul>
        
                            <h3>Lợi ích của việc sử dụng SVR</h3>
                            <p>SVR có một số ưu điểm trong dự án:</p>
                            <ul>
                                <li>Khả năng xử lý dữ liệu phi tuyến nhờ sử dụng các hàm kernel.</li>
                                <li>Duy trì độ chính xác cao mà không cần quá nhiều tham số.</li>
                                <li>Kiểm soát tốt độ phức tạp của mô hình nhờ tối ưu hóa sai số trong phạm vi epsilon.</li>
                            </ul>
                            
                            <p>Nhờ vào các đặc tính trên, SVR đã giúp tăng độ chính xác và ổn định trong việc dự đoán các giá trị liên quan đến tăng trưởng của lợn.</p>
                        `
                    },
                    'random-forest-regression': {
                        title: 'Random Forest Regression',
                        description: `
                            <h3>Giới thiệu</h3>
                            <p>Random Forest Regression là một thuật toán học máy thuộc nhóm ensemble learning, sử dụng một tập hợp các cây quyết định để thực hiện dự đoán hồi quy. Mỗi cây quyết định trong rừng dự đoán độc lập, và kết quả cuối cùng được tính bằng trung bình cộng của các dự đoán từ các cây.</p>
        
                            <p>Mục tiêu của Random Forest là tăng cường độ chính xác và khả năng tổng quát hóa của mô hình bằng cách giảm thiểu hiện tượng overfitting xảy ra ở các cây quyết định đơn lẻ.</p>
                            
                            <h3>Các công thức cơ bản</h3>
                            <p>Đối với bài toán hồi quy, đầu ra của mô hình là trung bình cộng dự đoán của tất cả các cây:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( \\hat{y} = \\frac{1}{T} \\sum_{t=1}^T f_t(x) \\)</p>
                            </div>
                            <ul>
                                <li>\\( T \\): Số lượng cây trong rừng.</li>
                                <li>\\( f_t(x) \\): Dự đoán của cây \\( t \\) đối với đầu vào \\( x \\).</li>
                                <li>\\( \\hat{y} \\): Giá trị dự đoán cuối cùng.</li>
                            </ul>
        
                            <p>Mỗi cây quyết định được xây dựng dựa trên tập con dữ liệu (bootstrap sampling), với một tập ngẫu nhiên các đặc trưng được chọn tại mỗi nút phân chia.</p>
        
                            <h3>Ưu điểm</h3>
                            <ul>
                                <li><b>Khả năng xử lý dữ liệu phi tuyến:</b> Random Forest có thể xử lý tốt các quan hệ phi tuyến giữa các biến đầu vào.</li>
                                <li><b>Giảm thiểu overfitting:</b> Sử dụng nhiều cây giúp giảm hiện tượng overfitting so với một cây quyết định đơn lẻ.</li>
                                <li><b>Khả năng xử lý dữ liệu lớn:</b> Thuật toán có thể xử lý dữ liệu với số lượng đặc trưng và mẫu lớn.</li>
                            </ul>
        
                            <h3>Ứng dụng trong dự án</h3>
                            <p>Trong dự án dự đoán DFI và Weight của lợn, Random Forest Regression được áp dụng như sau:</p>
                            <ul>
                                <li><b>Dự đoán DFI:</b> Random Forest được sử dụng để dự đoán lượng thức ăn tiêu thụ (DFI) của lợn dựa trên tuổi và DFI trong 7 ngày trước đó. Các cây quyết định độc lập đưa ra dự đoán, và giá trị trung bình của chúng được sử dụng làm kết quả cuối cùng.</li>
                                <li><b>Dự đoán Weight:</b> Random Forest Regression được áp dụng để dự đoán cân nặng hiện tại của lợn dựa trên tuổi, DFI ngày hiện tại và cân nặng ngày hôm qua.</li>
                            </ul>
        
                            <h3>Cách hoạt động</h3>
                            <p>Quy trình chính của Random Forest Regression bao gồm:</p>
                            <ol>
                                <li><b>Tạo mẫu bootstrap:</b> Lấy mẫu ngẫu nhiên từ tập dữ liệu ban đầu để tạo các tập con dữ liệu.</li>
                                <li><b>Xây dựng cây quyết định:</b> Mỗi cây được huấn luyện trên một tập con dữ liệu bootstrap với một tập hợp đặc trưng ngẫu nhiên tại mỗi nút phân chia.</li>
                                <li><b>Dự đoán:</b> Tính trung bình cộng các dự đoán từ tất cả các cây để đưa ra kết quả cuối cùng.</li>
                            </ol>
                            
                            <h3>Công thức tính năng lượng lỗi (MSE - Mean Squared Error)</h3>
                            <div style="margin-left: 20px;">
                                <p>\\( MSE = \\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2 \\)</p>
                            </div>
                            <ul>
                                <li>\\( n \\): Số lượng mẫu.</li>
                                <li>\\( y_i \\): Giá trị thực tế.</li>
                                <li>\\( \\hat{y}_i \\): Giá trị dự đoán.</li>
                            </ul>
        
                            <h3>Lợi ích trong dự án</h3>
                            <p>Việc sử dụng Random Forest Regression giúp tăng độ chính xác trong dự đoán DFI và cân nặng lợn nhờ:</p>
                            <ul>
                                <li>Khả năng xử lý dữ liệu phi tuyến và phức tạp.</li>
                                <li>Giảm thiểu tác động của nhiễu dữ liệu (noise).</li>
                                <li>Khả năng tổng quát hóa tốt hơn so với các phương pháp hồi quy đơn lẻ.</li>
                            </ul>
                            
                            <p>Nhờ những đặc tính này, Random Forest Regression đã trở thành một công cụ quan trọng trong dự án nhằm tối ưu hóa dự đoán tăng trưởng của lợn.</p>
                        `
                    },
                    'long-short-term-memory': {
                        title: 'Long Short Term Memory (LSTM)',
                        description: `
                            <h3>Giới thiệu</h3>
                            <p>LSTM (Long Short Term Memory) là một loại mạng nơ-ron hồi tiếp (Recurrent Neural Network - RNN) được thiết kế để ghi nhớ các thông tin quan trọng trong thời gian dài, khắc phục vấn đề vanishing gradient thường gặp trong RNN truyền thống. LSTM hoạt động hiệu quả trong việc xử lý chuỗi thời gian, dữ liệu tuần tự, hoặc các bài toán có sự phụ thuộc lâu dài giữa các phần tử dữ liệu.</p>
                            
                            <p>LSTM bao gồm ba cơ chế chính được gọi là các cửa (gates):</p>
                            <ul>
                                <li><b>Cửa quên (Forget Gate):</b> Quyết định thông tin nào từ trạng thái trước cần loại bỏ.</li>
                                <li><b>Cửa cập nhật (Input Gate):</b> Xác định thông tin mới nào sẽ được thêm vào bộ nhớ.</li>
                                <li><b>Cửa đầu ra (Output Gate):</b> Quyết định thông tin nào từ bộ nhớ sẽ được xuất ra làm đầu ra.</li>
                            </ul>
        
                            <h3>Công thức hoạt động của LSTM</h3>
                            <p>Dưới đây là các công thức chính mô tả hoạt động của LSTM tại mỗi bước thời gian:</p>
                            <div style="margin-left: 20px;">
                                <p><b>Cửa quên:</b> \\( f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f) \\)</p>
                                <p><b>Cửa cập nhật:</b> \\( i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i) \\)</p>
                                <p><b>Ứng dụng cập nhật:</b> \\( \tilde{C}_t = \tanh(W_C \cdot [h_{t-1}, x_t] + b_C) \\)</p>
                                <p><b>Cập nhật trạng thái bộ nhớ:</b> \\( C_t = f_t \cdot C_{t-1} + i_t \cdot \tilde{C}_t \\)</p>
                                <p><b>Cửa đầu ra:</b> \\( o_t = \sigma(W_o \cdot [h_{t-1}, x_t] + b_o) \\)</p>
                                <p><b>Trạng thái ẩn:</b> \\( h_t = o_t \cdot \tanh(C_t) \\)</p>
                            </div>
                            <ul>
                                <li>\\( x_t \\): Dữ liệu đầu vào tại thời điểm \\( t \\).</li>
                                <li>\\( h_{t-1} \\): Trạng thái ẩn từ thời điểm trước đó.</li>
                                <li>\\( C_t \\): Trạng thái bộ nhớ tại thời điểm hiện tại.</li>
                                <li>\\( W_f, W_i, W_o, W_C \\): Ma trận trọng số của các cửa tương ứng.</li>
                                <li>\\( b_f, b_i, b_o, b_C \\): Các bias tương ứng.</li>
                            </ul>
        
                            <h3>Ứng dụng trong dự án</h3>
                            <p>Trong dự án dự đoán DFI và cân nặng của lợn:</p>
                            <ul>
                                <li><b>Dự đoán DFI:</b> LSTM được sử dụng để xử lý chuỗi dữ liệu DFI trong 7 ngày trước đó và dự đoán lượng thức ăn tiêu thụ ở ngày tiếp theo.</li>
                                <li><b>Dự đoán cân nặng:</b> Mô hình LSTM dự đoán cân nặng của lợn dựa trên dữ liệu như cân nặng ngày hôm qua và DFI trong quá khứ.</li>
                            </ul>
        
                            <h3>Ưu điểm</h3>
                            <ul>
                                <li><b>Xử lý dữ liệu dài hạn:</b> LSTM có khả năng lưu giữ thông tin qua nhiều bước thời gian, giúp xử lý dữ liệu tuần tự tốt hơn so với RNN thông thường.</li>
                                <li><b>Khắc phục vanishing gradient:</b> Thiết kế đặc biệt giúp LSTM duy trì tín hiệu gradient ổn định trong quá trình huấn luyện.</li>
                                <li><b>Ứng dụng linh hoạt:</b> LSTM được sử dụng phổ biến trong dự đoán chuỗi thời gian, xử lý ngôn ngữ tự nhiên (NLP), và nhận dạng giọng nói.</li>
                            </ul>
        
                            <h3>Lợi ích trong dự án</h3>
                            <p>LSTM cải thiện độ chính xác của dự đoán nhờ khả năng học được các quan hệ phụ thuộc dài hạn và mẫu chuỗi thời gian trong dữ liệu. Với LSTM, các dự đoán liên quan đến tăng trưởng và tiêu thụ thức ăn của lợn trở nên đáng tin cậy và hiệu quả hơn.</p>
                        `
                    },
                    'mlp-regressor': {
                        title: 'MLP Regressor',
                        description: `
                            <h3>Giới thiệu</h3>
                            <p>MLP Regressor (Multi-Layer Perceptron Regressor) là một loại mạng nơ-ron nhân tạo (Artificial Neural Network - ANN) được thiết kế để giải quyết các bài toán hồi quy. Nó gồm nhiều lớp nơ-ron được tổ chức theo cấu trúc feedforward, nơi dữ liệu đầu vào được truyền qua một hoặc nhiều lớp ẩn trước khi tạo ra đầu ra.</p>
                            <p>MLP Regressor sử dụng hàm kích hoạt phi tuyến (như ReLU, Tanh) ở các lớp ẩn để học các quan hệ phi tuyến giữa các đặc trưng và biến mục tiêu, giúp nó trở nên hiệu quả trong các bài toán hồi quy phức tạp.</p>
        
                            <h3>Cấu trúc cơ bản</h3>
                            <p>Mạng MLP bao gồm:</p>
                            <ul>
                                <li><b>Lớp đầu vào:</b> Nhận dữ liệu đầu vào, số lượng nơ-ron tương ứng với số đặc trưng trong tập dữ liệu.</li>
                                <li><b>Các lớp ẩn:</b> Gồm nhiều nơ-ron với hàm kích hoạt phi tuyến, nơi dữ liệu được xử lý để trích xuất các đặc trưng ẩn.</li>
                                <li><b>Lớp đầu ra:</b> Tạo ra giá trị dự đoán, sử dụng hàm kích hoạt tuyến tính cho bài toán hồi quy.</li>
                            </ul>
        
                            <h3>Công thức hoạt động</h3>
                            <p>MLP Regressor hoạt động dựa trên các bước sau:</p>
        
                            <h4>1. Truyền dữ liệu đầu vào qua các lớp</h4>
                            <p>Mỗi lớp ẩn thực hiện phép tính:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( z^{(l)} = W^{(l)} \cdot a^{(l-1)} + b^{(l)} \\)</p>
                                <p>\\( a^{(l)} = \phi(z^{(l)}) \\)</p>
                            </div>
                            <ul>
                                <li>\\( l \\): Chỉ số của lớp hiện tại.</li>
                                <li>\\( W^{(l)} \\): Ma trận trọng số của lớp \\( l \\).</li>
                                <li>\\( a^{(l-1)} \\): Đầu ra (hoặc kích hoạt) từ lớp trước đó.</li>
                                <li>\\( b^{(l)} \\): Bias của lớp \\( l \\).</li>
                                <li>\\( \phi \\): Hàm kích hoạt (ví dụ: ReLU, Tanh).</li>
                            </ul>
        
                            <h4>2. Lớp đầu ra</h4>
                            <p>Đối với bài toán hồi quy, lớp đầu ra thực hiện phép tính:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( \hat{y} = W^{(out)} \cdot a^{(L)} + b^{(out)} \\)</p>
                            </div>
                            <ul>
                                <li>\\( W^{(out)} \\): Trọng số của lớp đầu ra.</li>
                                <li>\\( a^{(L)} \\): Đầu ra từ lớp ẩn cuối cùng.</li>
                                <li>\\( \hat{y} \\): Giá trị dự đoán.</li>
                            </ul>
        
                            <h4>3. Hàm mất mát</h4>
                            <p>Hàm mất mát phổ biến được sử dụng cho hồi quy là Mean Squared Error (MSE):</p>
                            <div style="margin-left: 20px;">
                                <p>\\( MSE = \\frac{1}{n} \sum_{i=1}^n (y_i - \hat{y}_i)^2 \\)</p>
                            </div>
                            <ul>
                                <li>\\( n \\): Số lượng mẫu.</li>
                                <li>\\( y_i \\): Giá trị thực tế của mẫu thứ \\( i \\).</li>
                                <li>\\( \hat{y}_i \\): Giá trị dự đoán của mẫu thứ \\( i \\).</li>
                            </ul>
        
                            <h4>4. Cập nhật trọng số</h4>
                            <p>Trọng số \\( W \\) và bias \\( b \\) được cập nhật thông qua thuật toán lan truyền ngược (Backpropagation) và tối ưu hóa bằng phương pháp như Gradient Descent:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( W \gets W - \eta \cdot \\frac{\partial \text{Loss}}{\partial W} \\)</p>
                                <p>\\( b \gets b - \eta \cdot \\frac{\partial \text{Loss}}{\partial b} \\)</p>
                            </div>
                            <ul>
                                <li>\\( \eta \\): Tốc độ học (learning rate).</li>
                                <li>\\( \text{Loss} \\): Giá trị hàm mất mát (ví dụ: MSE).</li>
                            </ul>
        
                            <h3>Ưu điểm</h3>
                            <ul>
                                <li><b>Khả năng học phi tuyến:</b> Nhờ các hàm kích hoạt phi tuyến, MLP có thể học được các quan hệ phức tạp trong dữ liệu.</li>
                                <li><b>Tính linh hoạt:</b> Có thể điều chỉnh số lớp ẩn và số lượng nơ-ron để phù hợp với bài toán cụ thể.</li>
                                <li><b>Ứng dụng rộng rãi:</b> Thích hợp cho nhiều loại bài toán hồi quy khác nhau.</li>
                            </ul>
        
                            <h3>Ứng dụng trong dự án</h3>
                            <p>MLP Regressor được sử dụng trong dự án để dự đoán các chỉ số tăng trưởng của lợn:</p>
                            <ul>
                                <li><b>Dự đoán DFI:</b> Dựa vào tuổi và các giá trị DFI trong những ngày trước để dự đoán lượng thức ăn tiêu thụ trong tương lai.</li>
                                <li><b>Dự đoán cân nặng:</b> Sử dụng các yếu tố như cân nặng hiện tại, tuổi, và DFI để dự đoán cân nặng tiếp theo của lợn.</li>
                            </ul>
        
                            <h3>Lợi ích trong dự án</h3>
                            <p>MLP Regressor mang lại độ chính xác cao trong dự đoán nhờ khả năng học các quan hệ phi tuyến giữa các yếu tố như tuổi, cân nặng, và DFI. Mô hình này góp phần tối ưu hóa việc quản lý và theo dõi tăng trưởng của đàn lợn.</p>
                        `
                    }
                };
                break;
            case "zh":
                algorithmDetails = {
                    "linear-regression": {
                        "title": "线性回归",
                        "description": `
                            <p>
                                线性回归是一种统计方法，用于建模因变量（或目标变量）与一个或多个自变量（输入变量）之间的关系。这是机器学习（Machine Learning）和数据分析中的基本和常见算法。
                            </p>
                            <h3>一般线性回归方程</h3>
                            <p>一般线性回归方程为：</p>
                            <p style="margin-left: 20px;">
                                \\( Y = \\beta_0 + \\beta_1X_1 + \\beta_2X_2 + \\dots + \\beta_nX_n + \\epsilon \\)
                            </p>
                            <ul>
                                <li><b>\\( Y \\):</b> 依变量（需要预测的值）。</li>
                                <li><b>\\( X_1, X_2, \\dots, X_n \\):</b> 自变量（输入变量）。</li>
                                <li><b>\\( \\beta_0 \\):</b> 截距。</li>
                                <li><b>\\( \\beta_1, \\beta_2, \\dots, \\beta_n \\):</b> 回归系数（斜率）。</li>
                                <li><b>\\( \\epsilon \\):</b> 误差（反映实际值与预测值之间的差异）。</li>
                            </ul>
        
                            <h3>线性回归的类型</h3>
                            <ol>
                                <li><b>简单线性回归:</b> 只有一个自变量 \\( X \\) 和一个依变量 \\( Y \\)，方程为：
                                    <div style="margin-left: 20px;">
                                        \\( Y = \\beta_0 + \\beta_1X + \\epsilon \\)
                                    </div>
                                </li>
                                <li><b>多元线性回归:</b> 多个自变量，方程为：
                                    <div style="margin-left: 20px;">
                                        \\( Y = \\beta_0 + \\beta_1X_1 + \\beta_2X_2 + \\dots + \\beta_nX_n + \\epsilon \\)
                                    </div>
                                </li>
                            </ol>
        
                            <h3>参数估计</h3>
                            <p>
                                线性回归使用最小二乘法（Ordinary Least Squares - OLS）来估计系数 \\( \\beta \\)。 
                                目标是最小化实际值（\\( Y \\)）与预测值（\\( \\hat{Y} \\)）之间的平方误差的总和：
                            </p>
                            <p style="margin-left: 20px;">
                                \\( \\text{Minimize } \\sum_{i=1}^n (Y_i - \\hat{Y}_i)^2 \\)
                            </p>
                            <ul>
                                <li><b>\\( Y_i \\):</b> 依变量的实际值。</li>
                                <li><b>\\( \\hat{Y}_i \\):</b> 模型的预测值。</li>
                            </ul>
        
                            <h3>模型评估</h3>
                            <p>为了评估线性回归模型的效果，通常使用的指标包括：</p>
                            <ul>
                                <li><b>确定系数 \\( R^2 \\):</b> 用于衡量模型对依变量的解释程度，值在 \\([0, 1]\\) 范围内。</li>
                                <li><b>均方误差（MSE）:</b> 平均平方误差，反映模型的偏差程度。</li>
                                <li><b>均方根误差（RMSE）:</b> MSE的平方根，更容易理解，因为它与 \\( Y \\) 具有相同的单位。</li>
                                <li><b>平均绝对误差（MAE）:</b> 误差的平均绝对值，衡量与实际值的偏差程度。</li>
                            </ul>
        
                            <h3>基本假设</h3>
                            <ul>
                                <li><b>线性性:</b> 依变量和自变量之间的关系是线性的。</li>
                                <li><b>独立性:</b> 观察值必须相互独立。</li>
                                <li><b>误差的正态分布:</b> 误差必须具有正态分布。</li>
                                <li><b>同方差性:</b> 误差的方差不随自变量的值而变化。</li>
                                <li><b>无多重共线性:</b> 自变量之间没有强相关性。</li>
                            </ul>
        
                            <h3>在项目中的应用</h3>
                            <h4>1. 预测每日食物摄入量（DFI）</h4>
                            <p>
                                线性回归可以基于因素（如）预测每日食物摄入量（DFI）：
                                <ul>
                                    <li>猪的年龄（age）。</li>
                                    <li>前7天的DFI。</li>
                                </ul>
                            </p>
        
                            <h4>2. 预测体重</h4>
                            <p>
                                基于回归，我们可以估计猪的体重，基于：
                                <ul>
                                    <li>每日食物摄入量（dfi）。</li>
                                    <li>猪的年龄（age）。</li>
                                    <li>前一天的体重（previous weight）。</li>
                                </ul>
                            </p>
        
                            <h3>线性回归的优势</h3>
                            <ul>
                                <li><b>理解关系:</b> 确定影响DFI和体重的关键因素。</li>
                                <li><b>优化:</b> 调整饮食，以减少成本并最大化增长。</li>
                                <li><b>简单:</b> 易于部署，并且与线性关系有效。</li>
                            </ul>
                        `
                    },
                    'gradient-boosting': {
                        title: '梯度提升',
                        description: `
                            <h3>介绍</h3>
                            <p>Gradient Boosting是一种强大的机器学习方法，使用集成学习技术来解决回归和分类问题。该方法通过顺序组合小模型（弱学习器），通常是决策树，通过梯度下降来最小化误差。</p>
                            
                            <h3>主要组成部分</h3>
                            <h4>1. 损失函数</h4>
                            <p>Gradient Boosting优化一个损失函数来减少预测误差。一些常见的损失函数包括：</p>
                            <ul>
                                <li>回归:
                                    <div style="margin-left: 20px;">
                                        \\[ L(y, F(x)) = \\frac{1}{2} (y - F(x))^2 \\]
                                    </div>
                                </li>
                                <li>二元分类（Log-Loss）:
                                    <div style="margin-left: 20px;">
                                        \\[ L(y, F(x)) = - \\big[ y \\log(p(x)) + (1 - y) \\log(1 - p(x)) \\big] \\]
                                        <p>其中 \\( p(x) = \\frac{1}{1 + e^{-F(x)}} \\) 是概率。</p>
                                    </div>
                                </li>
                            </ul>
                            
                            <h4>2. 弱学习器</h4>
                            <p>弱学习器通常是浅层决策树，用于预测上一步的残差。</p>
                            
                            <h4>3. 梯度下降</h4>
                            <p>Gradient Boosting使用梯度下降来调整模型，以减少损失函数。</p>
                            <div style="margin-left: 20px;">
                                \\[ g_i = \\frac{\\partial L(y_i, F(x_i))}{\\partial F(x_i)} \\]
                            </div>
                            
                            <h3>Gradient Boosting过程</h3>
                            
                            <li><strong>初始化:</strong> 构建初始模型:
                                <div style="margin-left: 20px;">
                                    \\[ F_0(x) = \\arg\\min_c \\sum L(y_i, c) \\]
                                    <p>其中Mean Squared Error (MSE): \\( F_0(x) = \\text{mean}(y) \\).</p>
                                </div>
                            </li>
                            <li><strong>每一步重复:</strong>
                                <ol>
                                    <li>计算梯度（残差）:
                                        <div style="margin-left: 20px;">
                                            \\[ g_i^{(m)} = \\frac{\\partial L(y_i, F(x_i))}{\\partial F(x_i)} \\]
                                        </div>
                                    </li>
                                    <li>训练一个弱学习器:
                                        <div style="margin-left: 20px;">
                                            \\[ h_m(x) \\approx g_i^{(m)} \\]
                                        </div>
                                    </li>
                                    <li>更新模型:
                                        <div style="margin-left: 20px;">
                                            \\[ F_m(x) = F_{m-1}(x) + \\alpha \\cdot h_m(x) \\]
                                        </div>
                                    </li>
                                </ol>
                            </li>
                            <li><strong>重复直到达到最大步数或收敛误差。</strong></li>
                            
                            
                            <h3>总体公式</h3>
                            <div style="margin-left: 20px;">
                                \\[ F_M(x) = F_0(x) + \\sum_{m=1}^M \\alpha \\cdot h_m(x) \\]
                            </div>
                            
                            <h3>需要调整的参数</h3>
                            <ul>
                                <li>学习率（\\( \\alpha \\)）: 调整每个弱学习器的贡献。</li>
                                <li>树的数量（M）: 决定模型的迭代步数。</li>
                                <li>树的深度: 每个弱学习器的复杂度。</li>
                            </ul>
                            
                            <h3>实践应用于预测DFI和猪的体重</h3>
                            <p>梯度提升算法在预测DFI（猪每天吃的食量）和体重等重要因素方面得到了应用，从而优化饲养和饲料管理过程。</p>
        
                            <p>在这个模型中，梯度提升算法根据猪的年龄、7天前的DFI和昨天的体重等输入因素来预测DFI和体重。模型的构建过程如下所示：</p>
        
                            <ul>
                                <li><b>模型结构:</b> 梯度提升模型按照顺序结合简单的决策树。每棵树都从前一个模型的错误中学习，从而提高整体模型的准确性。每一步都根据前一个模型的剩余错误来更新模型。</li>
                                <div style="margin-left: 20px;">
                                    <p>假设初始模型可以用训练数据的平均DFI或体重值初始化：</p>
                                    <p>\\( F_0(x) = \\text{mean}(y) \\)</p>
                                </div>
        
                                <li><b>预测DFI和体重:</b>
                                    <ul>
                                        <li>对于DFI，模型使用猪的年龄和7天前的DFI来预测当天的食量。描述DFI预测过程的公式如下：
                                            <div style="margin-left: 20px;">
                                                <p>\\( \\text{DFI} = f(\text{Age}, \\text{DFI}_{-7}) \\)</p>
                                            </div>
                                        </li>
                                        <li>对于体重，模型使用猪的年龄、当天的DFI和昨天的体重来预测明天的体重。描述体重预测过程的公式如下：
                                            <div style="margin-left: 20px;">
                                                <p>\\( \\text{Weight} = f(\text{Age}, \\text{DFI}, \\text{Weight}_{-1}) \\)</p>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
        
                                <li><b>实践应用:</b> 使用梯度提升算法预测DFI和体重有助于优化饲料供应，确保猪的健康成长而不浪费。同时，帮助农民更好地管理饲养，提高猪的生长速度和降低成本。这个模型也可以扩展到预测其他因素，如健康状况、繁殖率或总体饲养效率，从而提高生产效率和产品质量。</li>
                            </ul>
        
                            <div style="margin-left: 20px;">
                                <p><b>模型更新过程:</b></p>
                                <p>梯度提升算法使用以下公式来更新每一步的模型：</p>
                                <p>\\[ F_k(x) = F_{k-1}(x) + \\alpha \\cdot h_k(x) \\]</p>
                                <p>其中：</p>
                                <ul>
                                    <li>\\( F_k(x) \\): 第 \\( k \\) 步的模型。</li>
                                    <li>\\( F_{k-1}(x) \\): 第 \\( k-1 \\) 步的模型。</li>
                                    <li>\\( \\alpha \\): 学习率（learning rate），调整每步模型的变化程度。</li>
                                    <li>\\( h_k(x) \\): 第 \\( k \\) 步的决策树。</li>
                                </ul>
                                <p><b>每步的梯度:</b></p>
                                <p>\\[ g_i = \\nabla L(y_i, F_{k-1}(x_i)) = y_i - F_{k-1}(x_i) \\]</p>
                                <p>其中：</p>
                                <ul>
                                    <li>\\( g_i \\): 第 \\( i \\) 个观察的残差（residual）在第 \\( k \\) 步。</li>
                                    <li>\\( L \\): 损失函数（loss function）。</li>
                                    <li>\\( y_i \\): DFI或体重的实际值。</li>
                                    <li>\\( F_{k-1}(x_i) \\): 第 \\( k-1 \\) 步模型的预测值。</li>
                                </ul>
                            </div>
                        `
                    },
                    'knn-regression': {
                        title: 'K最近邻回归（KNN回归）',
                        description: `
                            <h3>简介</h3>
                            <p>KNN回归是一种无参数机器学习方法，基于使用最近邻点的信息来预测新点的值。该模型不像其他方法那样构建线性回归函数，而是基于现有数据来进行预测。</p>
                            
                            <p>在KNN回归中，当预测新数据点的值时，模型会搜索训练集中的最近邻点，并通过这些点的值的平均值来计算预测值。最近邻点的数量被称为K，这是模型的主要参数。</p>
        
                            <p>对新数据点 \( x_0 \) 的预测计算公式是：</p>
                            <div style="margin-left: 20px;">
                                <p>\\( \\hat{y} = \\frac{1}{K} \\sum_{i=1}^K y_i \\)</p>
                                <p>其中：</p>
                                <ul>
                                    <li>\\( \\hat{y} \\): 对新数据点的预测。</li>
                                    <li>\\( K \\): 最近邻点的数量。</li>
                                    <li>\\( y_i \\): 最近邻点的实际值。</li>
                                </ul>
                            </div>
                            
                            <p>KNN回归通常用于预测价格、预测销量、预测访问量等问题，当变量之间的关系不明确或不能用简单的线性回归方法建模时。</p>
                            
                            <h3>KNN回归的步骤：</h3>
                            <ul>
                                <li><b>选择K值：</b> 选择用于模型的最近邻点数量（K）。K值的选择会影响模型的准确性。</li>
                                <li><b>计算距离：</b> 计算新数据点与训练集所有数据点之间的距离。通常使用欧几里德距离：</li>
                                <div style="margin-left: 20px;">
                                    <p>\\( d(x, x') = \\sqrt{\\sum_{i=1}^n (x_i - x'_i)^2} \\)</p>
                                    <p>其中：</p>
                                    <ul>
                                        <li>\\( d(x, x') \\): 点 \\( x \\) 和点 \\( x' \\) 在特征空间中的距离。</li>
                                        <li>\\( x_i, x'_i \\): 点 \\( x \\) 和点 \\( x' \\) 在第 \\( i \\) 个特征位置的特征值。</li>
                                    </ul>
                                </div>
                                <li><b>选择K个最近邻点：</b> 计算距离后，选择K个最近邻点，并使用它们的值来预测新数据点的值。</li>
                                <li><b>计算预测值：</b> 新数据点的预测值是K个最近邻点的值的平均值：</li>
                                <div style="margin-left: 20px;">
                                    <p>\\( \\hat{y} = \\frac{1}{K} \\sum_{i=1}^K y_i \\)</p>
                                </div>
                            </ul>
        
                            <h3>在项目中的应用</h3>
                            <p>在本项目中，KNN回归用于预测猪的日粮量（DFI）和体重，基于特征如猪的年龄、7天前的DFI和昨天的体重。</p>
                            
                            <p>本项目中的DFI和体重预测公式如下：</p>
        
                            <ul>
                                <li><b>预测DFI：</b> 模型使用猪的年龄和7天前的DFI来预测今天的日粮量。预测DFI的公式可以写为：</li>
                                <div style="margin-left: 20px;">
                                    <p>\\( DFI = \\frac{1}{K} \\sum_{i=1}^K DFI_i \\)</p>
                                </div>
                                <p>其中， \\( DFI_i \\) 是最近邻点的实际DFI值。</p>
        
                                <li><b>预测体重：</b> 为了预测猪的体重，模型使用猪的年龄、今天的DFI和昨天的体重。预测体重的公式可以写为：</li>
                                <div style="margin-left: 20px;">
                                    <p>\\( Weight = \\frac{1}{K} \\sum_{i=1}^K Weight_i \\)</p>
                                </div>
                                <p>其中， \\( Weight_i \\) 是最近邻点的实际体重值。</p>
                            </ul>
                            
                            <p>在DFI和体重预测中使用KNN回归有助于优化饲料供应，确保猪的健康成长而不浪费。同时，帮助农民更好地管理饲养，提高猪的生长速度和降低成本。这个模型也可以扩展到预测其他因素，如健康状况、繁殖率或总体饲养效率，从而提高生产效率和产品质量。</p>
                        `
                    },
                    'xgboost-regressor': {
                        title: 'XGBoost回归器',
                        description: `
                            <h3>简介</h3>
                            <p>XGBoost（极端梯度提升）是一种基于梯度提升框架的先进机器学习算法。由于其性能、可扩展性和处理复杂数据关系的能力，它被广泛用于回归和分类问题。</p>
                            
                            <p>XGBoost的关键组成部分和特点包括：</p>
                            <ul>
                                <li><b>提升框架：</b> 构建一系列弱学习器（通常是决策树），每个学习器在前一个学习器的错误上进行改进。</li>
                                <li><b>正则化：</b> 包括L1和L2正则化，以防止过拟合并提高泛化能力。</li>
                                <li><b>稀疏性意识：</b> 高效处理缺失或稀疏数据。</li>
                                <li><b>并行化：</b> 利用并行计算加速模型训练。</li>
                                <li><b>自定义损失函数：</b> 允许灵活定义针对特定问题的目标函数。</li>
                            </ul>

                            <h3>数学基础</h3>
                            <p>XGBoost最小化一个由损失函数和正则化项组成的目标函数：</p>
                            <div style="margin-left: 20px;">
                                <p>\\( Obj = \\sum_{i=1}^n L(y_i, \\hat{y}_i) + \\sum_{k=1}^K \\Omega(f_k) \\)</p>
                            </div>
                            <ul>
                                <li><b>\\(L(y_i, \\hat{y}_i)\\):</b> 测量真实值 \\(y_i\\) 和预测值 \\(\\hat{y}_i\\) 之间误差的损失函数。</li>
                                <li><b>\\(\\Omega(f_k)\\):</b> 控制每棵树 \\(f_k\\) 复杂性的正则化项。</li>
                            </ul>
                            <p>树是迭代构建的，通过对损失函数的梯度下降技术优化目标函数。</p>

                            <h3>训练过程</h3>
                            <p>XGBoost的训练过程包括以下步骤：</p>
                            <ul>
                                <li><b>初始化：</b> 从初始预测开始（例如，目标变量的均值）。</li>
                                <li><b>梯度和Hessian计算：</b> 计算损失函数的梯度和二阶导数（Hessian）以进行优化。</li>
                                <li><b>树构建：</b> 通过选择最小化目标函数的分裂来构建决策树。</li>
                                <li><b>正则化：</b> 修剪树或限制树的深度以防止过拟合。</li>
                                <li><b>迭代：</b> 重复该过程，添加新树，直到模型收敛或满足停止标准（例如，特定数量的树）。</li>
                            </ul>

                            <h3>项目中的应用</h3>
                            <p>在本项目中，XGBoost回归器用于预测猪的日粮摄入量（DFI）和体重。它处理非线性关系和复杂交互的能力使其成为此任务的合适选择。</p>
                            <p>输入特征包括：</p>
                            <ul>
                                <li>猪的年龄。</li>
                                <li>历史DFI数据（例如，7天前）。</li>
                                <li>前一天的体重。</li>
                            </ul>
                            
                            <p>具体应用包括：</p>
                            <ul>
                                <li><b>预测DFI：</b> XGBoost建模猪的年龄、历史DFI和其他因素之间的关系，以预测每日食物摄入量。</li>
                                <li><b>预测体重：</b> 使用年龄、当前DFI和历史体重等特征来估计猪的体重。</li>
                            </ul>

                            <h3>使用XGBoost的优势</h3>
                            <ul>
                                <li><b>效率：</b> 由于并行处理和优化算法，训练速度快。</li>
                                <li><b>准确性：</b> 在捕捉数据中的复杂模式和交互方面表现强劲。</li>
                                <li><b>鲁棒性：</b> 内置处理缺失值和正则化，减少过拟合。</li>
                                <li><b>可定制性：</b> 灵活的超参数和自定义损失函数允许针对特定任务进行调优。</li>
                            </ul>

                            <h3>项目结构</h3>
                            <ol>
                                <li><b>输入：</b> 年龄、历史DFI、体重历史和其他相关特征。</li>
                                <li><b>处理：</b> 迭代训练回归树以最小化预测误差。</li>
                                <li><b>输出：</b> 预测猪的DFI和体重。</li>
                            </ol>

                            <p>使用XGBoost回归器提高了预测的准确性和鲁棒性，使其成为管理猪的生长和饲料效率的理想选择。</p>
                        `
                    },
                    'support-vector-regression': {
                        title: '支持向量回归（SVR）',
                        description: `
                            <h3>简介</h3>
                            <p>支持向量回归（SVR）是支持向量机（SVM）家族中的一种算法，旨在解决回归问题。SVR尝试通过优化边界（margins）来建立线性或非线性回归模型。</p>
                            
                            <p>SVR的主要目标是找到一个函数 \\( f(x) \\)，使得数据点的误差落在一个可接受的范围内，称为epsilon（\\( \\varepsilon \\)）。SVR集中于优化，以减少模型的复杂性，并保持精度和泛化能力的平衡。</p>
        
                            <h3>基本公式</h3>
                            <p>SVR中的回归函数形式为：</p>
                            <div style="margin-left: 20px;">
                                <p>\\( f(x) = w^T x + b \\)</p>
                            </div>
                            <p>其中：</p>
                            <ul>
                                <li>\\( w \\): 权重（vector weights）.</li>
                                <li>\\( x \\): 输入数据.</li>
                                <li>\\( b \\): 偏置（bias）.</li>
                            </ul>
                            
                            <p>SVR优化以下问题：</p>
                            <div style="margin-left: 20px;">
                                <p>最小化: \\( \\frac{1}{2} ||w||^2 \\)</p>
                                <p>约束条件: \\( |y_i - (w^T x_i + b)| \\leq \\varepsilon + \\xi_i + \\xi_i^* \\)</p>
                            </div>
                            <ul>
                                <li>\\( y_i \\): 实际值.</li>
                                <li>\\( \\varepsilon \\): 可接受的误差.</li>
                                <li>\\( \\xi_i, \\xi_i^* \\): 超出 \\( \\varepsilon \\) 的误差（松弛变量）.</li>
                            </ul>
        
                            <h3>核函数</h3>
                            <p>SVR可以应用核函数来解决非线性问题，帮助将数据映射到更高维的特征空间。一些常见的核函数包括：</p>
                            <ul>
                                <li><b>线性核:</b> \\( K(x_i, x_j) = x_i^T x_j \\)</li>
                                <li><b>多项式核:</b> \\( K(x_i, x_j) = (x_i^T x_j + c)^d \\)</li>
                                <li><b>RBF核（径向基函数）:</b> \\( K(x_i, x_j) = \\exp(-\\gamma ||x_i - x_j||^2) \\)</li>
                            </ul>
        
                            <h3>项目应用</h3>
                            <p>在预测猪的日粮量（DFI）和体重的项目中，SVR被用于建立回归模型，以预测基于输入特征的值。具体应用包括：</p>
                            <ul>
                                <li><b>预测DFI:</b> SVR预测猪的日粮量，基于猪的年龄和7天前的DFI数据.</li>
                                <li><b>预测体重:</b> 模型预测猪的体重，基于猪的年龄、当前的DFI和昨天的体重.</li>
                            </ul>
        
                            <h3>使用SVR的优点</h3>
                            <p>SVR在项目中有以下优点：</p>
                            <ul>
                                <li>能够处理非线性数据，通过使用核函数.</li>
                                <li>保持高精度，不需要过多的参数.</li>
                                <li>通过在epsilon范围内优化误差，控制模型的复杂性.</li>
                            </ul>
                            
                            <p>由于这些特点，SVR提高了预测猪的日粮量和体重的准确性和稳定性.</p>
                        `
                    },
                    'random-forest-regression': {
                        title: '随机森林回归',
                        description: `
                            <h3>简介</h3>
                            <p>随机森林回归是一种机器学习算法，属于集成学习的范畴，使用多个决策树来进行回归预测。每个决策树独立预测，最后的结果是所有预测的平均值。</p>
        
                            <p>随机森林的目标是通过减少单个决策树的过拟合现象，提高模型的准确性和泛化能力。</p>
                            
                            <h3>基本公式</h3>
                            <p>对于回归问题，模型的输出是所有树的预测平均值：</p>
                            <div style="margin-left: 20px;">
                                <p>\\( \\hat{y} = \\frac{1}{T} \\sum_{t=1}^T f_t(x) \\)</p>
                            </div>
                            <ul>
                                <li>\\( T \\): 森林中的树数量。</li>
                                <li>\\( f_t(x) \\): 树 \\( t \\) 对于输入 \\( x \\) 的预测。</li>
                                <li>\\( \\hat{y} \\): 最终预测值。</li>
                            </ul>
        
                            <p>每个决策树都是基于数据集的子集（自助采样）构建的，每个分割节点选择一个随机的特征子集。</p>
        
                            <h3>优点</h3>
                            <ul>
                                <li><b>处理非线性数据能力:</b> 随机森林能够处理输入变量之间的非线性关系。</li>
                                <li><b>减少过拟合:</b> 使用多个树可以减少单个决策树的过拟合现象。</li>
                                <li><b>处理大数据能力:</b> 算法可以处理具有大量特征和样本的数据。</li>
                            </ul>
        
                            <h3>项目应用</h3>
                            <p>在预测猪的日粮量（DFI）和体重的项目中，随机森林回归被用于以下应用：</p>
                            <ul>
                                <li><b>预测DFI:</b> 随机森林用于预测猪的日粮量，基于猪的年龄和7天前的DFI数据。独立的决策树进行预测，平均值作为最终结果。</li>
                                <li><b>预测体重:</b> 模型预测猪的体重，基于猪的年龄、当前的DFI和昨天的体重。</li>
                            </ul>
        
                            <h3>操作</h3>
                            <p>随机森林回归的主要过程包括：</p>
                            <ol>
                                <li><b>自助采样:</b> 从原始数据集随机采样，创建数据子集。</li>
                                <li><b>构建决策树:</b> 每个树在一个自助采样数据子集上训练，每个分割节点随机选择特征子集。</li>
                                <li><b>预测:</b> 计算所有树的预测平均值，作为最终结果。</li>
                            </ol>
                            
                            <h3>均方误差（MSE）公式</h3>
                            <div style="margin-left: 20px;">
                                <p>\\( MSE = \\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2 \\)</p>
                            </div>
                            <ul>
                                <li>\\( n \\): 样本数量。</li>
                                <li>\\( y_i \\): 实际值。</li>
                                <li>\\( \\hat{y}_i \\): 预测值。</li>
                            </ul>
        
                            <h3>项目中的益处</h3>
                            <p>使用随机森林回归提高了猪的日粮量和体重预测的准确性，通过：</p>
                            <ul>
                                <li>处理非线性和复杂数据的能力。</li>
                                <li>减少噪声数据的影响。</li>
                                <li>与单个回归方法相比，泛化能力更强。</li>
                            </ul>
                            
                            <p>由于这些特点，随机森林回归在项目中成为提高猪的生长预测的重要工具。</p>
                        `
                    },
                    'long-short-term-memory': {
                        title: '长短期记忆（LSTM）',
                        description: `
                            <h3>简介</h3>
                            <p>LSTM（长短期记忆）是一种特殊的循环神经网络（Recurrent Neural Network - RNN），旨在解决传统RNN中常见的梯度消失问题，能够长时间记忆重要信息。LSTM在处理时间序列数据、顺序数据或数据之间存在长期依赖关系的问题上非常有效。</p>
                            
                            <p>LSTM主要由三种机制组成，称为"门"：</p>
                            <ul>
                                <li><b>遗忘门（Forget Gate）：</b> 决定从前一个状态中需要丢弃哪些信息。</li>
                                <li><b>输入门（Input Gate）：</b> 确定哪些新的信息将被添加到记忆中。</li>
                                <li><b>输出门（Output Gate）：</b> 决定从记忆中输出哪些信息作为最终结果。</li>
                            </ul>
        
                            <h3>LSTM的工作公式</h3>
                            <p>以下是LSTM在每个时间步的主要工作公式：</p>
                            <div style="margin-left: 20px;">
                                <p><b>遗忘门：</b> \\( f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f) \\)</p>
                                <p><b>输入门：</b> \\( i_t = \\sigma(W_i \\cdot [h_{t-1}, x_t] + b_i) \\)</p>
                                <p><b>记忆更新：</b> \\( \\tilde{C}_t = \\tanh(W_C \\cdot [h_{t-1}, x_t] + b_C) \\)</p>
                                <p><b>记忆状态更新：</b> \\( C_t = f_t \\cdot C_{t-1} + i_t \\cdot \\tilde{C}_t \\)</p>
                                <p><b>输出门：</b> \\( o_t = \\sigma(W_o \\cdot [h_{t-1}, x_t] + b_o) \\)</p>
                                <p><b>隐藏状态：</b> \\( h_t = o_t \\cdot \\tanh(C_t) \\)</p>
                            </div>
                            <ul>
                                <li>\\( x_t \\): 时间步 \\( t \\) 的输入数据。</li>
                                <li>\\( h_{t-1} \\): 前一个时间步的隐藏状态。</li>
                                <li>\\( C_t \\): 当前时间步的记忆状态。</li>
                                <li>\\( W_f, W_i, W_o, W_C \\): 各个门的权重矩阵。</li>
                                <li>\\( b_f, b_i, b_o, b_C \\): 各个门的偏移项。</li>
                            </ul>
        
                            <h3>项目应用</h3>
                            <p>在预测猪的日粮量（DFI）和体重的项目中，LSTM回归被用于以下应用：</p>
                            <ul>
                                <li><b>预测DFI：</b> LSTM用于预测猪的日粮量，基于猪的年龄和7天前的DFI数据。独立的决策树进行预测，平均值作为最终结果。</li>
                                <li><b>预测体重：</b> 模型预测猪的体重，基于猪的年龄、当前的DFI和昨天的体重。</li>
                            </ul>
        
                            <h3>优点</h3>
                            <ul>
                                <li><b>处理长期数据能力：</b> LSTM能够长时间记忆信息，处理顺序数据的能力比传统RNN更好。</li>
                                <li><b>解决梯度消失问题：</b> LSTM的特殊设计帮助它在训练过程中保持稳定的梯度信号。</li>
                                <li><b>广泛应用：</b> LSTM广泛应用于时间序列预测、自然语言处理（NLP）和语音识别等领域。</li>
                            </ul>
        
                            <h3>项目中的益处</h3>
                            <p>LSTM通过学习数据中的长期依赖关系和时间序列模式，提高了猪的日粮量和体重预测的准确性，变得更加可靠和有效。</p>
                        `
                    },
                    'mlp-regressor': {
                        title: 'MLP回归器',
                        description: `
                            <h3>简介</h3>
                            <p>MLP回归器（Multi-Layer Perceptron Regressor）是一种人工神经网络（Artificial Neural Network - ANN），旨在解决回归问题。它由多层神经元组成，按照前馈结构组织，数据输入通过一个或多个隐藏层传递，最后生成输出。</p>
                            <p>MLP回归器在隐藏层使用非线性激活函数（如ReLU、Tanh），学习输入特征和目标变量之间的非线性关系，使其在复杂回归问题上变得有效。</p>
        
                            <h3>基本结构</h3>
                            <p>MLP网络包括:</p>
                            <ul>
                                <li><b>输入层：</b> 接收输入数据，神经元数量与数据集特征数量相匹配。</li>
                                <li><b>隐藏层：</b> 包含多个神经元，使用非线性激活函数处理数据，提取隐藏特征。</li>
                                <li><b>输出层：</b> 生成预测值，使用线性激活函数进行回归任务。</li>
                            </ul>
        
                            <h3>工作公式</h3>
                            <p>MLP回归器的工作基于以下步骤:</p>
        
                            <h4>1. 数据通过各层传递</h4>
                            <p>每个隐藏层执行以下计算:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( z^{(l)} = W^{(l)} \\cdot a^{(l-1)} + b^{(l)} \\)</p>
                                <p>\\( a^{(l)} = \\phi(z^{(l)}) \\)</p>
                            </div>
                            <ul>
                                <li>\\( l \\): 当前层的索引。</li>
                                <li>\\( W^{(l)} \\): 层 \\( l \\) 的权重矩阵。</li>
                                <li>\\( a^{(l-1)} \\): 来自前一层的输出（或激活）。</li>
                                <li>\\( b^{(l)} \\): 层 \\( l \\) 的偏移项。</li>
                                <li>\\( \\phi \\): 激活函数（例如：ReLU、Tanh）。</li>
                            </ul>
        
                            <h4>2. 输出层</h4>
                            <p>对于回归任务，输出层执行以下计算:</p>
                            <div style="margin-left: 20px;">
                                <p>\\( \\hat{y} = W^{(out)} \\cdot a^{(L)} + b^{(out)} \\)</p>
                            </div>
                            <ul>
                                <li>\\( W^{(out)} \\): 输出层的权重。</li>
                                <li>\\( a^{(L)} \\): 来自最后一个隐藏层的输出。</li>
                                <li>\\( \\hat{y} \\): 预测值。</li>
                            </ul>
        
                            <h4>3. 损失函数</h4>
                            <p>回归任务中常用的损失函数是均方误差（MSE）：</p>
                            <div style="margin-left: 20px;">
                                <p>\\( MSE = \\frac{1}{n} \sum_{i=1}^n (y_i - \hat{y}_i)^2 \\)</p>
                            </div>
                            <ul>
                                <li>\\( n \\): 样本数量。</li>
                                <li>\\( y_i \\): 样本 \\( i \\) 的实际值。</li>
                                <li>\\( \\hat{y}_i \\): 样本 \\( i \\) 的预测值。</li>
                            </ul>
        
                            <h4>4. 权重更新</h4>
                            <p>权重 \\( W \\) 和偏移项 \\( b \\) 通过反向传播算法和梯度下降优化方法进行更新：</p>
                            <div style="margin-left: 20px;">
                                <p>\\( W \\gets W - \\eta \\cdot \\frac{\partial \\text{Loss}}{\partial W} \\)</p>
                                <p>\\( b \\gets b - \\eta \\cdot \\frac{\partial \\text{Loss}}{\partial b} \\)</p>
                            </div>
                            <ul>
                                <li>\\( \\eta \\): 学习率。</li>
                                <li>\\( \\text{Loss} \\): 损失函数的值（例如：MSE）。</li>
                            </ul>
        
                            <h3>优点</h3>
                            <ul>
                                <li><b>非线性学习能力：</b> 由于非线性激活函数，MLP能够学习数据中的复杂关系。</li>
                                <li><b>灵活性：</b> 可以根据具体问题调整隐藏层数量和神经元数量。</li>
                                <li><b>广泛应用：</b> 适合多种回归任务。</li>
                            </ul>
        
                            <h3>项目应用</h3>
                            <p>MLP回归器在项目中用于预测猪的生长指标：</p>
                            <ul>
                                <li><b>预测DFI：</b> 根据年龄和过去7天的DFI数据预测未来食物消耗量。</li>
                                <li><b>预测体重：</b> 使用当前体重、年龄和DFI预测未来体重。</li>
                            </ul>
        
                            <h3>项目中的益处</h3>
                            <p>MLP回归器通过学习数据中的非线性关系和时间序列模式，提高了猪的DFI和体重预测的准确性，变得更加可靠和有效。</p>
                        `
                    }
                };
                break;
            default:
                console.warn("Ngôn ngữ không được hỗ trợ. Sử dụng mặc định 'en'.");
                loadAlgorithmDetails("en");
        }
    };

    // Gọi để load nội dung theo ngôn ngữ ban đầu
    loadAlgorithmDetails(language);

    // Xử lý sự kiện chọn ngôn ngữ
    languageSelect.addEventListener('change', (e) => {
        language = e.target.value;
        loadAlgorithmDetails(language);
    });
    
    document.querySelectorAll('.view-more-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const algorithm = btn.getAttribute('data-algorithm');
            if (algorithmDetails[algorithm]) {
                popupTitle.innerHTML = algorithmDetails[algorithm].title;
                popupDescription.innerHTML = algorithmDetails[algorithm].description;
                popup.style.display = 'flex';

                // Gọi MathJax để render công thức toán
                MathJax.typesetPromise().then(() => {
                    console.log("MathJax đã render các công thức toán.");
                }).catch(err => {
                    console.error("Lỗi khi render MathJax:", err);
                });
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Close popup when clicking outside content
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});



