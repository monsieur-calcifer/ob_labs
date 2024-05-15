import requests
import polars as pl
from decimal import Decimal

# Token decimals
USDC_ADDRESS = "0xaf88d065e77c8cc2239327c5edb3a432268e5831"
USDT_ADDRESS = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
WETH_ADDRESS = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"

# Define the decimals for each token
token_decimals = {
    "0xaf88d065e77c8cc2239327c5edb3a432268e5831": 6,  # USDC
    "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9": 6,  # USDT
    "0x82af49447d8a07e3bd95bd0d56f35241523fbab1": 18  # WETH
}

# Endpoint for the GraphQL API
GRAPHQL_ENDPOINT = 'https://api.studio.thegraph.com/query/74845/aave-v3-arbitrum---ob-labs/version/latest'

# GraphQL query
QUERY = """
{
  borrows(
    where: {reserve_in: ["0x82af49447d8a07e3bd95bd0d56f35241523fbab1", "0xaf88d065e77c8cc2239327c5edb3a432268e5831", "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"]}
  ) {
    reserve
    user
    onBehalfOf
    blockNumber
    amount
    blockTimestamp
    borrowRate
    interestRateMode
    transactionHash
  }
  repays(
    where: {reserve_in: ["0x82af49447d8a07e3bd95bd0d56f35241523fbab1", "0xaf88d065e77c8cc2239327c5edb3a432268e5831", "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"]}
  ) {
    blockNumber
    blockTimestamp
    amount
    repayer
    reserve
    transactionHash
    useATokens
    user
  }
  supplies(
    first: 1000
    where: {reserve_in: ["0x82af49447d8a07e3bd95bd0d56f35241523fbab1", "0xaf88d065e77c8cc2239327c5edb3a432268e5831", "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"]}
  ) {
    amount
    blockNumber
    blockTimestamp
    onBehalfOf
    referralCode
    reserve
    transactionHash
    user
  }
  withdraws(
    where: {reserve_in: ["0x82af49447d8a07e3bd95bd0d56f35241523fbab1", "0xaf88d065e77c8cc2239327c5edb3a432268e5831", "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"]}
  ) {
    amount
    blockNumber
    blockTimestamp
    reserve
    to
    transactionHash
    user
  }
  reserveDataUpdateds(
    where: {reserve_in: ["0x82af49447d8a07e3bd95bd0d56f35241523fbab1", "0xaf88d065e77c8cc2239327c5edb3a432268e5831", "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"]}
  ) {
    blockNumber
    blockTimestamp
    liquidityIndex
    liquidityRate
    reserve
    stableBorrowRate
    transactionHash
    variableBorrowIndex
    variableBorrowRate
  }
  liquidationCalls(
    first: 1000
    where: {collateralAsset_in: ["0x82af49447d8a07e3bd95bd0d56f35241523fbab1", "0xaf88d065e77c8cc2239327c5edb3a432268e5831", "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"]}
  ) {
    blockNumber
    blockTimestamp
    collateralAsset
    debtAsset
    debtToCover
    liquidatedCollateralAmount
    liquidator
    receiveAToken
    transactionHash
    user
  }
  balanceTransfers{
    transactionHash
    blockNumber
    blockTimestamp
    from
    index
    to
    value
  }
  aUSDTBalanceTransfers {
    blockNumber
    blockTimestamp
    from
    id
    index
    to
    transactionHash
    value
  }
  aWETHBalanceTransfers {
    blockNumber
    blockTimestamp
    from
    index
    to
    transactionHash
    value
  }
}
"""

def fetch_data(query):
    response = requests.post(GRAPHQL_ENDPOINT, json={'query': query})
    if response.status_code == 200:
        return response.json()['data']
    else:
        raise Exception(f"Query failed to run by returning code of {response.status_code}. {response.text}")

data = fetch_data(QUERY)

# Initialize a DataFrame to store processed data with explicit data types
df = pl.DataFrame({
    'block_number': pl.Series([], dtype=pl.Int64),
    'timestamp': pl.Series([], dtype=pl.Int64),
    'user_address': pl.Series([], dtype=pl.Utf8),
    'token_address': pl.Series([], dtype=pl.Utf8),
    'token_amount': pl.Series([], dtype=pl.Decimal),  # Use Object type for Decimal
    'interest_rate_mode': pl.Series([], dtype=pl.Float64),
    'event_type': pl.Series([], dtype=pl.Utf8),
})

