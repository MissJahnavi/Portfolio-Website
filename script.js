document.addEventListener('DOMContentLoaded', function () {
  if (window.lucide) lucide.createIcons();
});


var navToggle = document.getElementById('navToggle');
var navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});



window.addEventListener('scroll', function () {
  var pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.body.style.setProperty('--scroll-x', pct.toFixed(4));
}, { passive: true });


var sections   = document.querySelectorAll('section[id]');
var navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
  var pos = window.scrollY + 80;
  sections.forEach(function (sec) {
    var top = sec.offsetTop, id = sec.id;
    var bottom = top + sec.offsetHeight;
    if (pos >= top && pos < bottom) {
      navAnchors.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { passive: true });


var phrases = [
  'AI & Data Science Student',
  'Machine Learning Enthusiast',
  'Web Developer' 
];

var roleEl     = document.getElementById('heroRole');
var phraseIdx  = 0;
var charIdx    = 0;
var isDeleting = false;

function typeLoop() {
  var phrase = phrases[phraseIdx];

  if (!isDeleting) {
    charIdx++;
    roleEl.textContent = phrase.slice(0, charIdx);

    if (charIdx === phrase.length) {
      isDeleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
    setTimeout(typeLoop, 70 + Math.random() * 50);
  } else {
    charIdx--;
    roleEl.textContent = phrase.slice(0, charIdx);

    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx  = (phraseIdx + 1) % phrases.length;
      setTimeout(typeLoop, 500);
      return;
    }
    setTimeout(typeLoop, 35);
  }
}

setTimeout(typeLoop, 900);


document.querySelectorAll(
  '.section-eyebrow, .section-heading, .section-sub'
).forEach(function (el) {
  el.classList.add('reveal');
});

/* About */
document.querySelector('.about-text')  && document.querySelector('.about-text').classList.add('reveal');
document.querySelector('.about-card')  && document.querySelector('.about-card').classList.add('reveal', 'd2');

/* Skill cards  */
document.querySelectorAll('.skill-card').forEach(function (el, i) {
  el.classList.add('reveal-scale', 'd' + ((i % 6) + 1));
});

/* Project cards */
document.querySelectorAll('.project-card').forEach(function (el, i) {
  el.classList.add('reveal-scale', 'd' + ((i % 4) + 1));
});

/* Timeline */
document.querySelectorAll('.tl-item').forEach(function (el, i) {
  el.classList.add('reveal-left', 'd' + (i + 1));
});

/* Contact */
document.querySelector('.contact-info') && document.querySelector('.contact-info').classList.add('reveal');
document.querySelector('.contact-form') && document.querySelector('.contact-form').classList.add('reveal', 'd2');

/* Footer */
document.querySelector('.footer') && document.querySelector('.footer').classList.add('reveal');

/* Observer */
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -32px 0px'
});

document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach(function (el) {
  observer.observe(el);
});


var statsDone = false;
var statsEl   = document.querySelector('.hero-stats');

if (statsEl) {
  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !statsDone) {
      statsDone = true;

      document.querySelectorAll('.stat-val[data-target]').forEach(function (el) {
        var target   = parseInt(el.getAttribute('data-target'));
        var duration = 1200;
        var start    = null;

        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased    = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
      });
    }
  }, { threshold: 0.6 }).observe(statsEl);
}

/* ── 8. CONTACT FORM ── */
var sendBtn    = document.getElementById('sendBtn');
var successMsg = document.getElementById('successMsg');

sendBtn.addEventListener('click', function () {
  var name  = document.getElementById('fname').value.trim();
  var email = document.getElementById('femail').value.trim();
  var msg   = document.getElementById('fmsg').value.trim();

  var hasError = false;
  if (!name)  { shakeField('fname');  hasError = true; }
  if (!email) { shakeField('femail'); hasError = true; }
  if (!msg)   { shakeField('fmsg');   hasError = true; }
  if (hasError) return;

 
  sendBtn.textContent = 'Sending…';
  sendBtn.disabled    = true;
  sendBtn.style.opacity = '0.7';

  setTimeout(function () {
    /* Re-render icons after DOM change */
    sendBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Sent!';
    sendBtn.style.background  = '#059669';
    sendBtn.style.borderColor = '#059669';
    sendBtn.style.opacity     = '1';
    successMsg.style.display  = 'flex';

    setTimeout(function () {
      sendBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message';
      sendBtn.style.background  = '';
      sendBtn.style.borderColor = '';
      sendBtn.disabled          = false;
      successMsg.style.display  = 'none';

      document.getElementById('fname').value  = '';
      document.getElementById('femail').value = '';
      document.getElementById('fmsg').value   = '';
    }, 4000);
  }, 900);
});

function shakeField(id) {
  var el = document.getElementById(id);
  el.style.borderColor = 'rgba(239,68,68,0.7)';
  el.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.12)';
  el.focus();
  setTimeout(function () {
    el.style.borderColor = '';
    el.style.boxShadow   = '';
  }, 2000);
}
