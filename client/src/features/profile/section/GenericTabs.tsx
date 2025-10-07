import { tabs } from '../mock/tabs';

type Props = {
  activeTabe: number;
};
export default function GenericTabs({ activeTabe }: Props) {
  const ActiveComponent = tabs[activeTabe].tab;
  return <ActiveComponent activeTab={activeTabe} />;
}
