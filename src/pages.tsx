import { useState } from "react"
import { Link, useLocation, useParams, useSearchParams } from "react-router"
import {
  articles,
  documents,
  itemPath,
  normalize,
  programs,
  sections,
  units,
} from "./content"
import {
  ActionLink,
  ArrowIcon,
  Button,
  Card,
  container,
  Empty,
  ExternalIcon,
  Field,
  Heading,
  InfoTable,
  Notice,
  PageHero,
  SelectField,
  Tag,
  TextLink,
} from "./ui"

const unique = (values: string[]) => [...new Set(values)]
const formOptions = unique(programs.flatMap((p) => p.formats))
const campus = "/images/campus-editorial.jpg"
function PageBody({ children }: { children: React.ReactNode }) {
  return <div className={`${container} py-12 sm:py-16`}>{children}</div>
}
function ProgramCards({ list = programs }: { list?: typeof programs }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {list.map((p) => (
        <Card
          key={p.slug}
          title={p.name}
          description={`${p.unit} · ${p.level} · ${p.formats.join(" / ")}`}
          to={`/dao-tao/nganh/${p.slug}`}
          number={p.code}
        />
      ))}
    </div>
  )
}
function FAQs() {
  return (
    <div className="divide-y divide-hairline">
      {[
        [
          "Tôi nên bắt đầu từ đâu?",
          "Sử dụng trang Tìm ngành học để lọc theo mục tiêu, trình độ và hình thức học. Sau đó xem thông tin từng ngành hoặc so sánh các lựa chọn.",
        ],
        [
          "Học phí và điểm chuẩn được cập nhật ở đâu?",
          "Thông tin chính thức cần đối chiếu với đề án tuyển sinh và thông báo từng năm của nhà trường. Bản giao diện này chưa sử dụng mức học phí hay điểm chuẩn chưa được xác nhận.",
        ],
        [
          "Tôi có thể vừa đi làm vừa học không?",
          "Bạn có thể tham khảo các hình thức từ xa, vừa làm vừa học hoặc văn bằng 2. Lịch học và điều kiện cụ thể cần được đơn vị đào tạo xác nhận.",
        ],
      ].map(([q, a]) => (
        <details key={q} className="py-5">
          <summary className="cursor-pointer font-semibold">{q}</summary>
          <p className="mt-4 max-w-prose text-ink-muted">{a}</p>
        </details>
      ))}
    </div>
  )
}
function CTA() {
  return (
    <div className="dark mt-12 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-primary-deep p-8 text-on-primary">
      <div>
        <p className="mb-2 text-xs uppercase tracking-widest text-accent-soft">
          Hành trình tiếp theo
        </p>
        <Heading level={3}>Tìm lộ trình phù hợp với bạn.</Heading>
      </div>
      <ActionLink to="/dao-tao/tim-nganh" tone="accent">
        Khám phá ngành học
      </ActionLink>
    </div>
  )
}

export function LandingPage() {
  const { pathname } = useLocation()
  const s = sections.find((s) => `/${s.path}` === pathname)
  if (!s) return <NotFoundPage />
  return (
    <>
      <PageHero
        title={s.headline}
        description={s.description}
        section={s.title}
      />
      <PageBody>
        <div className="grid gap-10 lg:grid-cols-4">
          <aside className="sub-aside order-last self-start lg:order-none">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
              Trong chuyên mục
            </p>
            <nav aria-label={`Mục ${s.title}`} className="grid gap-2">
              {s.items.map(([slug, label]) => (
                <Link
                  key={slug}
                  to={itemPath(s.path, slug)}
                  className="flex min-h-11 items-center rounded-xl text-sm hover:text-primary"
                >
                  {label}
                </Link>
              ))}
              <TextLink to="/don-vi">Các đơn vị</TextLink>
              <TextLink to="/lien-he">Liên hệ nhà trường</TextLink>
            </nav>
          </aside>
          <div className="lg:col-span-3">
            <div className="mb-8 overflow-hidden rounded-2xl">
              <img
                src={
                  s.path === "tuyen-sinh"
                    ? "/images/hero-graduation.jpg"
                    : campus
                }
                alt="Ảnh minh họa môi trường đại học"
                className="inner-cover w-full object-cover"
              />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {s.items.map(([slug, title, description], i) => (
                <Card
                  key={slug}
                  title={title}
                  description={description}
                  to={itemPath(s.path, slug)}
                  number={`0${i + 1}`}
                />
              ))}
            </div>
            {s.path === "gioi-thieu" && (
              <div className="mt-12">
                <Heading>Hành trình từ năm 1993</Heading>
                <p className="mt-5 max-w-prose text-ink-muted">
                  Đại học Mở Hà Nội hướng tới mở rộng cơ hội tiếp cận giáo dục
                  và học tập suốt đời. Phần số liệu, lịch sử chi tiết và hồ sơ
                  lãnh đạo cần được bổ sung từ nguồn chính thức.
                </p>
                <TextLink to="/gioi-thieu/co-cau">
                  Khám phá cơ cấu tổ chức
                </TextLink>
              </div>
            )}
            {s.path === "sinh-vien" && (
              <div className="mt-10">
                <Heading>Văn bản dành cho bạn</Heading>
                <TextLink to="/van-ban">Mở thư viện văn bản</TextLink>
              </div>
            )}
            <CTA />
          </div>
        </div>
      </PageBody>
    </>
  )
}

