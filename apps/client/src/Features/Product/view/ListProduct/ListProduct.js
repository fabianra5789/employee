import CommonModal from "@/Components/CommonModal";
import { Box, Button, Heading, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import TableProduct from "../../components/TableProduct";
import useStoreProduct from "../../store";
import ProductsForm from "./createProduct";

const ListProduct = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { setData } = useStoreProduct();

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3002/products");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los proyectos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();
  const goToEmployees = () => {
    router.push("/");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p={4} height="100vh" display="flex" flexDirection="column" gap={2}>
      <Heading textAlign="center">Lista de proyectos</Heading>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          colorScheme="blue"
          onClick={() => {
            getProduct();
          }}
          isLoading={isLoading}
        >
          Actualizar
        </Button>
        <Button colorScheme="green" onClick={onOpen}>
          Crear nuevo proyecto
        </Button>
        <Button onClick={goToEmployees} colorScheme="red">
          Ver voluntariados
        </Button>
      </Box>
      <CommonModal isOpen={isOpen} onClose={onClose}>
        <ProductsForm onClose={onClose} />
      </CommonModal>
      <Box height={"100%"}>
        <TableProduct />
      </Box>
    </Box>
  );
};

export default ListProduct;
