import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { articles, serviceLinks } from './content';
import { ActionLink, ArrowIcon, Button, ExternalIcon, Heading, TextLink, container } from './ui';

const photo = (name: string) => `/images/${name}.jpg`;
const images = ['lecture-hall', 'student-team', 'student-life', 'campus-walk'];
const unitCards = [
  ['cong-nghe-thong-tin', 'Khoa Công nghệ Thông tin', 'fithou.edu.vn', 'student-team'],
  ['kinh-te', 'Khoa Kinh tế', 'kinhte.hou.edu.vn', 'hero-graduation'],
  ['tai-chinh-ngan-hang', 'Khoa Tài chính – Ngân hàng', 'fbf.hou.edu.vn', 'lecture-hall'],
  ['luat', 'Khoa Luật', 'khoaluat.hou.edu.vn', 'student-life'],
  ['tieng-anh', 'Khoa Tiếng Anh', 'tienganh.hou.edu.vn', 'lecture-hall'],
  ['tieng-trung-quoc', 'Khoa Tiếng Trung Quốc', 'khoatiengtrungquoc.hou.edu.vn', 'campus-walk'],
  ['du-lich', 'Khoa Du lịch', 'fot.hou.edu.vn', 'campus-editorial'],
];
const storyCards = [
  ['Từ đam mê kiến trúc đến thủ lĩnh phong trào sinh viên giàu nhiệt huyết', '13/10/2026', 'student-life'],
  ['Ứng dụng AI hỗ trợ người khiếm thính', '04/05/2026', 'student-team'],
  ['Luật sư tương lai với khát vọng công lý và trái tim nhiệt huyết', '15/09/2025', 'campus-walk'],
  ['Thanh xuân tỏa sáng cùng tiếng Trung và công tác Đoàn', '10/09/2025', 'lecture-hall'],
];
const videoTitles = ['Bản tin HOU-TV số 08 năm 2026', 'Những thành tựu nổi bật trong học tập, NCKH và phong trào sinh viên', 'Bản tin HOU-TV số 07 năm 2026', 'Bản tin HOU-TV số 06 năm 2026'];
const youtube = 'https://www.youtube.com/@TruyenThongHou';
const paths = [
  'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5',
  'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 21c0-7 14-7 14 0',
  'M6 3h12v18H6zM9 7h6M9 11h6M9 15h3',
  'M3 4h7v16H3zM14 4h7v16h-7z',
  'M9 3h6M10 3v7l-6 9c-1 2 1 2 2 2h12c1 0 3 0 2-2l-6-9V3M8 15h8',
  'M4 6h16v15H4zM4 10h16M8 3v5M16 3v5',
];
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`ref-eyebrow ${light ? 'text-accent-soft' : 'text-primary'}`}>{children}</p>;
}
function PlayIcon() { return <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="m9 5 11 7-11 7z" /></svg>; }

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [tab, setTab] = useState('Tin tức');
  const rail = useRef<HTMLDivElement>(null);
  const [railState, setRailState] = useState({ start: true, end: false });
  const slides = [
    { title: 'Học tập suốt đời để dám nghĩ, dám nói, dám làm, dám chịu trách nhiệm, dám hy sinh vì lợi ích chung', to: '/gioi-thieu/su-mang' },
    ...articles.map(a => ({ title: a.title, to: `/tin-tuc/${a.slug}` })),
  ];
  const filtered = articles.filter(a => tab === 'Tin tức' || (tab === 'Thông báo' && a.category === 'Thông báo') || (tab === 'Hoạt động sinh viên' && a.category === 'Sự kiện'));
  const featured = filtered[0];
  const scrollUnits = (direction: number) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rail.current?.scrollBy({ left: direction * rail.current.clientWidth, behavior: reduce ? 'instant' : 'smooth' });
  };
  return <main id="main" className="ref-home">
    <section className="ref-hero dark">
      <img src={photo('lecture-hall')} alt="" fetchPriority="high" className="ref-hero-photo" />
      <div className="ref-hero-overlay" />
      <div className={`${container} ref-hero-inner`}>
        <div className="ref-hero-copy">
          <p className="h-in ref-hero-badge"><span />Đại học đa ngành · Chính quy · Sau đại học · Từ xa</p>
          <Heading level={1} className="h-in ref-hero-title">Học tập suốt đời để <span className="ref-hero-emphasis">dám nghĩ, dám làm,</span> dám chịu trách nhiệm</Heading>
          <p className="h-in ref-hero-lead">Trường Đại học Mở Hà Nội — nơi mỗi người học được mở cánh cửa tri thức theo cách phù hợp với mình, ở bất kỳ giai đoạn nào của cuộc đời.</p>
          <div className="h-in ref-hero-actions"><ActionLink to="/tuyen-sinh" tone="accent">Thông tin tuyển sinh 2026</ActionLink><ActionLink to="/don-vi" tone="ghost">Khám phá đơn vị đào tạo</ActionLink></div>
          <Link to="/tuyen-sinh/sau-dai-hoc" className="h-in ref-hero-update" aria-label="Mới: Nhận hồ sơ tuyển sinh Thạc sĩ đợt 2 năm 2026"><span>MỚI</span><span className="ref-hero-update-window"><span className="ref-hero-update-text">Nhận hồ sơ tuyển sinh Thạc sĩ đợt 2 năm 2026</span></span></Link>
        </div>
        <article className="h-card ref-glass-card" aria-label="Tin nổi bật">
          <div className="ref-glass-top"><Eyebrow light>Tin nổi bật</Eyebrow><span className="tnum">0{slide + 1} / 0{slides.length}</span></div>
          <Link to={slides[slide].to} className="ref-glass-title" aria-live="polite">{slides[slide].title}</Link>
          <div className="ref-glass-bottom"><div className="ref-slide-dots">{slides.map((s, i) => <Button key={s.to} className={`ref-dot ${slide === i ? 'is-active' : ''}`} aria-label={`Tin nổi bật ${i + 1}`} aria-pressed={slide === i} onClick={() => setSlide(i)} />)}</div><div className="flex gap-2"><Button className="ref-round ref-round-glass ref-back" aria-label="Tin trước" onClick={() => setSlide((slide + slides.length - 1) % slides.length)}><ArrowIcon /></Button><Button className="ref-round ref-round-white" aria-label="Tin tiếp theo" onClick={() => setSlide((slide + 1) % slides.length)}><ArrowIcon /></Button></div></div>
        </article>
      </div>
    </section>

    <section className="ref-quick-section" aria-label="Truy cập nhanh"><div className={`${container} ref-quick-grid`}>
      {['Cổng tuyển sinh', 'Cổng sinh viên', 'Tra cứu văn bằng', 'Thư viện số', 'Tạp chí khoa học', 'Lịch công tác'].map((title, i) => <a key={title} className="ref-quick-tile" href={i === 0 ? 'https://tuyensinh.hou.edu.vn' : serviceLinks[title]} target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[i]} /></svg><span>{title}</span><ExternalIcon /></a>)}
    </div></section>

    <section className="ref-section ref-news-section" id="news"><div className={container}>
      <div className="ref-section-head"><div><Eyebrow>Tin tức – Sự kiện</Eyebrow><Heading>Nhịp sống HOU</Heading></div><div className="ref-news-tabs" role="group" aria-label="Lọc tin trang chủ">{['Tin tức', 'Thông báo', 'Hoạt động sinh viên', 'HOU trên báo chí'].map(t => <Button key={t} className={tab === t ? 'ref-filter is-active' : 'ref-filter'} aria-pressed={tab === t} onClick={() => setTab(t)}>{t}</Button>)}</div></div>
      <div className="ref-news-grid">
        {featured ? <article className="ref-featured-article"><Link to={`/tin-tuc/${featured.slug}`} tabIndex={-1} aria-hidden="true"><img src={photo(tab === 'Tin tức' ? 'lecture-hall' : 'student-life')} alt="" loading="lazy" /></Link><Eyebrow>{featured.category}</Eyebrow><Heading level={3}><Link to={`/tin-tuc/${featured.slug}`}>{featured.title}</Link></Heading><p className="ref-featured-description">{featured.summary}</p></article> : <div className="ref-empty-news"><Heading level={3}>HOU trên báo chí</Heading><p>Khám phá chuyên mục và các thông tin từ nhà trường.</p><TextLink to="/tin-tuc/bao-chi">Mở chuyên mục</TextLink></div>}
        <div className="ref-news-list">{filtered.slice(1, 5).map((a, i) => <article key={a.slug}><Link to={`/tin-tuc/${a.slug}`} className="ref-news-thumbnail" tabIndex={-1} aria-hidden="true"><img src={photo(images[i])} alt="" loading="lazy" /></Link><div><time className="tnum">{a.date}</time><Link to={`/tin-tuc/${a.slug}`}>{a.title}</Link></div></article>)}{filtered.length === 1 && <p className="text-sm text-ink-muted">Những nội dung khác của chuyên mục sẽ được cập nhật khi có dữ liệu chính thức.</p>}<TextLink to="/tin-tuc">Xem tất cả tin tức</TextLink></div>
        <aside className="ref-admissions dark"><Eyebrow light>Tin tuyển sinh</Eyebrow><Heading level={3}>Sẵn sàng trở thành sinh viên HOU?</Heading><div className="ref-admissions-poster"><img src={photo('hero-graduation')} alt="Ảnh minh họa tốt nghiệp đại học" loading="lazy" /><div><span>TUYỂN SINH</span><strong>THẠC SĨ</strong><span className="ref-poster-year">2026</span><small>Học để phát triển.<br />Mở rộng tương lai.</small></div></div><p className="ref-admissions-date">TUYỂN SINH SAU ĐẠI HỌC</p><p className="ref-admissions-description">Thông tin nhận hồ sơ tuyển sinh trình độ Thạc sĩ đợt 2 năm 2026.</p><a href="https://tuyensinh.hou.edu.vn" target="_blank" rel="noreferrer" className="ref-admissions-button">Vào cổng tuyển sinh</a></aside>
      </div>
    </div></section>

    <section className="ref-section ref-unit-section" id="units"><div className={container}>
      <div className="ref-section-head"><div><Eyebrow>Đơn vị đào tạo</Eyebrow><Heading>Chọn lĩnh vực, mở hướng đi</Heading></div><div className="ref-unit-actions flex flex-wrap items-center gap-3"><TextLink to="/dao-tao/tim-nganh">Danh sách ngành tuyển sinh</TextLink><Button className="ref-round ref-back" aria-label="Đơn vị trước" disabled={railState.start} onClick={() => scrollUnits(-1)}><ArrowIcon /></Button><Button className="ref-round ref-round-blue" aria-label="Đơn vị tiếp theo" disabled={railState.end} onClick={() => scrollUnits(1)}><ArrowIcon /></Button></div></div>
      <div className="ref-unit-rail" ref={rail} onScroll={() => { const r = rail.current!; setRailState({ start: r.scrollLeft < 5, end: r.scrollLeft + r.clientWidth >= r.scrollWidth - 5 }); }}>
        {unitCards.map(([slug, name, domain, image]) => <Link key={slug} to={`/don-vi/${slug}`} className="ref-unit-card"><div className="ref-unit-banner"><span>{name}</span><img src={photo(image)} alt="" loading="lazy" /></div><div className="ref-unit-caption"><div><strong>{name}</strong><span>{domain}</span></div><span className="ref-unit-arrow"><ArrowIcon /></span></div></Link>)}
      </div>
    </div></section>

    <section className="ref-section ref-research-section" id="research"><div className={`${container} ref-research-grid`}>
      <div><Eyebrow>Nghiên cứu khoa học</Eyebrow><Heading>Khoa học, công nghệ & đổi mới sáng tạo</Heading><p className="ref-research-lead">Kết quả nghiên cứu, tạp chí khoa học và kho tri thức số của Nhà trường — mở cho người học và cộng đồng.</p><div className="ref-research-links"><a href={serviceLinks['Tạp chí khoa học']} target="_blank" rel="noreferrer">Tạp chí khoa học<ArrowIcon /></a><Link to="/nghien-cuu/doi-moi">Thông tin KH, CN và đổi mới sáng tạo<ArrowIcon /></Link><a href={serviceLinks['Thư viện số']} target="_blank" rel="noreferrer">Thư viện số<ArrowIcon /></a></div></div>
      <article className="ref-research-card"><div className="mb-5 flex flex-wrap items-center gap-3"><span className="ref-research-tag">Kết quả nghiên cứu</span><time className="tnum text-xs text-ink-muted">{articles[2].date}</time></div><Heading level={3}>{articles[2].title}</Heading><p className="mt-5 text-sm text-ink-muted">{articles[2].summary}</p><div className="ref-research-meta"><div><span>Chuyên mục</span><strong>Nghiên cứu khoa học</strong></div><div><span>Thông tin</span><strong>Nội dung minh họa</strong></div></div><TextLink to={`/tin-tuc/${articles[2].slug}`}>Đọc chi tiết</TextLink></article>
    </div></section>

    <section className="ref-section ref-stories-section dark" id="stories"><div className={container}>
      <div className="ref-section-head"><div><Eyebrow light>Gương sáng</Eyebrow><Heading>Những người HOU truyền cảm hứng</Heading></div><TextLink to="/sinh-vien/hoat-dong" className="ref-light-link">Xem thêm</TextLink></div>
      <div className="ref-story-grid">{storyCards.map(([title, date, image]) => <article key={title} className="ref-story-card"><Link to="/sinh-vien/hoat-dong" tabIndex={-1} aria-hidden="true"><img src={photo(image)} alt="" loading="lazy" /></Link><time className="tnum">{date}</time><Heading level={3}><Link to="/sinh-vien/hoat-dong">{title}</Link></Heading></article>)}</div>
    </div></section>

    <section className="ref-section ref-video-section" id="hou-tv"><div className={container}>
      <div className="ref-section-head"><div><Eyebrow>HOU-TV</Eyebrow><Heading>Video & bản tin</Heading></div><a href={youtube} className="ref-external-link" target="_blank" rel="noreferrer">Kênh YouTube<ArrowIcon /></a></div>
      <div className="ref-video-grid"><article><a href={youtube} target="_blank" rel="noreferrer" className="ref-video-feature" aria-label="Mở kênh HOU-TV trên YouTube"><img src={photo('hero-graduation')} alt="Ảnh minh họa cộng đồng tốt nghiệp" loading="lazy" /><span className="ref-play"><PlayIcon /></span></a><time className="ref-video-date tnum">22/09/2026</time><Heading level={3}><a href={youtube} target="_blank" rel="noreferrer">[RECAP] Trường Đại học Mở Hà Nội chào năm học mới 2026 – 2027</a></Heading></article><div className="ref-video-list">{videoTitles.map((title, i) => <a key={title} href={youtube} target="_blank" rel="noreferrer"><div className="ref-video-thumb"><img src={photo(images[i])} alt="" loading="lazy" /><span><PlayIcon /></span></div><div><time className="tnum">{['23/09/2026', '21/09/2026', '18/08/2026', '18/07/2026'][i]}</time><strong>{title}</strong></div></a>)}</div></div>
      <div className="ref-cta-band"><div><Eyebrow>Tuyển sinh sau đại học</Eyebrow><Heading>Nhận hồ sơ Thạc sĩ đợt 2 năm 2026</Heading><p>Xem thời gian nhận hồ sơ, ngành đào tạo và hướng dẫn nộp hồ sơ trực tuyến.</p></div><div className="ref-cta-actions"><ActionLink to="/tuyen-sinh/sau-dai-hoc" className="ref-cta-dark">Xem thông báo</ActionLink><a href="https://tuyensinh.hou.edu.vn" target="_blank" rel="noreferrer">Nộp hồ sơ</a></div></div>
    </div></section>
  </main>;
}
