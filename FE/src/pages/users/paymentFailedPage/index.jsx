import { useNavigate } from "react-router-dom";

const PaymentFailedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-red-50 max-w-[500px] w-full rounded-2xl shadow-xl border border-[#0A4174] p-8 md:p-10 text-center flex flex-col items-center">
        <div className="w-24 h-24 bg-green-50 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-100 animate-bounce-short">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60px"
            height="60px"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="m348.071 141.302l-87.763 87.763l-87.763-87.763l-22.628 22.627l87.764 87.763l-87.764 87.764l22.628 22.627l87.763-87.763l87.763 87.763l22.628-22.627l-87.764-87.764l87.764-87.763z"
            />
            <path
              fill="currentColor"
              d="M425.706 86.294A240 240 0 0 0 86.294 425.706A240 240 0 0 0 425.706 86.294M256 464c-114.691 0-208-93.309-208-208S141.309 48 256 48s208 93.309 208 208s-93.309 208-208 208"
            />
          </svg>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-[#0A4174] mb-3">
          Thanh toán thất bại!
        </h1>
        <p className="text-slate-500 text-sm md:text-base mb-8 px-4">
          Xin lỗi, đã có lỗi xảy ra trong quá trình thanh toán.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full mt-2">
          <button
            onClick={() => navigate("/pay-tuition")}
            className="w-full justify-center text-[#5483B3] font-medium border border-[#0A4174] rounded-full px-6 py-3 bg-white hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21 11H6.83l3.58-3.59L9 6l-6 6l6 6l1.41-1.41L6.83 13H21z"
              />
            </svg>
            Trở lại trang thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
