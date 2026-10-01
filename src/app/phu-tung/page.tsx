"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  PhoneCall,
  X,
  Trash2,
  QrCode,
  Package,
  Sparkles,
  Check,
  Menu,
  BookOpen,
  Filter,
  Flame,
  ChevronRight,
  AlertTriangle,
  Home as HomeIcon,
  Wrench,
  Calendar,
} from "lucide-react";
import { PRODUCTS } from "@/data/mockData";
import { useCartStore } from "@/lib/cartStore";

const CATEGORIES = [
  { id: "Tất cả", label: "Tất cả sản phẩm" },
  { id: "Dầu nhớt", label: "Dầu Nhớt & Nhớt Láp" },
  { id: "Truyền động", label: "Nhông Sên Dĩa & Curoa" },
  { id: "Phanh xe", label: "Bố Thắng & Heo Dầu" },
  { id: "Hệ thống điện", label: "Bugi & Bình Ắc Quy" },
  { id: "Vỏ xe", label: "Lốp & Vỏ Xe Không Ruột" },
];

export default function SparePartsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceSort, setPriceSort] = useState<"all" | "low-to-high" | "high-to-low">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { items, addItem, removeItem, clearCart, total } = useCartStore();
  const totalCartCount = items.reduce((a, b) => a + b.quantity, 0);

  const HOTLINE = "0908875245";
  const HOTLINE_DISPLAY = "0908.875.245";
  const ZALO_LINK = `https://zalo.me/${HOTLINE}`;

  // Fix triệt để prefer-const và logic sắp xếp
  const filteredProducts = useMemo(() => {
    const list = PRODUCTS.filter((product) => {
      const matchCat =
        selectedCategory === "Tất cả" || product.category === selectedCategory;
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (priceSort === "low-to-high") {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (priceSort === "high-to-low") {
      return [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [selectedCategory, searchQuery, priceSort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28 md:pb-16 font-sans selection:bg-red-200">
      
      {/* 1. TOP BAR */}
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

      {/* 2. HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 h-18 md:h-20 flex items-center justify-between gap-4">
          
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

          <nav className="hidden lg:flex items-center bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60 font-bold text-sm text-slate-700">
            <Link
              href="/#dich-vu"
              className="px-4 py-2 rounded-xl hover:bg-white hover:text-red-600 transition"
            >
              Dịch Vụ
            </Link>
            <Link
              href="/phu-tung"
              className="px-4 py-2 rounded-xl bg-red-600 text-white shadow-md flex items-center gap-1.5"
            >
              <Package className="w-4 h-4" /> Phụ Tùng
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
              className="px-4 py-2 rounded-xl hover:bg-white hover:text-red-600 transition flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" /> Cẩm Nang
            </Link>
          </nav>

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
                href="/phu-tung"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl bg-red-600 text-white font-extrabold flex justify-between items-center shadow-md"
              >
                <span className="flex items-center gap-2">
                  <Package className="w-4 h-4" /> Kho Phụ Tùng & Nhớt
                </span>
                <Check className="w-4 h-4" />
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
                className="px-4 py-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 flex justify-between items-center"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Cẩm Nang Kỹ Thuật
                </span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO & SEARCH */}
      <section className="bg-slate-950 text-white px-4 py-8 md:py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-red-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Linh Kiện Chính Hãng 100%
          </div>
          <h1 className="text-2xl md:text-4xl font-black mb-3 tracking-tight">
            Kho Phụ Tùng & Dầu Nhớt Cao Cấp
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            Phân phối Motul, Mobil, Liqui Moly, Repsol, DID, Bando, Michelin... Đầy đủ cho các dòng xe ga & xe số.
          </p>

          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo tên phụ tùng, dòng nhớt, dòng xe (VD: Motul 7100, Air Blade, Bugi...)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-400 pl-10 pr-10 py-3 rounded-xl text-xs md:text-sm focus:outline-none focus:border-red-500 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4. FILTER TABS & SORT */}
      <div className="max-w-7xl mx-auto px-4 py-3 bg-white border-b border-slate-200 sticky top-18 md:top-20 z-30 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
              <Filter className="w-3 h-3" /> Giá:
            </span>
            <select
              value={priceSort}
              onChange={(e) =>
                setPriceSort(e.target.value as "all" | "low-to-high" | "high-to-low")
              }
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1.5 outline-none focus:border-red-500"
            >
              <option value="all">Mặc định</option>
              <option value="low-to-high">Giá tăng dần ↑</option>
              <option value="high-to-low">Giá giảm dần ↓</option>
            </select>
          </div>

        </div>
      </div>

      {/* 5. PRODUCT LIST */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            {searchQuery !== ""
              ? `Kết quả tìm kiếm cho: "${searchQuery}"`
              : `Danh mục: ${selectedCategory}`}
          </span>
          <span className="text-xs font-bold text-slate-400">
            {filteredProducts.length} sản phẩm
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700 text-sm">Không tìm thấy sản phẩm nào!</h3>
            <p className="text-xs text-slate-400 mt-1">
              Thử tìm với từ khóa khác hoặc liên hệ hotline để kiểm tra phụ tùng có sẵn tại tiệm.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {currentProducts.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden p-3 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                  />
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur text-slate-900 text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-xs">
                    {prod.category}
                  </span>
                </div>

                <div className="p-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1 truncate">
                      {prod.model}
                    </span>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug mb-2 group-hover:text-red-600 transition">
                      {prod.name}
                    </h3>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 mt-auto">
                    <span className="text-red-600 font-black text-sm sm:text-base">
                      {prod.price.toLocaleString("vi-VN")}đ
                    </span>
                    <button
                      onClick={() => addItem(prod)}
                      className="w-full sm:w-auto bg-slate-900 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Thêm
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold disabled:opacity-40"
            >
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition ${
                  currentPage === page
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold disabled:opacity-40"
            >
              Sau
            </button>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-red-600 to-rose-700 rounded-3xl p-5 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-red-600/20">
          <div>
            <div className="flex items-center gap-2 text-yellow-300 text-xs font-black uppercase mb-1">
              <Flame className="w-4 h-4" /> Dịch Vụ Thay Thế & Lắp Đặt Tại Chỗ
            </div>
            <h2 className="text-xl md:text-2xl font-black mb-1">Cần Thay Nhớt Hoặc Lắp Phụ Tùng Ngay?</h2>
            <p className="text-red-100 text-xs md:text-sm max-w-xl">
              Ghé trực tiếp gara để được thợ kỹ thuật thay thế chuẩn xác, căn chỉnh miễn phí và cam kết không phát sinh chi phí.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/#dat-lich"
              className="flex-1 md:flex-none text-center bg-white text-red-600 px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-slate-50 shadow-md transition"
            >
              Đặt Lịch Lắp
            </Link>
            <a
              href={`tel:${HOTLINE}`}
              className="flex-1 md:flex-none text-center bg-slate-950 text-white px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-black transition"
            >
              Tư Vấn: {HOTLINE_DISPLAY}
            </a>
          </div>
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
              <button onClick={() => setIsCartOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <Package className="w-10 h-10 opacity-30 mb-2" />
                  <p className="text-xs font-medium">Chưa có phụ tùng nào trong giỏ</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain mix-blend-multiply bg-white rounded-lg p-1" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{item.name}</h4>
                      <span className="text-red-600 font-bold text-xs">{item.price.toLocaleString("vi-VN")}đ x {item.quantity}</span>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-1 text-slate-400 hover:text-red-600">
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
                  <span className="text-red-600 font-black text-lg">{total().toLocaleString("vi-VN")}đ</span>
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
            <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 text-slate-400">
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
                alert("Đã ghi nhận thanh toán đơn hàng thành công!");
              }}
              className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs uppercase transition flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Tôi Đã Chuyển Khoản
            </button>
          </div>
        </div>
      )}

      {/* 8. FLOATING BUTTONS */}
      <div className="fixed bottom-24 left-4 z-40 flex flex-col gap-2.5">
        <a href={ZALO_LINK} target="_blank" rel="noreferrer" className="w-11 h-11 bg-[#0068FF] text-white rounded-full shadow-lg flex items-center justify-center font-bold text-xs hover:scale-105 transition">
          Zalo
        </a>
        <a href={`tel:${HOTLINE}`} className="w-11 h-11 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition relative">
          <span className="absolute inset-0 rounded-full bg-red-500 opacity-50 animate-ping"></span>
          <PhoneCall className="w-4 h-4 relative z-10" />
        </a>
      </div>

      {/* 9. BOTTOM NAVIGATION MOBILE */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 pb-safe flex justify-around items-center md:hidden h-16 px-1 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
        <Link href="/" className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14">
          <HomeIcon className="w-4 h-4" />
          <span className="text-[9px] font-bold">Trang chủ</span>
        </Link>
        <Link href="/#dich-vu" className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14">
          <Wrench className="w-4 h-4" />
          <span className="text-[9px] font-bold">Dịch vụ</span>
        </Link>
        <Link href="/phu-tung" className="flex flex-col items-center gap-1 text-red-600 font-extrabold w-14">
          <Package className="w-4 h-4" />
          <span className="text-[9px]">Phụ tùng</span>
        </Link>
        <Link href="/cam-nang" className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14">
          <BookOpen className="w-4 h-4" />
          <span className="text-[9px] font-bold">Cẩm nang</span>
        </Link>
        <Link href="/#dat-lich" className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14">
          <Calendar className="w-4 h-4" />
          <span className="text-[9px] font-bold">Đặt lịch</span>
        </Link>
        <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14 relative">
          <ShoppingCart className="w-4 h-4" />
          <span className="text-[9px] font-bold">Giỏ ({totalCartCount})</span>
        </button>
      </nav>

    </div>
  );
}
