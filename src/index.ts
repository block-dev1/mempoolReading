import * as ethers from "ethers";
import { WebSocketProvider } from '@ethersproject/providers'
import dotenv from "dotenv";
import ERC20 from "./ERC20";
import ROUTER from "./router";


dotenv.config()
const infuraKey = `wss://mainnet.infura.io/ws/v3/${process.env.API_KEY}`

const getWsProvider = (): WebSocketProvider =>
  new ethers.providers.WebSocketProvider(infuraKey)

async function main() {
  const provider = getWsProvider()
  const iface = new ethers.utils.Interface(ROUTER);
  provider.on('pending', async (txHash: string) => {
    const tx = await provider.getTransaction(txHash)
    var decodedArgs
    if (!tx) {
      return
    } else if (tx.data.slice(0, 10) == "0x38ed1739") {
      console.log(tx)
      decodedArgs = iface.decodeFunctionData(tx.data.slice(0, 10), tx.data);
      if (!decodedArgs) {
        return
      } else {
        const [amountIn, amountOutMin, path, to, deadline] = decodedArgs.params.map((x: { value: any; }) => x.value);
      }
    }
  })
}

main().catch((error) => {
  console.error('[EXIT WITH ERROR]', error)
  process.exit(1)
})