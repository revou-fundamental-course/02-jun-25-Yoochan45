document.addEventListener("DOMContentLoaded", function() {
    // ===== KODE UNTUK SLIDER GAMBAR =====
    // Inisialisasi variabel untuk melacak slide yang aktif
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slide");

    // Fungsi untuk menampilkan slide tertentu dan menyembunyikan yang lain
    function showSlides(index) {
        // Sembunyikan semua slide terlebih dahulu
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        // Tampilkan slide yang dipilih
        slides[index].style.display = "block";
    }

    // Event listener untuk tombol previous
    document.querySelector(".prev").addEventListener("click", () => {
        // Kurangi index dan gunakan modulo untuk kembali ke slide terakhir jika di slide pertama
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlides(slideIndex);
    });

    // Event listener untuk tombol next
    document.querySelector(".next").addEventListener("click", () => {
        // Tambah index dan gunakan modulo untuk kembali ke slide pertama jika di slide terakhir
        slideIndex = (slideIndex + 1) % slides.length;
        showSlides(slideIndex);
    });

    // Tampilkan slide pertama saat halaman dimuat
    showSlides(slideIndex);
    
    // ===== KODE UNTUK EFEK METAL BOX =====
    // Tambahkan event listener ke semua metal-box untuk efek smooth scroll
    document.querySelectorAll('.metal-box').forEach(link => {
        link.addEventListener('click', function(e) {
            // Mencegah perilaku default link
            e.preventDefault();
            
            // Dapatkan ID target dari atribut href
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Jika elemen target ditemukan, scroll ke elemen tersebut dengan animasi halus
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop, // Posisi Y elemen target
                    behavior: 'smooth' // Animasi scroll halus
                });
            }
        });
    });
    
    // Panggil fungsi untuk setup form kontak
    setupContactForm();
});

// ===== KODE UNTUK FORM KONTAK =====
// Fungsi untuk menangani submit form dan menampilkan output
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const outputResult = document.getElementById('outputResult');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Mencegah form melakukan submit default
            e.preventDefault();
            
            // Ambil nilai dari input
            const name = document.getElementById('name').value;
            const email = document.getElementById('email') ? document.getElementById('email').value : '';
            const message = document.getElementById('message') ? document.getElementById('message').value : '';
            
            // Validasi form
            if (!name) {
                alert('Nama harus diisi!');
                return;
            }
            
            if (email && !validateEmail(email)) {
                alert('Email tidak valid!');
                return;
            }
            
            // Buat output HTML
            let outputHTML = '';
            
            // Tambahkan nama
            outputHTML += `
                <div class="output-item">
                    <strong>Nama:</strong> ${name}
                </div>
            `;
            
            // Tambahkan email jika ada
            if (email) {
                outputHTML += `
                    <div class="output-item">
                        <strong>Email:</strong> ${email}
                    </div>
                `;
            }
            
            // Tambahkan pesan jika ada
            if (message) {
                outputHTML += `
                    <div class="output-item">
                        <strong>Pesan:</strong> ${message}
                    </div>
                `;
            }
            
            // Tampilkan output di container form-output
            outputResult.innerHTML = outputHTML;
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Fungsi untuk validasi email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// ===== KODE UNTUK ANIMASI FADE-IN SAAT SCROLL =====
function setupScrollAnimations() {
    // Ambil semua elemen dengan class fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Fungsi untuk mengecek apakah elemen sudah terlihat di viewport
    function checkFade() {
        fadeElements.forEach(element => {
            // Dapatkan posisi elemen relatif terhadap viewport
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // Jarak elemen dari bawah viewport untuk trigger animasi
            
            // Jika elemen sudah terlihat, tambahkan class active
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }
    
    // Jalankan fungsi saat halaman dimuat dan saat scroll
    window.addEventListener('scroll', checkFade);
    checkFade();
}

// ===== KODE UNTUK TOMBOL SCROLL TO TOP =====
function setupScrollToTop() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    
    // Fungsi untuk mengecek posisi scroll
    function checkScrollPosition() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    }
    
    // Event listener untuk tombol scroll to top
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Jalankan fungsi saat scroll
    window.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition();
}

// ===== KODE UNTUK WELCOME MESSAGE =====
function setupWelcomeMessage() {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        // Prompt user for their name
        let name = prompt("Masukkan nama Anda:", "");
        
        // If user entered a name, display it
        if (name && name.trim() !== "") {
            userNameElement.textContent = name;
        }
    }
}

// Panggil semua fungsi setup saat DOM sudah dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi yang sudah ada
    setupContactForm();
    
    // Fungsi baru
    setupScrollAnimations();
    setupScrollToTop();
    setupWelcomeMessage();
});

// ===== KODE UNTUK HEADER INTERAKTIF =====
function setupHeader() {
    const header = document.querySelector('.sticky-header');
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Fungsi untuk mengubah tampilan header saat scroll
    function updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = '#1a365d';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = '#1e3a8a';
            header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        }
    }
    
    // Fungsi untuk toggle tema gelap/terang
    function toggleTheme() {
        themeToggle.classList.toggle('active');
        
        // Hanya ubah background utama
        if (themeToggle.classList.contains('active')) {
            document.body.style.backgroundColor = '#f5f5f5';
            document.body.style.backgroundImage = 'linear-gradient(to bottom right, #f5f5f5, #e0e0e0)';
        } else {
            document.body.style.backgroundColor = '#121212';
            document.body.style.backgroundImage = 'linear-gradient(to bottom right, #121212, #2d2d2d)';
        }
        
        // Animasi toggle icon
        const icon = themeToggle.querySelector('i');
        if (themeToggle.classList.contains('active')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Event listener untuk scroll
    window.addEventListener('scroll', updateHeaderOnScroll);
    
    // Event listener untuk theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Highlight menu aktif berdasarkan section yang sedang dilihat
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightActiveSection() {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
}

// Panggil fungsi setupHeader saat DOM sudah dimuat
document.addEventListener('DOMContentLoaded', function() {
    setupHeader();
});

// ===== KODE UNTUK MENU MOBILE =====
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        // Toggle menu saat tombol hamburger diklik
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Tutup menu saat link di klik
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Panggil fungsi setupMobileMenu saat DOM sudah dimuat
document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
});