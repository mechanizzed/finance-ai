import { PercentageItemProps } from "./percentage-item.types";

export const PercentageItem = ({ icon, title, value }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      {/* Icone */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-white/5 p-2">{icon}</div>
        <p className="text-muted-foreground text-sm">{title}</p>
      </div>
      <p className="text-sm font-bold">{value}%</p>
    </div>
  );
};
