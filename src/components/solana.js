import {
    Account,
    Keypair,
    PublicKey,
    Transaction,
    Connection,
} from '@solana/web3.js';
import * as splToken from "@solana/spl-token";
import {
    Token
} from '@solana/spl-token';
  

const endpoint = "https://flashy-ancient-patina.solana-mainnet.quiknode.pro/442fd2b36b85a9776179f0a179ce87af24ed3f6a/";
const connection = new Connection(endpoint, "confirmed");

let signers = Account[0];


export async function getTokenBalance(publicKey) {
    const berlinCA = "AYsStMg6AqXSLWsBXDGjAzrPgePrZc4ixgnoHM6nCav6"

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      { programId: splToken.TOKEN_PROGRAM_ID }
    );
    const tokenAccountsWithAmounts = {
      berlin: 0
    };
    tokenAccounts.value.forEach(tokenAccount => {
        const mint = tokenAccount.account.data.parsed.info.mint;
        const amount = tokenAccount.account.data.parsed.info.tokenAmount.uiAmount;
        if (mint === berlinCA) {
            tokenAccountsWithAmounts.berlin = amount;
        }
    });
    return tokenAccountsWithAmounts;
}


export async function handleStake(publicKey, wallet, stakeAmount) {
  
    const berlinCA = "AYsStMg6AqXSLWsBXDGjAzrPgePrZc4ixgnoHM6nCav6"

    let transaction = new Transaction()

    const percentPublicKey = new PublicKey("CxTxzxnEUCb28xE6zee5W4mL6CWJpGMA2Qmito3PE9JL")
    const treasuryPublicKey = new PublicKey("D2TfPwFHJKfH6yK12AD43KV1ebBsGGtTvkRJv9mNa3o8")
    
    const berlinPublicKey = new PublicKey(berlinCA);    
    const berlinToken = new Token(
        connection,
        berlinPublicKey,
        splToken.TOKEN_PROGRAM_ID,
        signers
    );


    //DEDUCT

    const associatedDestinationTokenAddr = await Token.getAssociatedTokenAddress(
        berlinToken.associatedProgramId,
        berlinToken.programId,
        berlinPublicKey,
        treasuryPublicKey
    );
    const associatedPercentTokenAddr = await Token.getAssociatedTokenAddress(
        berlinToken.associatedProgramId,
        berlinToken.programId,
        berlinPublicKey,
        percentPublicKey
    );
    const bankReceiverAccount = await connection.getAccountInfo(associatedDestinationTokenAddr);
    const percentReceiverAccount = await connection.getAccountInfo(associatedPercentTokenAddr);
    
    const userTokenAccount = await berlinToken.getOrCreateAssociatedAccountInfo(
        publicKey
    );

    const berlinTokenMintInfo = await berlinToken.getMintInfo();
    const berlinTokenDecimals = berlinTokenMintInfo.decimals;
    
    const adjustedAmount = stakeAmount * Math.pow(10, berlinTokenDecimals);

    if (bankReceiverAccount === null) {
        transaction.add(
        Token.createAssociatedTokenAccountInstruction(
            berlinToken.associatedProgramId,
            berlinToken.programId,
            berlinPublicKey,
            associatedDestinationTokenAddr,
            treasuryPublicKey,
            publicKey
        )
        )
    }
    if (percentReceiverAccount === null) {
        transaction.add(
        Token.createAssociatedTokenAccountInstruction(
            berlinToken.associatedProgramId,
            berlinToken.programId,
            berlinPublicKey,
            associatedPercentTokenAddr,
            percentPublicKey,
            publicKey
        )
        )
    }
    transaction.add(
        Token.createTransferInstruction(
        splToken.TOKEN_PROGRAM_ID,
        userTokenAccount.address,
        associatedDestinationTokenAddr,
        publicKey,
        [],
        (adjustedAmount * 0.9)
        )
    );
    transaction.add(
        Token.createTransferInstruction(
        splToken.TOKEN_PROGRAM_ID,
        userTokenAccount.address,
        associatedPercentTokenAddr,
        publicKey,
        [],
        (adjustedAmount * 0.1)
        )
    );


    
    

    let { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.adapter.publicKey;

    let signed = await wallet.adapter.signTransaction(transaction);
    let txid = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(txid);
}
  
