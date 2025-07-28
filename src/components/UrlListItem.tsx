import { Calendar, Copy } from "lucide-react";
import type { UrlListItemProps } from "../interfaces/data.interfaces";
import { useState } from "react";
import Card from "./Card";
const BaseUrl = import.meta.env.VITE_FRONTEND_URL;

const UrlListItem: React.FC<UrlListItemProps> = ({ url }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="p-6 hover:shadow-xl transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <p className="text-sm text-gray-500 mb-1">Original URL</p>
            <p className="text-gray-900 truncate" title={url?.originalUrl}>
              {url?.originalUrl}
            </p>
          </div>

          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-1">Short URL</p>
            <div className="flex items-center gap-2">
           <p className="text-sky-600 font-medium">{`${BaseUrl}/${url?.shortUrl}`}</p>
              <button
                onClick={() => copyToClipboard(`${BaseUrl}/${url?.shortUrl}`)}
                className="p-1 rounded hover:bg-gray-100 transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4 text-gray-500" />
              </button>
              {copied && <span className="text-green-600 text-sm">Copied!</span>}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Created {formatDate(url?.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UrlListItem