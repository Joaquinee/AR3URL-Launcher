import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface NewsItem {
  date: string;
  title: string;
  content: string;
}

const News: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [markdownContent, setMarkdownContent] = useState<string>("");

  useEffect(() => {
    const loadLatestNews = async () => {
      const newsArray = await window.ipcRenderer.invoke("get-last-news");
      setNewsItems(newsArray);

      if (newsArray.length > 0 && !activeTab) {
        setActiveTab(newsArray[0].date);
      }
    };

    loadLatestNews();
  }, []);

  useEffect(() => {
    const selectedNews = newsItems.find((news) => news.date === activeTab);
    if (selectedNews) {
      setMarkdownContent(`# ${selectedNews.title}\n${selectedNews.content}`);
    }
  }, [activeTab, newsItems]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div>
      <div className="tabs flex space-x-2 mb-4">
        {newsItems.slice(0, 5).map((news) => (
          <button
            key={news.date}
            className={`tab px-4 py-2 rounded-lg transition-colors mt-2 ml-4
              ${
                activeTab === news.date
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            onClick={() => setActiveTab(news.date)}
          >
            {formatDate(news.date)}
          </button>
        ))}
      </div>
      <article className="news-item p-6 w-full h-[400px] overflow-auto shadow-xl rounded-lg">
        <div className="news-content prose prose-slate max-w-none">
          <ReactMarkdown
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              h1: ({ node, ...props }) => (
                <h1 className="text-4xl font-bold mb-6 text-white" {...props} />
              ),
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              h2: ({ node, ...props }) => (
                <h2
                  className="text-3xl font-semibold mb-4 text-white"
                  {...props}
                />
              ),
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              p: ({ node, ...props }) => (
                <p className="mb-4 text-gray-300" {...props} />
              ),
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              a: ({ node, ...props }) => (
                <a
                  className="text-blue-500 hover:text-blue-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              ul: ({ node, ...props }) => (
                <ul className="list-disc ml-6 mb-4 text-gray-300" {...props} />
              ),
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              li: ({ node, ...props }) => <li className="mb-2" {...props} />,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              strong: ({ node, ...props }) => (
                <strong className="font-bold text-white" {...props} />
              ),
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              img: ({ node, ...props }) => (
                <img
                  className="max-w-full h-auto rounded-lg shadow-md"
                  alt={props.alt || ""}
                  {...props}
                />
              ),
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              video: ({ node, ...props }) => (
                <video
                  className="max-w-full h-auto rounded-lg shadow-md"
                  controls
                  {...props}
                />
              ),
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default News;