# Process supplies
for supply in data.get('supplies', []):
    new_df = pl.DataFrame({
        'block_number': [int(supply['blockNumber'])],
        'timestamp': [int(supply['blockTimestamp'])],
        'user_address': [supply['onBehalfOf']],
        'token_address': [supply['reserve']],
        'token_amount': [Decimal(supply['amount'])],
        'interest_rate_mode': [float('nan')],
        'event_type': ['supply'],
    })
    df = df.vstack(new_df)

# Process withdraws
for withdraw in data.get('withdraws', []):
    df = df.vstack(pl.DataFrame({
        'block_number': [int(withdraw['blockNumber'])],
        'timestamp': [int(withdraw['blockTimestamp'])],
        'user_address': [withdraw['user']],
        'token_address': [withdraw['reserve']],
        'token_amount': [-Decimal(withdraw['amount'])],
        'interest_rate_mode': [float('nan')],
        'event_type': ['supply']
    }))

# Process borrows
for borrow in data.get('borrows', []):
    df = df.vstack(pl.DataFrame({
        'block_number': [int(borrow['blockNumber'])],
        'timestamp': [int(borrow['blockTimestamp'])],
        'user_address': [borrow['onBehalfOf']],
        'token_address': [borrow['reserve']],
        'token_amount': [-Decimal(borrow['amount'])],
        'interest_rate_mode': [float(borrow['interestRateMode'])],
        'event_type': ['borrow']
    }))

# Process repays
for repay in data.get('repays', []):
    df = df.vstack(pl.DataFrame({
        'block_number': [int(repay['blockNumber'])],
        'timestamp': [int(repay['blockTimestamp'])],
        'user_address': [repay['repayer']],
        'token_address': [repay['reserve']],
        'token_amount': [Decimal(repay['amount'])],
        'interest_rate_mode':[float('nan')],
        'event_type': ['borrow']
    }))

# Process liquidations
for liquidation in data.get('liquidations', []):
        df = df.vstack(pl.DataFrame({
            'block_number': [int(liquidation['blockNumber'])],
            'timestamp': [int(liquidation['blockTimestamp'])],
            'user_address': [liquidation['user']],
            'token_address': [liquidation['collateralAsset']],
            'token_amount': [-Decimal(liquidation['liquidatedCollateralAmount'])],
            'interest_rate_mode': [float('nan')],
            'event_type': ['borrow']
        }))

# Process USDC incoming transfers
for transfer_in in data.get('balanceTransfers', []):
    df = df.vstack(pl.DataFrame({
        'block_number': [int(transfer_in['blockNumber'])],
        'timestamp': [int(transfer_in['blockTimestamp'])],
        'user_address': [transfer_in['to']],
        'token_address': [USDC_ADDRESS],
        'token_amount': [Decimal(transfer_in['value'])],
        'interest_rate_mode': [float('nan')],
        'event_type': ['supply']
    }))
    
# Process USDC outgoing transfers
for transfer_out in data.get('balanceTransfers', []):
    df = df.vstack(pl.DataFrame({
        'block_number': [int(transfer_out['blockNumber'])],
        'timestamp': [int(transfer_out['blockTimestamp'])],
        'user_address': [transfer_out['from']],
        'token_address': [USDC_ADDRESS],
        'token_amount': [-Decimal(transfer_out['value'])],
        'interest_rate_mode': [float('nan')],
        'event_type': ['supply']
    }))
        
# Process USDT incoming transfers
for transfer_in in data.get('balanceTransfers', []):
    df = df.vstack(pl.DataFrame({
        'block_number': [int(transfer_in['blockNumber'])],
        'timestamp': [int(transfer_in['blockTimestamp'])],
        'user_address': [transfer_in['to']],
        'token_address': [USDT_ADDRESS],
        'token_amount': [Decimal(transfer_in['value'])],
        'interest_rate_mode': [float('nan')],
        'event_type': ['supply']
    }))
        
# Process USDT outgoing transfers
for transfer_out in data.get('balanceTransfers', []):
    df = df.vstack(pl.DataFrame({
        'block_number': [int(transfer_out['blockNumber'])],
        'timestamp': [int(transfer_out['blockTimestamp'])],
        'user_address': [transfer_out['from']],
        'token_address': [USDT_ADDRESS],
        'token_amount': [-Decimal(transfer_out['value'])],
        'interest_rate_mode': [float('nan')],
        'event_type': ['supply']
    }))
        
# Process WETH incoming transfers
for transfer_in in data.get('balanceTransfers', []):
    df = df.vstack(pl.DataFrame({
        'block_number': [int(transfer_in['blockNumber'])],
        'timestamp': [int(transfer_in['blockTimestamp'])],
        'user_address': [transfer_in['to']],
        'token_address': [WETH_ADDRESS],
        'token_amount': [Decimal(transfer_in['value'])],
        'interest_rate_mode': [float('nan')],
        'event_type': ['supply']
    }))
        
