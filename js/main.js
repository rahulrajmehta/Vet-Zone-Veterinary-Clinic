/**
 * Vet Zone Veterinary Clinic - Ranchi
 * Interactive Features & WhatsApp Automation Logic
 * Phone: 082949 40023 | 5.0★ Google Rated (94 Reviews)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initClinicStatus();
  initAppointmentModal();
  initDeliveryModal();
  initGalleryFilter();
  initFaqAccordion();
  initServiceCalculator();
  initVideoControls();
});

// Clinic Open / Closed Realtime Indicator for Ranchi (Closes 9:00 PM)
function initClinicStatus() {
  const statusBadge = document.getElementById('clinicStatusBadge');
  if (!statusBadge) return;

  const now = new Date();
  const currentHour = now.getHours();
  // Open daily from 9:00 AM to 9:00 PM (21:00)
  const isOpen = currentHour >= 9 && currentHour < 21;

  if (isOpen) {
    statusBadge.innerHTML = `
      <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
      <span class="text-emerald-800 font-bold text-xs uppercase tracking-wider">Open Today Till 9:00 PM</span>
    `;
    statusBadge.className = 'hidden md:inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold border bg-emerald-50 border-emerald-200';
  } else {
    statusBadge.innerHTML = `
      <span class="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 mr-2"></span>
      <span class="text-amber-800 font-bold text-xs uppercase tracking-wider">Opens 9:00 AM (Emergency Support On-Call)</span>
    `;
    statusBadge.className = 'hidden md:inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold border bg-amber-50 border-amber-200';
  }
}

// Navigation & Mobile Drawer Menu
function initNavbar() {
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMobileMenu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden');
    });

    if (closeMenu) {
      closeMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    }

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }

  // Header blur and shadow on scroll
  const header = document.getElementById('mainHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('shadow-md', 'bg-white/95');
        header.classList.remove('bg-white/90');
      } else {
        header.classList.remove('shadow-md');
        header.classList.add('bg-white/90');
      }
    });
  }
}

// Toast helper
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-amber-400"></i> <span>${message}</span>`;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3500);
}

// Copy to clipboard helper
window.copyToClipboard = function(text, successMsg = 'Copied to clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
};

function fallbackCopy(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg);
  } catch (err) {
    console.error('Copy fallback failed', err);
  }
  document.body.removeChild(textArea);
}

// Appointment Booking Modal & WhatsApp Automation (+91 82949 40023)
function initAppointmentModal() {
  const modal = document.getElementById('appointmentModal');
  const openButtons = document.querySelectorAll('.open-appointment-modal');
  const closeBtn = document.getElementById('closeAppointmentModal');
  const form = document.getElementById('appointmentForm');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.classList.add('overflow-hidden');
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Handle Form Submission -> WhatsApp Link to 082949 40023
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const ownerName = document.getElementById('appOwnerName').value.trim();
      const phone = document.getElementById('appPhone').value.trim();
      const petType = document.getElementById('appPetType').value;
      const petBreed = document.getElementById('appPetBreed').value.trim();
      const service = document.getElementById('appService').value;
      const date = document.getElementById('appDate').value;
      const timeSlot = document.getElementById('appTimeSlot').value;
      const notes = document.getElementById('appNotes').value.trim();

      const message = `Hello Vet Zone Veterinary Clinic Ranchi!\n` +
        `I would like to book a clinical appointment:\n\n` +
        `🐾 Pet Parent: ${ownerName}\n` +
        `📱 Phone: ${phone}\n` +
        `🐶 Pet: ${petType} (${petBreed || 'Breed not specified'})\n` +
        `🩺 Service Required: ${service}\n` +
        `📅 Preferred Date: ${date || 'Earliest Available'}\n` +
        `⏰ Preferred Time: ${timeSlot}\n` +
        `📝 Symptoms / Notes: ${notes || 'General Checkup'}\n\n` +
        `📍 Clinic Location: 4, Hesag, Opposite CARZ SPA, near NIAMT Colony, Hatia, Ranchi.`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/918294940023?text=${encodedMsg}`;

      showToast('Redirecting to WhatsApp to confirm your slot...');
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        closeModal();
        form.reset();
      }, 1000);
    });
  }
}

// Medicine & Pet Supply Delivery Modal
function initDeliveryModal() {
  const modal = document.getElementById('deliveryModal');
  const openButtons = document.querySelectorAll('.open-delivery-modal');
  const closeBtn = document.getElementById('closeDeliveryModal');
  const form = document.getElementById('deliveryForm');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.classList.add('overflow-hidden');
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const customerName = document.getElementById('delCustomerName').value.trim();
      const phone = document.getElementById('delPhone').value.trim();
      const area = document.getElementById('delArea').value;
      const fullAddress = document.getElementById('delAddress').value.trim();
      const items = document.getElementById('delItems').value.trim();

      const message = `🐾 *Vet Zone Veterinary Clinic - Ranchi Doorstep Delivery* 🐾\n\n` +
        `👤 Customer Name: ${customerName}\n` +
        `📞 Phone Number: ${phone}\n` +
        `📍 Delivery Area: ${area}, Ranchi\n` +
        `🏠 Complete Address: ${fullAddress}\n` +
        `📦 Medicines / Pet Food Needed:\n${items}\n\n` +
        `Please confirm stock availability, price total and rider delivery ETA. Thank you!`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/918294940023?text=${encodedMsg}`;

      showToast('Creating your delivery order on WhatsApp...');
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        closeModal();
        form.reset();
      }, 1000);
    });
  }
}

// Interactive Gallery Filter
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      // Update active button styling
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#0A2540]', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100');
      });
      btn.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');
      btn.classList.add('bg-[#0A2540]', 'text-white', 'shadow-md');

      // Filter gallery cards
      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// FAQ Accordion
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');

      // Close all other FAQs
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

// Service Package Estimator
function initServiceCalculator() {
  const petTypeSelect = document.getElementById('calcPetType');
  const serviceSelect = document.getElementById('calcService');
  const addGroomingCheck = document.getElementById('calcGrooming');
  const addDeWormingCheck = document.getElementById('calcDeworming');
  const totalDisplay = document.getElementById('calcTotalEstimate');
  const summaryDisplay = document.getElementById('calcSummaryText');

  if (!petTypeSelect || !serviceSelect || !totalDisplay) return;

  function calculate() {
    let base = 0;
    const pet = petTypeSelect.value;
    const service = serviceSelect.value;

    if (service === 'consultation') {
      base = 350;
      summaryDisplay.innerText = 'Includes complete physical clinical examination, temperature check, and digital prescription.';
    } else if (service === 'vaccination') {
      base = pet === 'cat' ? 750 : 850;
      summaryDisplay.innerText = 'Includes cold-chain certified vaccine vial, booster health check, and official pet health passport.';
    } else if (service === 'full_checkup') {
      base = 1200;
      summaryDisplay.innerText = 'Comprehensive vital checkup, body score, dental check, ear cytology, and preventive guidance.';
    } else if (service === 'grooming_spa') {
      base = pet === 'cat' ? 999 : (pet === 'large_dog' ? 1499 : 1199);
      summaryDisplay.innerText = 'Therapeutic warm water bath, anti-tick coat cleansing, hair trimming, blow-dry and nail care.';
    } else if (service === 'surgery_eval') {
      base = 600;
      summaryDisplay.innerText = 'Pre-operative surgeon evaluation, vitals assessment, blood work review, and anesthesia screening.';
    }

    if (addGroomingCheck && addGroomingCheck.checked && service !== 'grooming_spa') {
      base += 400;
    }
    if (addDeWormingCheck && addDeWormingCheck.checked) {
      base += 200;
    }

    totalDisplay.innerText = `₹${base}`;
  }

  petTypeSelect.addEventListener('change', calculate);
  serviceSelect.addEventListener('change', calculate);
  if (addGroomingCheck) addGroomingCheck.addEventListener('change', calculate);
  if (addDeWormingCheck) addDeWormingCheck.addEventListener('change', calculate);

  calculate();
}

// Video Background Controls
function initVideoControls() {
  const video = document.getElementById('heroBgVideo');
  const playBtn = document.getElementById('toggleVideoPlay');
  const soundBtn = document.getElementById('toggleVideoSound');

  if (!video) return;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      } else {
        video.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
    });
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      if (video.muted) {
        video.muted = false;
        soundBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      } else {
        video.muted = true;
        soundBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      }
    });
  }
}
