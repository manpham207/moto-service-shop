'use client';

import React, { useState, useEffect } from 'react';
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
  ChevronRight, 
  Package, 
  Home as HomeIcon, 
  ArrowUp, 
  AlertTriangle,
  Send
} from 'lucide-react';
import { SERVICES, PRODUCTS } from '@/data/mockData';
import { useCartStore } from '@/lib/cartStore';

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Booking Form State
  const [booking, setBooking] = useState({
    name: '',
    phone: '',
    bikeModel: '',
    service: 'Bảo Dưỡng Toàn Diện 10 Bước',
    date: '',
    note: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Cart store
  const { items, addItem, removeItem, clearCart, total } = useCartStore();

  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  const filteredProducts = selectedFilter === 'Tất cả' 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.category === selectedFilter);

  const categories = ['Tất cả', 'Truyền động', 'Phanh xe', 'Dầu nhớt', 'Vỏ xe', 'Hệ thống điện'];
  const totalCartCount = items.reduce((a, b) => a + b.quantity, 0);

  // Số điện thoại & Zalo liên hệ
  const HOTLINE = '0909123456';
  const HOTLINE_DISPLAY = '0909.123.456';
  const ZALO_LINK = `https://zalo.me/${HOTLINE}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 md:pb-0 relative">
      {/* 1. Thanh Cảnh Báo Cứu Hộ Nổi Bật Trên Cùng */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white px-4 py-2 text-xs md:text-sm font-semibold shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
            </span>
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-yellow-300 shrink-0" />
              <strong>CỨU HỘ KHẨN CẤP 24/7:</strong> Thủng lốp, hết bình, chết máy có mặt sau 15 phút!
            </span>
          </div>
          <a 
            href={`tel:${HOTLINE}`}
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 px-3 py-1 rounded-full font-black text-xs flex items-center gap-1 transition shadow"
          >
            <PhoneCall className="w-3 h-3" /> GỌI NGAY
          </a>
        </div>
      </div>

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 text-white p-1.5 md:p-2 rounded-lg">
              <Wrench className="w-4 h-4 md:w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-lg md:text-xl tracking-tight text-slate-900 leading-none block">
                MOTO<span className="text-red-600">PRO</span>
              </span>
              <span className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                Sửa Xe & Phụ Tùng
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <a href="#dich-vu" className="hover:text-red-600 transition">Dịch Vụ</a>
            <a href="#phu-tung" className="hover:text-red-600 transition">Phụ Tùng</a>
            <a href="#dat-lich" className="hover:text-red-600 transition">Đặt Lịch Hẹn</a>
            <a href="#lien-he" className="hover:text-red-600 transition">Liên Hệ</a>
          </nav>

          <div className="flex items-center gap-2">
            <a 
              href={`tel:${HOTLINE}`} 
              className="flex items-center gap-1.5 text-xs bg-red-600 text-white md:bg-red-50 md:text-red-700 px-3 py-1.5 md:py-2 rounded-full font-bold border border-red-600 md:border-red-100 hover:bg-red-700 md:hover:bg-red-100 transition shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span className="inline md:hidden">Cứu Hộ</span>
              <span className="hidden md:inline">Hotline: {HOTLINE_DISPLAY}</span>
            </a>

            <button 
              onClick={() => setIsCartOpen(true)}
              aria-label="Xem giỏ hàng"
              className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition"
            >
              <ShoppingCart className="w-5 h-5 text-slate-700" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-12 md:py-20">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase mb-3 md:mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Thợ tay nghề cao - Phục vụ tận nơi
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3 md:mb-4">
              Sửa Xe Máy Lưu Động & Phụ Tùng <span className="text-red-500">Chính Hãng</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-lg mb-6">
              Đội phản ứng nhanh cứu hộ tận nơi khi gặp sự cố trên đường hoặc tại nhà. Báo đúng giá, phụ tùng chính hãng bảo hành dài hạn.
            </p>

            {/* Box Cứu Hộ Trực Tiếp */}
            <div className="bg-red-950/60 border border-red-500/40 p-4 rounded-2xl mb-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase mb-1">
                <AlertTriangle className="w-4 h-4 text-red-400 animate-bounce" /> Bạn đang bị hỏng xe giữa đường?
              </div>
              <div className="flex flex-wrap gap-2.5 mt-2">
                <a 
                  href={`tel:${HOTLINE}`}
                  className="flex-1 min-w-[140px] bg-red-600 hover:bg-red-700 text-white text-center py-2.5 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/40 transition"
                >
                  <PhoneCall className="w-4 h-4 animate-pulse" /> GỌI {HOTLINE_DISPLAY}
                </a>
                <a 
                  href={ZALO_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[140px] bg-blue-600 hover:bg-blue-700 text-white text-center py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" /> Gửi Định Vị Zalo
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="#dat-lich" 
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <Calendar className="w-4 h-4" /> Đặt Lịch Bảo Dưỡng
              </a>
              <a 
                href="#phu-tung" 
                className="bg-transparent hover:text-red-400 text-slate-300 px-5 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 text-sm md:text-base"
              >
                Xem Kho Phụ Tùng <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="bg-slate-900/90 border border-slate-800 p-4 md:p-5 rounded-2xl text-center md:text-left">
              <div className="text-red-500 font-extrabold text-2xl md:text-3xl mb-0.5">15 Phút</div>
              <div className="text-slate-400 text-xs md:text-sm font-medium">Tốc độ cứu hộ nội thành</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-4 md:p-5 rounded-2xl text-center md:text-left">
              <div className="text-red-500 font-extrabold text-2xl md:text-3xl mb-0.5">24/7</div>
              <div className="text-slate-400 text-xs md:text-sm font-medium">Túc trực ngày & đêm</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-4 md:p-5 rounded-2xl text-center md:text-left">
              <div className="text-red-500 font-extrabold text-2xl md:text-3xl mb-0.5">100%</div>
              <div className="text-slate-400 text-xs md:text-sm font-medium">Phụ tùng chính hãng</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-4 md:p-5 rounded-2xl text-center md:text-left">
              <div className="text-red-500 font-extrabold text-2xl md:text-3xl mb-0.5">6 Tháng</div>
              <div className="text-slate-400 text-xs md:text-sm font-medium">Bảo hành linh kiện</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="dich-vu" className="py-12 md:py-16 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Dịch Vụ Sửa Chữa & Bảo Dưỡng</h2>
          <p className="text-slate-500 text-xs md:text-sm mt-1">Báo giá trước, công khai chi phí, không lo chặt chém</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SERVICES.map((srv) => (
            <div key={srv.id} className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full inline-block mb-2">
                  {srv.tag}
                </span>
                <h3 className="font-bold text-base md:text-lg text-slate-900 mb-1.5">{srv.title}</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4">{srv.desc}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="font-black text-slate-900 text-sm md:text-base">{srv.price}</span>
                <a href="#dat-lich" className="text-xs font-bold text-red-600 hover:underline">
                  Đặt hẹn →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Parts Store Section */}
      <section id="phu-tung" className="py-12 md:py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-3">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Kho Phụ Tùng Xe Máy</h2>
              <p className="text-slate-500 text-xs md:text-sm mt-0.5">Linh kiện thay thế chính hãng cho Honda, Yamaha, Piaggio...</p>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex-shrink-0 ${
                    selectedFilter === cat
                      ? 'bg-slate-900 text-white shadow'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
                <div className="h-36 sm:h-44 w-full bg-slate-200 relative overflow-hidden">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {prod.category}
                  </span>
                </div>
                <div className="p-3 md:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block truncate mb-1">
                      {prod.model}
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-tight mb-2">
                      {prod.name}
                    </h3>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-red-600 font-extrabold text-sm sm:text-base">
                      {prod.price.toLocaleString('vi-VN')}đ
                    </span>
                    <button
                      onClick={() => addItem(prod)}
                      className="w-full sm:w-auto bg-slate-900 hover:bg-red-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Thêm
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="dat-lich" className="py-12 md:py-16 max-w-3xl mx-auto px-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-8 shadow-sm">
          <div className="text-center mb-6 md:mb-8">
            <span className="text-red-600 font-bold text-[11px] uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full">
              Ưu tiên sửa trước
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">Đặt Lịch Hẹn Làm Xe</h2>
            <p className="text-slate-500 text-xs md:text-sm mt-1">Tránh phải chờ đợi giờ cao điểm, thợ chuẩn bị sẵn phụ tùng</p>
          </div>

          {bookingSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center text-emerald-800">
              <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600 mb-2" />
              <h3 className="text-base md:text-lg font-bold">Đặt lịch thành công!</h3>
              <p className="text-xs md:text-sm mt-1">Xưởng sẽ gọi xác nhận trong vòng 10 phút.</p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Họ và Tên</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-red-600 text-sm"
                  value={booking.name}
                  onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Điện Thoại</label>
                <input
                  type="tel"
                  required
                  placeholder="09xx xxx xxx"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-red-600 text-sm"
                  value={booking.phone}
                  onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Dòng Xe</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Air Blade, SH, Winner..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-red-600 text-sm"
                  value={booking.bikeModel}
                  onChange={(e) => setBooking({ ...booking, bikeModel: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Dịch Vụ Cần Làm</label>
                <select
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-red-600 text-sm bg-white"
                  value={booking.service}
                  onChange={(e) => setBooking({ ...booking, service: e.target.value })}
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                  <option value="Khác">Kiểm tra tổng quát / Vấn đề khác</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Thời Gian Dự Kiến Tới</label>
                <input
                  type="datetime-local"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-red-600 text-sm"
                  value={booking.date}
                  onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Triệu chứng của xe</label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Lên ga bị hụp, kêu nồi sau, phanh không ăn..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-red-600 text-sm"
                  value={booking.note}
                  onChange={(e) => setBooking({ ...booking, note: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-red-600/30 transition text-sm uppercase tracking-wide mt-1"
              >
                Gửi Lịch Hẹn
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl p-5 md:p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-base md:text-lg text-slate-900">Giỏ Hàng Phụ Tùng</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <ShoppingCart className="w-10 h-10 mx-auto stroke-1 mb-2 text-slate-300" />
                  Chưa có phụ tùng trong giỏ
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center border-b border-slate-100 pb-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg bg-slate-100" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{item.name}</h4>
                      <span className="text-red-600 font-extrabold text-xs block mt-0.5">
                        {item.price.toLocaleString('vi-VN')}đ x {item.quantity}
                      </span>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-600 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span className="font-medium text-slate-600">Tổng tiền:</span>
                  <span className="font-black text-red-600 text-lg md:text-xl">{total().toLocaleString('vi-VN')}đ</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4" /> Thanh Toán / Quét Mã QR
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VietQR Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-5 md:p-6 max-w-sm w-full text-center relative shadow-2xl">
            <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-base md:text-lg text-slate-900 mb-1">Mã QR Thanh Toán</h3>
            <p className="text-xs text-slate-500 mb-3">Mở ứng dụng ngân hàng bất kỳ để quét mã</p>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 mb-3 inline-block">
              <img
                src={`https://api.vietqr.io/image/970422-${HOTLINE}-f5Yg2Z0.jpg?accountName=TIEM%20SUA%20XE%20MOTOPRO&amount=${total()}&addInfo=DonHangPhuTung`}
                alt="Mã VietQR"
                className="w-48 h-48 sm:w-52 sm:h-52 mx-auto object-contain"
              />
            </div>

            <div className="text-left text-xs bg-slate-50 p-3 rounded-xl space-y-1 mb-4">
              <div className="flex justify-between"><span className="text-slate-500">Số tiền:</span><span className="font-bold text-red-600">{total().toLocaleString('vi-VN')}đ</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Nội dung:</span><span className="font-bold">DonHangPhuTung</span></div>
            </div>

            <button
              onClick={() => {
                clearCart();
                setIsCheckoutOpen(false);
                alert('Đã xác nhận đơn hàng thành công!');
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs uppercase"
            >
              Tôi Đã Chuyển Khoản Xong
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="lien-he" className="bg-slate-950 text-slate-400 py-10 border-t border-slate-900 text-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-base md:text-lg mb-2">
              <Wrench className="w-5 h-5 text-red-600" /> MOTOPRO SERVICE
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Trạm dịch vụ kỹ thuật sửa xe máy uy tín, phân phối linh kiện phụ tùng chính hãng và cứu hộ khẩn cấp 24/7.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs md:text-sm mb-2 uppercase">Địa Chỉ & Giờ Làm Việc</h4>
            <div className="space-y-1.5 text-xs">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-red-600 shrink-0" /> 123 Đường Số 1, Phường 2, Tân Bình, TP.HCM</p>
              <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-red-600 shrink-0" /> 07:30 - 19:30 (Cả Thứ 7 & Chủ Nhật)</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs md:text-sm mb-2 uppercase">Hotline Cứu Hộ & Hỗ Trợ</h4>
            <div className="space-y-1 text-xs">
              <p>Hotline: <a href={`tel:${HOTLINE}`} className="text-red-500 font-bold underline">{HOTLINE_DISPLAY}</a></p>
              <p>Zalo Tiếp Nhận: <a href={ZALO_LINK} target="_blank" rel="noreferrer" className="text-blue-400 font-bold underline">{HOTLINE_DISPLAY}</a></p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-6 pt-4 border-t border-slate-900 text-center text-[11px] text-slate-600">
          © 2026 MotoPro. Sẵn sàng phục vụ 24/7.
        </div>
      </footer>

      {/* --- CỤM CÁC NÚT TƯƠNG TÁC NHANH (FLOATING ACTIONS) --- */}

      {/* Cụm nút liên hệ cố định góc phải (Desktop & Mobile) */}
      <div className="fixed bottom-24 md:bottom-8 right-4 z-40 flex flex-col items-end gap-3">
        {/* Nút Chat Zalo */}
        <a 
          href={ZALO_LINK} 
          target="_blank" 
          rel="noreferrer"
          aria-label="Nhắn tin Zalo"
          className="group flex items-center bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition shadow-blue-600/30"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold px-0 group-hover:px-2">
            Chat Zalo
          </span>
          <div className="w-6 h-6 flex items-center justify-center font-black text-[13px] bg-white text-blue-600 rounded-full">
            Z
          </div>
        </a>

        {/* Nút Gọi Hotline Rung Cảnh Báo */}
        <a 
          href={`tel:${HOTLINE}`} 
          aria-label="Gọi hotline cứu hộ"
          className="group flex items-center bg-red-600 text-white p-3 rounded-full shadow-xl hover:bg-red-700 transition shadow-red-600/40 relative"
        >
          <span className="absolute -inset-1 rounded-full bg-red-500 opacity-50 animate-ping -z-10"></span>
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold px-0 group-hover:px-2">
            Gọi {HOTLINE_DISPLAY}
          </span>
          <PhoneCall className="w-6 h-6 animate-pulse" />
        </a>

        {/* Nút Cuộn Lên Đầu Trang (Back to top) */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Cuộn lên đầu trang"
            className="bg-slate-800/80 hover:bg-slate-950 backdrop-blur-sm text-white p-2.5 rounded-full shadow-md transition hover:-translate-y-0.5"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-6 flex justify-between items-center md:hidden">
        <a href="#" className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-red-600">
          <HomeIcon className="w-5 h-5" />
          <span className="text-[10px] font-medium">Trang chủ</span>
        </a>
        <a href="#dich-vu" className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-red-600">
          <Wrench className="w-5 h-5" />
          <span className="text-[10px] font-medium">Dịch vụ</span>
        </a>
        <a href="#phu-tung" className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-red-600">
          <Package className="w-5 h-5" />
          <span className="text-[10px] font-medium">Phụ tùng</span>
        </a>
        <a href="#dat-lich" className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-red-600">
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-medium">Đặt lịch</span>
        </a>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-red-600 relative"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-[10px] font-medium">Giỏ</span>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </button>
      </nav>
    </div>
  );
}