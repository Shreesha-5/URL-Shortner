import * as React from 'react';
import type { UrlData } from "../../interfaces/UrlData";
import axios from "axios";
import { serverUrl } from "../../helpers/Constants";

interface IDataTableProps {
    data: UrlData[];
    onDelete: (id: string) => void;
}

const DataTable: React.FunctionComponent<IDataTableProps> = (props) => {
    const { data, onDelete } = props;

    const [copiedId, setCopiedId] = React.useState<string | null>(null);

    const handleCopy = (shortUrl: string, id: string) => {
        const fullShortUrl = `${serverUrl}/shortUrl/${shortUrl}`;
        navigator.clipboard.writeText(fullShortUrl);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${serverUrl}/shortUrl/${id}`);
            onDelete(id);
        } catch (error) {
            alert("Failed to delete URL");
        }
    };

    const renderTableData = () => {
        if (data.length === 0) {
            return (
                <tr>
                    <td colSpan={4} className="px-6 py-6 text-center text-gray-400">
                        No shortened URLs yet. Add one above!
                    </td>
                </tr>
            );
        }

        return data.map((item: UrlData) => (
            <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 w-6/12 truncate max-w-xs">
                    <a
                        href={item.fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                        title={item.fullUrl}
                    >
                        {item.fullUrl}
                    </a>
                </td>
                <td className="px-6 py-4 w-3/12">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700 truncate">{item.shortUrl}</span>
                        <button
                            onClick={() => handleCopy(item.shortUrl, item._id)}
                            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 whitespace-nowrap"
                        >
                            {copiedId === item._id ? "✅ Copied!" : "📋 Copy"}
                        </button>
                    </div>
                </td>
                <td className="px-6 py-4 text-center font-semibold text-gray-700">
                    {item.clicks}
                </td>
                <td className="px-6 py-4 text-center">
                    <button
                        onClick={() => handleDelete(item._id)}
                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));
    };

    return (
        <div className="container mx-auto pt-2 pb-10">
            <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
                <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-md uppercase text-gray-50 bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-6/12">
                                Full URL
                            </th>
                            <th scope="col" className="px-6 py-3 w-3/12">
                                Short URL
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Clicks
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableData()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
