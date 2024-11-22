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

//********************************************************************************************************************* */
// Định nghĩa từ điển ngôn ngữ
const translations = {
    en: {
        navOverview: "Overview",
        navSolutions: "Solutions",
        navDashboard: "Dashboard",
        navResources: "Resources",
        navContact: "Contact Us",
        navDocs: "Docs",
        navSupport: "Support",
        headerTitle: "Support Page",
        headerSubtitle: "We're here to help you! If you have any questions, please see the information below.",
        faqTitle: "Frequently Asked Questions",
        faqQuestions: [
            "How do I use the product?",
            "Who can I contact for support?",
            "Is there any documentation available?"
        ],
        contactSupportTitle: "Contact Support",
        contactSupportText: `
        <p>If you need further assistance, please contact us via email: <a href="mailto:support@smartswine.com">support@smartswine.com</a></p>
        `,
        supportResourcesTitle: "Support Resources",
        supportResourcesText: "We have a variety of resources available to assist you:",
        supportResourcesLinks: [
            "Documentation - Comprehensive guides on using our products.",
            "FAQ - Answers to common questions.",
            "Contact Us - Get in touch with our support team."
        ],
        latestUpdatesTitle: "Latest Updates",
        latestUpdatesText: "Stay informed about the latest features and improvements:",
        latestUpdatesItems: [
            "Feature Update 1: New user interface for easier navigation.",
            "Feature Update 2: Enhanced security measures for your data.",
            "Feature Update 3: Improved performance and speed."
        ]
    },
    vi: {
        navOverview: "Tổng Quan",
        navSolutions: "Giải Pháp",
        navDashboard: "Bảng Điều Khiển",
        navResources: "Tài Nguyên",
        navContact: "Liên Hệ",
        navDocs: "Tài Liệu",
        navSupport: "Hỗ Trợ",
        headerTitle: "Trang Hỗ Trợ",
        headerSubtitle: "Chúng tôi luôn sẵn sàng giúp đỡ bạn! Nếu có bất kỳ câu hỏi nào, hãy xem thông tin bên dưới.",
        faqTitle: "Câu Hỏi Thường Gặp",
        faqQuestions: [
            "Làm thế nào để sử dụng sản phẩm?",
            "Tôi có thể liên hệ với ai để được hỗ trợ?",
            "Có tài liệu hướng dẫn nào không?"
        ],
        contactSupportTitle: "Liên Hệ Hỗ Trợ",
        contactSupportText: `
        <p>Nếu bạn cần thêm trợ giúp, vui lòng liên hệ qua email: <a href="mailto:support@smartswine.com">support@smartswine.com</a></p>
        `,
        supportResourcesTitle: "Tài Nguyên Hỗ Trợ",
        supportResourcesText: "Chúng tôi có nhiều tài nguyên hỗ trợ bạn:",
        supportResourcesLinks: [
            "Tài Liệu - Hướng dẫn đầy đủ về cách sử dụng sản phẩm.",
            "Câu Hỏi Thường Gặp - Câu trả lời cho các câu hỏi phổ biến.",
            "Liên Hệ - Kết nối với đội ngũ hỗ trợ."
        ],
        latestUpdatesTitle: "Cập Nhật Mới Nhất",
        latestUpdatesText: "Luôn cập nhật những tính năng và cải tiến mới nhất:",
        latestUpdatesItems: [
            "Cập Nhật 1: Giao diện mới giúp dễ dàng điều hướng hơn.",
            "Cập Nhật 2: Tăng cường bảo mật cho dữ liệu của bạn.",
            "Cập Nhật 3: Cải thiện hiệu năng và tốc độ."
        ]
    },
    zh: {
        navOverview: "概述",
        navSolutions: "解决方案",
        navDashboard: "仪表板",
        navResources: "资源",
        navContact: "联系我们",
        navDocs: "文档",
        navSupport: "支持",
        headerTitle: "支持页面",
        headerSubtitle: "我们在这里帮助您！如果您有任何问题，请查看下面的信息。",
        faqTitle: "常见问题",
        faqQuestions: [
            "我该如何使用产品？",
            "我可以联系谁以获得支持？",
            "是否有可用的文档？"
        ],
        contactSupportTitle: "联系支持",
        contactSupportText: `
        <p>如果您需要进一步的帮助，请通过电子邮件与我们联系：<a href="mailto:support@smartswine.com">support@smartswine.com</a></p>
        `,
        supportResourcesTitle: "支持资源",
        supportResourcesText: "我们有多种资源可供您使用：",
        supportResourcesLinks: [
            "文档 - 使用我们产品的全面指南。",
            "常见问题 - 常见问题的答案。",
            "联系我们 - 与我们的支持团队联系。"
        ],
        latestUpdatesTitle: "最新更新",
        latestUpdatesText: "了解最新功能和改进：",
        latestUpdatesItems: [
            "功能更新 1：新的用户界面，便于导航。",
            "功能更新 2：增强数据的安全性。",
            "功能更新 3：提高性能和速度。"
        ]
    }
};

// Hàm thay đổi ngôn ngữ
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
        headerSubtitle: document.querySelector("header p"),
        faqTitle: document.querySelector("main section:nth-of-type(1) h2"),
        faqQuestions: document.querySelectorAll("main section:nth-of-type(1) ul li"),
        contactSupportTitle: document.querySelector("main section:nth-of-type(2) h2"),
        contactSupportText: document.querySelector("main section:nth-of-type(2) p"),
        supportResourcesTitle: document.querySelector("main section:nth-of-type(4) h2"),
        supportResourcesText: document.querySelector("main section:nth-of-type(4) p"),
        supportResourcesLinks: document.querySelectorAll("main section:nth-of-type(4) ul li"),
        latestUpdatesTitle: document.querySelector(".latest-updates h2"),
        latestUpdatesText: document.querySelector(".latest-updates p"),
        latestUpdatesItems: document.querySelectorAll(".latest-updates ul li")
    };

    // Cập nhật nội dung
    for (const key in elements) {
        if (key === "contactSupportText") {
            elements[key].innerHTML = translations[language][key];
        }
        else if (elements[key]) {
            if (Array.isArray(translations[language][key])) {
                elements[key].forEach((item, index) => {
                    item.textContent = translations[language][key][index];
                });
            } else {
                elements[key].textContent = translations[language][key];
            }
        }
    }
}

// Tải ngôn ngữ khi trang được load
window.onload = function() {
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
