'use client';

import React, { useState } from 'react';
import { 
  Wrench, 
  ShoppingCart, 
  PhoneCall, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Bike, 
  X, 
  Trash2, 
  QrCode,
  MapPin,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { SERVICES, PRODUCTS } from '@/data/mockData';
import { useCartStore, Product } from '@/lib/cartStore';

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
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

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  const filteredProducts = selectedFilter === 'Tất cả' 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.category === selectedFilter);

  const categories = ['Tất cả', 'Truyền động', 'Phanh xe', 'Dầu nhớt', 'Vỏ xe', 'Hệ thống điện'];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 text-white p-2 rounded-lg">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-slate-900 block leading-tight">
                SỮA XE<span className="text-red-600"> CHÍNH</span>
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-medium">
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

          <div className="flex items-center gap-3">
            <a 
              href="tel:0909123456" 
              className="hidden sm:flex items-center gap-2 text-xs bg-red-50 text-red-700 px-3 py-2 rounded-full font-bold border border-red-100 hover:bg-red-100 transition"
            >
              <PhoneCall className="w-4 h-4 text-red-600 animate-pulse" />
              Cứu Hộ: 0908.875.245
            </a>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 transition"
            >
              <ShoppingCart className="w-5 h-5 text-slate-700" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {items.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase mb-4">
              <ShieldCheck className="w-4 h-4" /> Kỹ thuật viên 20+ năm kinh nghiệm
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Chuyên Gia Bảo Dưỡng Xe & Phụ Tùng <span className="text-red-500">Chính Hãng</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg mb-8">
              Báo giá minh bạch, linh kiện chuẩn catalogue, bảo hành trách nhiệm cao. Hỗ trợ cứu hộ xe tận nơi nhanh chóng trong vòng 20 phút.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#dat-lich" 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-red-600/30 transition flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" /> Đặt Lịch Bảo Dưỡng
              </a>
              <a 
                href="#phu-tung" 
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2"
              >
                Tra Cứu Phụ Tùng <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick stats box */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
              <div className="text-red-500 font-extrabold text-3xl mb-1">10.000+</div>
              <div className="text-slate-400 text-sm font-medium">Lượt xe bảo dưỡng</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
              <div className="text-red-500 font-extrabold text-3xl mb-1">100%</div>
              <div className="text-slate-400 text-sm font-medium">Phụ tùng chính ngạch</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
              <div className="text-red-500 font-extrabold text-3xl mb-1">20 Phút</div>
              <div className="text-slate-400 text-sm font-medium">Có mặt cứu hộ nội thành</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
              <div className="text-red-500 font-extrabold text-3xl mb-1">6 Tháng</div>
              <div className="text-slate-400 text-sm font-medium">Bảo hành linh kiện thay thế</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="dich-vu" className="py-16 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">Dịch Vụ Sửa Chữa Chuyên Nghiệp</h2>
          <p className="text-slate-500 mt-2">Bảng giá công khai, không vẽ bệnh, khách kiểm tra phụ tùng trước khi lắp ráp</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv) => (
            <div key={srv.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full inline-block mb-3">
                  {srv.tag}
                </span>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{srv.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{srv.desc}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-base">{srv.price}</span>
                <a href="#dat-lich" className="text-xs font-bold text-red-600 hover:underline">
                  Chọn gói →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Parts Store Section */}
      <section id="phu-tung" className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Kho Phụ Tùng Xe Máy</h2>
              <p className="text-slate-500 mt-1">Đầy đủ nhông sên dĩa, bố thắng, nhớt máy cho Honda, Yamaha, Piaggio</p>
            </div>
            {/* Filter buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    selectedFilter === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
                <div className="h-48 w-full bg-slate-200 relative overflow-hidden">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    {prod.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                      Tương thích: {prod.model}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mb-2">{prod.name}</h3>
                  </div>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-red-600 font-extrabold text-lg">
                      {prod.price.toLocaleString('vi-VN')}đ
                    </span>
                    <button
                      onClick={() => addItem(prod)}
                      className="bg-slate-900 hover:bg-red-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <ShoppingCart className="w-4 h-4" /> Thêm giỏ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="dat-lich" className="py-16 max-w-4xl mx-auto px-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <span className="text-red-600 font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
              Chủ động thời gian
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">Đặt Lịch Hẹn Làm Xe Trước</h2>
            <p className="text-slate-500 text-sm mt-1">Ưu tiên phục vụ ngay khi tới xưởng, không phải chờ đợi</p>
          </div>

          {bookingSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center text-emerald-800">
              <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600 mb-2" />
              <h3 className="text-lg font-bold">Đặt lịch thành công!</h3>
              <p className="text-sm mt-1">Nhân viên sẽ gọi điện xác nhận trong vòng 10 phút.</p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Họ và Tên</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-red-600 text-sm"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-red-600 text-sm"
                  value={booking.phone}
                  onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Dòng Xe Đang Đi</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Air Blade 2021, SH 150i, Wave RSX"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-red-600 text-sm"
                  value={booking.bikeModel}
                  onChange={(e) => setBooking({ ...booking, bikeModel: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Dịch Vụ Cần Làm</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-red-600 text-sm bg-white"
                  value={booking.service}
                  onChange={(e) => setBooking({ ...booking, service: e.target.value })}
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                  <option value="Khác">Kiểm tra xe tổng quát / Khác</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Thời Gian Dự Kiến Tới</label>
                <input
                  type="datetime-local"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-red-600 text-sm"
                  value={booking.date}
                  onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mô Tả Tình Trạng Xe (nếu có)</label>
                <textarea
                  rows={3}
                  placeholder="Ví dụ: Xe bị giật khi lên ga đầu, kêu lách cách ở nồi sau..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-red-600 text-sm"
                  value={booking.note}
                  onChange={(e) => setBooking({ ...booking, note: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-red-600/30 transition text-sm uppercase tracking-wide mt-2"
              >
                Xác Nhận Đặt Lịch
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-lg text-slate-900">Giỏ Hàng Của Bạn</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <ShoppingCart className="w-12 h-12 mx-auto stroke-1 mb-2" />
                  Giỏ hàng chưa có phụ tùng nào
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center border-b border-slate-100 pb-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg bg-slate-100" />
                    <div className="flex-1">
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">{item.name}</h4>
                      <span className="text-red-600 font-extrabold text-xs block mt-1">
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
                <div className="flex items-center justify-between text-base">
                  <span className="font-medium text-slate-600">Tổng cộng:</span>
                  <span className="font-black text-red-600 text-xl">{total().toLocaleString('vi-VN')}đ</span>
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

      {/* Checkout Modal / VietQR */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center relative shadow-2xl">
            <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-lg text-slate-900 mb-1">Quét Mã VietQR Thanh Toán</h3>
            <p className="text-xs text-slate-500 mb-4">Mở App Ngân hàng bất kỳ để quét thanh toán đơn hàng</p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4 inline-block">
              {/* Sinh mã VietQR mẫu động theo số tiền */}
              <img
                src={`https://api.vietqr.io/image/970422-0909123456-f5Yg2Z0.jpg?accountName=TIEM%20SUA%20XE%20MOTOPRO&amount=${total()}&addInfo=DonHangPhuTung`}
                alt="Mã QR thanh toán"
                className="w-56 h-56 mx-auto object-contain"
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
              Tôi Đã Chuyển Khoản Thành Công
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="lien-he" className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Wrench className="w-5 h-5 text-red-600" /> MOTOPRO SERVICE
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Trạm dịch vụ kỹ thuật xe máy chất lượng cao, cung cấp phụ tùng thay thế và giải pháp cứu hộ xe máy 24/7.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Địa Chỉ & Giờ Làm Việc</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-red-600 shrink-0" /> 123 Đường Số 1, Phường 2, Tân Bình, TP.HCM</p>
              <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-red-600 shrink-0" /> 07:30 - 19:30 (Cả Thứ 7 & Chủ Nhật)</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Hỗ Trợ Khẩn Cấp</h4>
            <div className="space-y-2 text-xs">
              <p>Hotline Cứu Hộ: <span className="text-red-500 font-bold">0908.875.245</span></p>
              <p>Zalo Tư Vấn Kỹ Thuật: <span className="text-slate-300 font-bold">0908.875.245</span></p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-900 text-center text-xs text-slate-600">
          © 2026 Sữa xe Chính. Sẵn sàng phục vụ.
        </div>
      </footer>
    </div>
  );
}