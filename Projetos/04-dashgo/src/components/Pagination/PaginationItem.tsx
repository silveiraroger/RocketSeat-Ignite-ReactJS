import { Button, } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
}

export function PaginationItem({ number, isCurrent }: PaginationItemProps) {

  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{
          backgroundColor: 'pink.500',
          cursor: 'default'
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      background="gray.700"
      _hover={{
        background: 'gray.700'
      }}
    >
      {number}
    </Button>
  );
}