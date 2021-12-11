import { Flex, Text, Box, Avatar } from "@chakra-ui/react";


export function Profile() {
  return (
    <Flex alignItems="center">
      <Box marginRight="4" textAlign="right">
        <Text>Roger Silveira</Text>
        <Text color="gary.300" fontSize="small">
          rogersilveira_13@hotmail.com
        </Text>
      </Box>

      <Avatar size="md" name="Roger Silveira" src="https://github.com/silveiraroger.png" />
    </Flex>
  );
}