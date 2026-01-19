import { Render } from "@measured/puck";
import { useState } from "react";
import { config } from "./editor-page";

export function TestEditorPage() {
  const [data, setData] = useState<any>({});
  console.log(JSON.parse(localStorage.getItem("test_page")))
  return (
    <Render
      config={config}
      data={JSON.parse(localStorage.getItem("test_page") || "{}")}
    />
  );
}
