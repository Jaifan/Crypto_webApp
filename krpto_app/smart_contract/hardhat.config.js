// https://eth-rinkeby.alchemyapi.io/v2/6GsFZzTbpaocHngYTCuzzD222SMtYSXq

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity : "0.8.0",
  networks : {
    rinkeby : {
      url : 'https://eth-rinkeby.alchemyapi.io/v2/6GsFZzTbpaocHngYTCuzzD222SMtYSXq',
      accounts : ['727d31b30e03882800bca9d76558732c858b5fa6bbd640a6d47e1317633c04d3']
    }
  }
}