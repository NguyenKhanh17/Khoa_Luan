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
            "Ridge and Lasso Regression",
            "Decision Tree Regression",
            "Random Forest Regression",
            "Gradient Boosting",
            "K Nearest Neighbors Regression (KNN Regression)",
            "Neural Networks",
            "Gaussian Process Regression (GPR)",
            "Support Vector Regression (SVR)"
        ],
        linearRegressionTitle: "Linear Regression",
        linearRegressionDescription: "Assumes a linear relationship between input and output variables. This method attempts to optimize the best straight line to predict values.",
        linearRegressionUse: "Suitable for simple problems, easy to explain, often used as a baseline.",
        linearRegressionAdvantages: "Simple, easy to implement and explain.",
        linearRegressionDisadvantages: "Not effective when there is high complexity or non-linear relationships.",
        ridgeAndLassoRegressionTitle: "Ridge and Lasso Regression",
        ridgeAndLassoRegressionDescription: "Uses regularization methods to reduce overfitting by adjusting the weights of the model.",
        ridgeAndLassoRegressionUse: "Good for high-dimensional data, removing unimportant variables (especially Lasso).",
        ridgeAndLassoRegressionAdvantages: "Helps control the complexity of the model and reduce overfitting.",
        ridgeAndLassoRegressionDisadvantages: "Requires tuning the regularization parameter.",
        decisionTreeRegressionTitle: "Decision Tree Regression",
        decisionTreeRegressionDescription: "Builds a decision tree to partition the data and predict the output value.",
        decisionTreeRegressionUse: "Good for nonlinear data, easy to understand and visualize.",
        decisionTreeRegressionAdvantages: "Easy to understand and can handle both numerical and categorical data.",
        decisionTreeRegressionDisadvantages: "Prone to overfitting if not controlled.",
        randomForestRegressionTitle: "Random Forest Regression",
        randomForestRegressionDescription: "Uses multiple decision trees to reduce overfitting and improve accuracy.",
        randomForestRegressionUse: "Good for complex data, can learn from multiple features of the data.",
        randomForestRegressionAdvantages: "Reduces overfitting and improves prediction accuracy.",
        randomForestRegressionDisadvantages: "Requires more computational resources and harder to explain than a single tree.",
        gradientBoostingTitle: "Gradient Boosting",
        gradientBoostingDescription: "Boosts multiple models in sequence to optimize the result.",
        gradientBoostingUse: "Good for high-complexity problems, achieving high performance.",
        gradientBoostingAdvantages: "High prediction accuracy.",
        gradientBoostingDisadvantages: "Requires training time and prone to overfitting if not tuned correctly.",
        knnRegressionTitle: "K Nearest Neighbors Regression (KNN Regression)",
        knnRegressionDescription: "Predicts values based on the nearest points in the feature space.",
        knnRegressionUse: "Easy to understand, suitable for nonlinear data.",
        knnRegressionAdvantages: "Easy to understand and does not require training the model.",
        knnRegressionDisadvantages: "Requires computational resources during prediction, less effective with large datasets.",
        neuralNetworksTitle: "Neural Networks",
        neuralNetworksDescription: "Uses artificial neural networks to learn and predict from data.",
        neuralNetworksUse: "Good for complex and nonlinear data.",
        neuralNetworksAdvantages: "Good learning and generalization ability.",
        neuralNetworksDisadvantages: "Requires more data and training time, harder to explain.",
        gaussianProcessRegressionTitle: "Gaussian Process Regression (GPR)",
        gaussianProcessRegressionDescription: "Uses Gaussian distribution to predict and estimate the uncertainty of the data.",
        gaussianProcessRegressionUse: "Good for high uncertainty data.",
        gaussianProcessRegressionAdvantages: "Predicts with confidence.",
        gaussianProcessRegressionDisadvantages: "Requires computational resources with large datasets.",
        supportVectorRegressionTitle: "Support Vector Regression (SVR)",
        supportVectorRegressionDescription: "Uses SVM models to create a distance between points and predict values.",
        supportVectorRegressionUse: "Good for noisy data, high complexity.",
        supportVectorRegressionAdvantages: "Good at suppressing noise.",
        supportVectorRegressionDisadvantages: "Hard to scale for large datasets."
        // Thêm các mục khác tương tự
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
        introductionText: "Trang này cung cấp tài liệu sử dụng sản phẩm và dịch vụ của chúng tôi.",
        titleintro: "Các Thuật Toán Dự Đoán Cho DFI và Cân Nặng Lợn",
        intro: "Trang này cung cấp thông tin chi tiết về các thuật toán dự đoán được sử dụng trong hệ thống dự đoán tiêu thụ thức ăn (DFI) và cân nặng lợn. Các thuật toán này giúp tăng độ chính xác của các mô hình dự đoán và hỗ trợ người dùng trong việc lựa chọn phương pháp phù hợp nhất.",
        tocTitle: "Mục Lục",
        tocItems: [
            "Hồi Quy Tuyến Tính",
            "Hồi Quy Ridge và Lasso",
            "Hồi Quy Cây Quyết Định",
            "Rừng Ngẫu Nhiên",
            "Tăng Cường Dần Dần",
            "Hồi Quy K Neighbors (KNN Regression)",
            "Mạng Nơron",
            "Hồi Quy Gaussian (GPR)",
            "Hồi Quy Vector Hỗ Trợ (SVR)"
        ],
        linearRegressionTitle: "Hồi Quy Tuyến Tính",
        linearRegressionDescription: "Giả định mối quan hệ tuyến tính giữa các biến đầu vào và đầu ra. Phương pháp này cố gắng tối ưu đường thẳng tốt nhất để dự đoán giá trị.",
        linearRegressionUse: "Phù hợp với các vấn đề đơn giản, dễ giải thích, thường được dùng làm cơ sở.",
        linearRegressionAdvantages: "Đơn giản, dễ triển khai và giải thích.",
        linearRegressionDisadvantages: "Không hiệu quả với các vấn đề phức tạp hoặc mối quan hệ phi tuyến.",
        ridgeAndLassoRegressionTitle: "Hồi Quy Ridge và Lasso",
        ridgeAndLassoRegressionDescription: "Sử dụng các phương pháp điều chỉnh để giảm thiểu hiện tượng quá khớp bằng cách điều chỉnh trọng số của mô hình.",
        ridgeAndLassoRegressionUse: "Xử lý tốt dữ liệu có chiều cao, lọc ra các biến không quan trọng (đặc biệt là Lasso).",
        ridgeAndLassoRegressionAdvantages: "Giúp kiểm soát độ phức tạp của mô hình và giảm thiểu hiện tượng quá khớp.",
        ridgeAndLassoRegressionDisadvantages: "Cần điều chỉnh hệ số điều chỉnh.",
        decisionTreeRegressionTitle: "Hồi Quy Cây Quyết Định",
        decisionTreeRegressionDescription: "Xây dựng một cây quyết định để phân chia dữ liệu và dự đoán giá trị đầu ra.",
        decisionTreeRegressionUse: "Tốt cho dữ liệu phi tuyến, dễ hiểu và trực quan.",
        decisionTreeRegressionAdvantages: "Dễ hiểu và có thể xử lý cả dữ liệu số và phân loại.",
        decisionTreeRegressionDisadvantages: "Dễ bị quá khớp nếu không được kiểm soát.",
        randomForestRegressionTitle: "Hồi Quy Rừng Ngẫu Nhiên",
        randomForestRegressionDescription: "Sử dụng nhiều cây quyết định để giảm thiểu hiện tượng quá khớp và tăng độ chính xác.",
        randomForestRegressionUse: "Phù hợp với dữ liệu phức tạp, có thể học từ nhiều đặc trưng của dữ liệu.",
        randomForestRegressionAdvantages: "Giảm thiểu hiện tượng quá khớp và cải thiện độ chính xác dự đoán.",
        randomForestRegressionDisadvantages: "Tiêu tốn tài nguyên tính toán và khó giải thích hơn so với một cây đơn.",
        gradientBoostingTitle: "Tăng Cường Dần Dần",
        gradientBoostingDescription: "Tăng cường nhiều mô hình dự đoán theo thứ tự để tối ưu hóa kết quả.",
        gradientBoostingUse: "Phù hợp với các vấn đề có độ phức tạp cao, đạt hiệu suất tốt.",
        gradientBoostingAdvantages: "Độ chính xác dự đoán cao.",
        gradientBoostingDisadvantages: "Tốn thời gian để huấn luyện và dễ bị quá khớp nếu không được điều chỉnh đúng cách.",
        knnRegressionTitle: "Hồi Quy K Neighbors (KNN Regression)",
        knnRegressionDescription: "Dự đoán giá trị dựa trên các điểm gần nhất trong không gian đặc trưng.",
        knnRegressionUse: "Dễ hiểu, phù hợp với dữ liệu phi tuyến.",
        knnRegressionAdvantages: "Dễ hiểu và không yêu cầu huấn luyện mô hình.",
        knnRegressionDisadvantages: "Tiêu tốn tài nguyên trong quá trình dự đoán, hiệu quả giảm khi dữ liệu lớn.",
        neuralNetworksTitle: "Mạng Nơron",
        neuralNetworksDescription: "Sử dụng cấu trúc mạng nơron nhân tạo để học và dự đoán từ dữ liệu.",
        neuralNetworksUse: "Phù hợp với các vấn đề dữ liệu phức tạp và phi tuyến.",
        neuralNetworksAdvantages: "Khả năng học và tổng quát tốt.",
        neuralNetworksDisadvantages: "Cần nhiều dữ liệu và thời gian huấn luyện, khó giải thích.",
        gaussianProcessRegressionTitle: "Hồi Quy Gaussian (GPR)",
        gaussianProcessRegressionDescription: "Sử dụng phân phối Gaussian để dự đoán và ước lượng độ không chắc chắn của dữ liệu.",
        gaussianProcessRegressionUse: "Phù hợp với các vấn đề có độ không chắc chắn cao.",
        gaussianProcessRegressionAdvantages: "Dự đoán với độ tin cậy.",
        gaussianProcessRegressionDisadvantages: "Tiêu tốn tài nguyên với dữ liệu lớn.",
        supportVectorRegressionTitle: "Hồi Quy Vector Hỗ Trợ (SVR)",
        supportVectorRegressionDescription: "Sử dụng các mô hình SVM để tạo ra một khoảng cách giữa các điểm và dự đoán giá trị.",
        supportVectorRegressionUse: "Phù hợp với dữ liệu ồn ào, độ phức tạp cao.",
        supportVectorRegressionAdvantages: "Kháng lại tiếng ồn tốt.",
        supportVectorRegressionDisadvantages: "Khó mở rộng cho dữ liệu lớn."
        // Thêm các phần tử cần dịch khác tương tự
    },
    zh: {
        navOverview: "概述",
        navSolutions: "解决方案",
        navDashboard: "仪表板",
        navResources: "资源",
        navContact: "联系我们",
        navDocs: "文档",
        navSupport: "支持",
        headerTitle: "文档",
        introductionTitle: "介绍",
        introductionText: "本页面提供使用我们产品和服务的文档。",
        titleintro: "DFI和猪体重预测的预测算法",
        intro: "本页面提供有关用于猪体重（DFI）和猪体重预测系统中的预测算法的详细信息。这些算法有助于提高预测模型的准确性，并支持用户选择最合适的方法。",
        tocTitle: "目录",
        tocItems: [
            "线性回归",
            "岭回归和套索回归",
            "决策树回归",
            "随机森林回归",
            "梯度提升",
            "K最近邻回归 (KNN回归)",
            "神经网络",
            "高斯过程回归 (GPR)",
            "支持向量回归 (SVR)"
        ],
        linearRegressionTitle: "线性回归",
        linearRegressionDescription: "假设输入和输出变量之间存在线性关系。该方法试图优化最佳直线以预测值。",
        linearRegressionUse: "适用于简单问题，易于解释，通常用作基线。",
        linearRegressionAdvantages: "简单，易于实现和解释。",
        linearRegressionDisadvantages: "在高复杂性或非线性关系时效果不佳。",
        ridgeAndLassoRegressionTitle: "岭回归和套索回归",
        ridgeAndLassoRegressionDescription: "使用正则化方法通过调整模型的权重来减少过拟合。",
        ridgeAndLassoRegressionUse: "适合高维数据，去除不重要的变量（尤其是套索）。",
        ridgeAndLassoRegressionAdvantages: "有助于控制模型的复杂性并减少过拟合。",
        ridgeAndLassoRegressionDisadvantages: "需要调整正则化参数。",
        decisionTreeRegressionTitle: "决策树回归",
        decisionTreeRegressionDescription: "构建决策树以划分数据并预测输出值。",
        decisionTreeRegressionUse: "适合非线性数据，易于理解和可视化。",
        decisionTreeRegressionAdvantages: "易于理解，可以处理数值和分类数据。",
        decisionTreeRegressionDisadvantages: "如果不加控制，容易过拟合。",
        randomForestRegressionTitle: "随机森林回归",
        randomForestRegressionDescription: "使用多个决策树来减少过拟合并提高准确性。",
        randomForestRegressionUse: "适合复杂数据，可以从数据的多个特征中学习。",
        randomForestRegressionAdvantages: "减少过拟合并提高预测准确性。",
        randomForestRegressionDisadvantages: "需要更多计算资源，比单棵树更难解释。",
        gradientBoostingTitle: "梯度提升",
        gradientBoostingDescription: "按顺序增强多个模型以优化结果。",
        gradientBoostingUse: "适合高复杂性问题，达到高性能。",
        gradientBoostingAdvantages: "高预测准确性。",
        gradientBoostingDisadvantages: "需要训练时间，如果没有正确调整，容易过拟合。",
        knnRegressionTitle: "K最近邻回归 (KNN回归)",
        knnRegressionDescription: "根据特征空间中最近的点预测值。",
        knnRegressionUse: "易于理解，适合非线性数据。",
        knnRegressionAdvantages: "易于理解，不需要训练模型。",
        knnRegressionDisadvantages: "在预测过程中需要计算资源，处理大数据集时效果较差。",
        neuralNetworksTitle: "神经网络",
        neuralNetworksDescription: "使用人工神经网络从数据中学习和预测。",
        neuralNetworksUse: "适合复杂和非线性数据。",
        neuralNetworksAdvantages: "良好的学习和泛化能力。",
        neuralNetworksDisadvantages: "需要更多数据和训练时间，难以解释。",
        gaussianProcessRegressionTitle: "高斯过程回归 (GPR)",
        gaussianProcessRegressionDescription: "使用高斯分布来预测和估计数据的不确定性。",
        gaussianProcessRegressionUse: "适合高不确定性数据。",
        gaussianProcessRegressionAdvantages: "以信心进行预测。",
        gaussianProcessRegressionDisadvantages: "处理大数据集时需要计算资源。",
        supportVectorRegressionTitle: "支持向量回归 (SVR)",
        supportVectorRegressionDescription: "使用SVM模型在点之间创建距离并预测值。",
        supportVectorRegressionUse: "适合噪声数据，高复杂性。",
        supportVectorRegressionAdvantages: "抑制噪声的能力强。",
        supportVectorRegressionDisadvantages: "对于大数据集难以扩展。"
        // Thêm các mục khác tương tự
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
        linearRegressionTitle: document.querySelector("#linear-regression h2"),
        linearRegressionDescription: document.querySelector("#linear-regression p:nth-of-type(1)"),
        linearRegressionUse: document.querySelector("#linear-regression p:nth-of-type(2)"),
        linearRegressionAdvantages: document.querySelector("#linear-regression p:nth-of-type(3)"),
        linearRegressionDisadvantages: document.querySelector("#linear-regression p:nth-of-type(4)"),
        ridgeAndLassoRegressionTitle: document.querySelector("#ridge-and-lasso-regression h2"),
        ridgeAndLassoRegressionDescription: document.querySelector("#ridge-and-lasso-regression p:nth-of-type(1)"),
        ridgeAndLassoRegressionUse: document.querySelector("#ridge-and-lasso-regression p:nth-of-type(2)"),
        ridgeAndLassoRegressionAdvantages: document.querySelector("#ridge-and-lasso-regression p:nth-of-type(3)"),
        ridgeAndLassoRegressionDisadvantages: document.querySelector("#ridge-and-lasso-regression p:nth-of-type(4)"),
        decisionTreeRegressionTitle: document.querySelector("#decision-tree-regression h2"),
        decisionTreeRegressionDescription: document.querySelector("#decision-tree-regression p:nth-of-type(1)"),
        decisionTreeRegressionUse: document.querySelector("#decision-tree-regression p:nth-of-type(2)"),
        decisionTreeRegressionAdvantages: document.querySelector("#decision-tree-regression p:nth-of-type(3)"),
        decisionTreeRegressionDisadvantages: document.querySelector("#decision-tree-regression p:nth-of-type(4)"),
        randomForestRegressionTitle: document.querySelector("#random-forest-regression h2"),
        randomForestRegressionDescription: document.querySelector("#random-forest-regression p:nth-of-type(1)"),
        randomForestRegressionUse: document.querySelector("#random-forest-regression p:nth-of-type(2)"),
        randomForestRegressionAdvantages: document.querySelector("#random-forest-regression p:nth-of-type(3)"),
        randomForestRegressionDisadvantages: document.querySelector("#random-forest-regression p:nth-of-type(4)"),
        gradientBoostingTitle: document.querySelector("#gradient-boosting h2"),
        gradientBoostingDescription: document.querySelector("#gradient-boosting p:nth-of-type(1)"),
        gradientBoostingUse: document.querySelector("#gradient-boosting p:nth-of-type(2)"),
        gradientBoostingAdvantages: document.querySelector("#gradient-boosting p:nth-of-type(3)"),
        gradientBoostingDisadvantages: document.querySelector("#gradient-boosting p:nth-of-type(4)"),
        knnRegressionTitle: document.querySelector("#knn-regression h2"),
        knnRegressionDescription: document.querySelector("#knn-regression p:nth-of-type(1)"),
        knnRegressionUse: document.querySelector("#knn-regression p:nth-of-type(2)"),
        knnRegressionAdvantages: document.querySelector("#knn-regression p:nth-of-type(3)"),
        knnRegressionDisadvantages: document.querySelector("#knn-regression p:nth-of-type(4)"),
        neuralNetworksTitle: document.querySelector("#neural-networks h2"),
        neuralNetworksDescription: document.querySelector("#neural-networks p:nth-of-type(1)"),
        neuralNetworksUse: document.querySelector("#neural-networks p:nth-of-type(2)"),
        neuralNetworksAdvantages: document.querySelector("#neural-networks p:nth-of-type(3)"),
        neuralNetworksDisadvantages: document.querySelector("#neural-networks p:nth-of-type(4)"),
        gaussianProcessRegressionTitle: document.querySelector("#gaussian-process-regression h2"),
        gaussianProcessRegressionDescription: document.querySelector("#gaussian-process-regression p:nth-of-type(1)"),
        gaussianProcessRegressionUse: document.querySelector("#gaussian-process-regression p:nth-of-type(2)"),
        gaussianProcessRegressionAdvantages: document.querySelector("#gaussian-process-regression p:nth-of-type(3)"),
        gaussianProcessRegressionDisadvantages: document.querySelector("#gaussian-process-regression p:nth-of-type(4)"),
        supportVectorRegressionTitle: document.querySelector("#support-vector-regression h2"),
        supportVectorRegressionDescription: document.querySelector("#support-vector-regression p:nth-of-type(1)"),
        supportVectorRegressionUse: document.querySelector("#support-vector-regression p:nth-of-type(2)"),
        supportVectorRegressionAdvantages: document.querySelector("#support-vector-regression p:nth-of-type(3)"),
        supportVectorRegressionDisadvantages: document.querySelector("#support-vector-regression p:nth-of-type(4)")
        // Thêm các phần tử cần dịch khác tương tự
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
