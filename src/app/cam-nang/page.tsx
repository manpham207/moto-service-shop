"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  ShoppingCart,
  PhoneCall,
  Clock,
  Calendar,
  X,
  Trash2,
  QrCode,
  MapPin,
  Home as HomeIcon,
  AlertTriangle,
  Search,
  BookOpen,
  ChevronRight,
  Sparkles,
  Layers,
  ShieldAlert,
  PackageCheck,
  Check,
  Menu,
  ShieldCheck
} from "lucide-react";
import { ARTICLES } from "@/data/articles";
import { useCartStore } from "@/lib/cartStore";

// DANH MỤC PHÂN LOẠI
const CATEGORIES = [
  { id: "Tất cả", label: "Tất cả", icon: Layers },
  { id: "Bắt Bệnh", label: "Bắt Bệnh Xe", icon: Wrench },
  { id: "Cứu Hộ", label: "Cứu Hộ Khẩn Cấp", icon: ShieldAlert },
  { id: "Bảo Dưỡng", label: "Bảo Dưỡng Định Kỳ", icon: Clock },
  { id: "Phụ Tùng", label: "Phụ Tùng & Nhớt", icon: PackageCheck },
  { id: "An Toàn", label: "Kỹ Năng An Toàn", icon: ShieldCheck },
];

