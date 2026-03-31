import { FormEvent, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { createColumnHelper } from "@tanstack/react-table";
import { FtsProduct } from "../../../shared/types/fts-product";
import useSWR from "swr";

import { IncomeDocumentItem } from "../models/income-document";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MyTable } from "./table";
import { createPortal } from "react-dom";
import TableContainer from "@mui/material/TableContainer";
import Checkbox from "@mui/material/Checkbox";
import { CartItem, useCart } from "../hooks/useCart";

const columnHelper = createColumnHelper<FtsProduct>();
const columns = [
  columnHelper.accessor("id", {
    cell: (r) => (
      <span dangerouslySetInnerHTML={{ __html: r.getValue() }}></span>
    ),
  }),
  columnHelper.accessor("oem", {
    cell: (r) => (
      <span dangerouslySetInnerHTML={{ __html: r.getValue() }}></span>
    ),
  }),
  columnHelper.accessor("article", {
    cell: (r) => (
      <span dangerouslySetInnerHTML={{ __html: r.getValue() }}></span>
    ),
  }),
  columnHelper.accessor("name", {
    cell: (r) => (
      <span dangerouslySetInnerHTML={{ __html: r.getValue() }}></span>
    ),
  }),
  columnHelper.accessor("brand", {
    cell: (r) => (
      <span dangerouslySetInnerHTML={{ __html: r.getValue() }}></span>
    ),
  }),
  columnHelper.accessor("price", {
    cell: (r) => r.getValue(),
  }),
  columnHelper.accessor("stock", {
    cell: (r) => r.getValue(),
  }),
  columnHelper.accessor("places", {
    cell: (r) =>
      r.getValue().map((el) => (
        <>
          {el}
          <br />
        </>
      )),
  }),
];

interface ProductSelectionDialogProps {
  addNewItem: (item: IncomeDocumentItem) => void;
  disabled: boolean;
  type: "income" | "sales";
}

