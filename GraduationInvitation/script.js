document.addEventListener('DOMContentLoaded', () => {

    const customMessages={
        "kim hảo": "Cuối cùng ngày này cũng đến! Mình rất mong bạn có thể đến chung vui và lưu giữ khoảnh khắc đáng nhớ cùng mình."
    };

    const randomMessages=[
        "Chặng đường đại học sắp khép lại. Mình rất mong bạn có thể đến chung vui và lưu giữ khoảnh khắc đáng nhớ cùng mình.",
        "Một chặng đường dài đã qua, và ngày nhận bằng sẽ không thể trọn vẹn nếu thiếu đi sự hiện diện của bạn.",
        "Thanh xuân của mình rực rỡ hơn nhờ có những người bạn tuyệt vời như cậu. Hãy đến chung vui trong ngày đặc biệt này nhé!",
        "Cầm tấm bằng trên tay, người mình muốn chia sẻ niềm vui này nhất chính là cậu. Hẹn gặp cậu ở buổi lễ nhé!"
    ]

    const customThankYou={
        "kim hảo": "Cảm ơn bạn đã đến và làm cho ngày tốt nghiệp của mình trở nên đặc biệt hơn. Sự hiện diện của bạn là món quà quý giá nhất mà mình có thể nhận được."
    }

    const randomThankYou=[
        "Cảm ơn bạn đã đến và làm cho ngày tốt nghiệp của mình trở nên đặc biệt hơn. Sự hiện diện của bạn là món quà quý giá nhất mà mình có thể nhận được.",
        "Cảm ơn bạn đã đồng hành cùng mình trong chặng đường đại học. Sự hiện diện của bạn là nguồn động lực lớn lao cho mình.",
        "Một ngày đặc biệt như thế này sẽ không thể trọn vẹn nếu thiếu đi sự hiện diện của bạn. Cảm ơn bạn đã luôn ở bên cạnh.",
        "Sự hiện diện của bạn là món quà tuyệt vời nhất trong ngày vui của mình. Trân trọng cảm ơn bạn!",
        "Cảm ơn bạn đã đến và tạo nên những kỷ niệm tuyệt đẹp trong lễ tốt nghiệp của mình.",
        "Thật trân quý tình cảm bạn đã dành cho mình. Cảm ơn bạn vì đã trở thành một phần của ngày đặc biệt này."
    ]

    // =========================================
    // 1. LOGIC LẤY TÊN KHÁCH MỜI TỪ URL
    // =========================================
    // Đọc URL, ví dụ: index.html?to=Kim Hảo
    const urlParams = new URLSearchParams(window.location.search);
    const rawGuestName = urlParams.get('to');
    
    const nameElement = document.getElementById('guest-name');
    const messageElement = document.getElementById('invitation-message');
    const thankYouElement = document.getElementById('thankyou-message');

    if (rawGuestName) {
        // Nếu có tham số 'to' trên URL, thay thế nội dung thẻ span
        nameElement.textContent = rawGuestName;

        const normalizedName = rawGuestName.trim().toLowerCase();

        if (customMessages[normalizedName]) {
            messageElement.textContent = customMessages[normalizedName];
        } 
        else {
            const randomIndex = Math.floor(Math.random() * randomMessages.length);
            messageElement.textContent = randomMessages[randomIndex];
        }

        if (customThankYou[normalizedName]) {
            thankYouElement.textContent = customThankYou[normalizedName];
        } 
        else {
            const randomIndex = Math.floor(Math.random() * randomThankYou.length);
            thankYouElement.textContent = randomThankYou[randomIndex];
        }
    }
    else {
        const randomMsgIndex = Math.floor(Math.random() * randomMessages.length);
        messageElement.textContent = randomMessages[randomMsgIndex];
        
        const randomTYIndex = Math.floor(Math.random() * randomThankYou.length);
        thankYouElement.textContent = randomThankYou[randomTYIndex];
    }

    // =========================================
    // 2. LOGIC LẬT TRANG
    // =========================================
    const pages = document.querySelectorAll('.page');
    const book = document.getElementById('book');
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    
    let isAnimating = false; 
    let currentFlippedIndex = -1;

    pages.forEach((page, index) => {
        page.style.zIndex = pages.length - index;

        page.addEventListener('click', () => {
            if (isAnimating) return; 

            if (!page.classList.contains('flipped')) {
                // LẬT SANG TRÁI
                if (index === currentFlippedIndex + 1) {
                    isAnimating = true;
                    page.classList.add('flipped');
                    
                    setTimeout(() => {
                        page.style.zIndex = index;
                    }, 600);
                    
                    currentFlippedIndex++;
                    setTimeout(() => { isAnimating = false; }, 1200); 
                }
            } else {
                // LẬT SANG PHẢI
                if (index === currentFlippedIndex) {
                    isAnimating = true;
                    page.classList.remove('flipped');
                    
                    setTimeout(() => {
                        page.style.zIndex = pages.length - index;
                    }, 600);
                    
                    currentFlippedIndex--;
                    setTimeout(() => { isAnimating = false; }, 1200);
                }
            }

            // --- CẬP NHẬT LOGIC CANH GIỮA TẠI ĐÂY ---
            if (currentFlippedIndex === -1) {
                // Đang đóng ở bìa trước
                book.classList.remove('is-open', 'is-closed-back');
            } else if (currentFlippedIndex === pages.length - 1) {
                // Đã lật hết các trang (Đang đóng ở bìa sau)
                book.classList.remove('is-open');
                book.classList.add('is-closed-back');
            } else {
                // Đang mở ở các trang giữa
                book.classList.add('is-open');
                book.classList.remove('is-closed-back');
            }
        });
    });

    // =========================================
    // 3. XỬ LÝ NÚT ÂM NHẠC
    // =========================================
    let isPlaying = false;
    bgMusic.volume = 0.4; 

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '🎵 Bật Nhạc';
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play();
            musicBtn.innerHTML = '⏸ Tắt Nhạc';
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
});