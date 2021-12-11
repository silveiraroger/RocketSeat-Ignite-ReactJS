import { Flex, useBreakpointValue, IconButton, Icon } from "@chakra-ui/react";
import { useContextSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { NotificationsNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";
import { Logo } from "./Logo";
import { RiMenuLine } from "react-icons/ri";

export function Header() {
  const { onOpen } = useContextSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false
  });

  return (
    <Flex
      as="header"
      width="100%"
      maxWidth={1480}
      height="20"
      marginX="auto"
      marginTop="4"
      paddingX="6"
      alignItems="center"
    >
      {isWideVersion && (
        <IconButton
          aria-label="Open vavigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          marginRight="2"
        >
        </IconButton>
      )}

      <Logo />
      {!isWideVersion && <SearchBox />}

      <Flex alignItems="center" marginLeft="auto">
        <NotificationsNav />
        <Profile />
      </Flex>
    </Flex>
  );
}