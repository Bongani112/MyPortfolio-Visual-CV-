const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

function updateThemeIcon(theme) {
    if (!themeToggle) return;

    themeToggle.innerHTML = theme === 'dark'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

setTheme(initialTheme);

themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
});

hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const textToType = "Final-year Information Technology student passionate about enterprise networking, full-stack development, and data-driven solutions.";
    const typedTextElement = document.getElementById('typed-text');
    
    let index = 0;
    const typingSpeed = 35;

    function typeWriter() {
        if (typedTextElement && index < textToType.length) {
            typedTextElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    typeWriter();
});

// --- AI Chatbot Assistant Script ---
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

// Toggle chat window visibility
chatbotToggle?.addEventListener('click', () => chatbotWindow?.classList.toggle('hidden'));
chatbotClose?.addEventListener('click', () => chatbotWindow?.classList.add('hidden'));

// Handle sending messages
function handleSend() {
    const userText = chatbotInput?.value.trim();
    if (!userText) return;

    addMessage(userText, 'user');
    if (chatbotInput) chatbotInput.value = '';

    setTimeout(() => {
        const botResponse = generateAIResponse(userText.toLowerCase());
        addMessage(botResponse, 'bot');
    }, 500);
}

chatbotSend?.addEventListener('click', handleSend);
chatbotInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerHTML = text;
    chatbotMessages?.appendChild(msgDiv);
    if (chatbotMessages) chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Portfolio Knowledge Base Response Engine
function generateAIResponse(query) {
    if (query.includes('cv') || query.includes('resume') || query.includes('download')) {
        return `You can download Bongani's full CV directly by <a href="assets/cv.pdf" download style="color: #60a5fa; text-decoration: underline;">clicking here</a>, or view the <a href="#resume" onclick="closeChat()" style="color: #60a5fa;">Resume Section</a>.`;
    } 
    else if (query.includes('project') || query.includes('work') || query.includes('github')) {
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
        return `I've navigated you to Bongani's **Projects section**! You can explore his Full-Stack Web Application and Enterprise Network Topology repositories.`;
    } 
    else if (query.includes('skill') || query.includes('know') || query.includes('tech')) {
        document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
        return `Bongani specializes in **HTML/CSS/JS**, **Cisco Networking (VLANs, Packet Tracer)**, **Power BI**, and **Database Systems**.`;
    } 
    else if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('linkedin')) {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        return `Bongani's contact details are right here! You can reach him via email or connect with him on LinkedIn.`;
    } 
    else {
        return `I can help you navigate Bongani's portfolio! Try typing: <b>"Show Projects"</b>, <b>"Download CV"</b>, <b>"Skills"</b>, or <b>"Contact"</b>.`;
    }
}

function closeChat() {
    chatbotWindow?.classList.add('hidden');
}
