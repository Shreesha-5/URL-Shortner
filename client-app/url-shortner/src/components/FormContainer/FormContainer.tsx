import * as React from "react";
import axios from "axios";
import { serverUrl } from "../../helpers/Constants";

interface IFormcontainerProps {
  onSuccess: () => void;
}

const Formcontainer: React.FunctionComponent<IFormcontainerProps> = ({ onSuccess }) => {
  const [fullUrl, setFullUrl] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // URL validation
    try {
      new URL(fullUrl);
    } catch {
      alert("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${serverUrl}/shortUrl`,
        {
          fullUrl,
        }
      );

      console.log(response.data);

      alert("URL shortened successfully!");

      setFullUrl("");
      onSuccess();
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 409) {
        alert("This URL has already been shortened!");
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-2">
      <div className="bg-banner my-8 rounded-xl bg-cover bg-center">
        <div className="w-full h-full rounded-xl p-20 backdrop-brightness-50">
          <h2 className="text-white text-4xl text-center pb-4">
            URL Shortener
          </h2>

          <p className="text-white text-center pb-2 text-xl font-extralight">
            Paste Your Untidy Link To Shorten It!
          </p>

          <p className="text-white text-center pb-4 text-sm font-thin">
            Free tool to shorten a URL or reduce links.
            Use our URL Shortener to create a neat link.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="relative w-full">

                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800">
                  urlshortner.link /
                </div>

                <input
                  type="text"
                  placeholder="Add your link"
                  required
                  className="block w-full p-4 ps-32 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                  value={fullUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFullUrl(e.target.value)
                  }
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  {loading ? "Loading..." : "Shorten URL"}
                </button>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formcontainer;
