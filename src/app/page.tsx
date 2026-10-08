"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Wrench,
  ShoppingCart,
  PhoneCall,
  Clock,
  CheckCircle2,
  Calendar,
  X,
  Trash2,
  QrCode,
  MapPin,
  ShieldCheck,
  Package,
  Home as HomeIcon,
  ArrowUp,
  AlertTriangle,
  Send,
  Navigation,
  Menu,
  BookOpen,
  ChevronRight,
  Sparkles,
  Check
} from "lucide-react";
import { SERVICES, PRODUCTS } from "@/data/mockData";
import { useCartStore } from "@/lib/cartStore";

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  const BANNER_SLIDES = [
    {
      badge: "Thợ tay nghề cao - Phục vụ tận nơi",
      title: "Sửa Xe Máy & Phụ Tùng",
      highlight: "Chính Hãng",
      desc: "Đội phản ứng nhanh cứu hộ tận nơi khi gặp sự cố trên đường hoặc tại nhà. Báo đúng giá, phụ tùng chính hãng bảo hành dài hạn.",
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
    },
    {
      badge: "Cứu hộ khẩn cấp 24/7",
      title: "Cứu Hộ Chết Máy",
      highlight: "Tận Nơi 15 Phút",
      desc: "Hỗ trợ vá vỏ lưu động, kích sạc bình ắc quy, xử lý xe chết máy ngập nước thần tốc khu vực Biên Hòa, Long Bình, Tam Phước.",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      badge: "Bảo dưỡng tiêu chuẩn",
      title: "Bảo Dưỡng Toàn Diện",
      highlight: "Êm Ái Tiết Kiệm",
      desc: "Vệ sinh kim phun, buồng đốt, làm nồi, thay nhớt cao cấp giúp xe vận hành mượt mà và bền bỉ như xe mới.",
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const [booking, setBooking] = useState({
    name: "", phone: "", bikeModel: "", service: "Bảo Dưỡng Toàn Diện 10 Bước", date: "", note: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const { items, addItem, removeItem, clearCart, total } = useCartStore();

  const HOTLINE = "0908875245";
  const HOTLINE_DISPLAY = "0908.875.245";
  const ZALO_LINK = `https://zalo.me/${HOTLINE}`;
  const ADDRESS = "1229 Bùi Văn Hòa, Long Bình, Đồng Nai";
  const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/rqXyv2N3NM5HzuwN9";
  const MAPS_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length), 4000);
    return () => clearInterval(timer);
  }, [BANNER_SLIDES.length]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setBooking((prev) => ({ ...prev, service: serviceTitle }));
    const element = document.getElementById("dat-lich");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(booking.phone.trim())) {
      alert("Vui lòng nhập đúng định dạng số điện thoại 10 số!"); 
      return;
    }

    let formattedDate = booking.date;
    if (booking.date) {
      try {
        const d = new Date(booking.date);
        formattedDate = `${d.getHours()}h${d.getMinutes().toString().padStart(2, "0")} ngày ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
      } catch { formattedDate = booking.date; }
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...booking, date: formattedDate }),
      });
      if (res.ok) {
        setBookingSuccess(true);
        setBooking({ name: "", phone: "", bikeModel: "", service: "Bảo Dưỡng Toàn Diện 10 Bước", date: "", note: "" });
        setTimeout(() => setBookingSuccess(false), 6000);
      } else {
        alert("Có lỗi xảy ra. Vui lòng liên hệ hotline: " + HOTLINE_DISPLAY);
      }
    } catch {
      alert("Không thể kết nối. Vui lòng gọi hotline!");
    } finally { setIsSubmitting(false); }
  };

  const filteredProducts = selectedFilter === "Tất cả" ? PRODUCTS : PRODUCTS.filter((p) => p.category === selectedFilter);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const handleFilterChange = (cat: string) => { setSelectedFilter(cat); setCurrentPage(1); };

  const categories = ["Tất cả", "Truyền động", "Phanh xe", "Dầu nhớt", "Vỏ xe", "Hệ thống điện"];
  const totalCartCount = items.reduce((a, b) => a + b.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28 md:pb-0 relative font-sans">
      
      {/* 1. Top Bar */}
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
          <a href={`tel:${HOTLINE}`} className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-full font-bold flex items-center gap-1 transition shadow-sm shrink-0">
            <PhoneCall className="w-3 h-3" /> Gọi Ngay
          </a>
        </div>
      </div>

      {/* 2. Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 h-18 md:h-20 flex items-center justify-between gap-4">
          
          <a href="#" className="flex items-center gap-3.5 group shrink-0">
            <div className="relative w-12 h-12 md:w-14 md:h-14 aspect-square rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 p-0.5 shadow-lg shadow-red-600/20 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-white rounded-[14px] p-1 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Logo Sửa Xe Chính" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
               <span className="font-black text-xl md:text-3xl tracking-tight leading-none text-slate-900 inline-flex items-baseline gap-1.5">
  <span>SỬA XE</span>
  <span className="text-red-600 text-3xl md:text-4xl italic font-black">CHÍNH</span>
</span>
                <span className="hidden lg:inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span> Gara Uy Tín
                </span>
              </div>
              <span className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">
                Kỹ Thuật Cao • Bảo Hành Dài Hạn
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60 font-bold text-sm text-slate-700">
            <a href="#dich-vu" onClick={(e) => scrollToSection(e, "dich-vu")} className="px-4 py-2 rounded-xl hover:bg-white hover:text-red-600 transition">
              Dịch Vụ
            </a>
            <Link href="/phu-tung" className="px-4 py-2 rounded-xl hover:bg-white hover:text-red-600 transition">
              Phụ Tùng
            </Link>
            <a href="#dat-lich" onClick={(e) => scrollToSection(e, "dat-lich")} className="px-4 py-2 rounded-xl hover:bg-white hover:text-red-600 transition">
              Đặt Lịch Hẹn
            </a>
            <a href="#vi-tri" onClick={(e) => scrollToSection(e, "vi-tri")} className="px-4 py-2 rounded-xl hover:bg-white hover:text-red-600 transition">
              Bản Đồ
            </a>
            <Link href="/cam-nang" className="px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Cẩm Nang
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a href={`tel:${HOTLINE}`} className="hidden sm:flex items-center gap-2.5 bg-red-50 border border-red-100 text-red-700 px-3.5 py-2 rounded-2xl font-bold text-xs md:text-sm hover:bg-red-600 hover:text-white transition group">
              <div className="w-7 h-7 rounded-xl bg-red-600 group-hover:bg-white group-hover:text-red-600 text-white flex items-center justify-center shadow-md transition">
                <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[9px] opacity-80 uppercase tracking-wider">Hotline Cứu Hộ</span>
                <span className="font-black">{HOTLINE_DISPLAY}</span>
              </div>
            </a>

            <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 sm:p-3 rounded-2xl bg-slate-900 text-white hover:bg-red-600 transition shadow-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900">
                  {totalCartCount}
                </span>
              )}
            </button>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2.5 rounded-2xl bg-slate-100 text-slate-800 hover:bg-slate-200 flex items-center justify-center">
              {isMobileMenuOpen ? <X className="w-5 h-5 text-red-600" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl px-4 py-4 shadow-xl">
            <div className="flex flex-col gap-2 font-bold text-sm text-slate-700">
              <a href="#dich-vu" onClick={(e) => scrollToSection(e, "dich-vu")} className="px-4 py-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 flex justify-between items-center">
                Dịch Vụ Sửa Chữa <ChevronRight className="w-4 h-4 opacity-40" />
              </a>
              <Link href="/phu-tung" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 flex justify-between items-center">
                Kho Phụ Tùng & Nhớt <ChevronRight className="w-4 h-4 opacity-40" />
              </Link>
              <a href="#dat-lich" onClick={(e) => scrollToSection(e, "dat-lich")} className="px-4 py-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 flex justify-between items-center">
                Đặt Lịch Hẹn Trước <ChevronRight className="w-4 h-4 opacity-40" />
              </a>
              <a href="#vi-tri" onClick={(e) => scrollToSection(e, "vi-tri")} className="px-4 py-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 flex justify-between items-center">
                Bản Đồ Chỉ Đường <ChevronRight className="w-4 h-4 opacity-40" />
              </a>
              <Link href="/cam-nang" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl bg-red-50 text-red-600 font-extrabold flex justify-between items-center">
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Cẩm Nang Kỹ Thuật</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 3. Hero Section */}
      <section className="relative bg-slate-950 text-white min-h-[500px] md:min-h-[580px] flex items-center pt-8 pb-24 md:py-20">
        {BANNER_SLIDES.map((slide, idx) => (
          <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === idx ? "opacity-85" : "opacity-0 pointer-events-none"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 relative z-20 w-full grid lg:grid-cols-2 gap-10 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-red-400" /> {BANNER_SLIDES[currentSlide].badge}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4 drop-shadow-md">
              {BANNER_SLIDES[currentSlide].title} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                {BANNER_SLIDES[currentSlide].highlight}
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed max-w-lg">
              {BANNER_SLIDES[currentSlide].desc}
            </p>

            <div className="flex flex-wrap gap-3">
              <a href={`tel:${HOTLINE}`} className="bg-red-600 hover:bg-red-500 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-600/30 transition text-sm">
                <PhoneCall className="w-4 h-4 animate-pulse" /> Gọi Cứu Hộ Ngay
              </a>
              <a href="#dat-lich" onClick={(e) => scrollToSection(e, "dat-lich")} className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 transition text-sm">
                <Calendar className="w-4 h-4" /> Đặt Lịch
              </a>
            </div>

            <div className="flex items-center gap-2 mt-8">
              {BANNER_SLIDES.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? "w-8 bg-red-500" : "w-2 bg-white/30"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cam Kết Box */}
      <div className="max-w-7xl mx-auto px-4 relative z-30 -mt-12 mb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {[
            { t: "15 Phút", d: "Cứu hộ nhanh Biên Hòa" },
            { t: "24/7", d: "Túc trực ngày & đêm" },
            { t: "100%", d: "Phụ tùng chính hãng" },
            { t: "6 Tháng", d: "Bảo hành linh kiện" }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex flex-col justify-center text-center">
              <div className="text-red-600 font-black text-xl mb-0.5">{item.t}</div>
              <div className="text-slate-500 text-[10px] md:text-xs font-semibold uppercase">{item.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Dịch Vụ */}
      <section id="dich-vu" className="py-10 md:py-16 max-w-7xl mx-auto px-4 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-red-600 font-extrabold text-[10px] md:text-xs uppercase tracking-widest mb-1 block">Dịch Vụ Của Chúng Tôi</span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Sửa Chữa & Bảo Dưỡng</h2>
          <p className="text-slate-500 text-xs md:text-sm mt-1">Báo giá minh bạch trước khi làm, không phát sinh chi phí ẩn.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {SERVICES.map((srv) => (
            <div key={srv.id} className="group bg-white border border-slate-200/70 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <span className="text-[9px] md:text-[10px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-lg inline-block mb-2 uppercase tracking-wider">
                  {srv.tag}
                </span>
                <h3 className="font-black text-sm md:text-lg text-slate-900 mb-1.5 leading-snug group-hover:text-red-600 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-3 mb-4">
                  {srv.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span className="font-black text-slate-900 text-sm md:text-base">{srv.price}</span>
                <button onClick={() => handleSelectService(srv.title)} className="text-xs font-bold text-white bg-slate-900 px-3 py-2 rounded-xl hover:bg-red-600 w-full md:w-auto text-center transition-colors">
                  Đặt lịch
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Phụ Tùng (Trưng Bày Tiêu Biểu & Dẫn Sang Trang /phu-tung) */}
      <section id="phu-tung" className="py-12 md:py-16 bg-slate-100/70 border-t border-slate-200/60 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-3">
            <div>
              <span className="text-red-600 font-extrabold text-[10px] md:text-xs uppercase tracking-widest mb-1 block">Linh Kiện Thay Thế</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Kho Phụ Tùng & Dầu Nhớt</h2>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {categories.map((cat) => (
                <button key={cat} onClick={() => handleFilterChange(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedFilter === cat ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {currentProducts.map((prod) => (
              <div key={prod.id} className="group bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                <div className="aspect-[4/3] w-full bg-slate-50 relative overflow-hidden p-3 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" />
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur text-slate-900 text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                    {prod.category}
                  </span>
                </div>
                <div className="p-3 md:p-4 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-0.5 truncate">
                      {prod.model}
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-snug mb-2 group-hover:text-red-600 transition">
                      {prod.name}
                    </h3>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-50">
                    <span className="text-red-600 font-black text-sm md:text-base">{prod.price.toLocaleString("vi-VN")}đ</span>
                    <button onClick={() => addItem(prod)} className="w-full sm:w-auto px-3 py-1.5 flex items-center justify-center bg-slate-900 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-colors">
                      <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Thêm
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold disabled:opacity-40">Trở lại</button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 rounded-xl text-xs font-bold transition ${currentPage === page ? "bg-slate-900 text-white shadow-md" : "bg-white border border-slate-200 text-slate-600"}`}>
                    {page}
                  </button>
                ))}
              </div>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold disabled:opacity-40">Tiếp</button>
            </div>
          )}

          {/* Nút Điều Hướng Sang Trang Kho Phụ Tùng Đầy Đủ */}
          <div className="mt-8 text-center">
            <Link
              href="/phu-tung"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition text-xs sm:text-sm shadow-md"
            >
              Xem toàn bộ kho phụ tùng & dầu nhớt có tìm kiếm <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Form Đặt Lịch */}
      <section id="dat-lich" className="py-12 md:py-20 max-w-4xl mx-auto px-4 scroll-mt-24">
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-10 shadow-xl">
          <div className="text-center mb-6 md:mb-8">
            <span className="text-red-600 font-extrabold text-[10px] md:text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-lg inline-block mb-2">
              Booking Ưu Tiên
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Đặt Lịch Hẹn Làm Xe</h2>
            <p className="text-slate-500 text-xs md:text-sm mt-1">Tránh chờ đợi, thợ chuẩn bị sẵn phụ tùng trước khi xe tới.</p>
          </div>

          {bookingSuccess ? (
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 text-center text-emerald-800">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-black mb-1">Gửi yêu cầu thành công!</h3>
              <p className="text-xs font-medium opacity-80">Tiệm sẽ liên hệ xác nhận lịch trong 10 phút.</p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Họ và Tên *</label>
                <input type="text" required placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium outline-none focus:border-red-500 focus:bg-white transition" value={booking.name} onChange={(e) => setBooking({ ...booking, name: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Số Điện Thoại *</label>
                <input type="tel" required placeholder="0908 xxx xxx" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium outline-none focus:border-red-500 focus:bg-white transition" value={booking.phone} onChange={(e) => setBooking({ ...booking, phone: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Dòng Xe *</label>
                <input type="text" required placeholder="VD: Air Blade, SH, Wave..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium outline-none focus:border-red-500 focus:bg-white transition" value={booking.bikeModel} onChange={(e) => setBooking({ ...booking, bikeModel: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Gói Dịch Vụ</label>
                <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium outline-none focus:border-red-500 focus:bg-white transition" value={booking.service} onChange={(e) => setBooking({ ...booking, service: e.target.value })}>
                  {SERVICES.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                  <option value="Kiểm tra tổng quát / Vấn đề khác">Khác (Kiểm tra tại xưởng)</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Thời Gian Tới Xưởng</label>
                <input type="datetime-local" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium outline-none focus:border-red-500 focus:bg-white transition" value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Triệu chứng của xe</label>
                <textarea rows={2} placeholder="VD: Xe khó nổ, kêu nồi sau, phanh không ăn..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium outline-none focus:border-red-500 focus:bg-white transition resize-none" value={booking.note} onChange={(e) => setBooking({ ...booking, note: e.target.value })}></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="md:col-span-2 mt-2 bg-slate-900 hover:bg-red-600 disabled:bg-slate-400 text-white font-black py-3.5 rounded-xl shadow-lg transition text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                {isSubmitting ? "Đang xử lý..." : "Xác Nhận Đặt Lịch"} <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 7. Vị Trí */}
      <section id="vi-tri" className="py-12 bg-white border-t border-slate-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Vị Trí Cửa Hàng</h2>
            <p className="text-slate-500 text-xs md:text-sm mt-1">{ADDRESS}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 bg-slate-50 rounded-3xl p-3 border border-slate-100">
            <div className="lg:col-span-1 p-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0"><MapPin className="w-4 h-4" /></div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Địa Chỉ</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{ADDRESS}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><Clock className="w-4 h-4" /></div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Giờ Mở Cửa</h4>
                    <p className="text-xs text-slate-600 mt-0.5">07:30 - 19:30 (Thứ 2 - CN)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><PhoneCall className="w-4 h-4" /></div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Hotline</h4>
                    <p className="text-xs font-bold text-slate-900 mt-0.5">{HOTLINE_DISPLAY}</p>
                  </div>
                </div>
              </div>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" className="w-full bg-slate-900 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-md">
                <Navigation className="w-4 h-4" /> Chỉ Đường Google Maps
              </a>
            </div>
            <div className="lg:col-span-2 h-64 lg:h-auto rounded-2xl overflow-hidden relative">
              <iframe title="Bản đồ" src={MAPS_EMBED_SRC} className="absolute inset-0 w-full h-full border-0" loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Giỏ Hàng Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-slate-900">
                <ShoppingCart className="w-5 h-5 text-red-600" /> Giỏ Hàng Phụ Tùng
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-800"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <Package className="w-10 h-10 opacity-40 mb-2" />
                  <p className="text-xs">Chưa có món nào trong giỏ</p>
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
                    <button onClick={() => removeItem(item.id)} className="p-1 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
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
                <button onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} className="w-full bg-slate-900 hover:bg-red-600 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition">
                  <QrCode className="w-4 h-4" /> Thanh Toán Mã QR
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. VietQR Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center relative shadow-2xl">
            <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 text-slate-400"><X className="w-5 h-5" /></button>
            <h3 className="font-black text-lg text-slate-900 mb-1">Mã QR Thanh Toán</h3>
            <p className="text-xs text-slate-500 mb-4">Mở App ngân hàng bất kỳ để quét</p>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-4 inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://api.vietqr.io/image/970422-${HOTLINE}-f5Yg2Z0.jpg?accountName=TIEM%20SUA%20XE%20CHINH&amount=${total()}&addInfo=DonHangPhuTung`} alt="VietQR" className="w-48 h-48 mx-auto object-contain mix-blend-multiply" />
            </div>

            <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-1.5 text-xs text-left">
              <div className="flex justify-between"><span className="text-slate-500">Số tiền:</span><span className="font-bold text-red-600">{total().toLocaleString("vi-VN")}đ</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Nội dung:</span><span className="font-bold">DonHangPhuTung</span></div>
            </div>

            <button onClick={() => { clearCart(); setIsCheckoutOpen(false); alert("Đã ghi nhận thanh toán thành công!"); }} className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs uppercase transition flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4" /> Tôi Đã Chuyển Khoản
            </button>
          </div>
        </div>
      )}

      {/* 10. Footer */}
      <footer id="lien-he" className="bg-slate-950 text-slate-400 py-10 border-t border-slate-900 text-xs">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <span className="font-black text-white text-base block mb-2">SỬA XE CHÍNH</span>
            <p className="leading-relaxed text-slate-500">Trạm sửa chữa xe máy uy tín, phân phối linh kiện chính hãng và cứu hộ khẩn cấp 24/7 tại Biên Hòa.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2 uppercase">Địa chỉ</h4>
            <p>{ADDRESS}</p>
            <p className="mt-1">Hotline: <strong className="text-white">{HOTLINE_DISPLAY}</strong></p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2 uppercase">Khám phá</h4>
            <div className="flex flex-col gap-1">
              <Link href="/cam-nang" className="text-red-400 hover:underline">→ Cẩm nang kỹ thuật & bắt bệnh xe</Link>
              <Link href="/phu-tung" className="text-red-400 hover:underline">→ Toàn bộ kho phụ tùng & dầu nhớt</Link>
              <a href="#dich-vu" onClick={(e) => scrollToSection(e, "dich-vu")} className="hover:text-white">→ Bảng giá dịch vụ</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 11. Cụm Phím Gọi & Zalo Nổi */}
      <div className="fixed bottom-24 left-4 z-40 flex flex-col gap-2.5">
        <a href={ZALO_LINK} target="_blank" rel="noreferrer" className="w-11 h-11 bg-[#0068FF] text-white rounded-full shadow-lg flex items-center justify-center font-bold text-xs hover:scale-105 transition">
          Zalo
        </a>
        <a href={`tel:${HOTLINE}`} className="w-11 h-11 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition relative">
          <span className="absolute inset-0 rounded-full bg-red-500 opacity-50 animate-ping"></span>
          <PhoneCall className="w-4 h-4 relative z-10" />
        </a>
      </div>

      {showBackToTop && (
        <button onClick={scrollToTop} className="fixed bottom-24 right-4 z-40 w-11 h-11 bg-slate-900/80 backdrop-blur text-white rounded-full shadow-lg flex items-center justify-center">
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* 12. Bottom Navigation Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 pb-safe flex justify-around items-center md:hidden h-16 px-1 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14">
          <HomeIcon className="w-4 h-4" />
          <span className="text-[9px] font-bold">Trang chủ</span>
        </a>
        <a href="#dich-vu" onClick={(e) => scrollToSection(e, "dich-vu")} className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14">
          <Wrench className="w-4 h-4" />
          <span className="text-[9px] font-bold">Dịch vụ</span>
        </a>
        <Link href="/phu-tung" className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14">
          <Package className="w-4 h-4" />
          <span className="text-[9px] font-bold">Phụ tùng</span>
        </Link>
        <Link href="/cam-nang" className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14">
          <BookOpen className="w-4 h-4" />
          <span className="text-[9px]">Cẩm nang</span>
        </Link>
        <a href="#dat-lich" onClick={(e) => scrollToSection(e, "dat-lich")} className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14">
          <Calendar className="w-4 h-4" />
          <span className="text-[9px] font-bold">Đặt lịch</span>
        </a>
        <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600 w-14 relative">
          <ShoppingCart className="w-4 h-4" />
          <span className="text-[9px] font-bold">Giỏ ({totalCartCount})</span>
        </button>
      </nav>

    </div>
  );
}
