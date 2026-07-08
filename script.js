document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Loading Screen & GSAP Animation
    // ==========================================
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Animasi konten Hero muncul setelah loading selesai
            if (typeof gsap !== 'undefined') {
                gsap.to('.hero-content', {duration: 1.5, opacity: 1, y: 0, ease: 'power3.out'});
            }
        }, 500);
    }, 1500);

    // ==========================================
    // 2. Initialize AOS (Scroll Animations)
    // ==========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            once: true, 
            offset: 100, 
            duration: 800 
        });
    }

    // ==========================================
    // 3. Navbar Scroll Effect (Bistro Style)
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        
        if (winScroll > 50) {
            // Saat di-scroll: Background gelap pekat, padding mengecil
            navbar.classList.add('bg-bistro-dark', 'shadow-lg', 'py-2', 'border-bistro-gold/20');
            navbar.classList.remove('bg-transparent', 'py-4', 'border-white/10');
        } else {
            // Saat di atas: Transparan kembali
            navbar.classList.remove('bg-bistro-dark', 'shadow-lg', 'py-2', 'border-bistro-gold/20');
            navbar.classList.add('bg-transparent', 'py-4', 'border-white/10');
        }
    });

    // ==========================================
    // 4. Mobile Menu Toggle
    // ==========================================
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
    });

    // Tutup menu mobile jika salah satu link diklik
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
        });
    });

    // ==========================================
    // 5. Counter Animation (Angka Berjalan)
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const countUp = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 50; // Kecepatan counter

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(countUp, 30);
            } else {
                counter.innerText = target + "+"; // Tambahkan plus di akhir
            }
        });
    };

    window.addEventListener('scroll', () => {
        const counterSection = document.getElementById('tentang');
        if (!counterSection) return;
        
        const sectionPos = counterSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        // Jalankan counter hanya ketika section 'Tentang Kami' terlihat di layar
        if (sectionPos < screenPos && !hasCounted) {
            countUp();
            hasCounted = true;
        }
    });

    // ==========================================
    // 6. Data Menu & Render HTML (List Style)
    // ==========================================
    // Data default jika LocalStorage kosong
    const defaultMenu = [
        { id: 1, category: 'bakar', name: 'Ayam Bakar Gurih (Ori)', desc: 'Ayam bakar berbumbu legit dengan cita rasa klasik khas Tjendana.', price: 25000, img: 'https://images.unsplash.com/photo-1626804475297-4160bbce551e?w=500&q=80' },
        { id: 2, category: 'goreng', name: 'Ayam Goreng Gurih (Ori)', desc: 'Ayam goreng dengan kerenyahan klasik, menu signature yang selalu disukai.', price: 25000, img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80' },
        { id: 3, category: 'kukus', name: 'Ayam Kukus Gurih (Ori)', desc: 'Ayam kukus lembut nan halus, memikat lidah sejak suapan pertama.', price: 25000, img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80' },
        { id: 4, category: 'sate', name: 'Sate Kulit Jumbo Bumbu Kacang', desc: 'Sate kulit tebal digoreng garing, disiram dengan bumbu kacang rahasia.', price: 23000, img: 'https://images.unsplash.com/photo-1548943487-a2e4f43b4853?w=500&q=80' }
    ];

    // Simpan ke LocalStorage jika belum ada
    if (!localStorage.getItem('tjendana_menu')) {
        localStorage.setItem('tjendana_menu', JSON.stringify(defaultMenu));
    }

    // Format mata uang Rupiah
    const formatRp = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
    };

    // Render Menu ke dalam container
    const renderMenuFrontEnd = () => {
        const container = document.getElementById('menu-container');
        if (!container) return; // Mencegah error jika dipanggil di halaman admin
        
        const menus = JSON.parse(localStorage.getItem('tjendana_menu')) || defaultMenu;
        container.innerHTML = '';

        menus.forEach((menu, i) => {
            container.innerHTML += `
                <div class="menu-list-item flex items-center py-6" data-aos="fade-up" data-aos-delay="${(i % 4) * 100}">
                    <img src="${menu.img}" alt="${menu.name}" class="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full shadow-md border-2 border-bistro-light mr-6">
                    <div class="flex-grow">
                        <div class="flex justify-between items-end mb-1 border-b border-gray-200 pb-2">
                            <h3 class="font-playfair text-xl md:text-2xl font-bold text-bistro-dark">${menu.name}</h3>
                            <span class="font-poppins font-semibold text-bistro-brown text-lg whitespace-nowrap ml-4">${formatRp(menu.price)}</span>
                        </div>
                        <p class="text-gray-500 text-sm font-light mt-2 leading-relaxed">${menu.desc}</p>
                    </div>
                </div>
            `;
        });
    };

    // Jalankan render menu
    renderMenuFrontEnd();
});

// ==========================================
// 7. Lightbox / Pop-up E-Menu (Global Functions)
// ==========================================
window.openEMenu = () => {
    const modal = document.getElementById('emenu-lightbox');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => modal.classList.remove('opacity-0'), 10);
    document.body.style.overflow = 'hidden'; // Kunci scroll layar belakang
};

window.closeEMenu = () => {
    const modal = document.getElementById('emenu-lightbox');
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300);
    document.body.style.overflow = 'auto'; // Buka scroll layar belakang
};