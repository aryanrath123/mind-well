import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

    const firebaseConfig = {
        apiKey: "AIzaSyDzUCIHQDJ0wOqnVpL1KJGt1pKWTbG9-i8",
        authDomain: "mind-well-296d4.firebaseapp.com",
        projectId: "mind-well-296d4",
        storageBucket: "mind-well-296d4.firebasestorage.app",
        messagingSenderId: "152821261463",
        appId: "1:152821261463:web:e75f997e966439b42975d2"
    };

    const app = initializeApp(firebaseConfig);

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    const GEMINI_API_KEY = "AIzaSyAdLeexjPR44w9zfHbk9Am5sx_pT1MhSO4";



    document.addEventListener('DOMContentLoaded', function () {
        const loginBtn = document.getElementById('login-btn');
        const signupBtn = document.getElementById('signup-btn');
        const modal = document.getElementById('auth-modal');
        const modalBackdrop = document.getElementById('modal-backdrop');
        const closeModal = document.getElementById('close-modal');
        const switchToSignup = document.getElementById('switch-to-signup');
        const switchToLogin = document.getElementById('switch-to-login');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const modalTitle = document.getElementById('modal-title');

        const chatContainer = document.getElementById('chat-container');
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        const quickBtns = document.querySelectorAll('.quick-btn');

        const tabButtons = document.querySelectorAll('.tab-button');

        function openModal() {
            modal.classList.add('active');
        }

        function closeModalFunc() {
            modal.classList.remove('active');
        }

        function showLoginForm() {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            modalTitle.textContent = 'Sign In';
        }

        function showSignupForm() {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            modalTitle.textContent = 'Create Account';
        }

        loginBtn.addEventListener('click', () => {
            openModal();
            showLoginForm();
        });

        signupBtn.addEventListener('click', () => {
            openModal();
            showSignupForm();
        });

        closeModal.addEventListener('click', closeModalFunc);
        modalBackdrop.addEventListener('click', closeModalFunc);

        switchToSignup.addEventListener('click', showSignupForm);
        switchToLogin.addEventListener('click', showLoginForm);

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        const aiResponses = {
            'default': "I'm here to listen. Can you tell me more about how you're feeling?",
            'anxious': "It's common to feel anxious sometimes. Try taking deep breaths - inhale for 4 seconds, hold for 4, exhale for 6. Would you like to try a guided meditation?",
            'sleep': "Sleep issues can really impact your wellbeing. Establishing a regular bedtime routine and limiting screen time before bed can help. Would you like some sleep relaxation audio?",
            'stress': "Academic stress is challenging. Breaking tasks into smaller steps and taking regular breaks can make it more manageable. Would you like to schedule a session with a counselor?",
            'lonely': "Feeling lonely can be difficult. Many students find joining clubs or study groups helps with connection. Our peer support forum might be helpful too."
        };

        function addMessage(message, isUser) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('flex', 'mb-4');

            if (isUser) {
                messageDiv.classList.add('justify-end');
                messageDiv.innerHTML = `
                    <div class="user-bubble p-4 max-w-xs md:max-w-md">
                        <p class="text-gray-100">${message}</p>
                    </div>
                    <div class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center ml-3">
                        <i class="fas fa-user text-gray-300"></i>
                    </div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <div class="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center mr-3">
                        <i class="fas fa-robot text-purple-400"></i>
                    </div>
                    <div class="chat-bubble p-4 max-w-xs md:max-w-md">
                        <p class="text-gray-100">${message}</p>
                    </div>
                `;
            }

            chatContainer.appendChild(messageDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        function getAIResponse(userMessage) {
            userMessage = userMessage.toLowerCase();

            if (userMessage.includes('anxious') || userMessage.includes('anxiety')) {
                return aiResponses.anxious;
            } else if (userMessage.includes('sleep') || userMessage.includes('tired')) {
                return aiResponses.sleep;
            } else if (userMessage.includes('stress') || userMessage.includes('stressed')) {
                return aiResponses.stress;
            } else if (userMessage.includes('lonely') || userMessage.includes('alone')) {
                return aiResponses.lonely;
            } else {
                return aiResponses.default;
            }
        }

        sendBtn.addEventListener('click', function () {
            const message = chatInput.value.trim();
            if (message) {
                addMessage(message, true);
                chatInput.value = '';

                setTimeout(() => {
                    addMessage(getAIResponse(message), false);
                }, 1000);
            }
        });

        quickBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const message = this.textContent;
                addMessage(message, true);

                setTimeout(() => {
                    addMessage(getAIResponse(message), false);
                }, 1000);
            });
        });

        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendBtn.click();
            }
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        setTimeout(() => {
            addMessage("Welcome to MindWell! I'm here to provide support and guidance. You can ask me about managing stress, anxiety, sleep issues, or anything else on your mind.", false);
        }, 1000);
    });

