import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const News: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>("");

  useEffect(() => {
    const loadLatestNews = async () => {
      const lastNews = await window.ipcRenderer.invoke("get-last-news");
      setMarkdownContent(lastNews);
    };

    loadLatestNews();
  }, []);

  return (
    <article className="news-item p-6 w-full h-[400px] overflow-auto  shadow-xl rounded-lg">
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
  );
};

export default News;
