interface data {
  userImg: string;
}

export default function ({ userImg }: data) {
  return (
    <div
      className={`h-full w-full rounded-full shadow-lg`}
      style={{ backgroundImage: `url(${userImg})`, backgroundSize: "cover" }}
    ></div>
  );
}