export default function HandbookPage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { items, removeItem, clearCart, total } = useCartStore();
  const totalCartCount = items.reduce((a, b) => a + b.quantity, 0);

  const HOTLINE = "0908875245";
  const HOTLINE_DISPLAY = "0908.875.245";
  const ZALO_LINK = `https://zalo.me/${HOTLINE}`;
  const ADDRESS = "1229 Bùi Văn Hòa, Long Bình, Đồng Nai";

  const filteredArticles = ARTICLES.filter((article) => {
    const matchCategory =
      activeCategory === "Tất cả" || article.category === activeCategory;
    const matchSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28 md:pb-12 font-sans selection:bg-red-200">
      
      {/* 1. TOP BAR CẢNH BÁO CỨU HỘ ĐỒNG BỘ TRANG CHỦ */}
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

      {/* 2. HEADER ĐỒNG BỘ WEB TỔNG */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 h-18 md:h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Tên Cửa Hàng */}
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

          {/* Menu Điều Hướng Desktop */}
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
            {/* Tab Cẩm Nang Đang Đứng (Nổi bật) */}
            <Link
              href="/cam-nang"
              className="px-4 py-2 rounded-xl bg-red-600 text-white shadow-md flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" /> Cẩm Nang
            </Link>
          </nav>

          {/* Phím Chức Năng Bên Phải */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`tel:${HOTLINE}`}
              className="hidden sm:flex items-center gap-2.5 bg-red-50 border border-red-100 text-red-700 px-3.5 py-2 rounded-2xl font-bold text-xs md:text-sm hover:bg-red-600 hover:text-white transition group"
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

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Xem giỏ hàng"
              className="relative p-2.5 sm:p-3 rounded-2xl bg-slate-900 text-white hover:bg-red-600 transition shadow-lg flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900">
                  {totalCartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Mở menu"
              className="lg:hidden p-2.5 rounded-2xl bg-slate-100 text-slate-800 hover:bg-slate-200 flex items-center justify-center"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-red-600" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Dropdown Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl px-4 py-4 shadow-xl">
            <div className="flex flex-col gap-2 font-bold text-sm text-slate-700">
              <Link
                href="/#dich-vu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 flex justify-between items-center"
              >
                Dịch Vụ Sửa Chữa <ChevronRight className="w-4 h-4 opacity-40" />
              </Link>
              <Link
                href="/#phu-tung"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 flex justify-between items-center"
              >
                Kho Phụ Tùng <ChevronRight className="w-4 h-4 opacity-40" />
              </Link>
              <Link
                href="/#dat-lich"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 flex justify-between items-center"
              >
                Đặt Lịch Hẹn Trước <ChevronRight className="w-4 h-4 opacity-40" />
              </Link>
              <Link
                href="/#vi-tri"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 flex justify-between items-center"
              >
                Bản Đồ Chỉ Đường <ChevronRight className="w-4 h-4 opacity-40" />
              </Link>
              <Link
                href="/cam-nang"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl bg-red-600 text-white font-extrabold flex justify-between items-center shadow-md"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Cẩm Nang Kỹ Thuật
                </span>
                <Check className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO CẨM NANG & THANH TÌM KIẾM */}
      <section className="bg-slate-950 text-white px-4 py-8 md:py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-red-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Kiến thức & Bắt bệnh xe máy
          </div>
          <h1 className="text-2xl md:text-4xl font-black mb-3 tracking-tight">
            Cẩm Nang Chăm Sóc & Sửa Chữa Xe Máy
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            Tra cứu nhanh các nguyên nhân rung giật, hụt ga, hao nhớt và quy trình bảo dưỡng chuẩn xác giúp xe luôn êm ái.
          </p>

          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Nhập bệnh xe: rung đầu, khó nổ, phanh kêu, thay nhớt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl text-xs md:text-sm focus:outline-none focus:border-red-500 font-medium"
            />
          </div>
        </div>
      </section>

      {/* 4. THANH DANH MỤC TRƯỢT NGANG CÓ BIỂU TƯỢNG */}
      <div className="max-w-4xl mx-auto px-4 py-3 bg-white border-b border-slate-200 sticky top-18 md:top-20 z-30 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-red-600 text-white shadow-sm shadow-red-600/30 scale-102"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. DANH SÁCH BÀI VIẾT (HIỂN THỊ ĐẦY ĐỦ, 3-4 BÀI/MÀN HÌNH TRÊN MOBILE) */}
      <main className="max-w-4xl mx-auto px-3.5 py-5">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            {searchQuery !== "" ? `Kết quả: "${searchQuery}"` : `Chuyên mục: ${activeCategory}`}
          </span>
          <span className="text-[11px] font-bold text-slate-400">
            {filteredArticles.length} bài viết
          </span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-xs text-slate-500 font-medium">
              Không tìm thấy bài viết phù hợp với từ khóa.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/cam-nang/${article.slug}`}
                className="group bg-white rounded-xl border border-slate-200/80 p-2.5 flex gap-3 hover:border-red-500/50 hover:shadow-md transition-all items-center block cursor-pointer"
              >
                {/* Thumbnail vuông nhỏ gọn */}
                <div className="w-20 h-20 sm:w-28 sm:h-24 rounded-lg overflow-hidden shrink-0 relative bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/75 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded">
                    {article.category}
                  </span>
                </div>

                {/* Phần thông tin bài viết */}
                <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors mb-1">
                      {article.title}
                    </h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-1 sm:line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {article.date} • {article.readTime} đọc
                    </span>
                    <span className="text-red-600 font-bold flex items-center group-hover:translate-x-1 transition-transform">
                      Đọc tiếp <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Khung Kêu Gọi Đặt Hẹn Nhanh */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div>
            <div className="text-sm font-black text-red-950">Xe bạn đang có dấu hiệu bất thường?</div>
            <div className="text-xs text-red-700 mt-0.5">
              Đưa xe đến xưởng để kỹ thuật viên kiểm tra bugi, nồi, ắc quy miễn phí.
            </div>
          </div>
          <Link
            href="/#dat-lich"
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 text-center shadow-md transition"
          >
            Đặt Lịch Hẹn Ngay
          </Link>
        </div>
      </main>

      {/* 6. GIỎ HÀNG DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-slate-900">
                <ShoppingCart className="w-5 h-5 text-red-600" /> Giỏ Hàng Phụ Tùng
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <p className="text-xs font-medium">Chưa có phụ tùng nào trong giỏ</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-contain mix-blend-multiply bg-white rounded-lg p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {item.name}
                      </h4>
                      <span className="text-red-600 font-bold text-xs">
                        {item.price.toLocaleString("vi-VN")}đ x {item.quantity}
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-slate-100 bg-white">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-slate-500 font-bold">Tổng tiền:</span>
                  <span className="text-red-600 font-black text-lg">
                    {total().toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-slate-900 hover:bg-red-600 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <QrCode className="w-4 h-4" /> Thanh Toán Mã QR
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. VIETQR MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center relative shadow-2xl">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-black text-lg text-slate-900 mb-1">Mã QR Thanh Toán</h3>
            <p className="text-xs text-slate-500 mb-4">Mở App ngân hàng bất kỳ để quét</p>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-4 inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://api.vietqr.io/image/970422-${HOTLINE}-f5Yg2Z0.jpg?accountName=TIEM%20SUA%20XE%20CHINH&amount=${total()}&addInfo=DonHangPhuTung`}
                alt="VietQR"
                className="w-48 h-48 mx-auto object-contain mix-blend-multiply"
              />
            </div>

            <button
              onClick={() => {
                clearCart();
                setIsCheckoutOpen(false);
                alert("Đã ghi nhận thanh toán thành công!");
              }}
              className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs uppercase transition flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Tôi Đã Chuyển Khoản
            </button>
          </div>
        </div>
      )}

      {/* 8. FOOTER */}
      <footer id="lien-he" className="bg-slate-950 text-slate-400 py-10 border-t border-slate-900 text-xs">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <span className="font-black text-white text-base block mb-2">SỬA XE CHÍNH</span>
            <p className="leading-relaxed text-slate-500">
              Trạm sửa chữa xe máy uy tín, phân phối linh kiện chính hãng và cứu hộ khẩn cấp 24/7 tại Biên Hòa.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2 uppercase">Địa chỉ</h4>
            <p>{ADDRESS}</p>
            <p className="mt-1">
              Hotline: <strong className="text-white">{HOTLINE_DISPLAY}</strong>
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2 uppercase">Dịch vụ</h4>
            <div className="flex flex-col gap-1">
              <Link href="/#dich-vu" className="hover:text-white">
                → Bảng giá bảo dưỡng & sửa chữa
              </Link>
              <Link href="/#phu-tung" className="hover:text-white">
                → Kho phụ tùng chính hãng
              </Link>
              <Link href="/#dat-lich" className="hover:text-white">
                → Đặt lịch kiểm tra xe ưu tiên
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* 9. NÚT ZALO & GỌI CỨU HỘ NỔI */}
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

      {/* 10. BOTTOM NAVIGATION MOBILE ĐỒNG BỘ */}
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
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14 relative"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="text-[9px] font-bold">Giỏ ({totalCartCount})</span>
        </button>
      </nav>

    </div>
  );
}
