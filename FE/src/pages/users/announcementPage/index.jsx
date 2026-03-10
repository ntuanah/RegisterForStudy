import AnnouncementCard from "../../../components/users/AnnouncementCard";

const AnnouncementPage = () => {
  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Thông báo
        </h2>
      </div>
      <div className="p-10 space-y-5">
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
      </div>
    </div>
  );
};

export default AnnouncementPage;
