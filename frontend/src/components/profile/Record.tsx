import { PC } from "../MediaQuery";

interface player {
  name: string;
  champion: string;
}

interface record {
  win: boolean;
  map: string;
  time: string;
  kill: number;
  death: number;
  assist: number;
  score: number;
  event: string;
  killRate: number;
  cs: number;
  csPerM: number;
  itemArr: string[];
  blueTeam: Array<player>;
  redTeam: Array<player>;
}

export default function Record({ record }: { record: record }) {
  return (
    <div className=" gap-y-2">
      {/* 전적 */}
      <div className="w-80% h-[125px] border-2 m-5 flex rounded-lg">
        {/* 라벨색 */}
        <div
          className={`h-full w-3 ${
            record.win ? "bg-blue-600" : "bg-red-600"
          } rounded-lg`}
        />
        <div className="h-full w-[100px] font-bold text-center py-2  flex flex-col justify-center">
          <p
            className={`text-xl ${
              record.win ? "text-blue-600" : "text-red-600"
            }`}
          >
            {record.win ? "승리" : "패배"}
          </p>
          {/* 맵 종류 */}
          <p className="text-sm">{record.map}</p>
          {/* 시간 */}
          <p className="text-sm">{record.time}</p>
        </div>
        <div className="flex ml-1">
          {/* 챔피언 사진 */}
          <img
            src="/image/lolCham.png"
            className="h-[60px] w-[60px] self-center"
          />
          <div className="self-center ml-1">
            {/* 스펠 사진 */}
            <img className="h-[30px] w-[30px]" src="/image/lolSpell1.png" />
            <img className="h-[30px] w-[30px]" src="/image/lolSpell2.png" />
          </div>
          <div className="self-center ml-1">
            {/* 룬 사진 */}
            <img className="h-[30px] w-[30px]" src="/image/lolRune1.png" />
            <img className="h-[30px] w-[30px]" src="/image/lolRune2.png" />
          </div>
        </div>
        <div className="h-full w-[100px] ml-2 flex flex-col justify-center items-center font-bold">
          {/* 킬 데스 어시스트 */}
          <p className="text-xl">
            {record.kill} / <span className="text-red-600">{record.death}</span>{" "}
            / {record.assist}
          </p>
          {/* 평점 */}
          <p>{record.score} 평점</p>
          {/* 연속 킬 여부 */}
          {/* 트리플 쿼드라킬 펜타킬 색으로 나중에 구분 필요 */}
          <p className="text-green-500 border-2 border-green-500 rounded-3xl w-[80px] text-center">
            {record.event}
          </p>
        </div>

        <PC>
          <div className="h-full w-[120px] flex flex-col justify-center items-center font-bold">
            {/* 킬관여 비율 */}
            <p className="text-center">킬관여 {record.killRate}%</p>
            {/* cs, 분당cs */}
            <p className="text-center">
              CS {record.cs} ({record.csPerM}/m)
            </p>
          </div>
        </PC>
        {/* 아이템 사진 */}
        {/* 임시로 사진은 그냥 넣음 */}
        <div className="h-[80px] w-[150px] grid grid-cols-3 grid-row-2 gap-1 place-items-center mx-3 self-center">
          {record.itemArr.map((_, idx) => {
            return (
              <img
                src="/image/lolItem1.png"
                className="h-[40px] w-[40px]"
                key={idx}
              />
            );
          })}
        </div>

        <PC>
          {/* 팀 정보 */}
          <div className="grid grid-cols-2 h-full w-[300px] ml-4">
            {/* 블루팀 */}
            <div className="grid grid-rows-5">
              {record.blueTeam.map((player, idx) => {
                return (
                  <div key={idx} className="flex justify-start items-center">
                    <img src={player.champion} className="h-4 w-4" />
                    <span>{player.name}</span>
                  </div>
                );
              })}
            </div>
            {/* 레드팀 */}
            <div className="grid grid-rows-5">
              {record.blueTeam.map((player, idx) => {
                return (
                  <div key={idx} className="flex justify-start items-center">
                    <img src={player.champion} className="h-4 w-4" />
                    <span>{player.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </PC>
      </div>
    </div>
  );
}
