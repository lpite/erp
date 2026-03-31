import useSWR from "swr";
import { CollectionResponses, Collections } from "../../pocketbase-types";
import { pb } from "../utils/pb";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface EntitySelectProps<T extends Collections> {
  id?: string;
  table: T;
  onChange: (entity: CollectionResponses[T]) => void;
  disabled?: boolean;
}

export default function EntitySelect<T extends Collections>({
  table,
  id,
  onChange,
  disabled,
}: EntitySelectProps<T>) {
  // not sure rly
  const { data: entityList, error } = useSWR(id && table ? table : null, () =>
    pb.collection(table).getList(),
  );

  return (
    <div className="min-w-36 flex justify-between min-h-6">
      <span className="pr-0.5 w-full">
        {error ? "error" : entityList?.items.find((el) => el.id === id)?.name}

        {!id ? (
          <span className="border-dotted border-t-transparent border-x-transparent border-2 w-full h-full block"></span>
        ) : (
          "no id"
        )}
      </span>
      {!disabled && <DefaultEntityList table={table} onChange={onChange} />}
    </div>
  );
}

function DefaultEntityList<T extends Collections>({
  table,
  onChange,
}: {
  table: T;
  onChange: (entity: CollectionResponses[T]) => void;
}) {
  const { data: entityList, isLoading } = useSWR(
    table,
    () => pb.collection(table).getList(),
    {
      revalidateIfStale: false,
      revalidateOnMount: false,
      revalidateOnFocus: false,
    },
  );
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger
        onClick={(e) => e.stopPropagation()}
        className="border rounded-sm px-1 hover:bg-gray-200 cursor-pointer"
      >
        ...
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/25 backdrop-opacity-50 fixed inset-0 z-10" />
        <Dialog.Content className="fixed z-10 bg-white top-1/2 left-1/2 -translate-1/2 w-96 h-96 rounded-2xl p-3">
          <Dialog.Title>{table}</Dialog.Title>
          {entityList?.items.map((entity) => (
            <button
              key={entity.id}
              onClick={() => {
                onChange(entity);
                setIsOpen(false);
              }}
              className="block"
            >
              {entity?.name || entity.id}
            </button>
          ))}
          {isLoading ? "loading" : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
