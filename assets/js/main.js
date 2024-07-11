
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


//APOINTMENT SECTION

function submitAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  const name = form.name.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const date = form.date.value;
  const reason = form.reason.value;
  const bestTime = form.bestTime.value;
  const message = form.message.value;

  const mailtoLink = `mailto:info@drgebril.com?subject=Online Appointment Form&body=
      Name: ${encodeURIComponent(name)}%0D%0A
      Email: ${encodeURIComponent(email)}%0D%0A
      Phone: ${encodeURIComponent(phone)}%0D%0A
      Appointment Date: ${encodeURIComponent(date)}%0D%0A
      Reason For Your Visit: ${encodeURIComponent(reason)}%0D%0A
      Best Time For Appointment: ${encodeURIComponent(bestTime)}%0D%0A
      Message: ${encodeURIComponent(message)}`;

  window.location.href = mailtoLink;
  document.getElementById('appointmentSentMessage').style.display = 'block';
}




//DOCTORS REFERRAL

function submitReferralForm() {
  const form = document.getElementById('referralForm');
  const date = form.date.value;
  const patientName = form.patient_name.value;
  const age = form.age.value;
  const patientAddress = form.patient_address.value;
  const patientPhone = form.patient_phone.value;
  const medicalConditions = form.medical_conditions.value;
  const reasonForReferral = form.reason_for_referral.value;
  const specialRequests = form.special_requests.value;
  const rediographs = Array.from(form['rediographs[]']).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value).join(', ');
  const referringDentist = form.referring_dentist.value;
  const dentistAddress = form.dentist_address.value;
  const dentistPhone = form.dentist_phone.value;

  const mailtoLink = `mailto:info@drgebril.com?subject=Doctor's Referral Form&body=
      Date: ${encodeURIComponent(date)}%0D%0A
      Patient Name: ${encodeURIComponent(patientName)}%0D%0A
      Date Of Birth: ${encodeURIComponent(age)}%0D%0A
      Patient Address: ${encodeURIComponent(patientAddress)}%0D%0A
      Patient Phone Number: ${encodeURIComponent(patientPhone)}%0D%0A
      Medical Conditions: ${encodeURIComponent(medicalConditions)}%0D%0A
      Reason for Referral: ${encodeURIComponent(reasonForReferral)}%0D%0A
      Special Requests: ${encodeURIComponent(specialRequests)}%0D%0A
      Rediographs: ${encodeURIComponent(rediographs)}%0D%0A
      Referring Dentist Dr.: ${encodeURIComponent(referringDentist)}%0D%0A
      Address: ${encodeURIComponent(dentistAddress)}%0D%0A
      Phone: ${encodeURIComponent(dentistPhone)}`;

  window.location.href = mailtoLink;
  document.getElementById('referralSentMessage').style.display = 'block';
}
