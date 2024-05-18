import { Dropdown, MenuProps } from "antd";
import { useState } from "react";
import { GrLanguage } from "react-icons/gr";

export default function LanguageOption() {
  const [language, setLanguage] = useState("VI");
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setLanguage("Tiếng Việt")}
        >
          Tiếng Việt
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setLanguage("English")}
        >
          Tiếng Anh
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setLanguage("France")}
        >
          Tiếng Pháp
        </a>
      ),
    },
  ];
  return (
    <div className="flex items-center space-x-2 hover:text-black hover:bg-slate-200 items-center text-white p-1 rounded-lg">
      <Dropdown menu={{ items }} placement="bottomLeft">
        <div className="flex ">
          <GrLanguage className="" />
        </div>
      </Dropdown>
      <p className="text-xs">{language}</p>
    </div>
  );
}
