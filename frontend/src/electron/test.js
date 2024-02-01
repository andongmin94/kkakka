import { createWebSocketConnection } from 'league-connect';

async function main() {
  const ws = await createWebSocketConnection({
    authenticationOptions: {
      awaitConnection: true,
    },
  });

  // 챔피언 선택 정보 구독
  ws.subscribe('/lol-champ-select/v1/session', (data) => {
    console.log('챔피언 선택 정보:', data);
  });

  // 게임 상태 정보 구독
  ws.subscribe('/lol-gameflow/v1/session', (data) => {
    console.log('게임 상태 정보:', data);
  });

  // 플레이어 상태 정보 구독
  ws.subscribe('/lol-summoner/v1/current-summoner', (data) => {
    console.log('플레이어 상태 정보:', data);
  });

  ws.subscribe('/lol-summoner/v1/inventory', (data) => {
    console.log('인벤토리:', data);
  });

  // 여기에 추가적인 구독이나 로직을 넣을 수 있습니다.
}

main().catch(console.error);