export function ProductSelectionToDocumentDialog({
  addNewItem,
  disabled,
  type,
}: ProductSelectionDialogProps) {
  //TODO переписати цей компонент нормально.
  const [isOpen, setIsOpen] = useState(false);
  const [showNewItemDialog, setShowNewItemDialog] = useState(false);
  const [newItemIndex, setNewItemIndex] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [exactSearch, setExactSearch] = useState(false);
  const { items: cartItems, addItem: addToCart, clearCart } = useCart();

  const { data, isLoading, mutate } = useSWR(
    searchValue.length ? ["fts", searchValue, exactSearch] : null,
    () =>
      fetch(
        `http://${window.location.hostname}:3000/api/search?q=${searchValue}`,
      ).then((r) => r.json()) as Promise<{ items: FtsProduct[] }>,
  );

  function search(e: FormEvent) {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const searchValue = data.get("searchValue")?.toString().trim();

    if (searchValue?.length) {
      setSearchValue(searchValue);
      mutate();
    }
  }

  function saveCart() {
    //TODO забрати цикл.
    cartItems.forEach((item) => {
      // TODO remove math random
      addNewItem({ id: Math.random().toString(), ...item });
    });
    clearCart();
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "initial";
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="border px-1 py-0.5 rounded-sm disabled:opacity-35"
        disabled={disabled}
      >
        Підібрати товари
      </button>
      {createPortal(
        <>
          {newItemIndex !== null && data?.items[newItemIndex] && (
            <PriceAndQuantityDialog
              item={data?.items[newItemIndex]}
              setShowNewItemDialog={setShowNewItemDialog}
              showNewItemDialog={showNewItemDialog}
              addToCart={addToCart}
            />
          )}
          {isOpen && (
            <div className="top-0 left-0 end-0 right-0 w-full h-full fixed bg-white px-3 z-30 flex flex-col pb-3">
              <div>
                <span className="flex text-xl pt-2 pb-3">
                  Підбір товарів в документ
                </span>
                <Button variant="contained" onClick={saveCart}>
                  Перенести в документ
                </Button>
                <div className="flex pt-3">
                  <form onSubmit={search} className="flex gap-2">
                    <TextField
                      size="small"
                      className="w-96"
                      name="searchValue"
                    />
                    <Button
                      variant="outlined"
                      disabled={isLoading}
                      type="submit"
                      size="small"
                    >
                      Пошук
                    </Button>
                    <label>
                      <Checkbox
                        checked={exactSearch}
                        onChange={() => setExactSearch(!exactSearch)}
                      />
                      <span className="text-sm">По точному співпадінню</span>
                    </label>
                  </form>
                </div>
              </div>
              <TableContainer className="mb-42 flex">
                <MyTable
                  columns={columns}
                  data={data?.items}
                  onRowDoubleClick={(row) => {
                    if (!data) {
                      return;
                    }
                    const newItem = data.items[row.index];
                    if (type === "sales") {
                      addToCart({
                        quantity: 1,
                        price: newItem.price,
                        product: newItem,
                      });
                      return;
                    }
                    setShowNewItemDialog(true);
                    setNewItemIndex(row.index);
                  }}
                />
                <div className="px-2">ТУТ буде фото</div>
              </TableContainer>
              <div className="flex flex-col w-full h-46 fixed bottom-0 bg-white start-0 px-2 py-2">
                <div className="w-full h-2 bg-gray-400"></div>
                <div>
                  Всього підібрано товарів на суму{" "}
                  <b>
                    {cartItems
                      .reduce((acc, c) => acc + c.price * c.quantity, 0)
                      .toFixed(2)}
                  </b>{" "}
                  грн
                  <Button className="mx-4" onClick={clearCart}>
                    Очистити
                  </Button>
                </div>
                <div className="overflow-y-auto h-full">
                  {cartItems.map((item) => (
                    <div className="flex gap-1 w-full">
                      <span>{item.product.id}</span>|
                      <span className="grow">{item.product?.name}</span>
                      <span>
                        {item.quantity}x{item.price.toFixed(2)}грн
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>,
        //@ts-expect-error meow
        document.getElementById("portal-root"),
      )}
    </>
  );
}

type PriceAndQuantityDialogProps = {
  showNewItemDialog: boolean;
  setShowNewItemDialog: (s: boolean) => void;
  item: FtsProduct;
  addToCart: (cartItem: CartItem) => void;
};

function PriceAndQuantityDialog({
  setShowNewItemDialog,
  showNewItemDialog,
  item,
  addToCart,
}: PriceAndQuantityDialogProps) {
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemPrice, setNewItemPrice] = useState(item.price);

  const quantityInputRef = useRef<HTMLInputElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  function addToCartAndClose() {
    addToCart({
      quantity: newItemQuantity,
      price: newItemPrice,
      product: item,
    });
    setShowNewItemDialog(false);
  }

  return (
    <Dialog.Root open={showNewItemDialog} onOpenChange={setShowNewItemDialog}>
      <Dialog.Overlay className="fixed z-50 top-0 left-0 bg-black/10 w-full h-full" />
      <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-1/2 z-20 w-96 bg-white rounded-xl p-4">
        <Dialog.Title className="text-start text-xl mb-2">
          Введення кількості та ціни
        </Dialog.Title>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col grow gap-2">
            <span className="flex my-2 font-semibold">{item.name}</span>
            <TextField
              label="Ціна"
              size="small"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(Number(e.target.value))}
              onKeyDown={(e) =>
                e.key === "Enter" ? quantityInputRef.current?.focus() : null
              }
            />
            <TextField
              label="Кількість"
              size="small"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(Number(e.target.value))}
              inputRef={quantityInputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // This is necessary to prevent clicking on confirmButton
                  confirmButtonRef.current?.focus();
                }
              }}
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="contained"
              ref={confirmButtonRef}
              onClick={addToCartAndClose}
            >
              Додати
            </Button>
            <Button onClick={() => setShowNewItemDialog(false)}>
              Скасувати
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
