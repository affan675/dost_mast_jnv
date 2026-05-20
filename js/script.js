/* ============================================
   script.js – JNV Ke Badmash Interactive Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔥 Hostel underground network activated.');
    console.log('👀 "Jo suspend nahi hota, woh kya jaanta hai maza?" – Affan');

    // ======================
    // 1. RIVALRY SLIDER
    // ======================
    const slider = document.getElementById('rivalry-slider');
    const sliderFill = document.getElementById('slider-fill');
    const rivalryValue = document.getElementById('rivalry-value');
    const rivalryMessage = document.getElementById('rivalry-message');

    const messages = {
        low: '💀 "Bhai ne laptop chhupake suspension kha li. Respect."',
        mid: '😈 "Dono milkar hostel ki nakaam koshish kar rahe."',
        high: '🔥 "Vice captain abhi tak pakda nahi gaya – isliye zyada dangerous."'
    };

    function updateRivalry(value) {
        const percent = parseInt(value, 10);
        // Update fill width
        sliderFill.style.width = percent + '%';
        // Update numeric display
        rivalryValue.textContent = percent;

        // Update message based on range
        let message;
        if (percent <= 20) {
            message = messages.low;
        } else if (percent <= 80) {
            message = messages.mid;
        } else {
            message = messages.high;
        }
        rivalryMessage.textContent = message;
    }

    // Initialize
    updateRivalry(slider.value);

    slider.addEventListener('input', (e) => {
        updateRivalry(e.target.value);
    });

    // ======================
    // 2. RANDOM QUOTE GENERATOR
    // ======================
    const quoteBtn = document.getElementById('quote-btn');
    const quoteDisplay = document.getElementById('quote-display');

    const quotes = [
        '"Jo suspend nahi hota, woh kya jaanta hai maza? – Affan"',
        '"Bhai, Bangla mein bolunga toh teacher samjhegi nahi, tu samajh jaana. – Chayan"',
        '"Meri suspension ek story hai. Tumhari poori attendance ek footnote. – Affan"',
        '"Main vice hoon, par main bhi kabhi kabhi main ban jaata hoon. – Chayan"',
        '"Suspended 2 din – ghar pe aaram, school mein badnaami. Balance. – Affan"',
        '"Rahit ne complain kiya. Ab woh apni complain pe ro raha hai. – Anonymous"'
    ];

    quoteBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selectedQuote = quotes[randomIndex];
        quoteDisplay.querySelector('.quotes__text').textContent = selectedQuote;

        // Fun console log
        console.log('📜 Farmaan jaari: ' + selectedQuote);

        // Add brief animation class (optional)
        quoteDisplay.classList.add('quote-flash');
        setTimeout(() => {
            quoteDisplay.classList.remove('quote-flash');
        }, 300);
    });

    // ======================
    // 3. GUEST BOOK (dynamic injection)
    // ======================
    const guestbookGrid = document.getElementById('guestbook-grid');

    const comments = [
        { name: 'Mohajjub', text: '"Affan bhai laptop dedo, main bhi suspend hona chahta hoon."' },
        { name: 'Lisan', text: '"Animation nahi daali iss website mein? Main daal deta, par Affan ne bola \'baad mein\'."' },
        { name: 'Swarup', text: '"Design thoda \'hostel jail\' jaisa hai. Mujhe budget nahi diya Affan ne."' },
        { name: 'Irfan', text: '"Yeh dono captain hai? Main toh sochta tha hostel ka asli captain warden hai."' },
        { name: 'Rahit', text: '"Maine complain kiya tha laptop ke baare mein. Ab meri izzat ki bhi complain ho gayi."' }
    ];

    function renderGuestbook() {
        if (!guestbookGrid) return;

        guestbookGrid.innerHTML = ''; // Clear placeholder

        comments.forEach(comment => {
            const card = document.createElement('div');
            card.className = 'comment-card';
            card.innerHTML = `
                <div class="comment__author">${comment.name}</div>
                <p class="comment__text">${comment.text}</p>
            `;
            guestbookGrid.appendChild(card);
        });

        console.log('📝 Guest book signatures loaded – Rahit ka revenge abhi baki hai.');
    }

    renderGuestbook();

    // ======================
    // 3.5 WARDEN RADAR ALERTS
    // ======================
    const alerts = [
        "🚨 WARDEN RADAR: Checking 3rd Floor! Hide the laptops!",
        "📢 ANNOUNCEMENT: Mess mein paneer khatam ho gaya.",
        "⚠️ ALERT: Rahit is near the staff room. Stay alert.",
        "🔥 VIBE CHECK: Affan and Chayan are planning something big.",
        "🤫 WHISPER: Principal sir ka mood kharab hai aaj."
    ];

    function showWardenAlert() {
        const alertBox = document.createElement('div');
        alertBox.className = 'warden-alert';
        alertBox.textContent = alerts[Math.floor(Math.random() * alerts.length)];
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.classList.add('fade-out');
            setTimeout(() => alertBox.remove(), 500);
        }, 4000);
    }

    // Show an alert every 15-30 seconds
    setInterval(showWardenAlert, Math.random() * (30000 - 15000) + 15000);

    // ======================
    // 4. RAHIT'S REVENGE TRIGGER
    // ======================
    const rahitTrigger = document.querySelector('.footer__highlight');
    let clickCount = 0;

    if (rahitTrigger) {
        rahitTrigger.style.cursor = 'pointer';
        rahitTrigger.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 5) {
                alert("🚨 RAHIT'S REVENGE ACTIVATED! 🚨\n\n'Ab principal sir ko sab bataunga!'");
                window.location.href = 'game.html';
                clickCount = 0;
            } else {
                console.log(`Revenge progress: ${clickCount}/5`);
            }
        });
    }

    // Small style addition for quote flash (optional class)
    const style = document.createElement('style');
    style.textContent = `
        .quote-flash {
            animation: quotePop 0.3s ease-out;
        }
        @keyframes quotePop {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); background-color: rgba(255,140,0,0.15); }
            100% { transform: scale(1); }
        }
        .warden-alert {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4d4d;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-family: 'Poppins', sans-serif;
            font-weight: bold;
            z-index: 9999;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            animation: slideIn 0.5s ease-out;
        }
        .fade-out { opacity: 0; transition: opacity 0.5s; }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
    `;
    document.head.appendChild(style);
});