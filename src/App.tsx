import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { itemPath, sections, serviceLinks } from './content';
import Home from './Home';
import { ExternalIcon, UpIcon } from './ui';

const I = ({ d, s = 20 }: { d: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
const Flag = ({ language }: { language: 'vi' | 'en' }) => language === 'vi' ? (
  <svg className="language-flag" viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#DA251D" /><path d="m12 3 1.2 3.2 3.4.1-2.7 2.1 1 3.3-2.9-1.9-2.9 1.9 1-3.3-2.7-2.1 3.4-.1z" fill="#FFDE00" /></svg>
) : (
  <svg className="language-flag" viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#21468B" /><path d="M0 0 24 16M24 0 0 16" stroke="#FFF" strokeWidth="4" /><path d="M0 0 24 16M24 0 0 16" stroke="#CF142B" strokeWidth="1.5" /><path d="M12 0v16M0 8h24" stroke="#FFF" strokeWidth="5" /><path d="M12 0v16M0 8h24" stroke="#CF142B" strokeWidth="2.5" /></svg>
);
const P = {
  arrow: 'M5 12h14M13 6l6 6-6 6', search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3',
  cap: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5', user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1-4 15-4 16 0',
  check: 'M9 12l2 2 4-4M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6z', book: 'M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2zM8 7h8',
  doc: 'M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6', cal: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4', play: 'M8 5l11 7-11 7z',
  menu: 'M4 7h16M4 12h16M4 17h16', close: 'M6 6l12 12M18 6 6 18', chevron: 'm6 9 6 6 6-6', phone: 'M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z',
};
// The site has no English content yet, so EN stays unselected and only announces that; switching
// <html lang> to "en" over Vietnamese text would make screen readers mispronounce every page.
function LanguageSwitch({ onEnglish, className = '' }: { onEnglish: () => void; className?: string }) {
  return (
    <div className={`language-switch ${className}`} role="group" aria-label="Chọn ngôn ngữ">
      <button type="button" className="language-option is-active" aria-pressed="true"><Flag language="vi" /><span>VI</span></button>
      <button type="button" className="language-option" aria-pressed="false" onClick={onEnglish}><Flag language="en" /><span>EN</span></button>
    </div>
  );
}
const nav = ['Giới thiệu', 'Tuyển sinh', 'Đào tạo', 'Nghiên cứu', 'Sinh viên', 'Tin tức'];
const W = 'mx-auto max-w-hou px-4 sm:px-8';
const sectionLinks = sections.map(s => `/${s.path}`);
// The program finder shortcut only belongs under the sections that lead to choosing a program.
const finderSections = ['tuyen-sinh', 'dao-tao'];
const services = ['Cổng sinh viên', 'Thư viện số', 'Tra cứu văn bằng'];
// Footer document links open the library pre-filtered when a matching group exists.
const documentLinks: [string, string][] = [
  ['Văn bản Bộ GD&ĐT', ''], ['Tổ chức – Nhân sự', ''], ['Đào tạo', 'Đào tạo'],
  ['Văn bản nghiên cứu khoa học', 'Nghiên cứu'], ['Học viên – Sinh viên', 'Sinh viên'], ['Thanh tra – Kiểm tra', ''],
];

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [languageNote, setLanguageNote] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (pathname === '/') document.title = 'Trường Đại học Mở Hà Nội | Học mở, học suốt đời';
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  useEffect(() => {
    if (pathname !== '/') return;
    let disposed = false;
    let cleanup = () => {};
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      cleanup = () => mm.revert();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.h-in', { y: 28, autoAlpha: 0, duration: 0.8, stagger: 0.12 })
        .from('.h-card', { x: 40, autoAlpha: 0, duration: 0.8 }, '-=0.5');
      gsap.utils.toArray<HTMLElement>('.rev').forEach((el) =>
        gsap.from(el.children, { y: 32, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } }));
      gsap.utils.toArray<HTMLElement>('.count').forEach((el) => {
        const o = { v: 0 }, t = +el.dataset.v!;
        gsap.to(o, { v: t, duration: 1.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => (el.textContent = Math.round(o.v) + (el.dataset.s || '')) });
      });
      }, root);
    });
    return () => { disposed = true; cleanup(); };
  }, [pathname]);

  return (
    <div ref={root}>
      <a href="#main" className="sr-only focus:not-sr-only">Bỏ qua tới nội dung</a>
      {/* Utility bar */}
      <div className="utility-bar dark bg-primary text-on-primary-muted text-xs">
        <div className={`${W} flex h-10 items-center justify-between gap-4`}>
          <div className="utility-contact hidden md:flex">
            <a href="mailto:mhn@hou.edu.vn" className="utility-contact-item">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 5h18v14H3zM3 6l9 7 9-7" /></svg>
              <span><strong>Email</strong> mhn@hou.edu.vn</span>
            </a>
            <span className="utility-contact-divider" aria-hidden="true" />
            <a href="tel:02438682321" className="utility-contact-item">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
              <span><strong>Điện thoại</strong> 024.3868.2321</span>
            </a>
          </div>
          <nav className="utility-links flex h-full items-center gap-4 overflow-x-auto whitespace-nowrap" aria-label="Tiện ích">
            {services.map((x) => <a key={x} href={serviceLinks[x]} target="_blank" rel="noreferrer" className="inline-flex h-full items-center gap-1.5 hover:text-on-primary">{x}<ExternalIcon /></a>)}
            <Link to="/van-ban" className="hidden h-full items-center hover:text-on-primary md:inline-flex">Văn bản</Link><Link to="/lien-he" className="hidden h-full items-center hover:text-on-primary md:inline-flex">Liên hệ</Link>
            <LanguageSwitch onEnglish={() => setLanguageNote(true)} className="hidden md:flex" />
          </nav>
        </div>
        <p role="status" className={languageNote ? `${W} pb-2 text-on-primary` : 'sr-only'}>{languageNote && <span lang="en">English version is in preparation. </span>}{languageNote && 'Nội dung hiện chỉ có tiếng Việt.'}</p>
      </div>
      {/* Header */}
      <header className="site-header sticky top-0 z-30 border-b border-hairline bg-surface">
        <div className={`${W} flex h-[76px] items-center justify-between`}>
          <Link to="/" className="header-brand">
            <img src="/images/hou-emblem.png" alt="Biểu trưng Trường Đại học Mở Hà Nội" className="header-emblem" />
            <span className="header-brand-copy"><strong>TRƯỜNG ĐẠI HỌC MỞ HÀ NỘI</strong><small>HANOI OPEN UNIVERSITY</small></span>
          </Link>
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Chính">
            {nav.map((n, i) => <div className="nav-group" key={n}><NavLink to={sectionLinks[i]} className={({ isActive }) => `inline-flex min-h-11 items-center rounded-full px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-tint-primary text-primary' : 'hover:bg-tint-primary hover:text-primary'}`}>{n}</NavLink><div className="mega-menu"><p className="mb-5 text-xs font-bold uppercase tracking-widest text-primary">{n} · HOU</p><div className="grid gap-1">{sections[i].items.map(([slug, label]) => <Link key={slug} to={itemPath(sections[i].path, slug)} className="rounded-xl px-3 py-2.5 text-sm hover:bg-tint-primary hover:text-primary">{label}</Link>)}</div>{finderSections.includes(sections[i].path) && <Link to="/dao-tao/tim-nganh" className="mt-5 flex items-center justify-between rounded-xl bg-tint-primary p-4 text-sm font-semibold text-primary">Tìm ngành học phù hợp<I d={P.arrow} s={16} /></Link>}</div></div>)}
            <Link to="/tim-kiem" aria-label="Tìm kiếm website" className="ml-2 grid h-11 w-11 place-items-center rounded-full border border-control-border hover:bg-tint-primary hover:text-primary"><I d={P.search} s={18} /></Link>
          </nav>
          <button ref={menuButton} className="grid h-11 w-11 place-items-center rounded-full border border-control-border lg:hidden" aria-label={open ? 'Đóng menu' : 'Mở menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}><I d={open ? P.close : P.menu} /></button>
        </div>
        {open && <nav id="mobile-menu" aria-label="Menu chính" className="mobile-menu border-t border-hairline bg-surface px-4 pb-6 lg:hidden">
          {nav.map((n, i) => <details key={n} className="mobile-menu-group" open={pathname.startsWith(sectionLinks[i])}>
            <summary>{n}<I d={P.chevron} s={18} /></summary>
            <div className="grid pb-3">
              <Link to={sectionLinks[i]} className="mobile-menu-link font-semibold text-primary">Tổng quan {n.toLowerCase()}</Link>
              {sections[i].items.map(([slug, label]) => <Link key={slug} to={itemPath(sections[i].path, slug)} className="mobile-menu-link">{label}</Link>)}
            </div>
          </details>)}
          <div className="grid border-b border-hairline py-2">
            <Link to="/van-ban" className="mobile-menu-link font-medium">Văn bản</Link>
            <Link to="/lien-he" className="mobile-menu-link font-medium">Liên hệ</Link>
            <Link to="/tim-kiem" className="mobile-menu-link font-medium text-primary">Tìm kiếm website</Link>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
            <a href="https://tuyensinh.hou.edu.vn" target="_blank" rel="noreferrer" className="btn inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 font-semibold text-on-accent">Cổng tuyển sinh<ExternalIcon /></a>
            <div className="dark rounded-full bg-primary p-1"><LanguageSwitch onEnglish={() => setLanguageNote(true)} /></div>
          </div>
        </nav>}
      </header>

      {pathname === "/" ? <Home /> : <main id="main"><Outlet /></main>}

      <footer id="contact" className="ft dark">
        <div className={`${W} ft-top`}>
          <Link to="/" className="ft-brand"><span className="ft-logo"><img src="/images/hou-emblem.png" alt="Biểu trưng Trường Đại học Mở Hà Nội" /></span><span><strong>TRƯỜNG ĐẠI HỌC MỞ HÀ NỘI</strong><small>HANOI OPEN UNIVERSITY</small><em>Học tập suốt đời — dám nghĩ, dám làm</em></span></Link>
          <div><p className="ft-connect">Kết nối với HOU</p><div className="ft-social">
            <a href="https://www.facebook.com/HOUNews" target="_blank" rel="noreferrer" className="ft-pill"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></svg>HOUNews</a>
            <a href="https://www.youtube.com/@TruyenThongHou" target="_blank" rel="noreferrer" className="ft-pill"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM10 9l5 3-5 3z" /></svg>HOU-TV</a>
            <a href="https://tuyensinh.hou.edu.vn" target="_blank" rel="noreferrer" className="ft-apply">Cổng tuyển sinh</a>
          </div></div>
        </div>
        <div className={`${W} ft-cols`}>
          <div><h2 className="ft-h">Liên hệ</h2><ul className="ft-contact">
            <li><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /></svg><span>Nhà B101, phố Nguyễn Hiền,<br />phường Bạch Mai, TP Hà Nội</span></li>
            <li><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg><a href="tel:02438682321"><b>024.3868.2321</b></a></li>
            <li><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 5h18v14H3zM3 6l9 7 9-7" /></svg><a href="mailto:mhn@hou.edu.vn"><b>mhn@hou.edu.vn</b></a></li>
          </ul><a href="https://www.google.com/maps/search/?api=1&query=Truong+Dai+hoc+Mo+Ha+Noi" target="_blank" rel="noreferrer" className="ft-map">Xem bản đồ chỉ đường<ExternalIcon /></a></div>
          <div><h2 className="ft-h">Giới thiệu</h2><ul className="ft-list"><li><Link to="/gioi-thieu/lich-su">Quá trình hình thành và phát triển</Link></li><li><Link to="/gioi-thieu/co-cau">Cơ cấu tổ chức</Link></li><li><Link to="/gioi-thieu/su-mang">Sứ mạng – Tầm nhìn</Link></li><li><Link to="/gioi-thieu/su-mang">Chiến lược phát triển</Link></li><li><Link to="/gioi-thieu/cong-khai">Công khai trong hoạt động</Link></li><li><Link to="/gioi-thieu/nhan-dien">Bộ nhận diện thương hiệu</Link></li></ul></div><div><h2 className="ft-h">Người học</h2><ul className="ft-list"><li><Link to="/tuyen-sinh">Thông tin tuyển sinh</Link></li><li><a href={serviceLinks['Cổng sinh viên']} target="_blank" rel="noreferrer">Cổng thông tin sinh viên<ExternalIcon /></a></li><li><Link to="/sinh-vien/hoat-dong">Hoạt động sinh viên</Link></li><li><a href={serviceLinks['Tra cứu văn bằng']} target="_blank" rel="noreferrer">Tra cứu văn bằng<ExternalIcon /></a></li><li><a href={serviceLinks['Thư viện số']} target="_blank" rel="noreferrer">Thư viện số<ExternalIcon /></a></li><li><a href={serviceLinks['Tạp chí khoa học']} target="_blank" rel="noreferrer">Tạp chí khoa học<ExternalIcon /></a></li></ul></div><div><h2 className="ft-h">Văn bản</h2><ul className="ft-list">{documentLinks.map(([label, group]) => <li key={label}><Link to={group ? `/van-ban?group=${encodeURIComponent(group)}` : '/van-ban'}>{label}</Link></li>)}</ul></div><div><h2 className="ft-h">Liên kết website</h2><ul className="ft-list"><li><a href="https://moet.gov.vn" target="_blank" rel="noreferrer">Bộ Giáo dục và Đào tạo<ExternalIcon /></a></li><li><a href="https://most.gov.vn" target="_blank" rel="noreferrer">Bộ Khoa học và Công nghệ<ExternalIcon /></a></li><li><a href="http://tsc.edu.vn/" target="_blank" rel="noreferrer">Trung tâm Hỗ trợ Đào tạo và Cung ứng nhân lực<ExternalIcon /></a></li></ul></div>
        </div>
        <div className="ft-bottom"><div className={`${W} ft-bottom-in`}>
          <p className="tnum">© {new Date().getFullYear()} Bản quyền thuộc về Trường Đại học Mở Hà Nội</p>
          <nav aria-label="Liên kết cuối trang"><Link to="/lien-he">Liên hệ</Link><a href="https://site.hou.edu.vn" target="_blank" rel="noreferrer">Tin nội bộ</a><a href="http://eof.hou.edu.vn" target="_blank" rel="noreferrer">Lịch công tác</a><button type="button" className="ft-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Về đầu trang<UpIcon /></button></nav>
        </div></div>
      </footer>
    </div>
  );
}
