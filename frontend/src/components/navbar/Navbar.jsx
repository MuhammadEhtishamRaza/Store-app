import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci"
import { useColorMode, useColorModeValue } from "../ui/color-mode"
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Container maxW={"1140px"} px={"4"}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{ bace: "column", sm: "row" }}>
                <Text fontSize={{ base: 22, sm: 28 }} fontWeight={"bold"} textTransform={"uppercase"} textAlign={"center"} bgGradient={"to-r"} gradientFrom={"cyan.400"} gradientTo={"blue.500"} bgClip={"text"}>
                    <Link to={"/"}>Store App</Link>
                </Text>
                <HStack wordSpacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button bg={useColorModeValue("default", "gray.500")} px={0}><CiSquarePlus fontSize={20} /></Button>
                    </Link>
                    <Button onClick={toggleColorMode} bg={useColorModeValue("default", "gray.500")} px={0}>
                        {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    )
}

export default Navbar