# Process WETH outgoing transfers
for transfer_out in data.get('balanceTransfers', []):
    df = df.vstack(pl.DataFrame({
        'block_number': [int(transfer_out['blockNumber'])],
        'timestamp': [int(transfer_out['blockTimestamp'])],
        'user_address': [transfer_out['from']],
        'token_address': [WETH_ADDRESS],
        'token_amount': [-Decimal(transfer_out['value'])],
        'interest_rate_mode': [float('nan')],
        'event_type': ['supply']
    }))
    
events_df = df.with_columns([
    pl.when(pl.col("event_type") == "borrow")
    .then(pl.col("interest_rate_mode").fill_nan(pl.col("interest_rate_mode").shift(1)))
    .otherwise(pl.col("interest_rate_mode"))
    .over(["user_address", "token_address", "event_type"])
    .alias("interest_rate_mode")
])

# Sort by timestamp within each group
events_df = events_df.sort(["user_address", "token_address", "event_type", "timestamp"])

# Convert token_amount to float for easier handling
events_df = events_df.with_columns(
    pl.col("token_amount").cast(pl.Float64).alias("token_amount")
)

# Adjust token_amount by dividing by 10^decimals based on token_address
events_df = events_df.with_columns([
    pl.when(pl.col("token_address") == "0xaf88d065e77c8cc2239327c5edb3a432268e5831")
    .then(pl.col("token_amount") / 10**token_decimals["0xaf88d065e77c8cc2239327c5edb3a432268e5831"])
    .when(pl.col("token_address") == "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9")
    .then(pl.col("token_amount") / 10**token_decimals["0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"])
    .when(pl.col("token_address") == "0x82af49447d8a07e3bd95bd0d56f35241523fbab1")
    .then(pl.col("token_amount") / 10**token_decimals["0x82af49447d8a07e3bd95bd0d56f35241523fbab1"])
    .otherwise(pl.col("token_amount"))
    .alias("adjusted_amount")
])

events_df = events_df.drop({"token_amount"} & set(events_df.columns))

# Calculate the cumulative sum of adjusted_amount for each user and token, ordered by timestamp
events_df = events_df.with_columns(
    pl.col("adjusted_amount").cumsum().over(["user_address", "token_address"]).alias("net_amount")
)

# Shift the timestamp column by one row within each group defined by 'user_address' and 'token_address'
events_df = events_df.with_columns(
    pl.col("timestamp").shift(-1).over(["user_address", "token_address"]).alias("next_event_timestamp")
)

# Fill null values in 'next_event_timestamp' with the maximum timestamp from the DataFrame
max_timestamp = events_df.select(pl.max("timestamp")).to_numpy()[0, 0]
events_df = events_df.with_columns(
    pl.col("next_event_timestamp").fill_null(pl.lit(max_timestamp)).alias("next_event_timestamp")
)

interest_rate_df = pl.DataFrame({
    'ir_block_number': [int(x['blockNumber']) for x in data.get('reserveDataUpdateds', [])],
    'block_timestamp': [int(x['blockTimestamp']) for x in data.get('reserveDataUpdateds', [])],
    'liquidity_index': [Decimal(x['liquidityIndex']) for x in data.get('reserveDataUpdateds', [])],
    'liquidity_rate': [Decimal(x['liquidityRate']) / Decimal('1e27') for x in data.get('reserveDataUpdateds', [])],
    'reserve': [x['reserve'] for x in data.get('reserveDataUpdateds', [])],
    'stable_borrow_rate': [Decimal(x['stableBorrowRate']) / Decimal('1e27') for x in data.get('reserveDataUpdateds', [])],
    'variable_borrow_rate': [Decimal(x['variableBorrowRate']) / Decimal('1e27') for x in data.get('reserveDataUpdateds', [])]
})

interest_rate_df = interest_rate_df.sort('block_timestamp')

interest_rate_df = interest_rate_df.with_columns([
    (pl.col("variable_borrow_rate").cast(pl.Float64)).alias("variable_borrow_rate"),
    (pl.col("stable_borrow_rate").cast(pl.Float64)).alias("stable_borrow_rate"),
    (pl.col("liquidity_rate").cast(pl.Float64)).alias("liquidity_rate")
])

# Find the maximum timestamp in events_df
max_timestamp = events_df["timestamp"].max()

# Find the closest interest rate row in interest_rate_df for the maximum timestamp
closest_interest_rate_row = interest_rate_df.filter(pl.col("block_timestamp") <= max_timestamp).sort("block_timestamp", descending=True).head(1)

