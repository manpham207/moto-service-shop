import { ImageResponse } from "next/og";

// Tăng lên 64x64 để hiển thị sắc nét tuyệt đối trên tab Retina/MacBook
export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Gradient đỏ cam thể thao, tạo chiều sâu như logo xe máy
          background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
          borderRadius: "50%",
          border: "2px solid rgba(255, 255, 255, 0.25)",
          boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 42,
            fontWeight: 900,
            fontStyle: "italic", // Chữ nghiêng tốc độ
            fontFamily: "Arial Black, Impact, sans-serif", // Font dày khối
            letterSpacing: "-2px",
            // Đổ bóng chữ để tạo khối 3D nổi hẳn lên trên mặt nền đỏ
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 1px rgba(0, 0, 0, 0.7)",
            transform: "translateX(1px) translateY(-1px)", // Căn lại tâm chữ
          }}
        >
          C
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
