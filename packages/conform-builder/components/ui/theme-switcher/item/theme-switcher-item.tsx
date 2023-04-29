import { CheckIcon, LucideIcon } from "lucide-react";

import { ContextMenu } from "@/components/ui/context-menu";
import { ThemeType } from "@/contexts/theme-context";

import styles from "./theme-switcher-item.module.scss";

type ThemeSwitcherItemProps = {
  theme: ThemeType;
  selected: boolean;
  onSelected: (theme: ThemeType) => void;
  label: string;
  icon?: LucideIcon;
};

export function ThemeSwitcherItem({
  theme,
  selected,
  onSelected,
  label,
  icon: Icon,
}: ThemeSwitcherItemProps) {
  return (
    <ContextMenu.Item className={styles.item} onClick={() => onSelected(theme)}>
      {Icon && <Icon size={14} />}
      {label}
      {selected && <CheckIcon className={styles.selected} size={14} />}
    </ContextMenu.Item>
  );
}
