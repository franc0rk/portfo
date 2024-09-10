import { GroupedAssets, IAsset } from "@/app/models/asset";
import { TickerDictionary } from "@/app/models/ticker";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import AssetCard from "./AssetCard";
import CardViewer from "../CardViewer";

interface AssetGroupsAccordionProps {
  groups: GroupedAssets;
  prices: TickerDictionary;
}

export default function AssetGroupAccordion({
  groups,
  prices,
}: AssetGroupsAccordionProps) {
  const renderedGroups = Object.entries(groups).map(
    ([groupName, group]: [string, IAsset[]]) => {
      return (
        <AccordionItem key={groupName}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {groupName}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <CardViewer
              prices={prices}
              assets={group}
              key={`${groupName}-viewer`}
            />
          </AccordionPanel>
        </AccordionItem>
      );
    }
  );

  return <Accordion allowMultiple>{renderedGroups}</Accordion>;
}
