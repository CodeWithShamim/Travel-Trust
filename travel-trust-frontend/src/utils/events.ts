// import { fetchContractEventLogs } from '@wagmi/core';
// import { config } from '@/lib/wagmiConfig';
// import { contractConfig } from '@/lib/contract';

// export async function fetchAllServiceEvents() {
//   const logs = await fetchContractEventLogs(config, {
//     ...contractConfig,
//     eventName: 'ServiceAdded',
//     fromBlock: 0,
//     toBlock: 'latest',
//   });

//   return logs.map((log: any) => ({
//     id: log.args.ServiceId,
//     name: log.args.name,
//     creator: log.args.creator,
//   }));
// }
