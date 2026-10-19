/* ==========================================================================
   RK CAPOTARIA E REVESTIMENTOS AUTOMOTIVOS - JAVASCRIPT VANILLA
   High Performance, Interactivity & WhatsApp High Conversion Architecture
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. PRELOADER --- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 400);
    });
  }

  /* --- 1.5 HERO VIDEO AUTOPLAY ASSURANCE & FEATURED VIDEO PLAYER --- */
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    heroVideo.play().catch(err => {
      console.log('Video autoplay fallback handled:', err);
    });
  }

  // --- 360 INTERACTIVE VIEWER ---
  const viewer360 = document.getElementById('viewer360');
  const viewer360Image = document.getElementById('viewer360Image');
  const viewer360Hint = document.getElementById('viewer360Hint');
  
  if (viewer360 && viewer360Image) {
    const images360 = [
      '/src/assets/images/seat_360_1_1785493876975.jpg',
      '/src/assets/images/seat_360_2_1785493888777.jpg',
      '/src/assets/images/seat_360_3_1785493901303.jpg',
      '/src/assets/images/seat_360_4_1785493911530.jpg',
      '/src/assets/images/seat_360_5_1785493922755.jpg',
      '/src/assets/images/seat_360_6_1785493933429.jpg',
      '/src/assets/images/seat_360_7_1785493946109.jpg',
      '/src/assets/images/seat_360_8_1785493956987.jpg'
    ];

    // Preload images
    images360.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    let isDragging = false;
    let startX = 0;
    let currentFrame = 0;
    const totalFrames = images360.length;
    // Pixels to move to change one frame
    const sensitivity = 30; 

    const startDrag = (clientX) => {
      isDragging = true;
      startX = clientX;
      if (viewer360Hint) viewer360Hint.classList.add('interacting');
    };

    const onDrag = (clientX) => {
      if (!isDragging) return;
      const dx = clientX - startX;
      
      // Calculate how many frames to advance based on movement
      if (Math.abs(dx) > sensitivity) {
        const frameShift = Math.floor(dx / sensitivity);
        // Determine new frame with wrap around
        let nextFrame = (currentFrame - frameShift) % totalFrames;
        if (nextFrame < 0) nextFrame += totalFrames;
        
        viewer360Image.src = images360[nextFrame];
        
        // Reset startX for next delta calculation
        startX = clientX;
        currentFrame = nextFrame;
      }
    };

    const endDrag = () => {
      isDragging = false;
    };

    // Mouse Events
    viewer360.addEventListener('mousedown', (e) => startDrag(e.clientX));
    window.addEventListener('mousemove', (e) => onDrag(e.clientX));
    window.addEventListener('mouseup', endDrag);

    // Touch Events
    viewer360.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX));
    window.addEventListener('touchmove', (e) => onDrag(e.touches[0].clientX));
    window.addEventListener('touchend', endDrag);
  }

  /* --- 2. READING PROGRESS BAR & HEADER SCROLL --- */
  const progressBar = document.getElementById('progressBar');
  const header = document.getElementById('mainHeader');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (header) {
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- 3. MOBILE MENU TOGGLE --- */
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  /* --- 4. ANIMATED COUNTERS --- */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = `${prefix}${Math.floor(current).toLocaleString('pt-BR')}${suffix}`;
    }, stepTime);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => counterObserver.observe(num));

  /* --- 5. SCROLL REVEAL ANIMATIONS --- */
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => revealObserver.observe(el));

  /* --- 6. GALLERY CATEGORY FILTER & LIGHTBOX --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Lightbox click trigger
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title')?.textContent || 'RK Capotaria';
      const tag = item.querySelector('.gallery-tag')?.textContent || '';

      if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = `${tag} — ${title}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /* --- 7. TESTIMONIALS SLIDER --- */
  const track = document.getElementById('testimonialTrack');
  const slides = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dotsContainer = document.getElementById('sliderDots');

  if (track && slides.length > 0) {
    let currentIndex = 0;
    let autoSlideInterval;

    // Create dots
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer?.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
      resetAutoSlide();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    startAutoSlide();

    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', startAutoSlide);
  }

  /* --- 8. FAQ ACCORDION --- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* --- 9. WHATSAPP QUOTE FORM SUBMISSION --- */
  const quoteForm = document.getElementById('quoteForm');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const vehicle = document.getElementById('formVehicle').value.trim();
      const service = document.getElementById('formService').value;
      const message = document.getElementById('formMessage').value.trim();

      const whatsappNumber = '5581997543276';

      const text = `*SOLICITAÇÃO DE ORÇAMENTO — RK CAPOTARIA*

*Nome:* ${name}
*Telefone:* ${phone}
*Veículo:* ${vehicle}
*Serviço Desejado:* ${service}
*Observações:* ${message || 'Não informado'}

Olá! Gostaria de receber um orçamento para o meu veículo.`;

      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

      window.open(whatsappUrl, '_blank');
    });
  }

  /* --- 10. CONTRATAR SERVIÇOS & ORÇAMENTO INSTANTÂNEO ENGINE --- */

  // Services Catalog Database
  const servicesData = [
    // Category 1: Volantes
    { id: 'vol_pop', cat: 'volantes', name: 'Volante — Carros Populares', desc: 'Revestimento artesanal sob medida para modelos populares.', price: 200, badge: 'Popular' },
    { id: 'vol_luxo', cat: 'volantes', name: 'Volante — Carros Luxo', desc: 'Acabamento premium em couro/alcântara para sedãs e SUVs de luxo.', price: 250, badge: 'Premium' },
    { id: 'vol_cam', cat: 'volantes', name: 'Volante — Caminhões', desc: 'Couro reforçado e linha de alta durabilidade para veículos pesados.', price: 250, badge: 'Linha Pesada' },
    { id: 'vol_mod_ltz', cat: 'volantes', name: 'Modelo Personalizado LTZ', desc: 'Estilo LTZ com costura dupla elegante.', price: 0, badge: 'Cortesia Padrão' },
    { id: 'vol_mod_rk', cat: 'volantes', name: 'Modelo Personalizado RK Premium', desc: 'Design exclusivo RK com pegada esportiva anatômica.', price: 50 },
    { id: 'vol_mod_dia', cat: 'volantes', name: 'Modelo Personalizado Diamante', desc: 'Costura no padrão matelassê em losangos diamantados.', price: 50 },
    { id: 'vol_mod_col', cat: 'volantes', name: 'Modelo Personalizado Colmeia', desc: 'Textura e costura no refinado padrão colmeia esportivo.', price: 400, badge: 'Top Esportivo' },
    { id: 'vol_mod_par', cat: 'volantes', name: 'Modelo Personalizado Paris', desc: 'Costura em cruz sobreposta estilo europeu.', price: 50 },
    { id: 'vol_mod_ss', cat: 'volantes', name: 'Modelo Personalizado Super Sport', desc: 'Design de alta performance com tarja central em couro colorido.', price: 300, badge: 'Super Sport' },
    { id: 'vol_mod_jet', cat: 'volantes', name: 'Modelo Personalizado Jetta', desc: 'Costura alemã com moldagem exata estilo linha VW TSI/GTI.', price: 50 },
    { id: 'vol_mod_bmw', cat: 'volantes', name: 'Modelo Personalizado BMW X7', desc: 'Estilo M Performance com três cores de linha artesanais.', price: 50 },
    { id: 'vol_mod_bor', cat: 'volantes', name: 'Logo Bordada no Volante', desc: 'Bordado computadorizado da marca ou emblema do veículo.', price: 70 },
    { id: 'vol_rep_fer', cat: 'volantes', name: 'Reparo de Ferragem do Volante', desc: 'Restauração da borracha solta ou estrutura interna da ferragem.', price: 150 },

    // Category 2: Bancos Automotivos
    { id: 'banco_pop_eco', cat: 'bancos', name: 'Bancos Populares — Couro Ecológico', desc: 'Jogo completo de bancos revestidos em Couro Ecológico Premium.', price: 1300, badge: 'Custo-Benefício' },
    { id: 'banco_pop_ani', cat: 'bancos', name: 'Bancos Populares — Couro Animal / Legítimo', desc: 'Jogo completo em Couro 100% Animal de alta nobreza e durabilidade.', price: 3500, badge: 'Couro Nobre' },
    { id: 'banco_pop_mis', cat: 'bancos', name: 'Bancos Populares — Misto', desc: 'Combinação estratégica de Couro Animal nas áreas de contato e ecológico nas laterais.', price: 3000 },

    { id: 'banco_lux_eco', cat: 'bancos', name: 'Padrão Luxo — Couro Ecológico', desc: 'BMW, Mercedes, Audi, Porsche, Volvo, Land Rover, Lexus, Jaguar, Tesla — Couro Ecológico.', price: 1500 },
    { id: 'banco_lux_ani', cat: 'bancos', name: 'Padrão Luxo — Couro Animal / Legítimo', desc: 'BMW, Mercedes, Audi, Porsche, Volvo, Land Rover, Lexus, Jaguar, Tesla — Couro 100% Animal.', price: 3500, badge: 'Coleção Luxo' },
    { id: 'banco_lux_mis', cat: 'bancos', name: 'Padrão Luxo — Misto', desc: 'BMW, Mercedes, Audi, Porsche, Volvo, Land Rover, Lexus, Jaguar, Tesla — Revestimento Misto.', price: 3000 },

    // Category 4: Revestimentos
    { id: 'rev_teto', cat: 'revestimentos', name: 'Revestimento de Teto (Forração)', desc: 'Troca do tecido e espuma do teto para todos os tipos de veículos.', price: 1000, badge: 'Garantia de Antidescolamento' },
    { id: 'rev_porta_gol', cat: 'revestimentos', name: 'Porta Especifica — Gol', desc: 'Revestimento das 4 laterais de porta do Gol.', price: 500 },
    { id: 'rev_porta_corsa', cat: 'revestimentos', name: 'Porta Especifica — Corsa', desc: 'Revestimento das 4 laterais de porta do Corsa.', price: 500 },
    { id: 'rev_porta_palio', cat: 'revestimentos', name: 'Porta Especifica — Palio', desc: 'Revestimento das 4 laterais de porta do Palio.', price: 500 },
    { id: 'rev_porta_astra', cat: 'revestimentos', name: 'Porta Especifica — Astra', desc: 'Revestimento das 4 laterais de porta do Astra.', price: 500 },
    { id: 'rev_porta_idea', cat: 'revestimentos', name: 'Porta Especifica — Idea', desc: 'Revestimento das 4 laterais de porta do Fiat Idea.', price: 500 },
    { id: 'rev_porta_fluence', cat: 'revestimentos', name: 'Porta Especifica — Renault Fluence', desc: 'Revestimento das 4 laterais de porta do Fluence.', price: 500 },
    { id: 'rev_porta_bmw', cat: 'revestimentos', name: 'Porta Especifica — BMW', desc: 'Revestimento das laterais de porta para modelos BMW.', price: 500 },
    { id: 'rev_porta_sw4', cat: 'revestimentos', name: 'Porta Especifica — Hilux SW4', desc: 'Revestimento das laterais de porta para SW4.', price: 500 },
    { id: 'rev_porta_pop', cat: 'revestimentos', name: 'Portas — Demais Veículos Populares', desc: 'Revestimento do jogo de laterais de porta.', price: 300 },
    { id: 'rev_piso', cat: 'revestimentos', name: 'Piso / Assoalho - Veículos Populares e Luxo', desc: 'Forração total do assoalho para proteção contra líquidos e sujeira.', price: 1200 },
    { id: 'rev_coifa', cat: 'revestimentos', name: 'Coifa de Marcha', desc: 'Troca da coifa em couro com costura personalizada.', price: 100 },
    { id: 'rev_farois', cat: 'revestimentos', name: 'Revitalização de Faróis (Par)', desc: 'Restauração do acrílico, remoção de amarelado e aplicação de verniz UV.', price: 250 },

    // Category 5: Linha Náutica
    { id: 'nau_bancos', cat: 'nautica', name: 'Revestimento completo para Barcos', desc: 'Revestimento com couro sintético antimofo náutico resistente ao sol e sal.', price: null, badge: 'Proteção UV Náutica' },
    { id: 'nau_compl', cat: 'nautica', name: 'Revestimento completo para Jetski', desc: 'Estofamento total para lanchas e embarcações com costura reforçada.', price: null, badge: 'Projeto Master' },
    { id: 'nau_estof', cat: 'nautica', name: 'Revestimento completo para iate', desc: 'Almofadas e assentos de proa/popa impermeáveis.', price: null },
    { id: 'nau_capas', cat: 'nautica', name: 'Revestimento completo para Lanchas', desc: 'Capa sob medida impermeável para proteção de jet ski ou embarcações.', price: null },
    { id: 'nau_pers', cat: 'nautica', name: 'Revestimento completo para Jeep', desc: 'Bordados computadorizados e detalhes estilizados no estofado marítimo.', price: null },
    { id: 'nau_painel', cat: 'nautica', name: 'Revestimento completo para Buggy', desc: 'Revestimento e restauração de solário e painel de instrumentos.', price: null },
    { id: 'nau_outros', cat: 'nautica', name: 'Outros Serviços Náuticos', desc: 'Serviços náuticos customizados sob orçamento.', price: null },

    // Category 6: Linha Residencial
    { id: 'res_sofa', cat: 'residencial', name: 'Reforma de Sofá', desc: 'Troca de tecido, espuma e estrutura para sofás de 2 a 4 lugares.', price: null, badge: 'Tecidos Nobres' },
    { id: 'res_poltrona', cat: 'residencial', name: 'Reforma de Poltrona', desc: 'Restauração de poltronas de amamentação, papai ou decoração.', price: null },
    { id: 'res_cabeceira', cat: 'residencial', name: 'Cabeceira de Cama Estofada', desc: 'Confecção ou reforma de cabeceiras moduladas ou em capitonê.', price: null },
    { id: 'res_cadeira', cat: 'residencial', name: 'Revestimento de Cadeira (Unidade)', desc: 'Estofamento para cadeiras de jantar ou escritório.', price: null },
    { id: 'res_banco', cat: 'residencial', name: 'Revestimento de Banco Residencial', desc: 'Acabamento estofado para bancos de madeira ou banquetas.', price: null },
    { id: 'res_puff', cat: 'residencial', name: 'Puff Estofado Personalizado', desc: 'Confecção ou reforma de puffs em couro ou linho.', price: null },
    { id: 'res_almofada', cat: 'residencial', name: 'Almofadas Decorativas (Unidade)', desc: 'Almofadas customizadas sob medida.', price: null },
    { id: 'res_outros', cat: 'residencial', name: 'Outros Estofados Residencias', desc: 'Serviços estofados residenciais sob demanda.', price: null }
  ];

  // Cart State Store
  const cartState = new Map(); // id -> { id, name, price, qty, cat }
  let currentActiveCategory = 'volantes';
  let selectedPaymentMethod = 'PIX (5% de Desconto)';

  // DOM Elements
  const categoryTabsContainer = document.getElementById('categoryTabs');
  const servicesCatalogWrapper = document.getElementById('servicesCatalogWrapper');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartCountBadge = document.getElementById('cartCountBadge');
  const summarySubtotalEl = document.getElementById('summarySubtotal');
  const discountRow = document.getElementById('discountRow');
  const summaryDiscountEl = document.getElementById('summaryDiscount');
  const summaryTotalEl = document.getElementById('summaryTotal');
  const summaryInstallmentNote = document.getElementById('summaryInstallmentNote');
  const btnSubmitWhatsapp = document.getElementById('btnSubmitWhatsapp');
  const btnClearCart = document.getElementById('btnClearCart');
  const mobileStickyCartBar = document.getElementById('mobileStickyCartBar');
  const mobileCartQty = document.getElementById('mobileCartQty');
  const mobileCartTotal = document.getElementById('mobileCartTotal');
  const btnMobileSubmitWhatsapp = document.getElementById('btnMobileSubmitWhatsapp');
  const installmentsBox = document.getElementById('installmentsBox');
  const installmentSelect = document.getElementById('installmentSelect');
  const installmentCalcDisplay = document.getElementById('installmentCalcDisplay');
  const clientPhoneInput = document.getElementById('clientPhone');

  // Format Currency
  function formatBRL(val) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  }

  // Automatic Phone Masking (81) 99999-9999
  if (clientPhoneInput) {
    clientPhoneInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.substring(0, 11);
      if (v.length > 10) {
        v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (v.length > 6) {
        v = v.replace(/^(\d{2})(\d{4,5})(\d{0,4})$/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
      } else if (v.length > 0) {
        v = v.replace(/^(\d*)$/, '($1');
      }
      e.target.value = v;
    });
  }

  // Render Category Catalog
  function renderCatalog(cat) {
    currentActiveCategory = cat;
    const filteredServices = servicesData.filter(s => s.cat === cat);

    if (!servicesCatalogWrapper) return;

    if (filteredServices.length === 0) {
      servicesCatalogWrapper.innerHTML = `<div class="empty-catalog">Nenhum serviço encontrado para esta categoria.</div>`;
      return;
    }

    let html = `<div class="services-items-grid">`;
    filteredServices.forEach(item => {
      const cartItem = cartState.get(item.id);
      const currentQty = cartItem ? cartItem.qty : 1;
      const isInCart = Boolean(cartItem);

      html += `
        <div class="service-catalog-card ${isInCart ? 'item-in-cart' : ''}" data-service-id="${item.id}">
          ${item.badge ? `<span class="service-badge-tag">${item.badge}</span>` : ''}
          <div class="service-card-body">
            <h4 class="service-card-title">${item.name}</h4>
            <p class="service-card-desc">${item.desc}</p>
          </div>
          <div class="service-card-footer">
            <div class="service-price-tag">
              <span class="price-val">${(item.price === null || item.price === undefined) ? 'Sob consulta' : (item.price === 0 ? 'Gratuito' : formatBRL(item.price))}</span>
            </div>
            <div class="service-controls">
              <div class="qty-control-box">
                <button type="button" class="qty-btn btn-qty-minus" data-id="${item.id}" aria-label="Diminuir">-</button>
                <input type="number" class="qty-input" id="input_qty_${item.id}" value="${currentQty}" min="1" max="20" readonly />
                <button type="button" class="qty-btn btn-qty-plus" data-id="${item.id}" aria-label="Aumentar">+</button>
              </div>
              <button type="button" class="btn btn-gold btn-add-service ${isInCart ? 'added' : ''}" data-id="${item.id}">
                ${isInCart ? '✓ Adicionado' : '+ Adicionar'}
              </button>
            </div>
          </div>
        </div>
      `;
    });
    html += `</div>`;

    servicesCatalogWrapper.innerHTML = html;

    // Attach catalog button listeners
    attachCatalogEventListeners();
  }

  // Event listeners inside the catalog
  function attachCatalogEventListeners() {
    // Quantity Plus/Minus
    document.querySelectorAll('.btn-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const input = document.getElementById(`input_qty_${id}`);
        if (input) {
          let val = parseInt(input.value, 10) || 1;
          val++;
          input.value = val;
          if (cartState.has(id)) {
            updateCartQty(id, val);
          }
        }
      });
    });

    document.querySelectorAll('.btn-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const input = document.getElementById(`input_qty_${id}`);
        if (input) {
          let val = parseInt(input.value, 10) || 1;
          if (val > 1) {
            val--;
            input.value = val;
            if (cartState.has(id)) {
              updateCartQty(id, val);
            }
          }
        }
      });
    });

    // Add to Cart button
    document.querySelectorAll('.btn-add-service').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const service = servicesData.find(s => s.id === id);
        const input = document.getElementById(`input_qty_${id}`);
        const qty = input ? parseInt(input.value, 10) || 1 : 1;

        if (service) {
          addToCart(service, qty);

          // Visual feedback on button
          btn.classList.add('added');
          btn.innerHTML = '✓ Adicionado';
          setTimeout(() => {
            if (!cartState.has(id)) {
              btn.classList.remove('added');
              btn.innerHTML = '+ Adicionar';
            }
          }, 1500);
        }
      });
    });
  }

  // Cart Methods
  function addToCart(service, qty) {
    if (cartState.has(service.id)) {
      const existing = cartState.get(service.id);
      existing.qty = qty;
    } else {
      cartState.set(service.id, {
        id: service.id,
        name: service.name,
        price: service.price,
        qty: qty,
        cat: service.cat
      });
    }
    updateCartUI();
  }

  function updateCartQty(id, qty) {
    if (cartState.has(id)) {
      if (qty <= 0) {
        removeFromCart(id);
      } else {
        cartState.get(id).qty = qty;
        updateCartUI();
      }
    }
  }

  function removeFromCart(id) {
    cartState.delete(id);
    renderCatalog(currentActiveCategory);
    updateCartUI();
  }

  function clearCart() {
    cartState.clear();
    renderCatalog(currentActiveCategory);
    updateCartUI();
  }

  // Calculate totals and render cart side list
  function updateCartUI() {
    const itemsArray = Array.from(cartState.values());
    let subtotal = 0;
    let totalItemsCount = 0;
    let hasCustomPrice = false;

    itemsArray.forEach(item => {
      if (item.price === null || item.price === undefined) {
        hasCustomPrice = true;
      } else {
        subtotal += item.price * item.qty;
      }
      totalItemsCount += item.qty;
    });

    // Render Cart Items
    if (!cartItemsList) return;

    if (itemsArray.length === 0) {
      cartItemsList.innerHTML = `
        <div class="empty-cart-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <p>Nenhum serviço selecionado</p>
          <span>Escolha a categoria acima e clique em <strong>"+ Adicionar"</strong>.</span>
        </div>
      `;
    } else {
      let cartHtml = `<div class="cart-items-wrapper">`;
      itemsArray.forEach(item => {
        const isNullPrice = item.price === null || item.price === undefined;
        const itemSubtotal = isNullPrice ? 0 : item.price * item.qty;
        const priceLabel = isNullPrice 
          ? `${item.qty}x <strong>Sob consulta</strong>` 
          : `${item.qty}x ${formatBRL(item.price)} = <strong>${formatBRL(itemSubtotal)}</strong>`;
        cartHtml += `
          <div class="cart-item-row">
            <div class="cart-item-info">
              <strong class="cart-item-title">${item.name}</strong>
              <span class="cart-item-price-unit">${priceLabel}</span>
            </div>
            <div class="cart-item-actions">
              <div class="cart-mini-qty">
                <button type="button" class="mini-qty-btn cart-minus" data-id="${item.id}">-</button>
                <span class="mini-qty-val">${item.qty}</span>
                <button type="button" class="mini-qty-btn cart-plus" data-id="${item.id}">+</button>
              </div>
              <button type="button" class="btn-remove-item" data-id="${item.id}" aria-label="Remover">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        `;
      });
      cartHtml += `</div>`;
      cartItemsList.innerHTML = cartHtml;

      // Attach cart item minus, plus, remove listeners
      cartItemsList.querySelectorAll('.cart-minus').forEach(b => {
        b.addEventListener('click', () => {
          const id = b.getAttribute('data-id');
          const current = cartState.get(id);
          if (current) {
            updateCartQty(id, current.qty - 1);
          }
        });
      });

      cartItemsList.querySelectorAll('.cart-plus').forEach(b => {
        b.addEventListener('click', () => {
          const id = b.getAttribute('data-id');
          const current = cartState.get(id);
          if (current) {
            updateCartQty(id, current.qty + 1);
          }
        });
      });

      cartItemsList.querySelectorAll('.btn-remove-item').forEach(b => {
        b.addEventListener('click', () => {
          const id = b.getAttribute('data-id');
          removeFromCart(id);
        });
      });
    }

    // Discounts
    let discount = 0;
    if (selectedPaymentMethod.includes('PIX')) {
      discount = subtotal * 0.05;
      if (discountRow) discountRow.style.display = 'flex';
    } else {
      if (discountRow) discountRow.style.display = 'none';
    }

    const finalTotal = subtotal - discount;

    const formattedSubtotal = hasCustomPrice 
      ? (subtotal > 0 ? `${formatBRL(subtotal)} + Sob consulta` : 'Sob consulta')
      : formatBRL(subtotal);

    const formattedFinalTotal = hasCustomPrice
      ? (subtotal > 0 ? `${formatBRL(finalTotal)} + Sob consulta` : 'Sob consulta')
      : formatBRL(finalTotal);

    // Badges & Labels
    if (cartCountBadge) cartCountBadge.textContent = `${totalItemsCount} ${totalItemsCount === 1 ? 'item' : 'itens'}`;
    if (summarySubtotalEl) summarySubtotalEl.textContent = formattedSubtotal;
    if (summaryDiscountEl) summaryDiscountEl.textContent = `- ${formatBRL(discount)}`;
    if (summaryTotalEl) summaryTotalEl.textContent = formattedFinalTotal;

    // Mobile Bar
    if (mobileCartQty) mobileCartQty.textContent = `${totalItemsCount} ${totalItemsCount === 1 ? 'item' : 'itens'}`;
    if (mobileCartTotal) mobileCartTotal.textContent = formattedFinalTotal;
    if (mobileStickyCartBar) {
      if (totalItemsCount > 0) {
        mobileStickyCartBar.classList.add('visible');
      } else {
        mobileStickyCartBar.classList.remove('visible');
      }
    }

    // Installment Calculation Display
    updateInstallmentsCalculation(finalTotal);
  }

  // Installment calculation
  function updateInstallmentsCalculation(total) {
    if (!installmentsBox || !installmentSelect || !installmentCalcDisplay) return;

    const numInstallments = parseInt(installmentSelect.value, 10) || 1;

    if (selectedPaymentMethod.includes('Cartão') || selectedPaymentMethod.includes('Parcelado')) {
      installmentsBox.style.display = 'block';
      let installmentVal = total / numInstallments;
      
      if (numInstallments > 6) {
        // slight interest if 10x or 12x
        installmentVal = (total * 1.08) / numInstallments;
      }

      const formattedVal = formatBRL(installmentVal);
      installmentCalcDisplay.innerHTML = `Pagamento em <strong>${numInstallments}x de ${formattedVal}</strong> ${numInstallments <= 6 ? 'sem juros' : 'no cartão'}.`;

      if (summaryInstallmentNote) {
        summaryInstallmentNote.textContent = `Ou em ${numInstallments}x de ${formattedVal}`;
      }
    } else {
      installmentsBox.style.display = 'none';
      if (summaryInstallmentNote) summaryInstallmentNote.textContent = '';
    }
  }

  // Category Tabs Listener
  if (categoryTabsContainer) {
    const tabs = categoryTabsContainer.querySelectorAll('.cat-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.getAttribute('data-cat');
        renderCatalog(cat);
      });
    });
  }

  // Payment Method Selection
  const paymentCards = document.querySelectorAll('#paymentMethodsGrid .payment-card');
  paymentCards.forEach(card => {
    card.addEventListener('click', () => {
      paymentCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedPaymentMethod = card.getAttribute('data-pay') || 'PIX (5% de Desconto)';
      updateCartUI();
    });
  });

  if (installmentSelect) {
    installmentSelect.addEventListener('change', () => {
      updateCartUI();
    });
  }

  if (btnClearCart) {
    btnClearCart.addEventListener('click', () => {
      if (confirm('Deseja realmente limpar todos os itens do seu orçamento?')) {
        clearCart();
      }
    });
  }

  // Finalize WhatsApp Order
  function processWhatsAppOrder() {
    const clientName = document.getElementById('clientName')?.value.trim() || '';
    const clientPhone = document.getElementById('clientPhone')?.value.trim() || '';
    const clientEmail = document.getElementById('clientEmail')?.value.trim() || '';

    const productType = document.getElementById('productType')?.value || 'Carro';
    const vehicleBrand = document.getElementById('vehicleBrand')?.value.trim() || '';
    const vehicleModel = document.getElementById('vehicleModel')?.value.trim() || '';
    const vehicleYear = document.getElementById('vehicleYear')?.value.trim() || '';
    const vehicleColor = document.getElementById('vehicleColor')?.value.trim() || '';
    const vehiclePlate = document.getElementById('vehiclePlate')?.value.trim() || '';

    const orderNotes = document.getElementById('orderNotes')?.value.trim() || '';

    // Validations
    if (cartState.size === 0) {
      alert('Por favor, adicione pelo menos um serviço ao seu carrinho para solicitar o orçamento.');
      // Scroll to category tabs
      categoryTabsContainer?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (!clientName || !clientPhone) {
      alert('Por favor, preencha seu Nome e Telefone WhatsApp nos dados do cliente.');
      document.getElementById('clientName')?.focus();
      return;
    }

    if (!vehicleBrand || !vehicleModel) {
      alert('Por favor, informe a Marca e o Modelo do veículo ou produto.');
      document.getElementById('vehicleBrand')?.focus();
      return;
    }

    // Build Cart Summary Text
    const itemsArray = Array.from(cartState.values());
    let subtotal = 0;
    let itemsFormattedText = '';

    let hasCustomPrice = false;
    itemsArray.forEach((item, index) => {
      const isNullPrice = item.price === null || item.price === undefined;
      if (isNullPrice) {
        hasCustomPrice = true;
      } else {
        subtotal += item.price * item.qty;
      }
      const unitStr = isNullPrice ? 'Sob consulta' : (item.price === 0 ? 'Gratuito' : formatBRL(item.price));
      const itemSubtotalStr = isNullPrice ? 'Sob consulta' : formatBRL(item.price * item.qty);
      itemsFormattedText += `${index + 1}. *${item.name}*\n   • Quantidade: ${item.qty}\n   • Valor Unitário: ${unitStr}\n   • Subtotal Item: ${itemSubtotalStr}\n\n`;
    });

    let discount = 0;
    if (selectedPaymentMethod.includes('PIX')) {
      discount = subtotal * 0.05;
    }
    const finalTotal = subtotal - discount;

    const subtotalText = hasCustomPrice ? (subtotal > 0 ? `${formatBRL(subtotal)} + Sob consulta` : 'Sob consulta') : formatBRL(subtotal);
    const totalText = hasCustomPrice ? (subtotal > 0 ? `${formatBRL(finalTotal)} + Sob consulta` : 'Sob consulta') : formatBRL(finalTotal);

    let installmentDetail = '';
    if (!hasCustomPrice && (selectedPaymentMethod.includes('Cartão') || selectedPaymentMethod.includes('Parcelado'))) {
      const numIns = installmentSelect?.value || '1';
      let insVal = finalTotal / parseInt(numIns, 10);
      if (parseInt(numIns, 10) > 6) insVal = (finalTotal * 1.08) / parseInt(numIns, 10);
      installmentDetail = ` (${numIns}x de ${formatBRL(insVal)})`;
    }

    const whatsappNumber = '5581997543276';

    const fullMessage = `*PEDIDO DE SERVIÇOS — RK CAPOTARIA*
----------------------------------------
👤 *DADOS DO CLIENTE*
• *Nome:* ${clientName}
• *WhatsApp:* ${clientPhone}
• *E-mail:* ${clientEmail || 'Não informado'}

🚘 *VEÍCULO / PRODUTO*
• *Tipo:* ${productType}
• *Marca / Modelo:* ${vehicleBrand} ${vehicleModel}
• *Ano / Cor:* ${vehicleYear || 'N/I'} / ${vehicleColor || 'N/I'}
• *Placa:* ${vehiclePlate || 'Não informada'}

📋 *SERVIÇOS SELECIONADOS*
${itemsFormattedText}💳 *PAGAMENTO & VALORES*
• *Forma de Pagamento:* ${selectedPaymentMethod}${installmentDetail}
• *Subtotal:* ${subtotalText}
${discount > 0 ? `• *Desconto PIX (5%):* -${formatBRL(discount)}\n` : ''}• *VALOR TOTAL:* ${totalText}

📝 *OBSERVAÇÕES / PERSONALIZAÇÃO*
${orderNotes || 'Nenhuma observação informada.'}
----------------------------------------
Olá! Gostaria de realizar o pagamento e as  datas disponíveis para agendamento deste serviço da Loja RK Capotaria`;

    const encodedText = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
  }

  if (btnSubmitWhatsapp) {
    btnSubmitWhatsapp.addEventListener('click', processWhatsAppOrder);
  }

  if (btnMobileSubmitWhatsapp) {
    btnMobileSubmitWhatsapp.addEventListener('click', processWhatsAppOrder);
  }

  // Initial catalog render
  renderCatalog('volantes');
  updateCartUI();

});
