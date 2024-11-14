/* eslint-disable react-hooks/rules-of-hooks */
import DeleteConfirm from "@/Components/DeleteConfirm";
import { Avatar } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { deleteProduct, updateProduct } from "../../services";
import useStoreProduct from "../../store";
import EditProduct from "../EditProduct";

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.display({
    id: "id_Serial",
    header: () => "Serial",
    cell: (info) => info.row.original.id_Serial,
  }),
  columnHelper.accessor("Imagen", {
    cell: (info) => (
      <>
        <Avatar src={info.getValue()} size="sm" />
      </>
    ),
  }),
  columnHelper.accessor("Nombre", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.Categoria, {
    id: "Categoria",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Categoria</span>,
  }),
  columnHelper.accessor("Modelo", {
    header: "Año",
  }),
  columnHelper.accessor("Serie", {
    header: () => "Fecha de finalizacion",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("Marca", {
    header: () => <span>Marca del proyecto</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("Fabricante", {
    header: "Gestor del proyecto",
  }),
  columnHelper.accessor("id_Empleado", {
    header: "Voluntario Asignado",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "Edit",
    header: () => "",
    cell: (info) => {
      const { setData } = useStoreProduct();
      return (
        <EditProduct
          values={info.row.original}
          onSubmit={(values) => {
            updateProduct(
              {
                ...info.row.original,
                ...values,
              },
              setData
            );
          }}
        />
      );
    },
  }),
  columnHelper.display({
    id: "Delete",
    header: () => "",
    cell: (info) => {
      const { setData } = useStoreProduct();
      return (
        <DeleteConfirm
          message="¿Está seguro que desea eliminar este proyecto?"
          onDelete={deleteProduct(info.row.original._id, setData)}
        />
      );
    },
  }),
];
