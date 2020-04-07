import AgoraRTM from 'agora-rtm-sdk'
const client = AgoraRTM.createInstance('20de7b3642c4458d9adacc2a7c99afd3')

client.on('ConnectionStateChange', (newState, reason) => {
  console.log('on connection state changed to ' + newState + ' reason: ' + reason);
});

export const AgoraRtmClient = client