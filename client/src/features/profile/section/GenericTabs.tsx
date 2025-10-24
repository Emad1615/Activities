type Props = {
  activeTab: number;
  tabs: TabType[];
};
export default function GenericTabs({ activeTab, tabs }: Props) {
  const ActiveComponent = tabs[activeTab].tab;
  return <ActiveComponent activeTab={activeTab} />;
}