export function SectionPage() {
  const { pathname } = useLocation()
  const [base, slug] = pathname.split("/").filter(Boolean)
  const section = sections.find((s) => s.path === base)
  const item = section?.items.find((i) => i[0] === slug)
  if (!section || !item) return <NotFoundPage />
  const admissions = base === "tuyen-sinh"
  const org = slug === "co-cau"
  return (
    <>
      <PageHero
        title={item[1]}
        description={item[2]}
        section={section.title}
        parent={{ title: section.title, to: `/${base}` }}
      />
      <PageBody>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Notice />
            {org ? (
              <>
                <Heading>Cơ cấu tổ chức</Heading>
                <div className="organization-tree">
                  <Link
                    to="/nhan-su/ban-giam-hieu"
                    className="flex items-center justify-between gap-4 rounded-2xl bg-primary p-6 font-semibold text-on-primary"
                  >
                    Ban Giám hiệu · Hồ sơ lãnh đạo
                    <ArrowIcon />
                  </Link>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {units.map((u) => (
                      <Card
                        key={u.slug}
                        title={u.name}
                        description={u.field}
                        to={`/don-vi/${u.slug}`}
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : slug === "cau-hoi" ? (
              <FAQs />
            ) : slug === "lich-su" ? (
              <>
                <Heading>Từ nền tảng đến tương lai</Heading>
                <InfoTable
                  rows={[
                    ["1993", "Thành lập Trường Đại học Mở Hà Nội."],
                    [
                      "Phát triển",
                      "Mở rộng các cơ hội học tập và hình thức đào tạo. Nội dung lịch sử chi tiết chờ nhà trường cung cấp.",
                    ],
                    [
                      "Hôm nay",
                      "Hướng đến giáo dục mở, học tập suốt đời và kết nối cộng đồng.",
                    ],
                  ]}
                />
              </>
            ) : (
              <>
                <Heading>
                  {admissions
                    ? "Tìm chương trình phù hợp"
                    : "Khám phá thông tin liên quan"}
                </Heading>
                <p className="max-w-prose text-ink-muted">
                  {item[2]} Nội dung chi tiết, chính sách và các tài liệu chính
                  thức của chuyên mục này đang chờ nhà trường cung cấp.
                </p>
                {admissions || base === "dao-tao" ? (
                  <ProgramCards list={programs.slice(0, 4)} />
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Card
                      title="Thư viện văn bản"
                      description="Tra cứu quy định, hướng dẫn và biểu mẫu theo nhóm nội dung."
                      to="/van-ban"
                    />
                    <Card
                      title="Tin tức liên quan"
                      description="Khám phá thông tin đào tạo, nghiên cứu và cộng đồng."
                      to="/tin-tuc"
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <aside className="sub-aside self-start">
            <Heading level={3}>Trong chuyên mục</Heading>
            <nav className="mt-5 grid gap-1" aria-label="Trang liên quan">
              {section.items.map(([id, label]) => (
                <Link
                  key={id}
                  to={itemPath(base, id)}
                  aria-current={slug === id ? "page" : undefined}
                  className={`rounded-xl px-3 py-3 text-sm ${
                    id === slug
                      ? "bg-tint-primary font-semibold text-primary"
                      : "hover:bg-tint-primary"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <TextLink to="/lien-he">Cần thêm thông tin?</TextLink>
          </aside>
        </div>
        <CTA />
      </PageBody>
    </>
  )
}

export function ProgramsPage() {
  const [params, setParams] = useSearchParams()
  const [compare, setCompare] = useState<string[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const q = params.get("q") || ""
  const activeFilters = ["q", "level", "format", "unit", "subject"].filter(
    (key) => params.get(key),
  ).length
  const update = (key: string, value: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        value ? next.set(key, value) : next.delete(key)
        return next
      },
      { replace: true },
    )
  const filtered = programs.filter(
    (p) =>
      normalize(`${p.name} ${p.code}`).includes(normalize(q)) &&
      (!params.get("level") || p.level === params.get("level")) &&
      (!params.get("format") || p.formats.includes(params.get("format")!)) &&
      (!params.get("unit") || p.unit === params.get("unit")) &&
      (!params.get("subject") || p.subjects.includes(params.get("subject")!)),
  )
  return (
    <>
      <PageHero
        title="Tìm ngành học"
        description="Từ điều bạn yêu thích đến hành trình nghề nghiệp. Lựa chọn, đối chiếu và khám phá chương trình phù hợp."
        section="Đào tạo"
        parent={{ title: "Đào tạo", to: "/dao-tao" }}
      />
      <PageBody>
        <Notice />
        <div className="mt-8 grid gap-8 lg:grid-cols-4">
          <aside className="sub-aside self-start">
            <div className="flex items-center justify-between gap-3 lg:mb-6">
              <Heading level={3}>
                Bộ lọc
                {activeFilters > 0 && (
                  <span className="ml-2 text-sm text-primary">
                    ({activeFilters})
                  </span>
                )}
              </Heading>
              <div className="flex gap-2">
                <Button
                  className="lg:hidden"
                  aria-expanded={filtersOpen}
                  aria-controls="program-filters"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  {filtersOpen ? "Ẩn" : "Hiện"}
                </Button>
                <Button onClick={() => setParams({})} disabled={!activeFilters}>
                  Xóa lọc
                </Button>
              </div>
            </div>
            <div
              id="program-filters"
              className={`${filtersOpen ? "grid" : "hidden"} mt-6 gap-5 lg:mt-0 lg:grid`}
            >
              <label className="grid gap-2 text-xs font-semibold text-ink-muted">
                Từ khóa
                <Field
                  aria-label="Tìm tên hoặc mã ngành"
                  value={q}
                  onChange={(e) => update("q", e.target.value)}
                  placeholder="Tên hoặc mã ngành…"
                />
              </label>
              <SelectField
                label="Trình độ"
                value={params.get("level") || ""}
                options={unique(programs.map((p) => p.level))}
                onChange={(v) => update("level", v)}
              />
              <SelectField
                label="Hình thức học"
                value={params.get("format") || ""}
                options={formOptions}
                onChange={(v) => update("format", v)}
              />
              <SelectField
                label="Đơn vị đào tạo"
                value={params.get("unit") || ""}
                options={unique(programs.map((p) => p.unit))}
                onChange={(v) => update("unit", v)}
              />
              <SelectField
                label="Tổ hợp xét tuyển"
                value={params.get("subject") || ""}
                options={unique(programs.flatMap((p) => p.subjects))}
                onChange={(v) => update("subject", v)}
              />
            </div>
          </aside>
          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p aria-live="polite" className="text-sm text-ink-muted">
                <strong className="text-ink">{filtered.length}</strong> chương
                trình minh họa
              </p>
              <span className="text-xs text-ink-muted">
                Chọn tối đa 3 ngành để so sánh
              </span>
            </div>
            {filtered.length ? (
              <div className="grid gap-5 md:grid-cols-2">
                {filtered.map((p) => (
                  <article
                    key={p.slug}
                    className="sub-panel"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <Tag>{p.group}</Tag>
                      <span className="text-xs text-ink-muted">{p.code}</span>
                    </div>
                    <Heading level={3}>
                      <Link
                        to={`/dao-tao/nganh/${p.slug}`}
                        className="hover:text-primary"
                      >
                        {p.name}
                      </Link>
                    </Heading>
                    <p className="mt-3 text-sm text-ink-muted">{p.intro}</p>
                    <p className="mt-5 border-t border-hairline pt-4 text-sm text-primary">
                      {p.formats.join(" · ")}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <TextLink to={`/dao-tao/nganh/${p.slug}`}>
                        Xem ngành
                      </TextLink>
                      <label className="compare-option flex min-h-11 cursor-pointer items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={compare.includes(p.slug)}
                          disabled={
                            compare.length >= 3 && !compare.includes(p.slug)
                          }
                          onChange={() =>
                            setCompare((prev) =>
                              prev.includes(p.slug)
                                ? prev.filter((x) => x !== p.slug)
                                : [...prev, p.slug],
                            )
                          }
                          className="compare-checkbox"
                          aria-label={`So sánh ${p.name}`}
                        />
                        So sánh
                      </label>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <Empty />
            )}
            {compare.length > 0 && (
              <div className="comparison-tray dark sticky bottom-4 mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary bg-primary-deep p-4 text-on-primary sm:gap-4 sm:p-5">
                <p aria-live="polite">{compare.length}/3 ngành đã chọn</p>
                {compare.length >= 2 ? (
                  <ActionLink
                    to={`/dao-tao/so-sanh?ids=${compare.join(",")}`}
                    tone="accent"
                  >
                    So sánh ngành
                  </ActionLink>
                ) : (
                  <p className="text-sm text-on-primary-muted">
                    Chọn thêm ít nhất 1 ngành
                  </p>
                )}
                <Button
                  onClick={() => setCompare([])}
                  className="border-on-primary-muted bg-transparent text-on-primary enabled:hover:border-accent-soft enabled:hover:text-accent-soft"
                >
                  Bỏ chọn
                </Button>
              </div>
            )}
          </div>
        </div>
      </PageBody>
    </>
  )
}

export function ProgramPage() {
  const { slug } = useParams()
  const p = programs.find((p) => p.slug === slug)
  if (!p) return <NotFoundPage />
  return (
    <>
      <PageHero
        title={p.name}
        description={p.intro}
        section="Chương trình đào tạo"
        parent={{ title: "Tìm ngành học", to: "/dao-tao/tim-nganh" }}
      />
      <PageBody>
        <Notice />
        <div className="mt-10 grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <section>
              <Heading>Tổng quan chương trình</Heading>
              <InfoTable
                rows={[
                  ["Mã ngành (minh họa)", p.code],
                  ["Trình độ", p.level],
                  [
                    "Đơn vị đào tạo",
                    <TextLink to={`/don-vi/${p.unitSlug}`}>{p.unit}</TextLink>,
                  ],
                  ["Hình thức", p.formats.join(" · ")],
                  ["Tổ hợp (minh họa)", p.subjects.join(" · ")],
                  [
                    "Thời gian đào tạo",
                    "Chờ xác nhận theo chương trình và hình thức học",
                  ],
                  [
                    "Chỉ tiêu tuyển sinh",
                    "Chưa có dữ liệu công bố trong bản giao diện",
                  ],
                ]}
              />
            </section>
            <section>
              <Heading>Điểm chuẩn & Học phí</Heading>
              <div className="mt-5 overflow-x-auto">
                <table className="data-table">
                  <caption className="sr-only">
                    Điểm chuẩn 3 năm, chưa có dữ liệu chính thức
                  </caption>
                  <thead>
                    <tr>
                      <th>Năm</th>
                      <th>Điểm chuẩn</th>
                      <th>Học phí</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["2024", "2025", "2026"].map((year) => (
                      <tr key={year}>
                        <td>{year}</td>
                        <td>Chờ công bố</td>
                        <td>Chờ xác nhận</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <Heading>Cơ hội nghề nghiệp</Heading>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-ink-muted">
                {p.jobs.map((j) => (
                  <li key={j}>{j}</li>
                ))}
              </ul>
            </section>
            <section>
              <Heading>Chương trình đào tạo</Heading>
              <p className="mt-5 text-ink-muted">
                Tài liệu chương trình và PDF chính thức chưa được cung cấp. Vui
                lòng liên hệ đơn vị đào tạo để có thông tin áp dụng cho khóa học
                của bạn.
              </p>
              <TextLink to="/lien-he">Liên hệ tư vấn</TextLink>
            </section>
            <section>
              <Heading>Câu hỏi thường gặp</Heading>
              <FAQs />
            </section>
          </div>
          <aside className="dark self-start rounded-3xl bg-primary-deep p-8 text-on-primary">
            <p className="mb-4 text-xs uppercase tracking-widest text-accent-soft">
              Bước tiếp theo
            </p>
            <Heading level={3}>Sẵn sàng cho hành trình mới?</Heading>
            <p className="my-5 text-sm text-on-primary-muted">
              Đối chiếu thông tin chính thức trước khi nộp hồ sơ. Thao tác đăng
              ký được thực hiện tại cổng tuyển sinh của nhà trường.
            </p>
            <a
              href="https://tuyensinh.hou.edu.vn"
              target="_blank"
              rel="noreferrer"
              className="btn flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-center font-semibold text-on-accent"
            >
              Cổng tuyển sinh
              <ExternalIcon />
            </a>
            <ActionLink
              to="/lien-he"
              tone="ghost"
              className="mt-4 w-full"
            >
              Liên hệ tư vấn
            </ActionLink>
            <TextLink to="/dao-tao/tim-nganh" className="mt-4" light>
              Xem ngành khác
            </TextLink>
          </aside>
        </div>
      </PageBody>
    </>
  )
}

export function ComparePage() {
  const [params] = useSearchParams()
  const ids = unique((params.get("ids") || "").split(",")).slice(0, 3)
  const list = programs.filter((p) => ids.includes(p.slug))
  const rows: [string, (program: (typeof programs)[number]) => string][] = [
    ["Mã ngành", p => p.code],
    ["Đơn vị", p => p.unit],
    ["Hình thức", p => p.formats.join(" · ")],
    ["Tổ hợp", p => p.subjects.join(" · ")],
    ["Nghề nghiệp tham khảo", p => p.jobs.join(" · ")],
  ]
  return (
    <>
      <PageHero
        title="So sánh ngành học"
        description="Đặt các lựa chọn cạnh nhau để tìm ra hướng đi phù hợp với bạn."
        section="Đào tạo"
      />
      <PageBody>
        {list.length < 2 ? (
          <Empty title="Chọn từ 2 đến 3 ngành để so sánh.">
            <TextLink to="/dao-tao/tim-nganh">Quay lại tìm ngành học</TextLink>
          </Empty>
        ) : (
          <>
            <Notice />
            <div className="mt-8 overflow-x-auto">
              <table className="data-table comparison-table">
                <thead>
                  <tr>
                    <th>Thông tin</th>
                    {list.map((p) => (
                      <th key={p.slug}>{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([label, get]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      {list.map((p) => (
                        <td key={p.slug}>
                          {get(p)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">Học phí / Điểm chuẩn</th>
                    {list.map((p) => (
                      <td key={p.slug}>Chờ xác nhận</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Khám phá</th>
                    {list.map((p) => (
                      <td key={p.slug}>
                        <TextLink to={`/dao-tao/nganh/${p.slug}`}>
                          Chi tiết ngành
                        </TextLink>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
        <TextLink to="/dao-tao/tim-nganh">Thay đổi lựa chọn</TextLink>
      </PageBody>
    </>
  )
}

export function FlexiblePage() {
  return (
    <>
      <PageHero
        title="Học linh hoạt, tiến xa mỗi ngày."
        description="Dành cho người đang đi làm và những ai muốn tiếp tục hành trình đại học theo nhịp sống của mình."
        section="Từ xa & Văn bằng 2"
        parent={{ title: "Tuyển sinh", to: "/tuyen-sinh" }}
      />
      <PageBody>
        <Notice />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            [
              "Từ xa",
              "Chủ động kế hoạch học tập với học liệu và phương thức học từ xa.",
            ],
            [
              "Vừa làm vừa học",
              "Kết hợp công việc với việc học theo lịch của đơn vị đào tạo.",
            ],
            [
              "Văn bằng 2",
              "Mở rộng chuyên môn trên cơ sở văn bằng và kiến thức đã có.",
            ],
          ].map(([title, description]) => (
            <article
              key={title}
              className="rounded-2xl border border-hairline bg-surface p-7"
            >
              <Tag>Học tập suốt đời</Tag>
              <Heading level={3} className="mt-5">
                {title}
              </Heading>
              <p className="my-5 text-sm text-ink-muted">{description}</p>
              <InfoTable
                rows={[
                  ["Lịch học", "Theo thông báo từng khóa"],
                  ["Học phí", "Chờ công bố chính thức"],
                  ["Văn bằng", "Theo quy định của chương trình"],
                ]}
              />
              <TextLink
                to={`/dao-tao/tim-nganh${
                  title === "Văn bằng 2"
                    ? ""
                    : `?format=${encodeURIComponent(title)}`
                }`}
              >
                Tìm ngành phù hợp
              </TextLink>
            </article>
          ))}
        </div>
        <div className="mt-12">
          <Heading>Những điều cần biết</Heading>
          <FAQs />
        </div>
        <CTA />
      </PageBody>
    </>
  )
}

export function NewsPage() {
  const [params, setParams] = useSearchParams()
  const [limit, setLimit] = useState(3)
  const category = params.get("category") || ""
  const q = params.get("q") || ""
  const list = articles.filter(
    (a) =>
      (!category || a.category === category) &&
      normalize(a.title).includes(normalize(q)),
  )
  return (
    <>
      <PageHero
        title="Tin tức & Sự kiện"
        description="Cập nhật những góc nhìn, hoạt động và câu chuyện trong cộng đồng HOU."
        section="Nhịp sống HOU"
      />
      <PageBody>
        <Notice />
        <div className="my-8 flex flex-wrap items-center gap-3">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Chuyên mục tin"
          >
            {["", ...unique(articles.map((a) => a.category))].map((c) => (
              <Button
                key={c}
                aria-pressed={category === c}
                onClick={() => {
                  const next = new URLSearchParams(params)
                  c ? next.set("category", c) : next.delete("category")
                  setParams(next)
                  setLimit(3)
                }}
                className={
                  category === c
                    ? "border-ink bg-ink text-on-primary hover:text-on-primary"
                    : ""
                }
              >
                {c || "Tất cả"}
              </Button>
            ))}
          </div>
          <Field
            aria-label="Tìm tin tức"
            placeholder="Tìm tin tức…"
            value={q}
            onChange={(e) => {
              const next = new URLSearchParams(params)
              e.target.value ? next.set("q", e.target.value) : next.delete("q")
              setParams(next, { replace: true })
              setLimit(3)
            }}
            className="sm:max-w-xs"
          />
        </div>
        {list.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {list.slice(0, limit).map((a, i) => (
              <article
                key={a.slug}
                className="overflow-hidden rounded-2xl border border-hairline bg-surface"
              >
                <Link to={`/tin-tuc/${a.slug}`}>
                  <img
                    src={i % 2 ? "/images/hero-graduation.jpg" : campus}
                    alt="Ảnh minh họa giáo dục đại học"
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                </Link>
                <div className="p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <Tag>{a.category}</Tag>
                    <time className="tnum text-xs text-ink-muted">
                      {a.date}
                    </time>
                  </div>
                  <Heading level={3}>
                    <Link
                      to={`/tin-tuc/${a.slug}`}
                      className="hover:text-primary"
                    >
                      {a.title}
                    </Link>
                  </Heading>
                  <p className="mt-4 text-sm text-ink-muted">{a.summary}</p>
                  <TextLink to={`/tin-tuc/${a.slug}`} className="mt-4">
                    Đọc tiếp
                  </TextLink>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <Empty />
        )}
        {limit < list.length && (
          <div className="mt-8 text-center">
            <Button onClick={() => setLimit((l) => l + 3)}>Xem thêm tin</Button>
          </div>
        )}
      </PageBody>
    </>
  )
}

export function ArticlePage() {
  const { slug } = useParams()
  const a = articles.find((a) => a.slug === slug)
  const [message, setMessage] = useState("")
  if (!a) return <NotFoundPage />
  return (
    <>
      <PageHero
        title={a.title}
        description={a.summary}
        section={a.category}
        parent={{ title: "Tin tức", to: "/tin-tuc" }}
      />
      <PageBody>
        <div className="grid gap-12 lg:grid-cols-3">
          <article className="space-y-8 lg:col-span-2">
            <Notice>
              Nội dung biên tập minh họa, không phải thông báo chính thức của
              nhà trường.
            </Notice>
            <div className="flex flex-wrap gap-5 text-sm text-ink-muted">
              <time className="tnum">{a.date}</time>
              <span>Ban biên tập · Nội dung mẫu</span>
            </div>
            <figure>
              <img
                src={campus}
                alt="Ảnh minh họa không gian đại học"
                className="w-full rounded-2xl"
              />
              <figcaption className="mt-2 text-xs text-ink-muted">
                Ảnh: Trường Đại học Mở Hà Nội (hou.edu.vn).
              </figcaption>
            </figure>
            <section id="tong-quan">
              <Heading>Tổng quan</Heading>
              <p className="mt-5 leading-8 text-ink-muted">
                {a.summary} Giáo dục mở đặt người học vào trung tâm, tạo điều
                kiện để mỗi người tiếp cận tri thức theo mục tiêu và hoàn cảnh
                của mình.
              </p>
            </section>
            <section id="thong-tin">
              <Heading>Thông tin dành cho người học</Heading>
              <p className="mt-5 leading-8 text-ink-muted">
                Trước khi đưa ra quyết định học tập, người học nên tìm hiểu
                chương trình đào tạo, hình thức tổ chức, điều kiện đầu vào và
                thông báo áp dụng cho từng khóa. Các số liệu và mốc thời gian
                cần được đối chiếu với công bố chính thức.
              </p>
              <TextLink to="/dao-tao/tim-nganh">
                Khám phá chương trình đào tạo
              </TextLink>
            </section>
            <section id="lien-quan">
              <Heading>Tìm hiểu thêm</Heading>
              <p className="mt-5 text-ink-muted">
                Liên hệ bộ phận phụ trách để được hướng dẫn hoặc tiếp tục tra
                cứu trong thư viện văn bản.
              </p>
              <TextLink to="/van-ban">Tra cứu văn bản</TextLink>
            </section>
            <div className="flex flex-wrap items-center gap-3 border-t border-hairline pt-6">
              <Button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.href)
                    setMessage("Đã sao chép liên kết.")
                  } catch {
                    setMessage(
                      `Bạn có thể sao chép địa chỉ: ${window.location.href}`,
                    )
                  }
                }}
              >
                Sao chép liên kết
              </Button>
              <a
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-control-border px-5 text-sm"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
              >
                Chia sẻ Facebook
                <ExternalIcon />
              </a>
              <span role="status" className="text-sm text-primary">
                {message}
              </span>
            </div>
          </article>
          <aside className="self-start space-y-8">
            <div className="sub-panel">
              <Heading level={3}>Trong bài viết</Heading>
              <nav
                aria-label="Mục lục bài viết"
                className="article-toc mt-3 grid text-sm text-primary"
              >
                <a href="#tong-quan">01 · Tổng quan</a>
                <a href="#thong-tin">02 · Thông tin dành cho người học</a>
                <a href="#lien-quan">03 · Tìm hiểu thêm</a>
              </nav>
            </div>
            <Heading level={3}>Đọc tiếp</Heading>
            {articles
              .filter((x) => x.slug !== slug)
              .slice(0, 2)
              .map((x) => (
                <Card
                  key={x.slug}
                  title={x.title}
                  description={x.category}
                  to={`/tin-tuc/${x.slug}`}
                />
              ))}
          </aside>
        </div>
      </PageBody>
    </>
  )
}

export function DocumentsPage() {
  const [params, setParams] = useSearchParams()
  const update = (key: string, value: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        value ? next.set(key, value) : next.delete(key)
        return next
      },
      { replace: true },
    )
  const list = documents.filter(
    (d) =>
      normalize(`${d.title} ${d.number}`).includes(
        normalize(params.get("q") || ""),
      ) &&
      ["type", "year", "group", "unit"].every(
        (key) =>
          !params.get(key) ||
          d[(key as "type" | "year" | "group" | "unit")] === params.get(key),
      ),
  )
  return (
    <>
      <PageHero
        title="Thư viện văn bản"
        description="Tìm đúng thông tin. Thực hiện đúng thủ tục. Tra cứu quy định, quyết định và biểu mẫu ở một nơi."
        section="Văn bản & Biểu mẫu"
      />
      <PageBody>
        <Notice>
          Các văn bản dưới đây là mẫu giao diện, không có giá trị pháp lý. Chưa
          có tệp văn bản chính thức.
        </Notice>
        <div className="my-8 grid gap-4 rounded-2xl border border-hairline bg-surface p-6 sm:grid-cols-2 lg:grid-cols-5">
          <label className="grid gap-2 text-xs font-semibold text-ink-muted">
            Tìm văn bản
            <Field
              aria-label="Tìm tên hoặc số hiệu văn bản"
              placeholder="Từ khóa, số hiệu…"
              value={params.get("q") || ""}
              onChange={(e) => update("q", e.target.value)}
            />
          </label>
          {[
            ["group", "Nhóm văn bản"],
            ["type", "Loại văn bản"],
            ["year", "Năm ban hành"],
            ["unit", "Đơn vị"],
          ].map(([key, label]) => (
            <SelectField
              key={key}
              label={label}
              value={params.get(key) || ""}
              options={unique(
                documents.map(
                  (d) => d[(key as "group" | "type" | "year" | "unit")],
                ),
              )}
              onChange={(v) => update(key, v)}
            />
          ))}
        </div>
        <div className="mb-5 flex items-center justify-between">
          <p aria-live="polite" className="text-sm text-ink-muted">
            {list.length} văn bản mẫu
          </p>
          <Button onClick={() => setParams({})}>Xóa bộ lọc</Button>
        </div>
        {list.length ? (
          <div className="doc-table-wrap overflow-x-auto rounded-2xl border border-hairline">
            <table className="data-table doc-table">
              <thead>
                <tr>
                  <th>Số hiệu</th>
                  <th>Trích yếu</th>
                  <th>Loại</th>
                  <th>Ngày ban hành</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {list.map((d) => (
                  <tr key={d.slug}>
                    <td data-label="Số hiệu" className="whitespace-nowrap text-xs">
                      {d.number}
                    </td>
                    <td data-label="Trích yếu">
                      <Link
                        to={`/van-ban/${d.slug}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        {d.title}
                      </Link>
                      <p className="mt-1 text-xs text-ink-muted">{d.unit}</p>
                    </td>
                    <td data-label="Loại">{d.type}</td>
                    <td data-label="Ngày ban hành" className="tnum whitespace-nowrap">
                      {d.date}
                    </td>
                    <td data-label="Trạng thái">
                      <Tag>Minh họa</Tag>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty />
        )}
      </PageBody>
    </>
  )
}

export function DocumentPage() {
  const { slug } = useParams()
  const d = documents.find((d) => d.slug === slug)
  if (!d) return <NotFoundPage />
  return (
    <>
      <PageHero
        title={d.title}
        section="Văn bản chi tiết"
        parent={{ title: "Thư viện văn bản", to: "/van-ban" }}
      />
      <PageBody>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Notice>
              Văn bản mẫu, không có giá trị pháp lý. Số hiệu và ngày ban hành
              chỉ dùng minh họa bố cục.
            </Notice>
            <InfoTable
              rows={[
                ["Số hiệu mẫu", d.number],
                ["Loại văn bản", d.type],
                ["Ngày minh họa", d.date],
                ["Đơn vị", d.unit],
                ["Nhóm nội dung", d.group],
                ["Hiệu lực", "Chưa xác nhận – không phải văn bản chính thức"],
              ]}
            />
            <div className="pdf-placeholder grid place-items-center rounded-2xl border border-dashed border-control-border bg-surface p-10 text-center">
              <div>
                <Heading level={3}>Xem trước tài liệu</Heading>
                <p className="mx-auto my-5 max-w-sm text-sm text-ink-muted">
                  Nhà trường chưa cung cấp PDF. Khu vực này sẽ hiển thị bản xem
                  trước, dung lượng và liên kết tải khi có tệp chính thức.
                </p>
                <Button disabled title="Chưa có tệp PDF">
                  Chưa có tài liệu để tải
                </Button>
              </div>
            </div>
          </div>
          <aside className="sub-aside self-start">
            <Heading level={3}>Văn bản liên quan</Heading>
            <div className="mt-5 grid gap-3">
              {documents
                .filter((x) => x.slug !== slug)
                .map((x) => (
                  <TextLink key={x.slug} to={`/van-ban/${x.slug}`}>
                    {x.title}
                  </TextLink>
                ))}
            </div>
          </aside>
        </div>
      </PageBody>
    </>
  )
}

export function UnitsPage() {
  return (
    <>
      <PageHero
        title="Các đơn vị đào tạo"
        description="Nơi nuôi dưỡng chuyên môn, kết nối tri thức và đồng hành cùng người học."
        section="Khoa & Viện"
      />
      <PageBody>
        <Notice />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {units.map((u, i) => (
            <Card
              key={u.slug}
              title={u.name}
              description={u.field}
              to={`/don-vi/${u.slug}`}
              number={`0${i + 1}`}
            />
          ))}
        </div>
      </PageBody>
    </>
  )
}
export function UnitPage() {
  const { slug } = useParams()
  const u = units.find((u) => u.slug === slug)
  if (!u) return <NotFoundPage />
  return (
    <>
      <PageHero
        title={u.name}
        description={u.field}
        section="Đơn vị đào tạo"
        parent={{ title: "Các đơn vị", to: "/don-vi" }}
      />
      <PageBody>
        <Notice />
        <div className="mt-10 grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <img
              src={campus}
              alt="Ảnh minh họa môi trường đại học"
              className="inner-cover w-full rounded-2xl object-cover"
            />
            <section>
              <Heading>Các ngành thuộc đơn vị</Heading>
              <div className="mt-6">
                <ProgramCards
                  list={programs.filter((p) => p.unitSlug === slug)}
                />
              </div>
            </section>
            <section>
              <Heading>Đội ngũ & Lãnh đạo</Heading>
              <p className="mt-4 text-ink-muted">
                Danh sách, ảnh và thông tin lãnh đạo đang chờ nhà trường xác
                nhận.
              </p>
              <TextLink to={`/nhan-su/${u.slug}`}>
                Xem khung hồ sơ lãnh đạo
              </TextLink>
            </section>
          </div>
          <aside className="sub-aside self-start">
            <Heading level={3}>Kết nối với đơn vị</Heading>
            <p className="mt-4 text-sm text-ink-muted">
              Thông tin danh bạ và website chính thức của đơn vị cần được xác
              nhận trước khi công bố.
            </p>
            <TextLink to="/lien-he">Liên hệ nhà trường</TextLink>
            <TextLink to="/dao-tao/tim-nganh">Tìm ngành học</TextLink>
          </aside>
        </div>
      </PageBody>
    </>
  )
}
export function PersonPage() {
  const { slug } = useParams()
  const u = units.find((u) => u.slug === slug)
  if (!u && slug !== "ban-giam-hieu") return <NotFoundPage />
  return (
    <>
      <PageHero
        title="Hồ sơ lãnh đạo & Giảng viên"
        description={u?.name || "Ban Giám hiệu · Trường Đại học Mở Hà Nội"}
        section="Đội ngũ HOU"
      />
      <PageBody>
        <Notice>
          Đây là khung hồ sơ. Không sử dụng tên, ảnh hay thành tích cá nhân chưa
          được nhà trường xác nhận.
        </Notice>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <div className="grid aspect-square place-items-center rounded-2xl bg-tint-primary font-display text-headline text-primary">
            HOU
          </div>
          <div className="md:col-span-2">
            <Heading>Thông tin chuyên môn</Heading>
            <InfoTable
              rows={[
                ["Họ và tên", "Chờ dữ liệu chính thức"],
                ["Chức vụ", "Chờ xác nhận"],
                ["Đơn vị", u?.name || "Ban Giám hiệu"],
                ["Lĩnh vực nghiên cứu", "Chờ dữ liệu chính thức"],
                [
                  "Liên hệ",
                  <TextLink to="/lien-he">Danh bạ nhà trường</TextLink>,
                ],
              ]}
            />
          </div>
        </div>
      </PageBody>
    </>
  )
}

export function SearchPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get("q") || ""
  const type = params.get("type") || ""
  const records = [
    ...programs.map((p) => ({
      title: p.name,
      type: "Ngành học",
      to: `/dao-tao/nganh/${p.slug}`,
      description: p.intro,
      year: "",
    })),
    ...articles.map((a) => ({
      title: a.title,
      type: "Tin tức",
      to: `/tin-tuc/${a.slug}`,
      description: a.summary,
      year: a.date.slice(-4),
    })),
    ...documents.map((d) => ({
      title: d.title,
      type: "Văn bản",
      to: `/van-ban/${d.slug}`,
      description: d.number,
      year: d.year,
    })),
    ...units.map((u) => ({
      title: u.name,
      type: "Đơn vị",
      to: `/don-vi/${u.slug}`,
      description: u.field,
      year: "",
    })),
  ]
  const list = records
    .filter(
      (r) =>
        normalize(`${r.title} ${r.description}`).includes(normalize(q)) &&
        (!type || r.type === type) &&
        (!params.get("year") || r.year === params.get("year")),
    )
    .sort((a, b) =>
      params.get("sort") === "Tên A–Z"
        ? a.title.localeCompare(b.title, "vi")
        : b.year.localeCompare(a.year),
    )
  const update = (key: string, value: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        value ? next.set(key, value) : next.delete(key)
        return next
      },
      { replace: true },
    )
  return (
    <>
      <PageHero
        title="Bạn đang tìm điều gì?"
        description="Tìm ngành học, thông tin, văn bản và đơn vị trên cùng một website."
        section="Tìm kiếm"
      />
      <PageBody>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="grid gap-2 text-xs font-semibold text-ink-muted">
            Từ khóa
            <Field
              autoFocus
              aria-label="Từ khóa tìm kiếm"
              value={q}
              onChange={(e) => update("q", e.target.value)}
              placeholder="Nhập thông tin cần tìm…"
            />
          </label>
          <SelectField
            label="Loại nội dung"
            options={["Ngành học", "Tin tức", "Văn bản", "Đơn vị"]}
            value={type}
            onChange={(v) => update("type", v)}
          />
          <SelectField
            label="Năm"
            options={["2026", "2025"]}
            value={params.get("year") || ""}
            onChange={(v) => update("year", v)}
          />
          <SelectField
            label="Sắp xếp"
            options={["Tên A–Z"]}
            emptyLabel="Mới nhất"
            value={params.get("sort") || ""}
            onChange={(v) => update("sort", v)}
          />
        </div>
        <p className="my-6 text-sm text-ink-muted" aria-live="polite">
          {list.length} kết quả trong dữ liệu minh họa {q && <>cho “{q}”</>}
        </p>
        {list.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {list.map((r) => (
              <Card
                key={r.to}
                title={r.title}
                description={r.description}
                to={r.to}
                number={r.type}
              />
            ))}
          </div>
        ) : (
          <Empty>
            <Button onClick={() => setParams({})}>Xóa từ khóa và bộ lọc</Button>
          </Empty>
        )}
      </PageBody>
    </>
  )
}
export function ContactPage() {
  return (
    <>
      <PageHero
        title="Kết nối với HOU"
        description="Chúng tôi đồng hành cùng bạn trong hành trình tìm hiểu, học tập và phát triển."
        section="Liên hệ"
      />
      <PageBody>
        <Notice>
          Địa chỉ và danh bạ dưới đây được kế thừa từ bản giao diện, cần nhà
          trường xác nhận trước khi sử dụng chính thức.
        </Notice>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-hairline bg-surface p-8">
            <Heading>Trường Đại học Mở Hà Nội</Heading>
            <InfoTable
              rows={[
                [
                  "Địa chỉ tham khảo",
                  "Nhà B101, phố Nguyễn Hiền, phường Bạch Mai, TP Hà Nội",
                ],
                [
                  "Điện thoại",
                  <a href="tel:02438682321" className="text-primary">
                    024 3868 2321
                  </a>,
                ],
                [
                  "Email tuyển sinh",
                  <a
                    href="mailto:tuyensinh@hou.edu.vn"
                    className="break-all text-primary"
                  >
                    tuyensinh@hou.edu.vn
                  </a>,
                ],
              ]}
            />
            <a
              href="https://www.google.com/maps/search/?api=1&query=Truong+Dai+hoc+Mo+Ha+Noi"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-control-border px-6 text-sm font-semibold text-primary"
            >
              Tìm trên Google Maps
              <ExternalIcon />
            </a>
          </div>
          <div className="space-y-6">
            <Card
              title="Tư vấn tuyển sinh"
              description="Tìm ngành học, hình thức đào tạo và các thông tin cần chuẩn bị."
              to="/tuyen-sinh"
            />
            <Card
              title="Hỗ trợ sinh viên"
              description="Tra cứu thông báo, quy chế và biểu mẫu học vụ."
              to="/sinh-vien"
            />
            <Card
              title="Danh bạ đơn vị"
              description="Tìm khoa, viện và lĩnh vực chuyên môn."
              to="/don-vi"
            />
          </div>
        </div>
      </PageBody>
    </>
  )
}
export function NotFoundPage() {
  return (
    <>
      <PageHero
        title="Trang bạn tìm chưa có ở đây."
        description="Có thể đường dẫn đã thay đổi. Tiếp tục hành trình từ những gợi ý bên dưới."
        section="404 · Không tìm thấy trang"
      />
      <PageBody>
        <div className="flex flex-wrap gap-4">
          <ActionLink to="/">Về trang chủ</ActionLink>
          <ActionLink to="/tim-kiem">Tìm kiếm website</ActionLink>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <Card
            title="Tìm ngành học"
            description="Khám phá lộ trình phù hợp với bạn."
            to="/dao-tao/tim-nganh"
          />
          <Card
            title="Tuyển sinh"
            description="Bắt đầu hành trình đại học."
            to="/tuyen-sinh"
          />
          <Card
            title="Thư viện văn bản"
            description="Tra cứu quy định và biểu mẫu."
            to="/van-ban"
          />
        </div>
      </PageBody>
    </>
  )
}
