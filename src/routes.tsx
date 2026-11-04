import { createBrowserRouter } from "react-router"
import SiteLayout from "./App"
import { sections } from "./content"

function InitialLoadFallback() {
  return (
    <div className="route-hydrate-fallback" role="status" aria-live="polite">
      <span className="route-hydrate-mark">HOU</span>
      <span>Đang tải nội dung…</span>
    </div>
  )
}

const page = (name: keyof typeof import("./pages")) => async () => ({
  Component: (await import("./pages"))[name],
})
export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    HydrateFallback: InitialLoadFallback,
    children: [
      { index: true, element: null },
      ...sections
        .filter((s) => s.path !== "tin-tuc")
        .map((s) => ({ path: s.path, lazy: page("LandingPage") })),
      { path: "dao-tao/tim-nganh", lazy: page("ProgramsPage") },
      { path: "dao-tao/nganh/:slug", lazy: page("ProgramPage") },
      { path: "dao-tao/so-sanh", lazy: page("ComparePage") },
      { path: "tuyen-sinh/hoc-linh-hoat", lazy: page("FlexiblePage") },
      { path: "tin-tuc", lazy: page("NewsPage") },
      ...sections
        .find((s) => s.path === "tin-tuc")!
        .items.map(([slug]) => ({
          path: `tin-tuc/${slug}`,
          lazy: page("SectionPage"),
        })),
      { path: "tin-tuc/:slug", lazy: page("ArticlePage") },
      { path: "van-ban", lazy: page("DocumentsPage") },
      { path: "van-ban/:slug", lazy: page("DocumentPage") },
      { path: "don-vi", lazy: page("UnitsPage") },
      { path: "don-vi/:slug", lazy: page("UnitPage") },
      { path: "nhan-su/:slug", lazy: page("PersonPage") },
      { path: "tim-kiem", lazy: page("SearchPage") },
      { path: "lien-he", lazy: page("ContactPage") },
      ...sections
        .filter((s) => s.path !== "tin-tuc")
        .map((s) => ({ path: `${s.path}/:slug`, lazy: page("SectionPage") })),
      { path: "*", lazy: page("NotFoundPage") },
    ],
  },
])
