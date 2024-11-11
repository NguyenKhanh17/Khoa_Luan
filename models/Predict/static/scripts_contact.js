// /*Tự động cuộn mượt đến form khi nhấn vào "Go to contact form"*/
// $(document).ready(function() {
//     $('.request-call').click(function(e) {
//         e.preventDefault();  // Ngừng hành động mặc định của liên kết
//         $('html, body').animate({
//             scrollTop: $('#contact-form').offset().top
//         }, 1000);  // 1000ms là thời gian cuộn mượt
//     });
// });

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