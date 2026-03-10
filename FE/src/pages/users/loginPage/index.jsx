import BG from "../../../assets/users/bg.jpg";
import Logo from "../../../assets/users/Logo.svg";
import GGLogo from "../../../assets/users/GGLogo.png";

const LoginPage = () => {
  return (
    <div
      className="min-h-screen flex justify-between items-center bg-cover bg-center px-45"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div>
        <img src={Logo} alt="" className="w-100" />
        <p className="text-8xl text-[#5483B3] text-shadow-2xs font-bold">
          Chào mừng
        </p>
        <p className="text-3xl text-[#0A4174] text-shadow-2xs font-bold">
          Bạn đến với trang đăng ký học
        </p>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">
          Bắt đầu hành trình học tập của bạn với trải nghiệm đăng ký đơn giản,
          trực quan và thuận tiện. Mọi thông tin được sắp xếp rõ ràng, giúp bạn
          dễ dàng theo dõi, quản lý và chủ động hơn trong suốt quá trình học.
        </p>
      </div>
      <div className="w-[550px] bg-white/10 rounded-3xl p-10 shadow-2xl border border-white/30">
        <div className="flex items-center mb-6">
          <img src={Logo} alt="Logo" className="w-30 border-e me-2 pe-2" />
          <p className="text-center text-[#0A4174] font-bold text-2xl">
            Đăng ký học TLU
          </p>
        </div>
        <h2 className="text-2xl font-bold text-[#5483B3] mb-2 mt-2">
          Đăng nhập
        </h2>
        <form action="" className="space-y-9">
          <div>
            <input
              type="email"
              id="email"
              className="w-full p-2 border-b border-gray-300 outline-none focus:border-[#5483B3] cursor-pointer"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              className="w-full p-2 border-b border-gray-300 outline-none focus:border-[#5483B3] cursor-pointer"
              placeholder="Mật khẩu"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 accent-[#5483B3]"
              />
              <span className="text-gray-600">Nhớ tôi</span>
            </label>
            <div
              href="#"
              className="text-[#5483B3] hover:text-[#0A4174] font-medium cursor-pointer"
            >
              Quên mật khẩu?
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5483B3] text-white font-bold py-2 rounded-full hover:bg-[#0A4174] transition duration-300 cursor-pointer"
          >
            Đăng nhập
          </button>
        </form>

        <div className="my-6 flex items-center">
          <hr className="border-gray-300 flex-1" />
          <span className="px-2 text-gray-500">Hoặc</span>
          <hr className="border-gray-300 flex-1" />
        </div>

        <div>
          <button className="w-full border border-[#5483B3] text-[#5483B3] font-bold py-2 rounded-full hover:bg-gray-300 transition duration-300 cursor-pointer flex items-center justify-center gap-3">
            <img src={GGLogo} alt="Google Logo" className="w-6 h-6" />
            Đăng nhập với Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

