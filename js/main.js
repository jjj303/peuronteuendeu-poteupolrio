const projectData = [];

const projectList = document.querySelector('#project-list');
const projectCount = document.querySelector('#project-count');
const projectDialog = document.querySelector('#project-dialog');
const projectDetailContent = document.querySelector('#project-detail-content');
const navToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
const navLinks = [...document.querySelectorAll('.nav-link')];

function renderProjects(projects) {
  projectCount.textContent = `${String(projects.length).padStart(2, '0')} PROJECT${projects.length === 1 ? '' : 'S'}`;
  if (projects.length === 0) {
    projectList.innerHTML = `
      <article class="empty-project">
        <div class="empty-art" aria-hidden="true">
          <span class="art-cross">+</span>
          <span class="art-orbit">↗</span>
            <span class="art-coordinate">PROJECTS · 00</span>
        </div>
        <div class="empty-copy">
          <p class="empty-kicker">A SPACE FOR WHAT'S NEXT</p>
            <h3>아직 소개할<br />프로젝트가 없습니다.</h3>
            <p>직접 만든 결과물이 생기면 내용과 함께 이곳에 기록하겠습니다.</p>
        </div>
      </article>`;
    return;
  }

  projectList.innerHTML = projects.map((project, index) => `
    <article class="project-card">
      <div class="project-card-art" aria-hidden="true"><span>${String(index + 1).padStart(2, '0')}</span></div>
      <div class="project-card-copy">
        <p class="empty-kicker">${escapeHTML(project.category || 'PROJECT')}</p>
        <h3>${escapeHTML(project.title)}</h3>
        <p>${escapeHTML(project.description)}</p>
        <button class="project-detail-button" type="button" data-project-index="${index}" aria-haspopup="dialog">
          자세히 보기 <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>`).join('');
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function escapeAttribute(value) {
  return escapeHTML(value);
}

function renderDetailField(label, value) {
  if (!value || (Array.isArray(value) && value.length === 0)) return '';
  const content = Array.isArray(value)
    ? `<ul>${value.map((item) => `<li>${escapeHTML(item)}</li>`).join('')}</ul>`
    : `<p>${escapeHTML(value)}</p>`;
  return `<section class="detail-field"><h3>${escapeHTML(label)}</h3>${content}</section>`;
}

function openProjectDetails(project) {
  const fields = [
    ['프로젝트 목적', project.purpose],
    ['담당 역할', project.role],
    ['사용 기술', project.technologies],
    ['주요 기능', project.features],
    ['문제와 해결 과정', project.problemSolution],
    ['결과', project.outcome],
    ['배운 점', project.learned],
  ].map(([label, value]) => renderDetailField(label, value)).filter(Boolean);

  projectDetailContent.innerHTML = `
    <p class="empty-kicker">${escapeHTML(project.category || 'PROJECT')}</p>
    <h2 id="project-dialog-title">${escapeHTML(project.title)}</h2>
    <p class="dialog-description">${escapeHTML(project.description)}</p>
    ${fields.join('')}
    ${project.url ? `<a class="dialog-project-link" href="${escapeAttribute(project.url)}" target="_blank" rel="noopener noreferrer">프로젝트 링크 열기 ↗</a>` : ''}`;
  projectDialog.showModal();
}

renderProjects(projectData);
document.querySelector('#current-year').textContent = new Date().getFullYear();

projectList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-project-index]');
  if (!button) return;
  const project = projectData[Number(button.dataset.projectIndex)];
  if (project) openProjectDetails(project);
});

projectDialog.querySelector('.dialog-close').addEventListener('click', () => {
  projectDialog.close();
});

projectDialog.addEventListener('click', (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

function setMenuOpen(open) {
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  primaryNav.classList.toggle('is-open', open);
}

navToggle.addEventListener('click', () => {
  setMenuOpen(navToggle.getAttribute('aria-expanded') !== 'true');
});

navToggle.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenuOpen(false);
    navToggle.focus();
  }
});

primaryNav.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenuOpen(false);
    navToggle.focus();
  }
});

primaryNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});

document.addEventListener('click', (event) => {
  if (primaryNav.classList.contains('is-open') && !primaryNav.contains(event.target) && !navToggle.contains(event.target)) {
    setMenuOpen(false);
  }
});

const sections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.about, .skills-intro, .skill-list, .projects-heading, .project-grid, .contact-copy, .contact-links').forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}
