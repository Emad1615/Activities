type Props = {
  activeTab: number;
};
export default function ProfileFollow({ activeTab }: Props) {
  const predicate = activeTab === 3 ? 'followers' : 'followings';
  return <div>ProfileFollow</div>;
}
