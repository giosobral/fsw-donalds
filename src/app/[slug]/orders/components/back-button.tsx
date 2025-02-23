"use client";

import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const BackButton = () => {
  const { back } = useRouter();

  return (
    <Button
      size="icon"
      variant="secondary"
      className="rounded-full"
      onClick={back}
    >
      <ChevronLeftIcon />
    </Button>
  );
};

export default BackButton;
