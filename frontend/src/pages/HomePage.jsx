import ProductCard from "@/components/productCard/ProductCard";
import { useProductStore } from "@/store/product"
import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react"
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {

    const { fetchProducts, products } = useProductStore();

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts]);
    console.log("Products", products)

    return (
        <Container maxW={"4xl"} py={12}>
            <VStack wordSpacing={4}>
                <Text fontSize={30} fontWeight={"bold"} bgGradient={"to-r"} gradientFrom={"cyan.400"} gradientTo={"blue.500"} bgClip={"text"} textAlign={"center"}>
                    Current Products
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10} w={"full"}>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>
                {products.length === 0 && (
                    <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
                        No Products Found.{" "}
                        <Link to={"/create"}>
                            <Text as={"span"} color={"blue.500"} _hover={{ textDecoration: "underline" }}>Create a Product</Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    )
}

export default HomePage