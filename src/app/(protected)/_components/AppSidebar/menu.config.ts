import { DollarSign, AlignJustify, Settings, ChartArea } from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartArea,
  },

  {
    title: "Transações",
    url: "/transactions",
    icon: DollarSign,
  },
  {
    title: "Categorias",
    url: "/categories",
    icon: AlignJustify,
  },
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
];
