import { Plus } from "lucide-react";
import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";
import type { UrlShortenerFormProps } from "../interfaces/data.interfaces";
import { createUrl } from "../api/Api";
import { validateURL } from "../utils/validator";

const UrlShortenerForm: React.FC<UrlShortenerFormProps> = ({ onUrlShortened }) => {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    const trimmedUrl = url.trim();
    const urlValidate = validateURL(trimmedUrl);
    if (urlValidate) {
      setError(urlValidate);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const originalUrl: string = url;
      const result = await createUrl({ originalUrl });
      onUrlShortened(result.data);
      setUrl('');
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message?.message || 'Failed to shorten URL';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 mb-8 shadow-xl bg-white rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
        <Plus className="w-5 h-5 text-indigo-600" />
        Shorten New URL
      </h2>

      <div>
        <div className="flex gap-3 items-center">
          <Input
          label="url"
            type="url"
            value={url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUrl(e.target.value);
              setError('');
            }}
            placeholder="Paste your long URL here..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            required
          />

          <Button
            onClick={handleSubmit}
            disabled={loading || !url.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition-all"
          >
            {loading ? <LoadingSpinner /> : 'Shorten'}
          </Button>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-500 font-medium transition-all">{error}</p>
        )}
      </div>
    </Card>
  );
};

export default UrlShortenerForm;
