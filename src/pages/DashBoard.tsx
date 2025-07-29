import { useEffect, useState } from "react";
import type { DashboardProps, UrlData } from "../interfaces/data.interfaces";
import { ArrowLeft, Link, LogOut, Menu, RefreshCcw, X } from "lucide-react";
import Button from "../components/Button";
import UrlShortenerForm from "../components/UrlShortenerForm";
import LoadingSpinner from "../components/LoadingSpinner";
import Card from "../components/Card";
import UrlListItem from "../components/UrlListItem";
import { getUrls } from "../api/Api";

const Dashboard: React.FC<DashboardProps> = ({
  user,
  onLogout,
  goToLanding,
}) => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [rotate,setRotate] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

      const fetchUrls = async () => {
      try {
        setRotate(true)
        const userUrls = await getUrls();
        setUrls(userUrls.data);
      } catch (error) {
        console.error("Failed to fetch URLs:", error);
      } finally {
        setLoading(false);
        setRotate(false)
      }
    };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleUrlShortened = (newUrl: UrlData) => {
    setUrls((prev) => [newUrl, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={goToLanding}
          >
            <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
              <Link className="w-6 h-6 text-sky-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              URL Shortener
            </h1>
          </div>


          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>


          <div className="hidden md:flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user.name}</span>
            <Button variant="secondary" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 items-start pb-4 px-2">
            <span className="text-gray-700">Welcome, {user.name}</span>
            <Button variant="secondary" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={goToLanding}
          className="flex justify-center items-center mx-3 font-semibold bold my-3 text-sky-600 transition-all hover:text-sky-900 cursor-pointer gap-2"
        >
          <ArrowLeft size={18} /> <span> Back to Home</span>
        </button>
        <UrlShortenerForm onUrlShortened={handleUrlShortened} />

       <div className="flex justify-between items-center">
         <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your URLs</h2>
          <p className="text-gray-600">Manage and track your shortened URLs</p>
        </div>
        <button className="cursor-pointer text-sky-800 transition-all hover:text-sky-600" onClick={()=>fetchUrls()}>
          <RefreshCcw
        className={`transition-transform duration-700 ${
          rotate ? 'animate-spin' : ''
        }`}
      />
        </button>
       </div>

        {loading ? (
          <div className="text-center py-12">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600">Loading your URLs...</p>
          </div>
        ) : urls.length === 0 ? (
          <Card className="p-12 text-center">
            <Link className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No URLs yet
            </h3>
            <p className="text-gray-600">
              Create your first shortened URL using the form above.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {urls.map((url) => (
              <UrlListItem key={url?.id} url={url} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
