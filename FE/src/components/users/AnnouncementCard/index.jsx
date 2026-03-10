const AnnouncementCard = () => {
  return (
    <div className="bg-blue-50 border border-[#5483B3] rounded-xl flex items-center gap-5 p-5">
      <div className="w-12 h-12 bg-[#5483B3] rounded-lg flex items-center shrink-0 justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M18 8.4c0-1.697-.632-3.325-1.757-4.525S13.59 2 12 2s-3.117.674-4.243 1.875C6.632 5.075 6 6.703 6 8.4C6 15.867 3 18 3 18h18s-3-2.133-3-9.6M13.73 21a2 2 0 0 1-3.46 0"
          />
        </svg>
      </div>

      <div>
        <h4 className="font-bold text-[#0A4174] mb-1">
          Đăng ký học phần học kỳ 2
        </h4>

        <p className="text-sm text-slate-600 mb-3">
          Hệ thống sẽ mở đăng ký tín chỉ từ ngày 27/12. Sinh viên vui lòng kiểm
          tra nợ học phí trước khi đăng ký
        </p>

        <span className="flex items-center gap-1 text-xs text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14px"
            height="14px"
            viewBox="0 0 256 256"
          >
            <g
              fill="none"
              stroke="red"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            >
              <circle cx="128" cy="128.007" r="95.915" />
              <path d="M128 80v48" />
              <path d="m128 128 34 34" />
            </g>
          </svg>
          Hết hạn: 01/01/2026
        </span>
      </div>
    </div>
  );
};

export default AnnouncementCard;