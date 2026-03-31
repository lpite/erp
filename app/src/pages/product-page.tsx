import useSWR from "swr";
import { pb } from "../utils/pb";
import { useLocation, useParams } from "wouter";
import { ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export function ProductPage() {
  const { id } = useParams();
  const [_, navigate] = useLocation();
  const { data: product, mutate: mutateProduct } = useSWR(["product", id], () =>
    pb.collection("product").getOne(id || ""),
  );

  function changeValue(e: ChangeEvent<HTMLInputElement>) {
    mutateProduct(
      (p) => {
        if (p) {
          return { ...p, [e.target.name]: e.target.value };
        }
      },
      {
        revalidate: false,
      },
    );
  }

  function saveProduct() {
    if (id) {
      pb.collection("product").update(id, product);
    }
  }

  return (
    <main className="p-4">
      <div className="flex gap-2">
        <Button
          variant="contained"
          onClick={() => {
            saveProduct();
            navigate("/");
          }}
        >
          Зберегти та закрити
        </Button>
        <Button onClick={saveProduct}>Зберегти</Button>
      </div>
      <div className="flex gap-2 pt-8">
        <TextField
          size="small"
          name="article"
          label="Артикул"
          value={product?.article || ""}
          onChange={changeValue}
        />
        <TextField
          size="small"
          name="oem"
          label="ОЕМ"
          value={product?.oem || ""}
          onChange={changeValue}
        />
      </div>
      <div className="pt-6">
        <TextField
          value={product?.name || ""}
          name="name"
          label="Назва"
          onChange={changeValue}
        />
      </div>
      <div>
        <TextField
          label="Опис"
          name="description"
          value={product?.description || ""}
        ></TextField>
      </div>
    </main>
  );
}
