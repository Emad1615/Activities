type Props = {
  activeTab: number;
  tabs: TabType[];
};
export default function GenericTabs({ activeTab, tabs }: Props) {
  const ActiveComponent = tabs[activeTab].tab;
  const tabType = tabs[activeTab]?.type;
  return <ActiveComponent activeTab={activeTab} type={tabType} />;
}
