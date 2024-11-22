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

// Lấy các phần tử cần thiết
const chatBox = document.getElementById("chat-box");
const startChatButton = document.getElementById("start-chat-button");
const closeChatButton = document.getElementById("close-chat");

// Mở hộp chat khi nhấn "Start chat"
startChatButton.addEventListener("click", () => {
    chatBox.classList.remove("hidden");
});

// Đóng hộp chat khi nhấn nút close
closeChatButton.addEventListener("click", () => {
    chatBox.classList.add("hidden");
});

function sendMessage() {
    const inputField = document.getElementById("chat-message");
    const messageText = inputField.value.trim();

    if (messageText) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "user");
        messageElement.textContent = messageText;

        const chatContent = document.getElementById("chat-content");
        chatContent.appendChild(messageElement);

        // Cuộn tin nhắn mới vào vùng nhìn thấy
        messageElement.scrollIntoView({ behavior: "smooth" });

        inputField.value = "";
        sendBotMessage();
    }
}

const botMessages = [
    "Hello, Dear customer",
    "Smartswine's technical team is delighted to serve you.",
    "What difficulties are you facing?",
    "Your request has been received. Please leave your contact information so we can assist you best.",
    "Do you need further assistance with any other issues?",
    "Our technicians will contact you as soon as possible to address the issues you've raised.",
    "Thank you for your feedback and questions. We will continually improve our service to better serve you in the future."
];
let messageIndex = 0;

function sendBotMessage() {
    setTimeout(() => {
        const chatContent = document.getElementById("chat-content");
    
        if (messageIndex >= botMessages.length) {
            messageIndex = 0;
        }
    
        const botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot");
        botMessage.textContent = botMessages[messageIndex];
        chatContent.appendChild(botMessage);
    
        // Cuộn tin nhắn bot vào vùng nhìn thấy
        botMessage.scrollIntoView({ behavior: "smooth" });
    
        messageIndex++;

        if (messageIndex === 1 && messageIndex < botMessages.length) {
            const secondMessage = document.createElement("div");
            secondMessage.classList.add("message", "bot");
            secondMessage.textContent = botMessages[messageIndex];  
            chatContent.appendChild(secondMessage);
            botMessage.scrollIntoView({ behavior: "smooth" });
    
            // Tăng chỉ số để chuyển sang tin nhắn tiếp theo cho lần gửi kế tiếp
            messageIndex++;
        }
    }, 3000);
}

function sendMessageOnEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function toggleChat() {
    chatBox.classList.toggle("hidden");
}

