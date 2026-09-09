import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, bikeModel, service, date, note } = body;

    // Thay mã Token và Chat ID của bạn vào 2 dòng này
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8838303180:AAGuJGJcO5qFNj38VuYTmWVMUqx5TN11Kg8';
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '1819933781';

    const message = 
`🔔 <b>LỊCH HẸN SỬA XE MỚI!</b>
━━━━━━━━━━━━━━━━━━
👤 <b>Khách hàng:</b> ${name}
📞 <b>Số điện thoại:</b> <code>${phone}</code>
🛵 <b>Dòng xe:</b> ${bikeModel}
🔧 <b>Dịch vụ:</b> ${service}
⏰ <b>Thời gian hẹn:</b> ${date || 'Sớm nhất'}
📝 <b>Tình trạng xe:</b> ${note || 'Kiểm tra tổng quát'}
━━━━━━━━━━━━━━━━━━
👉 <i>Bấm vào số điện thoại trên để gọi lại ngay.</i>`;

    const teleRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!teleRes.ok) {
      throw new Error('Gửi Telegram thất bại');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lỗi gửi Telegram:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}