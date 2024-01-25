interface data {
  userImg: string;
}

export default function ({ userImg }: data) {
  return (
    <div
      className={`bg-[url('${userImg}')] h-full w-full bg-cover rounded-full`}
    />
  );
}
