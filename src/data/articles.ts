export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: "Bảo Dưỡng" | "Bắt Bệnh" | "Cứu Hộ" | "Phụ Tùng" | "An Toàn";
  readTime: string;
  date: string;
  image: string;
  featured?: boolean;
  content: {
    symptoms: string[];
    causes: string[];
    solutions: { step: string; detail: string }[];
    priceEstimate?: string;
    proTip: string;
  };
}

export const ARTICLES: Article[] = [
  {
    id: 1,
    slug: "nguyen-nhan-tay-ga-bi-rung-dau",
    title: "Nguyên Nhân Tay Ga Bị Rung Đầu & Cách Khắc Phục Triệt Để",
    excerpt: "Rung đầu khi lên ga ở dải tốc độ 10-20km/h trên SH, Air Blade, Vision. Nguyên nhân từ nồi trước/sau và cách vệ sinh, thay bi chuẩn.",
    category: "Bắt Bệnh",
    readTime: "5p",
    date: "12/09",
    image: "https://cdn.hstatic.net/200000898999/file/nh-quat-noi-truoc-xe-vision-bao-nhieu_205b79f2b74c419281b2facc43f62525_grande.png",
    featured: true,
    content: {
      symptoms: [
        "Vặn ga khởi hành từ 0 đến 20 km/h đầu xe bị giật rung bần bật, qua dải tốc độ này xe chạy êm lại.",
        "Tiếng gõ lách cách hoặc xào lớn phát ra từ lốc nồi bên trái phía sau.",
        "Chở thêm người hoặc leo dốc cầu thì độ giật rung càng dữ dội."
      ],
      causes: [
        "Chuông nồi sau bị cháy tím, biến dạng hoặc bám bụi cặn carbon dày đặc do mạt bố ba càng rơi ra.",
        "Bố ba càng bị chai cứng bề mặt ma sát, bắt chuông không đều gây trượt bố.",
        "Bi nồi trước (roller weights) bị mòn vẹt mép tròn, chén bi xước rãnh trượt khiến bi đẩy không mượt.",
        "Dây curoa bị giãn, rạn nứt chân răng hoặc chùng làm trượt lực truyền động."
      ],
      solutions: [
        {
          step: "Bước 1: Vệ sinh lốc nồi toàn diện",
          detail: "Tháo toàn bộ cụm nồi trước và nồi sau. Xịt bụi bẩn, rửa sạch bụi bám trên rãnh bi, chuông nồi bằng dung dịch chuyên dụng. Dùng nhám mịn xả nhẹ lớp cháy trên mặt bố ba càng."
        },
        {
          step: "Bước 2: Đo kiểm bi nồi và chén bi",
          detail: "Nếu bi nồi bị méo mép hoặc mòn khuyết, thay trọn bộ 6 viên bi nồi đúng trọng lượng chuẩn của hãng (Ví dụ: Vision ~11-12g, Air Blade 125 ~13-15g, SH150 ~16-18g)."
        },
        {
          step: "Bước 3: Gia công làm sạch hoặc thay chuông bố",
          detail: "Nếu chuông nồi đã mòn rãnh sâu hoặc cháy tím, nên thay chuông mới và bố ba càng Carbon/FCC chính hãng để có độ bám dính tốt nhất, không rung giật."
        }
      ],
      priceEstimate: "Vệ sinh nồi: 80.000đ - 100.000đ | Combo thay Bi nồi + Kẹp trượt: 150.000đ - 250.000đ | Làm full nồi: 600.000đ - 1.200.000đ tùy dòng xe.",
      proTip: "Xe tay ga nên bảo dưỡng, vệ sinh nồi sau mỗi 5.000 - 7.000 km để dây curoa và bi nồi đạt tuổi thọ tối đa trên 20.000 km."
    }
  },
  {
    id: 2,
    slug: "bao-lau-can-thay-nhot-may-nhot-lap-nuoc-mat",
    title: "Bao Lâu Cần Thay Nhớt Máy, Nhớt Láp & Nước Mát?",
    excerpt: "Nắm rõ chu kỳ thay chất lỏng định kỳ giúp động cơ êm ái, bốc máy và tránh tình trạng lúp-bê dên tốn hàng triệu đồng.",
    category: "Bảo Dưỡng",
    readTime: "4p",
    date: "10/09",
    image: "https://nhotchinhhang.vn/images/2014/12/20141217_db7620d184290cdca42e93c11b385dc2_1418800409.jpg",
    featured: false,
    content: {
      symptoms: [
        "Máy xe gào to, nóng ran ở hai bên lốc máy sau chỉ 10-15 phút chạy.",
        "Xe lên ga ì ạch, hao xăng bất thường, tiếng máy khô khốc.",
        "Đèn báo nhiệt độ (đèn đỏ hình nhiệt kế) nhấp nháy hoặc sáng rực trên mặt đồng hồ."
      ],
      causes: [
        "Nhớt máy quá hạn bị biến tính, hết phụ gia bôi trơn và đóng cặn bùn đen kẹt lọc nhớt.",
        "Nhớt hộp số (nhớt láp) bị quên không thay dẫn đến mòn hú nhông số láp.",
        "Nước làm mát bị cạn kiệt hoặc đóng cặn làm nghẽn két nước tản nhiệt."
      ],
      solutions: [
        {
          step: "1. Nhớt máy (Engine Oil)",
          detail: "Nhớt khoáng/bán tổng hợp: Thay sau 1.500 - 2.000 km. Nhớt tổng hợp 100% cao cấp (Motul, Shell, Repsol): Thay sau 2.500 - 3.500 km. Chọn đúng chuẩn JASO MA2 cho xe số/côn tay và JASO MB cho xe tay ga."
        },
        {
          step: "2. Nhớt hộp số (Nhớt láp tay ga)",
          detail: "Quy tắc '3 lần nhớt máy = 1 lần nhớt láp' (khoảng 6.000 - 8.000 km). Quên nhớt láp sẽ khiến bộ nhông hú to như tiếng phản lực và tốn vài triệu đồng thay mới."
        },
        {
          step: "3. Nước làm mát động cơ",
          detail: "Kiểm tra mức nước ở bình nước phụ mỗi tháng. Châm thêm nếu dưới vạch LOW. Xúc rửa và thay mới toàn bộ két nước sau mỗi 15.000 - 20.000 km."
        }
      ],
      priceEstimate: "Nhớt máy: 90.000đ - 280.000đ | Nhớt láp: 45.000đ - 70.000đ | Nước làm mát châm/thay mới: 30.000đ - 120.000đ.",
      proTip: "Trước mỗi chuyến đi xa, hãy dùng que thăm nhớt kiểm tra màu sắc (vàng óng/nâu cánh gián là còn tốt, đen kịt hoặc đục như cafe sữa là phải thay ngay)."
    }
  },
  {
    id: 3,
    slug: "xu-ly-xe-tay-ga-tat-may-khi-ngap-nuoc",
    title: "Xử Lý Xe Tay Ga Tắt Máy Khi Đi Qua Vùng Ngập Nước",
    excerpt: "Đường ngập làm nước tràn vào lọc gió và buồng đốt. Tuyệt đối không bấm đề liên tục để bảo vệ cụm đề và dên.",
    category: "Cứu Hộ",
    readTime: "3p",
    date: "05/09",
    image: "https://bizweb.dktcdn.net/thumb/grande/100/301/121/products/phuc-hoi-xe-ngap-nuoc-da-nang-jpg-03297d87-9c10-4cf8-9b41-fb6acb466f00.jpg?v=1761960879753",
    featured: false,
    content: {
      symptoms: [
        "Xe đang lội nước thì phụt khói trắng, lụp bụp rồi lịm tắt máy hoàn toàn.",
        "Bấm nút khởi động nghe tiếng 'tạch tạch' từ rơ-le nhưng mô-tơ đề không quay.",
        "Dắt xe ra khỏi chỗ ngập thấy pô xe hoặc ống xả lọc gió chảy nước liên tục."
      ],
      causes: [
        "Mực nước cao hơn miệng bô hoặc tràn qua họng lấy gió (nằm sát bánh sau xe tay ga), hút trực tiếp vào buồng đốt.",
        "Nước vào buồng đốt piston không nén được (hiện tượng thủy kích), nếu cố đề sẽ cong gãy tay dên, bể lốc máy.",
        "Chụp bugi hoặc dây cao áp bị ướt gây mất đánh lửa cao áp."
      ],
      solutions: [
        {
          step: "Bước 1: TUYỆT ĐỐI KHÔNG BẤM ĐỀ LẠI",
          detail: "Tắt chìa khóa ngay lập tức. Cố gắng bấm đề khi nước còn trong buồng đốt sẽ làm cong gãy tay dên ngay lập tức."
        },
        {
          step: "Bước 2: Thoát nước nhanh ngoài hiện trường",
          detail: "Dựng chân chống đứng, nâng phần đầu xe lên cao để nước đọng trong ống pô chảy ra ngoài bớt. Kiểm tra lọc gió mở nắp xả ống nhựa nhỏ bên dưới."
        },
        {
          step: "Bước 3: Dắt đến tiệm sửa xe gần nhất",
          detail: "Thợ sẽ tháo bugi, quay trục máy xả kiệt nước buồng đốt, vệ sinh lọc gió, xả bỏ nhớt máy bị vào nước (đã biến thành màu sữa) và xúc rửa buồng nhớt."
        }
      ],
      priceEstimate: "Cứu hộ ngập nước nhẹ (xả nước buồng đốt, vệ sinh bugi, sấy điện): 70.000đ - 120.000đ | Thay nhớt máy + nhớt láp bị vô nước: 150.000đ - 250.000đ.",
      proTip: "Nếu bắt buộc phải lội nước ngập nửa bánh xe, hãy giữ đều ga ở mức tua máy cao và rà thắng để kiểm soát tốc độ, tuyệt đối không giảm ga giữa dòng nước."
    }
  },
  {
    id: 4,
    slug: "dau-hieu-ma-phanh-mon-dia-thang-xuoc",
    title: "Dấu Hiệu Má Phanh Đã Mòn & Đĩa Thắng Bị Xước",
    excerpt: "Bóp phanh thấy tiếng rít kim loại ken két hoặc tay phanh bị sâu. Cần thay ngay trước khi phải tiện lại đĩa phanh.",
    category: "An Toàn",
    readTime: "3p",
    date: "01/09",
    image: "https://tinhte1.tinhte.vn/2016/06/3769436_vesinhthangdia_4_of_5.jpg",
    featured: false,
    content: {
      symptoms: [
        "Mỗi lần rà phanh phát ra tiếng kêu két két chói tai như kim loại cạ vào nhau.",
        "Tay thắng bóp sát vào bao tay lái mà xe vẫn trôi, quãng đường phanh dài nguy hiểm.",
        "Bề mặt đĩa phanh xuất hiện các đường rãnh khuyết sâu thành gờ khi sờ tay vào."
      ],
      causes: [
        "Lớp phíp ma sát của bố thắng đã mòn trơ đến phần xương sắt đế, chà xát thẳng vào đĩa kim loại.",
        "Cát đá nhỏ vướng vào giữa má phanh và đĩa thắng nhưng không được vệ sinh xịt rửa sau mùa mưa.",
        "Heo dầu bị kẹt ty trượt (caliper pin) khiến má phanh ép liên tục vào đĩa gây bó phanh và mòn một bên."
      ],
      solutions: [
        {
          step: "1. Kiểm tra rãnh chỉ thị độ mòn",
          detail: "Nhìn trực diện vào heo dầu, má phanh có rãnh thoát bụi đồng thời là rãnh báo mòn. Nếu rãnh này biến mất, độ dày phíp còn dưới 1.5mm thì cần thay ngay."
        },
        {
          step: "2. Vệ sinh và tra mỡ chịu nhiệt cùm thắng",
          detail: "Tháo cùm heo dầu, chà sạch đất cát bám quanh piston thắng, thoa mỡ bôi trơn cao su chuyên dụng cho các trục dẫn hướng."
        },
        {
          step: "3. Xử lý đĩa phanh",
          detail: "Đĩa xước nhẹ có thể tiếp tục sử dụng với má phanh mới. Nếu đĩa vênh méo hoặc khuyết rãnh quá 1mm, nên tiện phẳng lại hoặc thay đĩa mới để đảm bảo ăn thắng."
        }
      ],
      priceEstimate: "Má phanh đĩa (Nissin / Elig / chính hãng): 80.000đ - 180.000đ/cặp | Bố thắng đùm sau: 70.000đ - 120.000đ | Thay dầu phanh DOT 4: 40.000đ.",
      proTip: "Không bao giờ để thợ xịt luyn hoặc mỡ bò vào bề mặt đĩa thắng để 'trị tiếng kêu' - điều này sẽ làm trượt phanh hoàn toàn cực kỳ nguy hiểm!"
    }
  },
  {
    id: 5,
    slug: "cach-phan-biet-nhot-xe-may-that-gia",
    title: "Cách Phân Biệt Nhớt Xe Máy Thật - Giả Bằng Mắt Thường",
    excerpt: "Kiểm tra vòng seal nắp chai, logo dập nổi và màu sắc độ sánh của nhớt để tránh mua phải nhớt tái chế gây xước nòng.",
    category: "Phụ Tùng",
    readTime: "6p",
    date: "28/08",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
    featured: false,
    content: {
      symptoms: [
        "Vừa thay nhớt xong chạy được vài ngày xe đã gằn máy, khét mùi dầu cháy.",
        "Mở nắp châm nhớt thấy có cặn đen bẩn bám dính quanh miệng lốc.",
        "Piston và xéc-măng bị xước, xe ra khói xanh sau khi chạy nhớt giá rẻ một thời gian."
      ],
      causes: [
        "Sử dụng nhớt tái chế được thu gom từ dầu thải, tẩy màu bằng axit và đóng chai giả nhãn mác thương hiệu lớn (Castrol, Shell, Honda, Yamaha).",
        "Thay nhớt tại các điểm vỉa hè không uy tín hoặc mua hàng online giá rẻ bất thường."
      ],
      solutions: [
        {
          step: "1. Soi kỹ nắp chai và vòng răng niêm phong",
          detail: "Chai nhớt thật có vòng seal đứt gãy đều đặn khi xoay mở nắp lần đầu. Chai nhớt giả thường dùng lại vỏ chai cũ nên viền nắp thường có vết cạy xước hoặc dùng keo dán lại."
        },
        {
          step: "2. Kiểm tra màng seal nhôm miệng chai",
          detail: "Màng bọc nhôm của nhớt chính hãng được ép nhiệt bằng máy cao tần rất phẳng, có in logo dập nổi sắc nét, khó lột. Hàng giả dán thủ công méo mó, dễ rách."
        },
        {
          step: "3. Quan sát mùi và độ trong của dầu nhớt",
          detail: "Nhớt thật có mùi thơm dịu đặc trưng của phụ gia, màu vàng mật ong hoặc đỏ trong suốt. Nhớt giả thường có mùi hăng khét nồng, màu tối đục hoặc có cặn lơ lửng."
        }
      ],
      priceEstimate: "Không mua các bình nhớt mang nhãn hiệu lớn có giá rẻ hơn 40% so với giá niêm yết chính hãng.",
      proTip: "Nên yêu cầu thợ mở nắp chai nhớt trước mặt bạn khi đem xe đi thay và kiểm tra kỹ màng seal niêm phong trước khi đổ vào xe."
    }
  },
  {
    id: 6,
    slug: "xe-kho-khoi-dong-buoi-sang-kiem-tra-3-vi-tri",
    title: "Xe Khó Khởi Động Vào Buổi Sáng: Kiểm Tra 3 Vị Trí Này",
    excerpt: "Bugi bám muội than, bình ắc quy yếu điện áp hoặc nghẹt kim phun Fi là những nguyên nhân phổ biến nhất.",
    category: "Bắt Bệnh",
    readTime: "4p",
    date: "25/08",
    image: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/12/870182/Khoi-Dong-Xe-01.jpg",
    featured: false,
    content: {
      symptoms: [
        "Buổi sáng hoặc để xe qua đêm bấm đề quay lẹt xẹt nhưng máy không nổ.",
        "Phải bấm giữ nút đề rất lâu hoặc vừa đề vừa nhồi ga mạnh mới nổ máy được.",
        "Tiếng còi xe yếu ớt, đèn pha bị tối mờ khi bật khóa điện."
      ],
      causes: [
        "Bình ắc quy qua 2-3 năm đã bị chai lắc, điện áp sụt dưới 11.5V không đủ cấp cho mô-tơ đề quay đủ tua.",
        "Bugi đã đánh lửa quá 10.000 km, khe hở chấu bugi rộng và đầu điện cực bám đầy muội than đen.",
        "Hệ thống phun xăng điện tử (Fi) bị nghẹt lỗ phun kim hoặc bơm xăng yếu áp lực sau đêm lạnh."
      ],
      solutions: [
        {
          step: "1. Kiểm tra bình Ắc-quy (Bình điện)",
          detail: "Dùng đồng hồ VOM đo điện áp tĩnh khi tắt khóa: Nếu < 12.2V là bình yếu, nếu < 11.8V cần thay bình mới (bình GS/Globe chính hãng bảo hành 6 tháng)."
        },
        {
          step: "2. Tháo kiểm tra và vệ sinh bugi",
          detail: "Nếu chấu bugi có màu đỏ gạch là xăng gió chuẩn. Nếu đen ướt hoặc trắng bệch, cần chà sạch muội than bằng bàn chải sắt hoặc thay mới bugi chân dài/chân ngắn đúng chuẩn xe."
        },
        {
          step: "3. Mẹo đề nổ buổi sáng không hại xe",
          detail: "Bật chìa khóa, chờ đèn báo Fi tắt hẳn (nghe bơm xăng nạp xong khoảng 3 giây), không vặn tay ga, ấn giữ đề dứt khoát trong 2-3 giây."
        }
      ],
      priceEstimate: "Bugi tiêu chuẩn (NGK/Denso): 45.000đ - 70.000đ | Bugi Iridium cao cấp: 180.000đ - 240.000đ | Bình ắc quy GS 12V 4Ah - 6Ah: 320.000đ - 460.000đ.",
      proTip: "Với xe số hoặc xe có cần khởi động, nếu trời quá lạnh hãy đạp mồi chân vài cái khi chưa bật chìa khóa để dầu bôi trơn lên đều trước khi bấm đề."
    }
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((item) => item.slug === slug);
}
