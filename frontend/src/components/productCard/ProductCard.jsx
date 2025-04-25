import { Box, Group, Heading, HStack, IconButton, Image, Text } from "@chakra-ui/react"
import { useColorModeValue } from "../ui/color-mode";
import { MdDelete, MdEdit } from "react-icons/md";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Button, Field, Input, Popover, Portal, Stack, } from "@chakra-ui/react"
import { useState } from "react";

const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")

    const { deleteProduct } = useProductStore()

    const [open, setOpen] = useState(false)

    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toaster.create({
                title: "Error",
                description: message,
                type: "error",
                duration: 4000,
                closable: true,
            })
        } else {
            toaster.create({
                title: "Success",
                description: "Product Deleted Successfully",
                type: "success",
                duration: 4000,
                closable: true,
            })
        }
    }

    const { updateProduct } = useProductStore();
    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        setOpen(false);
        if (!success) {
            toaster.create({
                title: "Error",
                description: message,
                type: "error",
                duration: 4000,
                closable: true,
            })
        } else {
            toaster.create({
                title: "Success",
                description: message,
                type: "success",
                duration: 4000,
                closable: true,
            })
        }
    }

    return (
        <Box shadow={"lg"} rounded={"lg"} overflow={"hidden"} transition={"all 0.3s"} _hover={{ transform: "translateY(-5px)", shadow: "xl" }} bg={bg}>
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />
            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2}>{product.name}</Heading>
                <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>${product.price}</Text>
                <HStack spaceX={2}>
                    <Popover.Root modal={true} open={open} onOpenChange={(e) => setOpen(e.open)}>
                        <Popover.Trigger asChild>
                            <IconButton backgroundColor={"blue.500"}><MdEdit /></IconButton>
                        </Popover.Trigger>
                        <Portal>
                            <Popover.Positioner>
                                <Popover.Content>
                                    <Popover.Arrow>
                                        <Popover.ArrowTip />
                                    </Popover.Arrow>
                                    <Popover.Body>
                                        <Popover.Title fontWeight="bold">Update Product</Popover.Title>
                                        <Stack gap="4" my={4}>
                                            <Field.Root>
                                                <Input placeholder="Product Name" name="name" value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} />
                                            </Field.Root>
                                            <Field.Root>
                                                <Input placeholder="Price" name="price" value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} />
                                            </Field.Root>
                                            <Field.Root>
                                                <Input placeholder="Image URL" name="image" value={updatedProduct.image} onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })} />
                                            </Field.Root>
                                        </Stack>
                                    </Popover.Body>
                                    <Popover.Footer>
                                        <Group>
                                            <Button size="sm" backgroundColor={"blue.400"} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                                            <Button size="sm" variant={"outline"} onClick={() => setOpen(!open)}>Cancel</Button>
                                        </Group>
                                    </Popover.Footer>
                                    <Popover.CloseTrigger />
                                </Popover.Content>
                            </Popover.Positioner>
                        </Portal>
                    </Popover.Root>
                    <IconButton backgroundColor={"red.500"} onClick={() => handleDeleteProduct(product._id)}><MdDelete /></IconButton>
                </HStack>
                <Toaster />
            </Box>
        </Box>
    )
}

export default ProductCard