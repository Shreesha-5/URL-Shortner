import * as React from 'react';
import Formcontainer from '../FormContainer/FormContainer';
import type { UrlData } from "../../interfaces/UrlData";
import axios from "axios";
import { serverUrl } from "../../helpers/Constants";
import DataTable from "../DataTable/DataTable";

interface IContainerProps {
}

const Container: React.FunctionComponent<IContainerProps> = () => {

  const [data, setData] = React.useState<UrlData[]>([]);

  const fetchTableData = async (): Promise<void> => {
    try {
      const response = await axios.get(`${serverUrl}/shortUrl`);
      setData(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setData([]);
      }
    }
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item._id !== id));
  };

  React.useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <>
      <Formcontainer onSuccess={fetchTableData} />
      <DataTable data={data} onDelete={handleDelete} />
    </>
  );
};

export default Container;