//************************************************************************************************************** */
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
        headerTitle: "How can we help you today?",
        headerDescription: "Talk to a SmartSwine technical specialist",
        chatOnlineTitle: "Chat online with us",
        chatOnlineDescription: "Chat online with SmartSwine's technical team, available from Monday, 9 am ET, to Friday, 7 pm ET.",
        startChatButton: "Start chat",
        requestCallTitle: "Request a call back",
        requestCallDescription: "Fill out the contact form with your information, and we’ll get back to you shortly.",
        goToContactForm: "Go to contact form",
        yourNameLabel: "Your Name",
        yourEmailLabel: "Your Email",
        yourMessageLabel: "Your Message",
        sendMessageButton: "Send Message",
        chatHeader: "SmartSwine Chat",
        chatGreeting: "Hi there! How can we assist you today?",
        placeholders: {
            name: "Enter your name",
            email: "Enter your email",
            message: "Write your message here..."
        }
    },
    vi: {
        navOverview: "Tổng Quan",
        navSolutions: "Giải Pháp",
        navDashboard: "Bảng Điều Khiển",
        navResources: "Tài Nguyên",
        navContact: "Liên Hệ",
        navDocs: "Tài Liệu",
        navSupport: "Hỗ Trợ",
        headerTitle: "Chúng tôi có thể giúp gì cho bạn hôm nay?",
        headerDescription: "Nói chuyện với chuyên gia kỹ thuật của SmartSwine",
        chatOnlineTitle: "Trò chuyện trực tuyến với chúng tôi",
        chatOnlineDescription: "Trò chuyện trực tuyến với đội ngũ kỹ thuật SmartSwine, từ thứ Hai, 9 giờ sáng (ET), đến thứ Sáu, 7 giờ tối (ET).",
        startChatButton: "Bắt đầu trò chuyện",
        requestCallTitle: "Yêu cầu gọi lại",
        requestCallDescription: "Điền vào biểu mẫu liên hệ với thông tin của bạn, chúng tôi sẽ sớm liên hệ lại.",
        goToContactForm: "Đi đến biểu mẫu liên hệ",
        yourNameLabel: "Tên của bạn",
        yourEmailLabel: "Email của bạn",
        yourMessageLabel: "Tin nhắn của bạn",
        sendMessageButton: "Gửi Tin Nhắn",
        chatHeader: "Trò chuyện SmartSwine",
        chatGreeting: "Xin chào! Chúng tôi có thể hỗ trợ gì cho bạn hôm nay?",
        placeholders: {
            name: "Nhập tên của bạn",
            email: "Nhập email của bạn",
            message: "Viết tin nhắn của bạn ở đây..."
        }
    },
    zh: {
        navOverview: "概述",
        navSolutions: "解决方案",
        navDashboard: "仪表板",
        navResources: "资源",
        navContact: "联系我们",
        navDocs: "文档",
        navSupport: "支持",
        headerTitle: "我们今天能为您提供什么帮助？",
        headerDescription: "与SmartSwine的技术专家交谈",
        chatOnlineTitle: "与我们在线聊天",
        chatOnlineDescription: "与SmartSwine的技术团队在线聊天，时间为周一至周五，东部时间上午9点至晚上7点。",
        startChatButton: "开始聊天",
        requestCallTitle: "请求回电",
        requestCallDescription: "填写联系表格并提供您的信息，我们会尽快与您联系。",
        goToContactForm: "前往联系表格",
        yourNameLabel: "您的姓名",
        yourEmailLabel: "您的电子邮件",
        yourMessageLabel: "您的消息",
        sendMessageButton: "发送消息",
        chatHeader: "SmartSwine聊天",
        chatGreeting: "您好！我们今天能为您提供什么帮助？",
        placeholders: {
            name: "输入您的姓名",
            email: "输入您的电子邮件",
            message: "在此处写下您的消息..."
        }
    }
};

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
        chatOnlineTitle: document.querySelector(".contact-options .option:nth-child(1) h2"),
        chatOnlineDescription: document.querySelector(".contact-options .option:nth-child(1) p"),
        startChatButton: document.getElementById("start-chat-button"),
        requestCallTitle: document.querySelector(".contact-options .option:nth-child(2) h2"),
        requestCallDescription: document.querySelector(".contact-options .option:nth-child(2) p"),
        goToContactForm: document.querySelector(".request-call"),
        yourNameLabel: document.querySelector('label[for="name"]'),
        yourEmailLabel: document.querySelector('label[for="email"]'),
        yourMessageLabel: document.querySelector('label[for="message"]'),
        sendMessageButton: document.querySelector(".control-button"),
        chatHeader: document.querySelector(".chat-header span"),
        chatGreeting: document.querySelector(".chat-content p")
    };

    // Cập nhật text content
    for (const key in elements) {
        if (elements[key]) {
            elements[key].textContent = translations[language][key] || elements[key].textContent;
        }
    }

    // Cập nhật placeholder
    const placeholders = translations[language].placeholders;
    if (placeholders) {
        const inputPlaceholders = {
            name: document.getElementById("name"),
            email: document.getElementById("email"),
            message: document.getElementById("message")
        };

        for (const key in inputPlaceholders) {
            if (inputPlaceholders[key]) {
                inputPlaceholders[key].placeholder = placeholders[key];
            }
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
