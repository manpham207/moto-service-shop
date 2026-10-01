import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  PhoneCall, 
  AlertTriangle, 
  Wrench, 
  ShieldCheck, 
  Coins, 
  Lightbulb, 
  ChevronRight,
  BookOpen,
  Home as HomeIcon,
  PackageCheck,
  Check
} from "lucide-react";
import { ARTICLES, getArticleBySlug } from "@/data/articles";

// Tối ưu Static Params cho SEO tốc độ cao
export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Các bài viết liên quan
  const relatedArticles = ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);

  const HOTLINE = "0908875245";
  const HOTLINE_DISPLAY = "0908.875.245";
  const ZALO_LINK = `https://zalo.me/${HOTLINE}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28 md:pb-16 font-sans selection:bg-red-200">
      
      {/* 1. TOP BAR CỨU HỘ ĐỒNG BỘ WEB TỔNG */}
      <div className="bg-slate-950 text-white px-4 py-2 text-[10px] md:text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="flex items-center gap-1.5 opacity-90">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <strong className="text-red-400">CỨU HỘ 24/7:</strong> Thủng lốp, hết bình, chết máy có mặt sau 15p!
            </span>
          </div>
          <a
            href={`tel:${HOTLINE}`}
            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-full font-bold flex items-center gap-1 transition shadow-sm shrink-0"
          >
            <PhoneCall className="w-3 h-3" /> Gọi Ngay
          </a>
        </div>
      </div>

      {/* 2. HEADER ĐỒNG BỘ 100% CÙNG CÁC TAB CỦA WEB TỔNG */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 h-18 md:h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Tên Thương Hiệu */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0">
            <div className="relative w-12 h-12 md:w-14 md:h-14 aspect-square rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 p-0.5 shadow-lg shadow-red-600/20 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-white rounded-[14px] p-1 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Logo Sửa Xe Chính"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="font-black text-xl md:text-3xl tracking-tight leading-none text-slate-900">
                  SỬA XE <span className="text-red-600">CHÍNH</span>
                </span>
                <span className="hidden lg:inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span> Gara Uy Tín
                </span>
              </div>
              <span className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">
                Kỹ Thuật Cao • Bảo Hành Dài Hạn
              </span>
            </div>
          </Link>

          {/* Menu Điều Hướng Desktop (Có thể bấm để xem Dịch Vụ, Phụ Tùng, Bản Đồ...) */}
          <nav className="hidden lg:flex items-center bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60 font-bold text-sm text-slate-700">
            <Link
              href="/#dich-vu"
              className="px-4 py-2 rounded-xl hover:bg-white hover:text-red-600 transition"
            >
              Dịch Vụ
            </Link>
            <Link
              href="/#phu-tung"
              className="px-4 py-2 rounded-xl hover:bg-white hover:text-red-600 transition"
            >
              Phụ Tùng
            </Link>
            <Link
              href="/#dat-lich"
              className="px-4 py-2 rounded-xl hover:bg-white hover:text-red-600 transition"
            >
              Đặt Lịch Hẹn
            </Link>
            <Link
              href="/#vi-tri"
              className="px-4 py-2 rounded-xl hover:bg-white hover:text-red-600 transition"
            >
              Bản Đồ
            </Link>
            <Link
              href="/cam-nang"
              className="px-4 py-2 rounded-xl bg-red-600 text-white shadow-md flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" /> Cẩm Nang
            </Link>
          </nav>

          {/* Cụm Hotline Bên Phải */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`tel:${HOTLINE}`}
              className="flex items-center gap-2.5 bg-red-50 border border-red-100 text-red-700 px-3.5 py-2 rounded-2xl font-bold text-xs md:text-sm hover:bg-red-600 hover:text-white transition group"
            >
              <div className="w-7 h-7 rounded-xl bg-red-600 group-hover:bg-white group-hover:text-red-600 text-white flex items-center justify-center shadow-md transition">
                <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[9px] opacity-80 uppercase tracking-wider">
                  Hotline Cứu Hộ
                </span>
                <span className="font-black">{HOTLINE_DISPLAY}</span>
              </div>
            </a>
          </div>
        </div>
      </header>

            {/* 3. BREADCRUMB & NÚT QUAY LẠI CẨM NANG (DỄ THẤY & DỄ BẤM HƠN) */}
      <div className="max-w-4xl mx-auto px-4 pt-4 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Nút Quay Lại Nổi Bật Dạng Pill Capsule */}
          <Link 
            href="/cam-nang" 
            className="group inline-flex items-center gap-2 text-xs font-black text-slate-800 hover:text-white bg-white hover:bg-red-600 border border-slate-300 hover:border-red-600 px-3.5 py-2 rounded-xl shadow-xs transition-all duration-200 active:scale-95"
          >
            <div className="w-5 h-5 rounded-lg bg-slate-100 group-hover:bg-red-700 flex items-center justify-center transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 text-slate-700 group-hover:text-white transition-transform group-hover:-translate-x-0.5" />
            </div>
            <span>Quay lại Cẩm Nang</span>
          </Link>

          {/* Breadcrumb Phân Cấp (Ẩn nhẹ trên màn hình rất nhỏ để gọn gàng) */}
          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
            <Link href="/" className="hover:text-slate-700 transition">Trang chủ</Link>
            <span>/</span>
            <Link href="/cam-nang" className="hover:text-slate-700 transition">Cẩm nang</Link>
            <span>/</span>
            <span className="text-slate-700 font-bold truncate max-w-[160px] md:max-w-[240px]">
              {article.title}
            </span>
          </nav>

        </div>
      </div>

      {/* 4. MAIN ARTICLE CONTENT */}
      <main className="max-w-4xl mx-auto px-4 py-3">
        
        {/* Category & Metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-2.5">
          <span className="bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded text-[10px] font-black uppercase">
            {article.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400" /> {article.date}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> {article.readTime} đọc</span>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 leading-tight mb-3">
          {article.title}
        </h1>

        {/* Tóm tắt mở bài */}
        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-5 bg-white p-3.5 rounded-2xl border-l-4 border-red-600 border border-slate-200/80 shadow-xs">
          {article.excerpt}
        </p>

        {/* Ảnh minh họa bài viết */}
        <div className="w-full h-52 sm:h-72 md:h-80 rounded-2xl overflow-hidden bg-slate-200 shadow-sm mb-6 border border-slate-200/80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Khối Nội Dung Chuyên Môn */}
        <div className="space-y-4 text-sm text-slate-800 leading-relaxed">
          
          {/* 1. Triệu chứng nhận biết */}
          <section className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              1. Dấu hiệu & Triệu chứng nhận biết
            </h2>
            <ul className="space-y-2">
              {article.content.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 2. Nguyên nhân kỹ thuật */}
          <section className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-slate-800 shrink-0" />
              2. Nguyên nhân cốt lõi từ bộ phận
            </h2>
            <ul className="space-y-2">
              {article.content.causes.map((cause, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 3. Quy trình khắc phục */}
          <section className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              3. Quy trình kiểm tra & khắc phục tại xưởng
            </h2>
            <div className="space-y-2.5">
              {article.content.solutions.map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="font-bold text-xs sm:text-sm text-red-700 mb-1">
                    {item.step}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Chi phí ước tính */}
          {article.content.priceEstimate && (
            <section className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl">
              <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-900 mb-1">
                <Coins className="w-4 h-4 text-amber-700 shrink-0" /> Chi phí tham khảo tại Sửa Xe Chính Biên Hòa:
              </div>
              <p className="text-xs text-amber-800 font-medium">
                {article.content.priceEstimate}
              </p>
            </section>
          )}

          {/* 5. Lời khuyên từ thợ máy */}
          <section className="bg-blue-50/70 border border-blue-200 p-4 rounded-2xl">
            <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-blue-950 mb-1">
              <Lightbulb className="w-4 h-4 text-blue-600 shrink-0" /> Lời khuyên từ thợ máy:
            </div>
            <p className="text-xs text-blue-900 font-medium leading-relaxed">
              {article.content.proTip}
            </p>
          </section>

        </div>

        {/* Khung Kêu Gọi Đặt Hẹn / Gọi Cứu Hộ */}
        <div className="mt-8 bg-slate-950 text-white rounded-2xl p-5 md:p-6 text-center shadow-lg relative overflow-hidden">
          <h3 className="font-black text-base sm:text-lg mb-1">Xe bạn đang có dấu hiệu tương tự?</h3>
          <p className="text-xs text-slate-400 mb-4 max-w-md mx-auto">
            Đừng cố chạy tiếp làm hao mòn sang các linh kiện đắt tiền khác. Ghé tiệm để kiểm tra miễn phí!
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <a 
              href={`tel:${HOTLINE}`} 
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-md transition"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" /> Gọi Cứu Hộ: {HOTLINE_DISPLAY}
            </a>
            <Link 
              href="/#dat-lich" 
              className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl border border-slate-700 transition"
            >
              Đặt Lịch Hẹn Trước
            </Link>
          </div>
        </div>

        {/* Bài viết liên quan (Gọn gàng) */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <h3 className="font-black text-sm text-slate-900 mb-3">Bài viết liên quan nên xem:</h3>
          <div className="flex flex-col gap-2">
            {relatedArticles.map((rel) => (
              <Link 
                key={rel.id} 
                href={`/cam-nang/${rel.slug}`} 
                className="flex items-center justify-between p-2.5 bg-white border border-slate-200/80 rounded-xl hover:border-red-500/50 hover:shadow-xs transition"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rel.image} alt={rel.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-slate-800 line-clamp-1 hover:text-red-600">
                      {rel.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{rel.date} • {rel.readTime} đọc</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </main>

      {/* 5. NÚT ZALO & GỌI CỨU HỘ NỔI */}
      <div className="fixed bottom-24 left-4 z-40 flex flex-col gap-2.5">
        <a
          href={ZALO_LINK}
          target="_blank"
          rel="noreferrer"
          className="w-11 h-11 bg-[#0068FF] text-white rounded-full shadow-lg flex items-center justify-center font-bold text-xs hover:scale-105 transition"
        >
          Zalo
        </a>
        <a
          href={`tel:${HOTLINE}`}
          className="w-11 h-11 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition relative"
        >
          <span className="absolute inset-0 rounded-full bg-red-500 opacity-50 animate-ping"></span>
          <PhoneCall className="w-4 h-4 relative z-10" />
        </a>
      </div>

      {/* 6. BOTTOM NAVIGATION MOBILE ĐỒNG BỘ WEB TỔNG */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 pb-safe flex justify-around items-center md:hidden h-16 px-1 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
        <Link href="/" className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14">
          <HomeIcon className="w-4 h-4" />
          <span className="text-[9px] font-bold">Trang chủ</span>
        </Link>
        <Link href="/#dich-vu" className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14">
          <Wrench className="w-4 h-4" />
          <span className="text-[9px] font-bold">Dịch vụ</span>
        </Link>
        <Link href="/#phu-tung" className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14">
          <PackageCheck className="w-4 h-4" />
          <span className="text-[9px] font-bold">Phụ tùng</span>
        </Link>
        <Link href="/cam-nang" className="flex flex-col items-center gap-1 text-red-600 font-extrabold w-14">
          <BookOpen className="w-4 h-4" />
          <span className="text-[9px]">Cẩm nang</span>
        </Link>
        <Link href="/#dat-lich" className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14">
          <Calendar className="w-4 h-4" />
          <span className="text-[9px] font-bold">Đặt lịch</span>
        </Link>
      </nav>

    </div>
  );
}
