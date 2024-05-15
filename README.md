# OBL Subgraph Task

This repository contains the solution for building a subgraph and adapter for Aave V3 to track users supplies and borrows on the Arbitrum chain.

Link to [original task](https://docs.google.com/document/d/1wcfS3EdAUAuwB5Eczrz6gQ5Db3yJVhsLyxYntkpJBmk/edit)

Note:
- The subgraph has been created but is not fully synced yet, leading to incomplete validation.
- Data may be missing due to incomplete sync, affecting the requirement to get data for the block closest to every top of the hour. Currently, supplies and borrows are segregated, and the net calculation is pending. Once the subgraph completes syncing, the net calculation will be performed, and the code will be revised accordingly.
- Each aToken (USDC, USDT, WETH) has a separate contract entity (e.g., aUSDCBalanceTransfers, aWETHBalanceTransfers). This may be causing issues when pulling data. However, since the subgraph is not fully synced at the moment, the impact of this separation on data retrieval is not yet known.
- Future iterations should focus on optimizing contract additions for different aTokens and improving data filtering.
