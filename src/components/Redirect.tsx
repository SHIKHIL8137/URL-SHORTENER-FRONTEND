import  { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { shortLinks } from '../api/Api';
import { toast } from 'sonner';

const Redirect = () => {
  const { shordId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shordId) {
      toast.error("No short ID found");
      navigate('/');
      return;
    }

    shortLinks(shordId)
      .then((response) => {
        const url = response?.data;
        if (url) {
          setTimeout(() => {
            window.location.href = url;
          }, 2000); 
        } else {
          toast.error("Invalid short URL");
          navigate('/');
        }
      })
      .catch(() => {
        toast.error("Redirect failed");
        navigate('/');
      });
  }, [shordId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin mx-auto mb-4" />
        <h1 className="text-xl font-semibold">Redirecting...</h1>
        <p className="text-sm text-gray-500 mt-2">Please wait while we take you to the destination.</p>
      </div>
    </div>
  );
};

export default Redirect;
