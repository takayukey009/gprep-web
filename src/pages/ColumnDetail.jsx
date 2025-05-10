import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import ReactMarkdown from "react-markdown";

export default function ColumnDetail() {
  const { id } = useParams();
  const { columns } = useContext(AppContext);
  const column = columns.find(c => c.id === id);

  if (!column) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-xl font-bold">Column Not Found</h2>
        <p>The column you're looking for doesn't exist.</p>
        <Link to="/columns" className="text-blue-600 underline">
          Back to Columns
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border-b pb-2">
        <h2 className="text-xl font-bold">{column.title}</h2>
        <span className="text-sm text-gray-500">{column.category}</span>
      </div>
      
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown>{column.markdown}</ReactMarkdown>
      </div>
      
      <Link to="/columns" className="block w-full">
        <button className="w-full py-2 rounded border">
          Back to Columns
        </button>
      </Link>
    </div>
  );
}
