// SPLASH SCREEN & HERO TYPING EFFECT
window.addEventListener('load', () => {
    // Jalankan efek transisi keluar untuk splash screen setelah 5 detik
    setTimeout(() => {
        const splash = document.getElementById('splash');
        if (splash) {
            splash.style.opacity = '0';
        }

        // Hilangkan splash screen sepenuhnya dari display setelah animasi fade-out (1 detik)
        setTimeout(() => {
            if (splash) {
                splash.style.display = 'none';
            }
            
            // 🔥 TRIGER UTAMA: Efek mengetik dimulai TEPAT setelah splash screen hilang sepenuhnya
            typeSentence();
        }, 1000);

    }, 5000);
});

// FUNGSI EFEK MENGETIK SENTENCE (HERO DESC)
const fullText = "Saya seorang Frontend dan Website Developer yang fokus pada pembuatan website modern, responsive, elegant, dan interaktif dengan pengalaman pengguna yang nyaman dan profesional.";
let index = 0;

function typeSentence() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return; // Mencegah error jika elemen tidak ditemukan

    if (index < fullText.length) {
        // Memasukkan karakter satu per satu
        typingElement.innerHTML += fullText.charAt(index);
        index++;
        setTimeout(typeSentence, 35); // Kecepatan mengetik 35ms per huruf
    } else {
        // Menghilangkan garis kursor ketik secara halus setelah pengetikan selesai
        typingElement.style.borderRight = "none";
    }
}

// TOGGLE GALLERY ORGANISASI
function showGallery(id, button) {
    const galleries = document.querySelectorAll('.gallery');
    galleries.forEach((gallery) => {
        gallery.classList.remove('active');
    });

    const targetGallery = document.getElementById(id);
    if (targetGallery) {
        targetGallery.classList.add('active');
    }

    const buttons = document.querySelectorAll('.organization-buttons button');
    buttons.forEach((btn) => {
        btn.classList.remove('active');
    });

    if (button) {
        button.classList.add('active');
    }
}

// SCROLL ANIMATION (INTERSECTION OBSERVER)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1 // Elemen akan terpicu jika minimal 10% areanya masuk ke dalam viewport
});

// 🔥 HANDLER FORMULIR KESAN & PESAN OTOMATIS (100% UTK EMAIL: rm932791@gmail.com)
document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Menahan halaman agar tidak refresh/pindah halaman

            // Mengubah teks tombol secara instan menjadi efek loading
            const submitBtn = document.querySelector('.btn-form-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Mengirim... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Membuat objek FormData untuk membungkus data isian HTML
            const formData = new FormData();
            formData.append("Nama Pengirim", document.getElementById('formName').value);
            formData.append("Email Pengirim", document.getElementById('formEmail').value);
            formData.append("Kesan & Pesan", document.getElementById('formMessage').value);

            // Mengirimkan data via AJAX Fetch ke endpoint email Anda di FormSubmit
            fetch("https://formsubmit.co", {
                method: "POST",
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // JIKA PENGIRIMAN SUKSES
                alert('Terima kasih! Kesan & pesan Anda telah otomatis terkirim langsung ke email Rifki.');
                feedbackForm.reset(); // Kosongkan kembali seluruh input form
            })
            .catch(error => {
                // JIKA TERJADI ERROR (TERMASUK BLOKIR FILE LOKAL CORS)
                console.error('Error:', error);
                
                // Solusi Cadangan Otomatis jika dijalankan offline: Buka tab baru pengiriman langsung
                alert('Mengirim via sistem cadangan aman... Silakan klik "Allow/Izinkan" jika muncul tab baru.');
                
                const fallbackForm = document.createElement('form');
                fallbackForm.method = 'POST';
                fallbackForm.action = 'https://formsubmit.co';
                
                // Duplikasi data ke form cadangan
                for (let [key, value] of formData.entries()) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = value;
                    fallbackForm.appendChild(input);
                }
                
                document.body.appendChild(fallbackForm);
                fallbackForm.submit();
            })
            .finally(() => {
                // Mengembalikan teks tombol seperti semula
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
});

const hidden = document.querySelectorAll('.fade-up, .fade-in');
hidden.forEach((el) => observer.observe(el));
