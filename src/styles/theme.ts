import { DM_Sans } from "@next/font/google";
import { extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";

const DMSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const finalTheme = extendTheme({
  fonts: {
    heading: DMSans.style.fontFamily,
    body: DMSans.style.fontFamily,
  },

  components: {
    MultiSelect: MultiSelectTheme,
  },
});

export { finalTheme, DMSans };