# Add a new row to interest_rate_df with the maximum timestamp and the values from the closest interest rate row
new_row = closest_interest_rate_row.with_columns([
    pl.lit(max_timestamp).cast(pl.Int64).alias("block_timestamp")
])

interest_rate_df = interest_rate_df.vstack(new_row)

cross_joined_df = events_df.join(interest_rate_df, how="cross")

# Filter the cross-joined DataFrame to keep only the rows where the interest rate timestamp is between the event timestamp and next_event_timestamp
filtered_df = cross_joined_df.filter(
    (pl.col("block_timestamp") >= pl.col("timestamp")) &
    (pl.col("block_timestamp") <= pl.col("next_event_timestamp")) &
    (pl.col("token_address") == pl.col("reserve"))
)

# Assuming 'filtered_df' is your DataFrame
result_df = filtered_df.select([
    pl.col("block_number").alias("evt_block_number"),
    pl.col("timestamp").alias("evt_timestamp"),
    pl.col("user_address"),
    pl.col("token_address"),
    pl.col("event_type"),
    pl.col('interest_rate_mode'),
    pl.col("adjusted_amount"),
    pl.col("net_amount"),
    pl.col("next_event_timestamp").alias("next_evt_timestamp"),
    pl.col("ir_block_number").alias("ir_block_number"),
    pl.col("block_timestamp").alias("ir_block_timestamp"),
    pl.col("liquidity_rate"),
    pl.col("variable_borrow_rate"),
    pl.col("stable_borrow_rate")
])

# Calculate the time difference in seconds
result_df = result_df.with_columns(
    pl.col("ir_block_timestamp").diff().over(["user_address", "token_address"]).fill_null(0).alias("time_diff_seconds")
)

# Handle the last row in each group
max_timestamp = result_df.select(pl.max("ir_block_timestamp")).to_numpy()[0, 0]
result_df = result_df.with_columns(
    pl.when(pl.col("time_diff_seconds") == 0)
    .then((pl.lit(max_timestamp) - pl.col("ir_block_timestamp")).cast(pl.Int64))
    .otherwise(pl.col("time_diff_seconds"))
    .alias("time_diff_seconds")
)

# Function to convert APR to APY
def apr_to_apy(apr, periods_per_year):
    return (1 + apr / periods_per_year) ** periods_per_year - 1

# Calculate the interest rate accrued
def calculate_interest_accrued(df):
    df = df.with_columns([
        pl.when(pl.col("event_type") == "supply")
        .then(pl.col("liquidity_rate"))
        .when((pl.col("event_type") == "borrow") & (pl.col("interest_rate_mode") == 1))
        .then(pl.col("stable_borrow_rate"))
        .when((pl.col("event_type") == "borrow") & (pl.col("interest_rate_mode") == 2))
        .then(pl.col("variable_borrow_rate"))
        .otherwise(0)
        .alias("interest_rate")
    ])
    
    # Group by user, token, event type, and evt_timestamp, ordering by evt_timestamp
    df = df.sort(["user_address", "token_address", "event_type", "next_evt_timestamp"])
    
    # Convert APR to APY
    df = df.with_columns([
        apr_to_apy(pl.col("interest_rate"), 365 * 24 * 60 * 60 / pl.col("time_diff_seconds")).alias("apy")
    ])
    
    # Calculate interest accrued
    df = df.with_columns([
        (pl.col("net_amount") * pl.col("apy") * pl.col("time_diff_seconds") / (365 * 24 * 60 * 60)).alias("interest_accrued")
    ])
    
    # Calculate cumulative interest accrued
    df = df.with_columns([
        pl.col("interest_accrued").cum_sum()
        .over(["user_address", "token_address", "event_type"])
        .alias("cumulative_interest_accrued")
    ])
    
    return df

# Apply the function to the DataFrame
result_df = calculate_interest_accrued(result_df)

# Calculate interest for each event until next event, only for the first occurrence
result_df = result_df.with_columns([
    (pl.col("net_amount") + 
        pl.col("cumulative_interest_accrued")).alias("new_net_amount_v2")
])

# Select the relevant columns
selected_df = result_df.select([
    pl.col('ir_block_number').alias('block_number'),
    pl.col('ir_block_timestamp').alias('timestamp'),
    pl.col('user_address').alias('owner_address'),
    pl.col('token_address'),
    pl.col('new_net_amount_v2').alias('token_amount')
])

# Convert timestamp to datetime format
selected_df = selected_df.with_columns(
    (pl.col('timestamp') * 1000000).cast(pl.Datetime).alias('timestamp')
)

print(selected_df)
